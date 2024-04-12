import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PokemonMoves() {
    const { id } = useParams();
    const [selectedMove, setSelectedMove] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/move/${id}`)
            .then(response => response.json())
            .then(data => setSelectedMove(data));
    }, [id]);

    const goToPrevMove = () => {
        if (id > 1) {
            navigate(`/move/${parseInt(id) - 1}`);
        }
    };

    const goToNextMove = () => {
        if (id < 919) {
            navigate(`/move/${parseInt(id) + 1}`);
        }
    };

    return (
        <div className={`main-container type-${selectedMove?.type?.name}`}>
            <div className="centered-container">
                <div className="navigation">
                    <button className="pageButton" onClick={goToPrevMove} disabled={!selectedMove || selectedMove.id===1}>Previous Move</button>
                    <div>
                        <div className={`box damage-${selectedMove?.damage_class?.name}`}>
                            <MoveName name={selectedMove?.name} />
                            <MoveType type={selectedMove?.type?.name} />
                            <MoveDamageClass damageClass={selectedMove?.damage_class?.name} />
                        </div>
                    </div>
                    <button className="pageButton" onClick={goToNextMove} disabled={!selectedMove || selectedMove.id===919}>Next Move</button>
                </div>
            </div>
            <div className={`box damage-${selectedMove?.damage_class?.name}`}>
                <MoveAccuracy accuracy={selectedMove?.accuracy} />
                <MovePower power={selectedMove?.power} />
                <MovePP pp={selectedMove?.pp} />
                <MovePriority priority={selectedMove?.priority} />
                <MoveEffect effect={selectedMove?.effect_entries[0]?.effect} />
            </div>
        </div>
    )
}

function MoveName({ name }) {
    return (
        <h1>{name}</h1>
    )
}

function MoveType({ type }) {
    return (
        <p>Type: {type}</p>
    )
}

function MoveAccuracy({ accuracy }) {
    return (
        <p>Accuracy: {accuracy}</p>
    )
}

function MoveDamageClass({ damageClass }) {
    return (
        <p>Damage Class: {damageClass}</p>
    )
}

function MoveEffect({ effect }) {
    return (
        <p>Effect: {effect}</p>
    )
}

function MovePower({ power }) {
    return (
        <p>Power: {power}</p>
    )
}

function MovePP({ pp }) {
    return (
        <p>PP: {pp}</p>
    )
}

function MovePriority({ priority }) {
    return (
        <p>Priority: {priority}</p>
    )
}

