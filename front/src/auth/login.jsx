import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/jwt";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const response = await login(email, password);

        if (response && response.token) {
            navigate("/");
        } else {
            setErrorMessage(response?.message || "Échec de connexion, vérifiez vos identifiants.");
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit">Se connecter</button>
                <Link to="/">Retourner à la liste</Link>
            </form>
        </div>
    );
}

export default Login;
