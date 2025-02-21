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
        <div className="pokemon-list-item d-flex align-items-center justify-content-between">
            <div className="pokemon-image-container d-flex align-items-center justify-content-center col-6">
                {pokemon.animatedGif ? (
                    <img
                        src={pokemon.animatedGif}
                        alt={pokemon.name}
                        style={{ filter: imageFilter }}
                        className="pokemon-image"
                        onClick={handleClick}
                    />
                ) : (
                    <img
                        src={pokemon.imagePath}
                        alt={pokemon.name}
                        style={{ filter: imageFilter }}
                        className="pokemon-image"
                        onClick={handleClick}
                    />
                )}
            </div>

            <div className="pokemon-container d-flex align-items-center justify-content-left col-6">
                <div className="pokemon-action-container d-flex align-items-center justify-content-center col-2">
                    {isUserConnected && isTrainerDefined && !isSeen && !isCatched ? (
                        <img
                            src="src/assets/img/UnknownPokeball.png"
                            alt="Seen"
                            className="action-image seen"
                            onClick={() => handleMark(false)}
                        />
                    ) : null}
                    {isUserConnected && isTrainerDefined && isSeen && !isCatched ? (
                        <img
                            src="src/assets/img/EmptyPokeball.png"
                            alt="Captured"
                            className="action-image captured"
                            onClick={() => handleMark(true)}
                        />
                    ) : null}
                    {isUserConnected && isTrainerDefined && isSeen && isCatched ? (
                        <img
                            src="src/assets/img/pokeball.png"
                            alt="Captured"
                            className="action-image"
                        />
                    ) : null}
                </div>

                <div className="pokemon-name-container col-10 text-start">
                    <h3 className="pokemon-name">{pokemonName}</h3>
                </div>
            </div>
        </div>
    );
}

export default PokemonListItem;
