import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemon } from "../api/pkmn";
import { getTrainer, markPokemon } from "../api/trainer.js";
import PokemonTypeBadge from "../composants/pokemonTypeLabel";
import { checkUser } from "../api/user.js";

function PokedexDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [trainer, setTrainer] = useState(null);
  const [isSeen, setIsSeen] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    initData();
  }, [id]);

  const fetchUserData = async () => {
    const { isAuthenticated } = await checkUser();
    setIsUserConnected(isAuthenticated);

    if (isAuthenticated) {
      const trainerData = await getTrainer();
      setTrainer(trainerData?.trainer);
      if (trainerData?.trainer) {
        setIsSeen(trainerData.trainer.pkmnSeen.includes(id));
        setIsCaught(trainerData.trainer.pkmnCatch.includes(id));
      }
    }
  };

  const fetchPokemonData = async () => {
    const pokemonData = await getPokemon(id);
    setPokemon(pokemonData?.pokemon || null);
  };

  const initData = async () => {
    await fetchUserData();
    await fetchPokemonData();
  };

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleMark = (isCatched) => {
    markPokemon(pokemon._id, isCatched).then(() => {
      initData();
    });
  };

  const imageFilter = isSeen || isCaught ? "none" : "brightness(0)";
  const backgroundColor = pokemon?.types?.[0]
    ? `var(--type-bg-${pokemon.types[0].toLowerCase()})`
    : "transparent";

  const renderTypeBadges = () => {
    if (isSeen && pokemon?.types) {
      return pokemon.types.map((type, index) => <PokemonTypeBadge key={index} type={type} />);
    }
    return <span className="mt-4">?????</span>;
  };

  const renderRegions = () => {
    if (isCaught && pokemon?.regions) {
      return pokemon.regions.map((region, index) => (
        <span key={index}>
          {region.regionName}
          {index < pokemon.regions.length - 1 ? ", " : ""}
        </span>
      ));
    }
    return "?????";
  };

  const renderDescription = () => {
    return isCaught ? pokemon?.description : "?????";
  };

  return (
    <div>
      <div className="pokedex-detail-container">
        <div className="pokedex-decoration">
          <div className="pokemon-decoration-detail">
            <img src="/src/assets/img/pointDecoration.svg" alt="Décoration Pokédex" className="pokemon-decoration-img" />
          </div>
          <div className="pokemon-decoration-detail">
            <img src="/src/assets/img/pointDecoration.svg" alt="Décoration Pokédex" className="pokemon-decoration-img" />
          </div>
        </div>

        <div className="pokedex-detail-content">
          <div
            className="pokedex-pokemon-detail"
            onClick={handleClick}
            style={{
              backgroundColor: backgroundColor,
            }}
          >
            <h3 className="pokedex-detail-name">{isSeen || isCaught ? pokemon?.name : "?????"}</h3>
            {pokemon && (
              <img
                className="pokedex-detail-image"
                src={pokemon.animatedGif || pokemon.imagePath}
                alt={isCaught ? pokemon.name : "?????"}
                style={{ filter: imageFilter }}
              />
            )}
            <p className="pokedex-detail-height">
              <b>Height: </b>{isCaught ? `${pokemon?.height / 10}m` : "?????"}
            </p>
            <p className="pokedex-detail-weight">
              <b>Weight: </b>{isCaught ? `${pokemon?.weight / 10}kg` : "?????"}
            </p>
          </div>

          <div className="pokedex-detail-types-regions d-flex row ">

            <div className="pokedex-detail-regions col-7 mt-2">
              <p>Régions: </p>
              <p className="pokedex-detail-regions">
                {isCaught && pokemon?.regions ? (
                  pokemon.regions.map((region, index) => (
                    <span key={index}>
                      {region.regionName}
                      {index < pokemon.regions.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  "?????"
                )}
              </p>
            </div>

            <div className="pokedex-detail-types col-5 mt-2">
              {renderTypeBadges()}
            </div>

          </div>

          {isCaught && pokemon?.soundPath && (
            <audio ref={audioRef} src={pokemon.soundPath} preload="auto" />
          )}
        </div>
      </div>

      <div className="pokedex-detail-description d-flex align-items-center justify-content-center">
        <p className="pokedex-detail-description-text">{renderDescription()}</p>
      </div>

      <div className="pokemon-detail-footer d-flex align-items-center justify-content-between">
        <div className="pokemon-detail-close" onClick={() => navigate("/")}>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z" fill="currentColor" />
          </svg>
        </div>

        <div className="pokemon-detail-status d-flex align-items-center justify-content-start">
          {isUserConnected && trainer && !isSeen && !isCaught ? (
            <img
              src="/src/assets/img/UnknownPokeball.png"
              alt="Seen"
              className="action-image seen"
              onClick={() => handleMark(false)}
            />
          ) : null}
          {isUserConnected && trainer && isSeen && !isCaught ? (
            <img
              src="/src/assets/img/EmptyPokeball.png"
              alt="Captured"
              className="action-image captured"
              onClick={() => handleMark(true)}
            />
          ) : null}
          {isUserConnected && trainer && isSeen && isCaught && (
            <img
              src="/src/assets/img/pokeball.png"
              alt="Captured"
              className="action-image"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PokedexDetail;
