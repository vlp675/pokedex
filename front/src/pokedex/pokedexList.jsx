import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemons } from "../api/pkmn";
import { getPokemonTypes } from "../api/pkmnType.js";
import PokemonListItem from "../composants/pokemonListItem";
import { checkUser } from "../api/user.js";
import { getTrainer, markPokemon } from "../api/trainer.js";

function PokedexList() {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || "");
    const [type1, setType1] = useState(localStorage.getItem("type1") || "");
    const [type2, setType2] = useState(localStorage.getItem("type2") || "");
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [isUserConnected, setIsUserConnected] = useState(null);
    const [trainer, setTrainer] = useState(null);

    useEffect(() => {
        verifyUser();

        if (isUserConnected) {
            fetchTrainer();
        }
        fetchPokemons();
        fetchPokemonTypes();

    }, [searchTerm, type1, type2, currentPage, isUserConnected]);

    async function fetchPokemons() {
        const data = await getPokemons(searchTerm, type1, type2, currentPage, 50);
        if (data) {
            setPokemons(data.pokemons);
            setMaxPages(data.totalPages);
        }
    }

    async function fetchPokemonTypes() {
        const data = await getPokemonTypes();
        if (data) {
            setPokemonTypes(data.data);
        }
    }

    async function fetchTrainer() {
        try {
            const data = await getTrainer();
            if (data?.trainer) {
                setTrainer(data.trainer);
            } else {
                setTrainer(null);
            }
        } catch {
            setTrainer(null);
        }
    }

    async function verifyUser() {
        const response = await checkUser();
        setIsUserConnected(response.isAuthenticated);
    }

    useEffect(() => {
        localStorage.setItem("searchTerm", searchTerm);
        localStorage.setItem("type1", type1);
        localStorage.setItem("type2", type2);

    }, [searchTerm, type1, type2]);

    const handleFilterSubmit = () => {
        setCurrentPage(1);
        fetchPokemons();
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setIsUserConnected(false);
        window.location.reload();
    };

    const handleMarkPokemon = (pokemonId, isCatched) => {
        markPokemon(pokemonId, isCatched).then(() => {
            fetchTrainer();
        });
    };

    return (
        <div>
            <h2>Super Pokédex</h2>
            <p>Bonjour</p>

            <nav>
                <ul style={{ listStyle: "none" }}>
                    {isUserConnected ? (
                        <>
                            <li><Link to="/user">Utilisateur</Link></li>
                            <li><Link to="/trainer">Entraîneur</Link></li>
                            <li><Link onClick={handleLogout}>Déconnexion</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Se connecter</Link></li>
                            <li><Link to="/register">S'inscrire</Link></li>
                        </>
                    )}
                </ul>
            </nav>

            <button onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
            </button>

            {showFilters && (
                <div style={{ marginTop: "10px", padding: "10px", border: "1px solid gray", borderRadius: "5px" }}>
                    <input
                        type="text"
                        placeholder="Rechercher un Pokémon"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />

                    <select value={type1} onChange={(e) => { setType1(e.target.value); setCurrentPage(1); }} style={{ marginRight: "10px" }}>
                        <option value="">Type 1</option>
                        {pokemonTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select value={type2} onChange={(e) => { setType2(e.target.value); setCurrentPage(1); }} style={{ marginRight: "10px" }}>
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

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                {pokemons.map((pokemon, index) => {
                    const isCatched = trainer && trainer.pkmnCatch.includes(pokemon._id);
                    const isSeen = trainer && trainer.pkmnSeen.includes(pokemon._id);
                    const isTrainerDefined = !!trainer;  

                    return (
                        <PokemonListItem
                            key={index}
                            pokemon={pokemon}
                            isUserConnected={isUserConnected}
                            isCatched={isCatched}
                            isSeen={isSeen}
                            onMarkPokemon={handleMarkPokemon}
                            isTrainerDefined={isTrainerDefined} 
                        />
                    );
                })}
            </div>

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Précédent
                </button>
                <span style={{ margin: "0 10px" }}>Page {currentPage} / {maxPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, maxPages))} disabled={currentPage >= maxPages}>
                    Suivant
                </button>
            </div>
        </div>
    );
}

export default PokedexList;
