import React from "react";
import Card from "./Card";
import { usePokemonByType } from "../hooks/usePokemonByType";
import { usePokemonContext } from "../contexts/PokemonContext";
import { useEffect } from "react";
import { usePokemonList } from "../hooks/usePokemonList";

const Cards = () => {
  const { selectedType, setSelectedType, selectedRarity, setSelectedRarity } =
    usePokemonContext();

  const { data: allPokemonList, isLoadingAll, errorAll } = usePokemonList();
  const {
    data: typePokemonList,
    typeIsLoading,
    typeError,
  } = usePokemonByType(selectedType);

  const pokemonList = selectedType === "all" ? allPokemonList : typePokemonList;
  const isLoading = selectedType === "all" ? isLoadingAll : typeIsLoading;
  const error = selectedType === "all" ? errorAll : typeError;

  if (isLoading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error loading Pokémon.</div>;

  console.log("Pokemon List:", pokemonList);

  return (
    <div className="card-container">
      {pokemonList?.map((pokemon, idx) => (
        <Card
          key={pokemon.name || pokemon.pokemon?.name || idx}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
};

export default Cards;
