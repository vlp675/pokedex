import { useNavigate } from "react-router-dom"; 

function PokemonListItem({ pokemon }) {
    const navigate = useNavigate();  

    const handleClick = () => {
        navigate(`/pokemon-detail/${pokemon._id}`);  
    };

    return (
        <div 
            style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}
            onClick={handleClick}  
        >
            <h3>{pokemon.name}</h3>
            {pokemon.animatedGif ? (
                <img src={pokemon.animatedGif} alt={pokemon.name} width="100" />
            ) : (
                <img src={pokemon.imagePath} alt={pokemon.name} width="100" />
            )}
        </div>
    );
}

export default PokemonListItem;
