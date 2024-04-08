import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then(response => response.json())
			.then(data => setPokemon(data));
	}, [id]);

	if (!pokemon) return <div>Loading...</div>;

	return (
		<div className="container">
			<h1>{pokemon.name}</h1>
			<img src={pokemon.sprites.front_default} alt={pokemon.name} />
			<p>Height: {pokemon.height}</p>
			<p>Weight: {pokemon.weight}</p>
			<p>Base experience: {pokemon.base_experience}</p>
			<div className="boxes">
				<div className="box">
					<h2>Abilities</h2>
					<ul>
						{pokemon.abilities.map((ability, index) => (
							<li key={index}>{ability.ability.name}</li>
						))}
					</ul>
				</div>
			</div>
			<div className="boxes">
				<div className="box">
					<h2>Stats</h2>
					<ul>
						{pokemon.stats.map((stat, index) => (
							<li key={index}>
								{stat.stat.name}: {stat.base_stat}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="boxes">
				<div className="box">
					<h2>Moves</h2>
					<ul>
						{pokemon.moves.map((move, index) => (
							<li key={index}>{move.move.name}</li>
						))}
					</ul>
				</div>
			</div>
			<div className="boxes">
				<div className="box">
					<h2>Types</h2>
					<ul>
						{pokemon.types.map((type, index) => (
							<li key={index}>{type.type.name}</li>
						))}
					</ul>
				</div>
			</div>
			<div className="boxes">
				<div className="box">
					<h2>Forms</h2>
					<ul>
						{pokemon.forms.map((form, index) => (
							<li key={index}>{form.name}</li>
						))}
					</ul>
				</div>
			</div>
			<div className="boxes">
				<div className="box">
					<h2>Species</h2>
					<ul>
						<li>{pokemon.species.name}</li>
					</ul>
				</div>
			</div>
			<div className="boxes">
				<div className="box">
					<h2>Sprites</h2>
					<ul>
					{pokemon.sprites && <img src={pokemon.sprites.front_default} alt="front_default" />}
					{pokemon.sprites && <img src={pokemon.sprites.back_default} alt="back_default" />}
					{pokemon.sprites && <img src={pokemon.sprites.front_shiny} alt="front_shiny" />}
					{pokemon.sprites && <img src={pokemon.sprites.back_shiny} alt="back_shiny" />}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default PokemonDetails;