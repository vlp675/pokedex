import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemon } from "../api/pkmn";
import { getTrainer } from "../api/trainer";
import PokemonTypeBadge from "../composants/pokemonTypeLabel";

function PokedexDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isSeen, setIsSeen] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const trainerData = await getTrainer();
      const seenList = trainerData?.trainer?.pkmnSeen || [];
      const caughtList = trainerData?.trainer?.pkmnCatch || [];
      
      setIsSeen(seenList.includes(id));
      setIsCaught(caughtList.includes(id));
      
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

  const imageFilter = isSeen || isCaught ? "none" : "brightness(0)";

  return (
    <>
      <div onClick={handleClick}>
        <p>Bonjour</p>
        <h3>{isSeen || isCaught ? pokemon?.name : "?????"}</h3>
        {pokemon && (
          <img 
            src={pokemon.animatedGif || pokemon.imagePath} 
            alt={isCaught ? pokemon.name : "?????"} 
            width="100" 
            style={{ filter: imageFilter }}
          />
        )}
        <div>
          <b>Types: </b>
          {isSeen && pokemon?.types ? (
            pokemon.types.map((type, index) => <PokemonTypeBadge key={index} type={type} />)
          ) : (
            <span>?????</span>
          )}
        </div>
        <p>{isCaught ? pokemon?.description : "?????"}</p>
        <p><b>Height: </b>{isCaught ? pokemon?.height / 10 + "m" : "?????"}</p>
        <p><b>Weight: </b>{isCaught ? pokemon?.weight / 10 + "kg" : "?????"}</p>
      </div>

      <div>
        <b>Régions: </b>
        <p>
          {isCaught && pokemon?.regions ? (
            pokemon.regions.map((region, index) => <span key={index}>{region.regionName} </span>)
          ) : (
            "?????"
          )}
        </p>
      </div>

      {isCaught && pokemon?.soundPath && (
        <audio ref={audioRef} src={pokemon.soundPath} preload="auto" />
      )}

      <button onClick={() => navigate("/")}>Retour à la liste</button>
    </>
  );
}

export default PokedexDetail;