import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { usePokemonContext } from "../contexts/PokemonContext";
import { usePokemonSpeciesData } from "./usePokemonSpeciesData";

export function usePokemonList(limit = 20) {
  const [offset, setOffset] = useState(0); // offset still controls pagination
  const [speciesFilter, setSpeciesFilter] = useState(null); // "legendary", etc.
  const { searchInput } = usePokemonContext();

  // Get all species data
  const { data: speciesMap, isLoading: speciesLoading } =
    usePokemonSpeciesData();

  const { data, isLoading, error } = useQuery({
    queryKey: ["allPokemon"],
    queryFn: async () => {
      // First, fetch the entire list of Pokémon names
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );
      if (!res.ok) throw new Error("Failed to fetch Pokemon list");

      const base = await res.json();

      // No more individual API calls - just lookup from the species map
      const detailedResults = base.results.map((pokemon) => {
        const speciesData = speciesMap?.get(pokemon.name);

        return {
          ...pokemon,
          is_legendary: speciesData?.is_legendary || false,
          is_mythical: speciesData?.is_mythical || false,
          is_baby: speciesData?.is_baby || false,
        };
      });

      return detailedResults;
    },
    enabled: !!speciesMap, // Only run when species data is available
    staleTime: 10 * 60 * 1000,
  });

  // Filter all Pokémon from the type
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((pokemon) => {
      // First, check if the pokemon matches the search input
      const matchesSearch =
        !searchInput ||
        pokemon.name.toLowerCase().includes(searchInput.toLowerCase());

      // If it doesn't match the search, exclude it regardless of species filter
      if (!matchesSearch) return false;

      // Now apply species filter to those that match the search
      if (speciesFilter === "legendary") return pokemon.is_legendary;
      if (speciesFilter === "mythical") return pokemon.is_mythical;
      if (speciesFilter === "baby") return pokemon.is_baby;
      if (speciesFilter === "regular") {
        return (
          !pokemon.is_legendary && !pokemon.is_mythical && !pokemon.is_baby
        );
      }

      return true;
    });
  }, [data, speciesFilter, searchInput]);

  // Paginate filtered data
  const paginatedData = useMemo(() => {
    return filteredData.slice(offset, offset + limit);
  }, [filteredData, offset, limit]);

  const goToPageAll = (page) => {
    setOffset((page - 1) * limit);
  };

  const setSpeciesAll = (type) => {
    setSpeciesFilter(type);
    setOffset(0); // reset to page 1
  };

  return {
    data: paginatedData,
    isLoading: isLoading || speciesLoading, // Include species loading state
    error,
    goToPageAll,
    setSpeciesAll,
    hasNextPage: offset + limit < filteredData.length,
    hasPrevPage: offset > 0,
    currentPage: Math.floor(offset / limit) + 1,
    totalPagesAll: Math.ceil(filteredData.length / limit),
  };
}
