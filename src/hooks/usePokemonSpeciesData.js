import { useQuery } from "@tanstack/react-query";

export function usePokemonSpeciesData() {
  return useQuery({
    queryKey: ["allPokemonSpecies"],
    queryFn: async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species/?limit=2000"
      );
      if (!response.ok) throw new Error("Failed to fetch species list");

      const speciesList = await response.json();

      // Fetch detailed data for all species
      const speciesData = await Promise.all(
        speciesList.results.map(async (species) => {
          try {
            const detailResponse = await fetch(species.url);
            if (!detailResponse.ok)
              throw new Error("Failed to fetch species detail");
            const detail = await detailResponse.json();

            return {
              name: species.name,
              is_legendary: detail.is_legendary,
              is_mythical: detail.is_mythical,
              is_baby: detail.is_baby,
            };
          } catch {
            return {
              name: species.name,
              is_legendary: false,
              is_mythical: false,
              is_baby: false,
            };
          }
        })
      );

      // Convert to Map for O(1) lookup
      return new Map(speciesData.map((species) => [species.name, species]));
    },
    staleTime: Infinity, // Cache forever
    cacheTime: Infinity,
  });
}
