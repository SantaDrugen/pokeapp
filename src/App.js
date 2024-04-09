import './App.css';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import About from './About';
import Home from './Home';
import PokemonDetails from './PokemonDetails';


export default function App() {
   return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
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
        })
        .catch(() => {
          alert('Pokemon not found');
        });
    } else {
      navigate(`/pokemon/${searchTerm}`);
    }
  }

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
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