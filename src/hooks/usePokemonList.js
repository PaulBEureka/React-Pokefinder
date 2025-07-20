import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function usePokemonList(limit = 20) {
  const [offset, setOffset] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemonList", offset, limit],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const goNextPageAll = () => {
    if (data?.next) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const goPrevPageAll = () => {
    if (data?.previous) {
      setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    }
  };

  const goToPageAll = (page) => {
    setOffset((page - 1) * limit);
  };

  return {
    data: data?.results || [],
    isLoading,
    error,
    goNextPageAll,
    goPrevPageAll,
    goToPageAll,
    hasNextPage: !!data?.next,
    hasPrevPage: !!data?.previous,
    currentPage: Math.floor(offset / limit) + 1,
    totalPages: Math.ceil(data?.count / limit) || 1,
  };
}
