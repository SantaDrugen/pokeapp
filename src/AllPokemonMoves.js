import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AllPokemonMoves() {
    const [currentPage, setCurrentPage] = useState(0);
    const [moves, setMoves] = useState([]);
    const [selectedMove, setSelectedMove] = useState(null);

    useEffect(() => {
        fetchMoves(currentPage);
    }, [currentPage])

    const fetchMoves = async (page) => {
        const response = await fetch(`https://pokeapi.co/api/v2/move?limit=20&offset=${page * 20}`);
        const data = await response.json();

        if (page === 45) {
            data.results = data.results.slice(0, 19);
        }

        const detailedMoves = await Promise.all(data.results.map(async (move) => {
            const response = await fetch(move.url);
            const detailedMove = await response.json();
            return detailedMove;
        }));

        setMoves(detailedMoves);
    }

    const prevPage = () => {
        setCurrentPage(oldPage => Math.max(oldPage - 1, 0))
    }

    const nextPage = () => {
        setCurrentPage(oldPage => oldPage + 1)
    }

    const selectPage = (page) => {
        setCurrentPage(page)
    }

    const totalPages = Math.ceil(919 / 20)

    return (
            <div className="table-container">
                {moves.length && <MovesTable moves={moves} />}
                <div className="pagination">
                    <Pagination totalPages={totalPages} selectPage={selectPage} currentPage={currentPage} prevPage={prevPage} nextPage={nextPage} />
                </div>
            </div> 
    );
}


function MovesTable({ moves }) {
    console.log(moves[0].power)
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Power</th>
                    <th>PP</th>
                    <th>Accuracy</th>
                </tr>
            </thead>
            <tbody>
                {moves.map(move => (
                    <tr key={move.id}>
                        <td><Link to={`/move/${move.id}`}>{move.name}</Link></td>
                        <td>{move.type ? move.type.name : 'N/A'}</td>
                        <td>{move.power || 'N/A'}</td>
                        <td>{move.pp || 'N/A'}</td>
                        <td>{move.accuracy || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
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

function PrevButton({ onClick, currentPage }) {
    return (
        <button onClick={onClick} disabled={currentPage === 0}>Previous</button>
    )
}

function NextButton({ onClick, currentPage, totalPages }) {
    return (
        <button onClick={onClick} disabled={currentPage === totalPages - 1}>Next</button>
    )
}

