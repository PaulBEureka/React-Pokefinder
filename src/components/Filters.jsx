import { usePokemonContext } from "../contexts/PokemonContext";

const Filters = () => {
  const { setSelectedType, setSelectedSpecies } = usePokemonContext();

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value);
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
        <label htmlFor="pokemonSpecies" className="text-black">
          Species
        </label>
        <select
          id="pokemonSpecies"
          name="pokemonSpecies"
          className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md p-2 w-[80%] min-w-0"
          defaultValue="all"
          onChange={handleSpeciesChange}
        >
          <option value="all">All Species</option>
          <option value="regular">Regular</option>
          <option value="legendary">Legendary</option>
          <option value="mythical">Mythical</option>
          <option value="baby">Baby</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
