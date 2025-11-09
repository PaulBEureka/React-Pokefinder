import Card from "./Card";
import { usePokemonByType } from "../hooks/usePokemonByType";
import { usePokemonList } from "../hooks/usePokemonList";
import { usePokemonContext } from "../contexts/PokemonContext";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { RingLoader } from "react-spinners";

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedType, selectedSpecies } = usePokemonContext();

  const allPokemon = usePokemonList();
  const typePokemon = usePokemonByType();

  const {
    data: pokemonList,
    isLoading,
    error,
    totalPages,
    goToPage,
    setSpecies,
    setType,
  } = selectedType === "all" ? allPokemon : typePokemon;

  const handlePageChange = (page) => {
    goToPage(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    setSpecies(selectedSpecies);
    setType(selectedType);
  }, [selectedSpecies, selectedType]);

  return (
    <>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          siblingCount={1}
        />
      )}

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-12">
          <p className="text-white font-extrabold text-xl mb-3">Loading</p>
          <RingLoader color="#ffffff" />
        </div>
      ) : pokemonList.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-white font-extrabold text-xl">
            No Pokémon found...
          </p>
        </div>
      ) : (
        <div className="card-container">
          {pokemonList?.map((pokemon, idx) => (
            <Card
              key={pokemon.name || pokemon.pokemon?.name || idx}
              pokemon={pokemon}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          siblingCount={1}
        />
      )}
    </>
  );
};

export default Cards;
