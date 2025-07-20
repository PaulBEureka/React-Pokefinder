import { useEffect } from "react";
import { usePokemonContext } from "../contexts/PokemonContext";

const Filters = () => {
  const { selectedType, setSelectedType, selectedRarity, setSelectedRarity } =
    usePokemonContext();

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleRarityChange = (event) => {
    setSelectedRarity(event.target.value);
  };
  return (
    <div className="filter-container grid grid-cols-1 sm:flex sm:flex-wrap sm:gap-4 gap-2 p-4 w-full max-w-full overflow-x-auto">
      <div className="filter-item w-full sm:w-[40%] h-12 min-w-0 m-3">
        <label htmlFor="pokemonType" className="text-black">
          Type
        </label>
        <select
          id="pokemonType"
          name="pokemonType"
          className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md p-2 w-[80%] min-w-0"
          defaultValue="all"
          onChange={handleTypeChange}
        >
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>
      <div className="filter-item w-full sm:w-[40%] h-12 min-w-0 m-3">
        <label htmlFor="pokemonRarity" className="text-black">
          Rarity
        </label>
        <select
          id="pokemonRarity"
          name="pokemonRarity"
          className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md p-2 w-[80%] min-w-0"
          defaultValue="all"
          onChange={handleRarityChange}
        >
          <option value="all">All Rarities</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="legendary">Legendary</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
