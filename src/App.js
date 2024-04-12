import './App.css';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import About from './About';
import Home from './Home';
import PokemonDetails from './PokemonDetails';
import PokemonMoves from './PokemonMoves';
import AllPokemonMoves from './AllPokemonMoves';


export default function App() {
   return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="/move/:id" element={<PokemonMoves />} />
          <Route path="/allMoves" element={<AllPokemonMoves />} />
        </Routes>
      </div>
    </Router>
  )
}


function NavBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(searchTerm)) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
          const id = data.id;
          navigate(`/pokemon/${id}`);
          setSearchTerm('');
        })
        .catch(() => {
          alert('Pokemon not found');
        });
    } else {
      navigate(`/pokemon/${searchTerm}`);
      setSearchTerm('');
    }
  }

  return (
    <nav>
      <ul>
        <li><Link to="/">Pokédex</Link></li>
        <li><Link to="/pokemon/1">Pokémon Details</Link></li>
        <li><Link to="/allMoves">Pokemon Moves</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search Pokémon" 
        value={searchTerm} 
        onChange={event => setSearchTerm(event.target.value)} 
      />
      <button type="submit">Search</button>
      </form>
    </nav>
  );
}