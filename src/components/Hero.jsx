import React from "react";
import { AiTwotoneThunderbolt } from "react-icons/ai";

const Hero = () => {
  return (
    <div className="hero-container flex items-center gap-4 justify-center">
      <div className="w-20 flex-1">
        <h1 className="text-white text-center align-center font-extrabold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
          ⚡ PokéFinder ⚡
        </h1>
        <p className="text-white text-center align-center">
          Catch ’Em All, Know ’Em All!
        </p>
      </div>
    </div>
  );
};

export default Hero;
