import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { usePokemonContext } from "../contexts/PokemonContext";
import { usePokemonSpeciesData } from "./usePokemonSpeciesData";

export function usePokemonByType(limit = 20) {
  const [offset, setOffset] = useState(0);
  const [typeName, setTypeName] = useState("all");
  const [speciesFilter, setSpeciesFilter] = useState(null); // "legendary", etc.
  const { searchInput } = usePokemonContext();

  // Get all species data
  const { data: speciesMap, isLoading: speciesLoading } =
    usePokemonSpeciesData();

  const { data, isLoading, error } = useQuery({
    queryKey: ["PokemonByTypeList", typeName],
    queryFn: async () => {
      if (!typeName || typeName === "all") return [];

      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${typeName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const baseData = await response.json();

      // No more individual API calls - just lookup from the species map
      const detailedPokemon = baseData.pokemon.map((entry) => {
        const name = entry.pokemon.name;
        const speciesData = speciesMap?.get(name);

        return {
          ...entry.pokemon,
          is_legendary: speciesData?.is_legendary || false,
          is_mythical: speciesData?.is_mythical || false,
          is_baby: speciesData?.is_baby || false,
        };
      });

      return detailedPokemon;
    },
    enabled: !!typeName && typeName !== "all" && !!speciesMap,
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

  // Paginate the filtered data
  const paginatedPokemon = useMemo(() => {
    return filteredData.slice(offset, offset + limit);
  }, [filteredData, offset, limit]);

  const goToPageType = (page) => {
    setOffset((page - 1) * limit);
  };

  const setType = (type) => {
    setOffset(0);
    setTypeName(type);
  };

  const setSpeciesType = (type) => {
    setOffset(0);
    setSpeciesFilter(type);
  };

  const totalFiltered = filteredData.length;
  const totalPagesType = Math.ceil(totalFiltered / limit) || 1;
  const hasNextPage = offset + limit < totalFiltered;
  const hasPrevPage = offset > 0;
  const currentPage = Math.floor(offset / limit) + 1;

  return {
    data: paginatedPokemon,
    isLoading: isLoading || speciesLoading, // Include species loading state
    error,
    goToPageType,
    setSpeciesType,
    setType,
    hasNextPage,
    hasPrevPage,
    currentPage,
    totalPagesType,
  };
}
