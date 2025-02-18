import './App.css'
import Login from './auth/login.jsx'
import Register from './auth/register.jsx'
import Middleware from './middleware/middleware.jsx'
import Dashboard from './pokedex/dashboard.jsx'
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
          {/* Login */}
          <Route path='/' element={<Login />} />

          {/* Register */}
          <Route path='/register' element={<Register />} />

          {/* Dashboard */}
          <Route path='/dashboard' element={
            <Middleware>
              <Dashboard />
            </Middleware>
          } />

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

          {/* Pokedex List */}
          <Route path='/pokedex-list' element={
            <Middleware>
              <PokedexList />
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
