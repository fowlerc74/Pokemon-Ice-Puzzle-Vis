import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Graph from './Components/graphwindow';
import PuzzleWindow from './Components/puzzlewindow';
import Puzzle from './Puzzle';

function App() {

    let puzzle = useMemo(() => new Puzzle(16, 14), []);
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

    // const testplayer = [6,11];
    // console.log(testplayer, puzzle.move(testplayer, -1, 0), 'up')
    // console.log(testplayer, puzzle.move(testplayer, 1, 0), 'down')
    // console.log(testplayer, puzzle.move(testplayer, 0, -1), 'left')
    // console.log(testplayer, puzzle.move(testplayer, 0, 1), 'right')

    return (
        <div className="App">
            <PuzzleWindow puzzle={puzzle} player={player}/>
            <Graph puzzle={puzzle}/>
            {/* {player}
            <br />
            {key} */}
        </div>
    );
}

export default App;
