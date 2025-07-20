import React, { useEffect, useState } from "react";

const Card = ({ pokemon }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    // pokemon.pokemon.url for type endpoint, pokemon.url for list endpoint
    const url = pokemon.url || pokemon.pokemon?.url;
    if (!url) return;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [pokemon]);

  if (!details) {
    return (
      <div className="pokemon-card">
        <div className="card-header normal">
          <span className="pokemon-name">Loading...</span>
        </div>
      </div>
    );
  }

  // Get type for background
  const mainType = details.types?.[0]?.type?.name || "normal";
  return (
    <div className={`pokemon-card`}>
      <div className={`card-header ${mainType}`}>
        <span className="pokemon-name">{details.name}</span>
        <span className="pokemon-type">{mainType}</span>
      </div>
      <div className="card-image">
        <img
          src={
            details.sprites?.other?.["official-artwork"]?.front_default ||
            details.sprites?.front_default
          }
          alt={details.name}
          style={{ maxHeight: "180px", maxWidth: "180px" }}
        />
      </div>
      <div className="card-stats">
        {details.stats?.map((stat) => (
          <div className="stat-row" key={stat.stat.name}>
            <span className="stat-label">{stat.stat.name}</span>
            <span className="stat-value">{stat.base_stat}</span>
          </div>
        ))}
        <div className="abilities">
          {details.abilities?.map((ab) => (
            <span className="ability-tag" key={ab.ability.name}>
              {ab.ability.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
