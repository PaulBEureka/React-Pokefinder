import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Volume2, X } from "lucide-react";

const Card = ({ pokemon }) => {
  const [details, setDetails] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const url = pokemon.url || pokemon.pokemon?.url;
    if (!url) return;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((err) => console.error(err));
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

  const playCry = () => {
    try {
      const src = details.cries?.latest;
      if (!src) return;
      const audio = new Audio(src);
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    } catch (e) {
      console.error(e);
    }
  };

  const getMainType = () => details.types?.[0]?.type?.name || "normal";
  const mainType = getMainType();
  const displayName =
    details.name?.charAt(0).toUpperCase() + details.name?.slice(1);

  return (
    <div
      className={`pokemon-card relative cursor-pointer select-none`}
      onClick={() => !expanded && setExpanded(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !expanded)
          setExpanded(true);
      }}
    >
      <div className={`card-header ${mainType}`}>
        <span className="pokemon-name">{displayName}</span>
        <div className="flex items-center gap-3">
          <span className="pokemon-type capitalize">{mainType}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playCry();
            }}
            className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
            title={`Play ${displayName} cry`}
          >
            <Volume2 size={16} />
          </button>
        </div>
      </div>

      <div className="card-image" aria-hidden={expanded}>
        <img
          src={
            details.sprites?.other?.["official-artwork"]?.front_default ||
            details.sprites?.front_default
          }
          alt={details.name}
          style={{ maxHeight: "180px", maxWidth: "180px" }}
        />
      </div>

      {!expanded && (
        <div className="absolute inset-x-5 -bottom-0 flex justify-center pointer-events-none">
          <div className="bg-black/20 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md">
            <span className="opacity-95">Click to view details</span>
          </div>
        </div>
      )}

      {expanded &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-6"
            onClick={() => setExpanded(false)}
          >
            <div
              className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-3 z-50 flex justify-end pr-3">
                <button
                  onClick={() => setExpanded(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 text-gray-800 dark:text-white rounded-full"
                  aria-label="Close details"
                >
                  <X size={18} />
                </button>
              </div>

              <div
                className={`card-header ${mainType} flex items-center justify-between rounded-t-xl`}
              >
                <div className="flex items-center gap-3">
                  <span className="pokemon-name">{displayName}</span>
                  <span className="pokemon-type capitalize">{mainType}</span>
                  <div>
                    <button
                      onClick={() => playCry()}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
                      title={`Play ${displayName} cry`}
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-image bg-white flex items-center justify-center">
                <img
                  src={
                    details.sprites?.other?.["official-artwork"]
                      ?.front_default || details.sprites?.front_default
                  }
                  alt={details.name}
                  style={{
                    maxHeight: "240px",
                    maxWidth: "240px",
                  }}
                />
              </div>

              <div className="card-stats bg-white dark:bg-gray-900 text-white">
                <div className="p-4 text-white">
                  <div className="stat-row">
                    <span className="stat-label">ID</span>
                    <span className="stat-value">{details.id}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Weight</span>
                    <span className="stat-value">{details.weight}</span>
                  </div>

                  {details.stats?.map((stat) => (
                    <div className="stat-row" key={stat.stat.name}>
                      <span className="stat-label capitalize text-white">
                        {stat.stat.name}
                      </span>
                      <span className="stat-value text-white">
                        {stat.base_stat}
                      </span>
                    </div>
                  ))}

                  <div className="abilities mt-2 text-white">
                    {details.abilities?.map((ab) => (
                      <span className="ability-tag" key={ab.ability.name}>
                        {ab.ability.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {details.types?.map((t) => (
                      <span
                        key={t.type.name}
                        className={`pokemon-type capitalize bg-white/10 text-white`}
                        style={{ padding: "6px 10px", borderRadius: 12 }}
                      >
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Card;
