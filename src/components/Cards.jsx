import Card from "./Card";
import { usePokemonByType } from "../hooks/usePokemonByType";
import { usePokemonList } from "../hooks/usePokemonList";
import { usePokemonContext } from "../contexts/PokemonContext";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { selectedType, selectedSpecies } = usePokemonContext();

  const {
    data: allPokemonList,
    isLoadingAll,
    errorAll,
    totalPagesAll,
    goToPageAll,
    setSpeciesAll,
  } = usePokemonList();
  const {
    data: typePokemonList,
    typeIsLoading,
    typeError,
    totalPagesType,
    goToPageType,
    setSpeciesType,
    setType,
  } = usePokemonByType();

  const pokemonList = selectedType === "all" ? allPokemonList : typePokemonList;
  const isLoading = selectedType === "all" ? isLoadingAll : typeIsLoading;
  const error = selectedType === "all" ? errorAll : typeError;
  const totalPages = selectedType === "all" ? totalPagesAll : totalPagesType;
  const goToPage = selectedType === "all" ? goToPageAll : goToPageType;
  const setSpecies = selectedType === "all" ? setSpeciesAll : setSpeciesType;

  if (isLoading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error loading Pokémon.</div>;

  // Handle page change
  const handlePageChange = (page) => {
    goToPage(page);
    setCurrentPage(page);
  };

  // Update the cards if species filter is changed
  useEffect(() => {
    setSpecies(selectedSpecies);
  }, [selectedSpecies]);

  useEffect(() => {
    setType(selectedType);
  }, [selectedType]);

  console.log(pokemonList);

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
      {pokemonList.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-white font-extrabold text-xl">
            No Pokemon found...
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
