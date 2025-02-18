import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Bonjour</h2>
      <nav>
        <ul>
          <li><Link to="/user">Page Utilisateur</Link></li>
          <li><Link to="/trainer">Page Entraîneur</Link></li>
          <li><Link to="/pokedex-list">Liste du Pokédex</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
