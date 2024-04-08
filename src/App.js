import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import About from './About';
import Home from './Home';
import PokemonDetails from './PokemonDetails';


export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to= "/">Home</Link></li>
            <li><Link to= "/about">About</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  )
}