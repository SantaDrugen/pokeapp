import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pokémon, setPokémon] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentPage * 20}`)
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map(result => {
          return fetch(result.url)
            .then(response => response.json())
        })

        Promise.all(promises)
          .then(pokémon => setPokémon(pokémon))
      })
  }, [currentPage])

  const prevPage = () => {
    setCurrentPage(oldPage => Math.max(oldPage - 1, 0))
  }

  const nextPage = () => {
    setCurrentPage(oldPage => oldPage + 1)
  }

  const totalPages = Math.ceil(1025 / 20)

  const selectPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <PokédexTable pokémon={pokémon} />
      <div className="pagination">
        <Pagination totalPages={totalPages} selectPage={selectPage} currentPage={currentPage} prevPage={prevPage} nextPage={nextPage} />
      </div>
    </div>
  );
}


function Pagination({ totalPages, selectPage, currentPage, prevPage, nextPage }) {
  const pages = []
  for (let i = 0; i < totalPages; i++) {
    if (i === 0 || i === totalPages - 1 || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(
        <button key={i} onClick={() => selectPage(i)} className={currentPage === i ? 'active' : ''}>
          {i + 1}
        </button>
      )
    } else if (i === 1 || i === currentPage - 3 || i === currentPage + 3 || i === totalPages - 2) {
      pages.push(
        <span key={i}>...</span>
      )
    }
  }
  return (
    <div>
      <PrevButton onClick={prevPage} currentPage={currentPage} />
      {pages}
      <NextButton onClick={nextPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}


function PokédexTable({ pokémon }) {
  const rows = pokémon.map(pokémon => <PokémonCard key={pokémon.id} pokémon={pokémon} />);
  return <div className="pokedex-table"> {rows} </div>
}


function PokémonCard({ pokémon }) {
  const [showDetails, setShowDetails] = useState(false);
  const typeColours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  }

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  if (pokémon.is_default === false) return null;

  const type1Colour = typeColours[pokémon.types[0].type.name];
  const type2Colour = pokémon.types[1] ? typeColours[pokémon.types[1].type.name] : type1Colour;
  const gradient = `linear-gradient(to right, ${type1Colour}, ${type2Colour})`;

  return (
    <div onClick={handleClick} className="pokemon-card" style={{ background: gradient }}>
      <div> {pokémon.id} </div>
      <div> {pokémon.name} </div>
      <img src={pokémon.sprites.front_default} alt={pokémon.name} />
      {showDetails && (
        <>
          <div> height: {pokémon.height} </div>
          <div> weight: {pokémon.weight} </div>
          {pokémon.types.map((type, index) => (
            <div key={index}> type {index + 1}: {type.type.name}</div>
          ))}
          <div>Abilities: {pokémon.abilities.map(ability => ability.ability.name).join(', ')}</div>
          {pokémon.stats.map((stat, index) => (
            <div key={index}> {stat.stat.name}: {stat.base_stat} </div>
          ))}
          <Link to={`/pokemon/${pokémon.id}`}>View Details</Link>
        </>
      )}
    </div>
  );
}


function PrevButton({ onClick, currentPage }) {
  return <button onClick={onClick} disabled={currentPage === 0}>Previous</button>
}

function NextButton({ onClick, currentPage, totalPages }) {
  return <button onClick={onClick} disabled={currentPage === totalPages - 1}>Next</button>
}
