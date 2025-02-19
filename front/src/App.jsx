import './App.css'
import Login from './auth/login.jsx'
import Register from './auth/register.jsx'
import Middleware from './middleware/middleware.jsx'
import User from './pokedex/user.jsx'
import Trainer from './pokedex/trainer.jsx'
import PokedexList from './pokedex/pokedexList.jsx'
import PokedexDetail from './pokedex/pokedexDetail.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Home avec la liste des pokémons */}
          <Route path='/' element={
            <Middleware>
              <PokedexList />
            </Middleware>} />

          {/* Login */}
          <Route path='/login' element={<Login />} />

          {/* Register */}
          <Route path='/register' element={<Register />} />

          {/* User */}
          <Route path='/user' element={
            <Middleware>
              <User />
            </Middleware>
          } />

          {/* Trainer */}
          <Route path='/trainer' element={
            <Middleware>
              <Trainer />
            </Middleware>
          } />

          {/* Pokedex Detail */}
          <Route path='/pokemon-detail/:id' element={
            <Middleware>
              <PokedexDetail />
            </Middleware>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
