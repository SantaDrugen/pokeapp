import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PokemonDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [pokemon, setPokemon] = useState(null);
	const audioRef = useRef(null);

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

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then(response => response.json())
			.then(data => setPokemon(data));
	}, [id]);

	useEffect(() => {
		if (pokemon) {
			audioRef.current.load();
		}
	}, [pokemon]);

	const goToPrevPokemon = () => {
		if (id > 1) {
			navigate(`/pokemon/${parseInt(id) - 1}`);
		}
	};

	const goToNextPokemon = () => {
		if (id < 1025) {
			navigate(`/pokemon/${parseInt(id) + 1}`);
		}
	};

	const playSound = () => {
		audioRef.current.play();
	}

	const type1Colour = typeColours[pokemon.types[0].type.name];
	const type2Colour = pokemon.types[1] ? typeColours[pokemon.types[1].type.name] : type1Colour;
	const gradient = `linear-gradient(to right, ${type1Colour}, ${type2Colour})`;

	if (!pokemon) return <div>Loading...</div>;

	return (
		<div className="main-container" style={{background: gradient}}>
			<div className="centered-container">
				<h1>{pokemon.name}</h1>
				<div className="navigation">
					<button onClick={goToPrevPokemon} class="pageButton">Previous</button>
					<img src={pokemon.sprites.front_default} alt={pokemon.name} />
					<button onClick={goToNextPokemon} class="pageButton">Next</button>
				</div>
				<button onClick={playSound}>Play cry</button>
				<audio ref={audioRef} src={pokemon.cries.latest} />
				<PokemonMeasurements weight={pokemon.weight} height={pokemon.height} base_experience={pokemon.base_experience} />
			</div>
			<div className="top-container">
				<div className="boxes">
					<PokemonAttributes abilities={pokemon.abilities} stats={pokemon.stats} />
				</div>
				<div className="boxes">
					<PokemonMoves moves={pokemon.moves} />
				</div>
				<div className="boxes">
					<PokemonBiology species={pokemon.species.name} forms={pokemon.forms.map(form => form.name)} types={pokemon.types.map(type => type.type.name)} />
				</div>
			</div>
			<div className="bottom-container">
				<div className="boxes">
					<PokemonSprites sprites={pokemon.sprites} />
				</div>
			</div>
		</div>
	);
}

function PokemonMeasurements({ height, weight, base_experience }) {
	return (
		<div className="details">
			<h2>Measurements</h2>
			<p>Height: {height}</p>
			<p>Weight: {weight}</p>
			<p>Base experience: {base_experience}</p>
		</div>
	);
}

function PokemonAttributes({ abilities, stats }) {
	return (
		<div className="box">
			<h2>Stats</h2>
			<ul>
				{stats.map((stat, index) => (
					<li key={index}>
						{stat.stat.name}: {stat.base_stat}
					</li>
				))}
			</ul>
			<h2>Abilities</h2>
			<ul>
				{abilities.map((ability, index) => (
					<li key={index}>{ability.ability.name}</li>
				))}
			</ul>
		</div>
	);
}

function PokemonMoves({ moves }) {
	const [currentPage, setCurrentPage] = useState(1);
	const movesPerPage = 10;

	const indexOfLastMove = currentPage * movesPerPage;
	const indexOfFirstMove = indexOfLastMove - movesPerPage;

	const currentMoves = moves.slice(indexOfFirstMove, indexOfLastMove);

	const totalPages = Math.ceil(moves.length / movesPerPage);

	return (
		<div className="box">
			<h2>Moves</h2>
			<ul>
				{currentMoves.map((move, index) => (
					<li key={index}>{move.move.name}</li>
				))}
			</ul>
			<button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
			<button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
		</div>
	);
}

function PokemonBiology({ species, forms, types }) {
	return (
		<div className="box">
			<h2>Species</h2>
			<ul>
				<li>{species}</li>
			</ul>
			<h2>Forms</h2>
			<ul>
				{forms.map((form, index) => (
					<li key={index}>{form}</li>
				))}
			</ul>
			<h2>Types</h2>
			<ul>
				{types.map((type, index) => (
					<li key={index}>{type}</li>
				))}
			</ul>
		</div>
	);
}

function PokemonSprites({ sprites }) {
	return (
		<div className="box">
			<h2>Sprites</h2>
			<ul>
				{Object.entries(sprites)
					.slice(0, -2) //seems like the last two sprites of a lot of the pokémon are bad
					.map(([key, value]) => {
						if (value) {
							return <img key={key} src={value} alt={key} />;
						}
						return null;
					})}
			</ul>
		</div>
	);
}


export default PokemonDetails;