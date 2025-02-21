import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/jwt";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const response = await login(email, password);

        if (response && response.token) {
            onLogin(); // Call the onLogin function to update the state in App
            navigate("/");
        } else {
            setErrorMessage(response?.message || "Échec de connexion, vérifiez vos identifiants.");
        }
    };

    return (
        <div className="login-container">
            <h2>Pokedex</h2>
            <form onSubmit={handleSubmit} >
                <div className="d-flex flex-column align-items-start">
                    <div>
                        <label htmlFor="email">Email :</label> <br />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe :</label> <br />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Se connecter</button>
                <Link to="/">Retourner à la liste</Link>
            </form>
        </div>
    );
}

export default Login;
