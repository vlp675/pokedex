import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemons } from "../api/pkmn";
import { getPokemonTypes } from "../api/pkmnType.js";
import PokemonListItem from "../composants/pokemonListItem";

function PokedexList() {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || ""); // Charger depuis localStorage
    const [type1, setType1] = useState(localStorage.getItem("type1") || "");
    const [type2, setType2] = useState(localStorage.getItem("type2") || "");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPokemons();
        fetchPokemonTypes();
    }, [searchTerm, type1, type2]);

    async function fetchPokemons() {
        const data = await getPokemons(searchTerm, type1, type2, 1, 50);
        if (data) {
            setPokemons(data);
        }
    }

    async function fetchPokemonTypes() {
        const data = await getPokemonTypes();
        if (data) {
            setPokemonTypes(data.data);
        }
    }

    useEffect(() => {
        localStorage.setItem("searchTerm", searchTerm);
        localStorage.setItem("type1", type1);
        localStorage.setItem("type2", type2);
    }, [searchTerm, type1, type2]);

    const handleFilterSubmit = () => {
        fetchPokemons();
    };

    return (
        <div>
            <h2>Liste des Pokémons</h2>
            <p>Bonjour</p>

            {/* Bouton pour afficher/masquer le menu de filtres */}
            <button onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
            </button>

            {/* Menu déroulant des filtres */}
            {showFilters && (
                <div style={{ marginTop: "10px", padding: "10px", border: "1px solid gray", borderRadius: "5px" }}>
                    <input
                        type="text"
                        placeholder="Rechercher un Pokémon"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />

                    <select value={type1} onChange={(e) => setType1(e.target.value)} style={{ marginRight: "10px" }}>
                        <option value="">Type 1</option>
                        {pokemonTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select value={type2} onChange={(e) => setType2(e.target.value)} style={{ marginRight: "10px" }}>
                        <option value="">Type 2</option>
                        {pokemonTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleFilterSubmit}>Appliquer les filtres</button>
                </div>
            )}

            {/* Liste des Pokémon */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                {pokemons.map((pokemon, index) => (
                    <PokemonListItem key={index} pokemon={pokemon} />
                ))}
            </div>

            {/* Bouton de retour au Dashboard */}
            <button onClick={() => navigate("/dashboard")} style={{ marginTop: "10px" }}>
                Retour au Dashboard
            </button>
        </div>
    );
}

export default PokedexList;
