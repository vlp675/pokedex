import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PokemonListItem({ pokemon, isUserConnected, isCatched, isSeen, onMarkPokemon, isTrainerDefined }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/pokemon-detail/${pokemon._id}`);
    };

    const pokemonName = isUserConnected && isTrainerDefined ? (isCatched ? pokemon.name : isSeen ? pokemon.name : "?????") : pokemon.name;

    const imageFilter = isUserConnected && !isSeen ? "brightness(0)" : "none";

    const handleMark = (isCatched) => {
        onMarkPokemon(pokemon._id, isCatched);
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            <h3>{pokemonName}</h3>
            {pokemon.animatedGif ? (
                <img
                    src={pokemon.animatedGif}
                    alt={pokemon.name}
                    width="100"
                    style={{ filter: imageFilter }}
                    onClick={handleClick}
                />
            ) : (
                <img
                    src={pokemon.imagePath}
                    alt={pokemon.name}
                    width="100"
                    style={{ filter: imageFilter }}
                    onClick={handleClick}
                />
            )}

            {isUserConnected && isTrainerDefined && !isSeen && !isCatched ? (
                <button onClick={() => handleMark(false)}>Seen</button>
            ) : null}
            {isUserConnected && isTrainerDefined && isSeen && !isCatched ? (
                <button onClick={() => handleMark(true)}>Captured</button>
            ) : null}

        </div>
    );
}

export default PokemonListItem;
