import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../api/user";
import { login } from "../api/jwt";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const response = await addUser(userName, email, password);

    console.log(response)
    if (response && response.success) {
      const loginResponse = await login(email, password);

      if (loginResponse && loginResponse.token) {
        localStorage.setItem("jwt", loginResponse.token);
        navigate("/");
      } else {
        setErrorMessage(loginResponse?.message || "Erreur lors de la connexion.");
      }
    } else {
      setErrorMessage(response?.message || "Échec de l'inscription, réessayez.");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Nom d'utilisateur :</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">S'inscrire</button>
        <Link to="/">Retourner à la liste</Link>
      </form>
    </div>
  );
}

export default Register;
