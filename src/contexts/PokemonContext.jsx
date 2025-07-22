import { useContext, useState, createContext } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSpecies, setSelectedSpecies] = useState("all");
  const [searchInput, setSearchInput] = useState(null);

  return (
    <PokemonContext.Provider
      value={{
        selectedType,
        setSelectedType,
        selectedSpecies,
        setSelectedSpecies,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
}
