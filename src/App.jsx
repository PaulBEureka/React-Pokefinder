import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import Cards from "./components/Cards";
import { PokemonProvider } from "./contexts/PokemonContext";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="main-container">
      <PokemonProvider>
        <Navigation />
        <Hero />
        <Filters />
        <Cards />
        <Footer />
      </PokemonProvider>
    </div>
  );
}

export default App;
