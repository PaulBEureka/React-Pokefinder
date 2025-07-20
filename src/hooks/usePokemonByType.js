import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function usePokemonByType(typeName, limit = 20) {
  const [offset, setOffset] = useState(0);
  const { data, isLoading, error } = useQuery({
    queryKey: ["PokemonByTypeList", typeName],
    queryFn: async () => {
      if (!typeName || typeName === "all") return { pokemon: [] };
      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${typeName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!typeName && typeName !== "all",
    staleTime: 10 * 60 * 1000,
  });

  // Manual pagination
  const allPokemon = data?.pokemon || [];
  const paginatedPokemon = allPokemon.slice(offset, offset + limit);

  const goNextPageType = () => {
    if (offset + limit < allPokemon.length) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const goPrevPageType = () => {
    if (offset - limit >= 0) {
      setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    }
  };

  const goToPageType = (page) => {
    setOffset((page - 1) * limit);
  };

  return {
    data: paginatedPokemon,
    isLoading,
    error,
    goNextPageType,
    goPrevPageType,
    goToPageType,
    hasNextPage: offset + limit < allPokemon.length,
    hasPrevPage: offset > 0,
    currentPage: Math.floor(offset / limit) + 1,
    totalPages: Math.ceil(allPokemon.length / limit) || 1,
  };
}
