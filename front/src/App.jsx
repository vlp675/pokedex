import Login from './auth/login.jsx';
import Register from './auth/register.jsx';
import Middleware from './middleware/middleware.jsx';
import User from './pokedex/user.jsx';
import Trainer from './pokedex/trainer.jsx';
import PokedexList from './pokedex/pokedexList.jsx';
import PokedexDetail from './pokedex/pokedexDetail.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className='header'>
        <img src="/src/assets/img/headerPokedex.svg" alt="Pokedex Header" className="img-header" />
      </div>

      <div className='pokedex'>
        <Router>
          <Routes>
            <Route path='/' element={<PokedexList />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user' element={<Middleware><User /></Middleware>} />
            <Route path='/trainer' element={<Middleware><Trainer /></Middleware>} />
            <Route path='/pokemon-detail/:id' element={<Middleware><PokedexDetail /></Middleware>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
