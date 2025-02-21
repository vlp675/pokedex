import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

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
        <>
            <div className="pokedex-list-container d-flex justify-content-center align-items-center">
                <div className="pokedex-list">
                    <div className="pokedex-decoration-list d-flex justify-content-center align-items-center">
                        <div className="pokedex-decoration-container-point-list d-flex justify-content-center align-items-center">
                            <img src="src/assets/img/pointDecoration.svg" alt="Pokedex Decoration" className="img-header" />
                        </div>
                        <div className="pokedex-decoration-container-point-list d-flex justify-content-center align-items-center">
                            <img src="src/assets/img/pointDecoration.svg" alt="Pokedex Decoration" className="img-header" />
                        </div>
                    </div>

                    <div className="pokedex-pokemons-list">
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

                    <div className="pokedex-footer-list d-flex justify-content-between align-items-center">
                        <div className="pokedex-pagination d-flex justify-content-center align-items-center">
                            <button className="d-flex justify-content-around align-items-center" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M20 11v2H8v2H6v-2H4v-2h2V9h2v2h12zM10 7H8v2h2V7zm0 0h2V5h-2v2zm0 10H8v-2h2v2zm0 0h2v2h-2v-2z" fill="currentColor" /> </svg>
                            </button>
                            <button className="d-flex justify-content-around align-items-center" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, maxPages))} disabled={currentPage >= maxPages}>
                                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z" fill="currentColor" /> </svg>
                            </button>
                        </div>

                        <button className="pokedex-filter" onClick={() => setShowFilters(!showFilters)}>
                            Afficher les filtres
                        </button>
                    </div>
                </div>
            </div>

            {showFilters && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="popup-header">
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setShowFilters(false)} viewBox="0 0 24 24">
                                <path d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z" fill="currentColor" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher un Pokémon"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select value={type1} onChange={(e) => { setType1(e.target.value); setCurrentPage(1); }}>
                            <option value="">Type 1</option>
                            {pokemonTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <select value={type2} onChange={(e) => { setType2(e.target.value); setCurrentPage(1); }}>
                            <option value="">Type 2</option>
                            {pokemonTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => {
                                handleFilterSubmit();
                                setShowFilters(false);
                            }}
                        >
                            Appliquer les filtres
                        </button>
                    </div>
                </div>
            )}

            <nav className="pokedex-navbar">
                <ul>
                    {isUserConnected ? (
                        <>
                            <li
                                className="d-flex justify-content-center align-items-center"
                                onClick={() => navigate("/user")}
                            >
                                Utilisateur
                            </li>
                            <li
                                className="d-flex justify-content-center align-items-center"
                                onClick={() => navigate("/trainer")}
                            >
                                Entraîneur
                            </li>
                            <li
                                className="d-flex justify-content-center align-items-center"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </li>
                        </>
                    ) : (
                        <>
                            <li
                                className="d-flex justify-content-center align-items-center"
                                onClick={() => navigate("/login")}
                            >
                                Se connecter
                            </li>
                            <li
                                className="d-flex justify-content-center align-items-center"
                                onClick={() => navigate("/register")}
                            >
                                S'inscrire
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default PokedexList;
