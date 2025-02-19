import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemon } from "../api/pkmn";
import PokemonTypeBadge from "../composants/pokemonTypeLabel";

function PokedexDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemon(id);
      if (data) {
        setPokemon(data.pokemon);
      }
    }

    fetchData();
  }, [id]);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <div onClick={handleClick}>
        <p>Bonjour</p>
        <h3>{pokemon.name}</h3>
        {pokemon.animatedGif ? (
          <img src={pokemon.animatedGif} alt={pokemon.name} width="100" />
        ) : (
          <img src={pokemon.imagePath} alt={pokemon.name} width="100" />
        )}
        <div>
          <b>Types: </b>
          {pokemon.types && pokemon.types.map((type, index) => (
            <PokemonTypeBadge key={index} type={type} />
          ))}
        </div>
        <p>{pokemon.description}</p>
        <p><b>Height: </b>{pokemon.height/10}m</p>
        <p><b>Weight: </b>{pokemon.weight/10}kg</p>
      </div>

      <div>
        <b>Régions: </b>
        <p>{pokemon.regions && pokemon.regions.map((region, index) => (
          <span key={index}>{region.regionName} </span>
        ))}
        </p>
      </div>

      {pokemon.soundPath && (
        <audio ref={audioRef} src={pokemon.soundPath} preload="auto" />
      )}

      <button onClick={() => navigate("/")}>Retour à la liste</button>
    </>
  );
}

export default PokedexDetail;
