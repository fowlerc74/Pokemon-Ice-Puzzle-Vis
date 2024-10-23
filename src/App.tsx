import React, { useEffect, useState } from 'react';
import './App.css';
import Graph from './Components/graph';
import PuzzleWindow from './Components/puzzlewindow';
import Puzzle from './Puzzle';

export interface Tile {
    rock: boolean,
    start: boolean,
    end: boolean,
    slidable: boolean
}

function App() {

    let puzzle = new Puzzle(16, 14);
    const [player, setPlayer] = useState(puzzle.getStart());
    const [key, setKey] = useState("");

    useEffect(() => {
        function onKeyPress(e: { preventDefault: () => void; key: string; }) {
            e.preventDefault();
            const key = e.key.toLowerCase();
            setKey(key);

            if (key === "w" || key === "arrowup") {
                movePlayer(-1, 0);
            } else if (key === "a" || key === "arrowleft") {
                movePlayer(0, -1);
            } else if (key === "s" || key === "arrowdown") {
                movePlayer(1, 0);
            } else if (key === "d" || key === "arrowright") {
                movePlayer(0, 1);
            } 
        }

        function movePlayer(y: number, x: number) {
            let newPos = puzzle.move(player, y, x);
            console.log(newPos);
            setPlayer(newPos);
        }

        window.addEventListener('keydown', onKeyPress);

        return () => {
            window.removeEventListener('keydown', onKeyPress);
        }
    }, [player, puzzle]);

    // document.addEventListener('keydown', function(event) {
    //     if (event.key === "w" || event.key === "ArrowUp") {
    //         movePlayer(-1, 0);
    //     } else if (event.key === "a" || event.key === "ArrowLeft") {
    //         movePlayer(0, -1);
    //     } else if (event.key === "s" || event.key === "ArrowDown") {
    //         movePlayer(1, 0);
    //     } else if (event.key === "d" || event.key === "ArrowRight") {
    //         movePlayer(0, 1);
    //     } 
    // })    

    return (
        <div className="App">
            <PuzzleWindow puzzle={puzzle} player={player}/>
            <Graph puzzle={puzzle} player={player}/>
            {/* {player}
            <br />
            {key} */}
        </div>
    );
}

export default App;
