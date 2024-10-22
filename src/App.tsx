import React, { useEffect, useState } from 'react';
import './App.css';
import Graph from './Components/graph';
import Puzzle from './Components/puzzle';

export interface Tile {
    rock: boolean,
    start: boolean,
    end: boolean,
    slidable: boolean,
    hasPlayer: boolean,
    TESTINGnum: number
}

function App() {

    const puzzleWidth = 16;
    const puzzleHeight = 14;
    // Coordinates are (y, x) from top left
    // const start = [5, 5];
    const start = [13, 14];
    const end = [[7, 15], [8, 15]];
    const rocks = [
        [1, 9],
        [2, 4],
        [3, 10],
        [4, 2],
        [5, 1],
        [5, 9],
        [6, 14],
        [7, 7],
        [8, 3],
        [9, 14],
        [10, 8],
        [11, 6],
        [11, 10]
    ]

    let puzzle: Tile[][] = [];
    let counter: number = 0;
    // let player: number[] = [13, 14];
    const [player, setPlayer] = useState(start);

    for (let i = 0; i < puzzleHeight; i++) {
        puzzle[i] = [];
        for (let j = 0; j < puzzleWidth; j++) {
            puzzle[i][j] = {
                rock: false,
                start: false,
                end: false,
                slidable: true,
                hasPlayer: false,
                TESTINGnum: counter
            };
            counter++;
        }
    }

    for (let i = 0; i < puzzleWidth; i++) {
        puzzle[0][i].rock = true;
        puzzle[puzzleHeight - 1][i].rock = true;
    }
    for (let i = 0; i < puzzleHeight; i++) {
        puzzle[i][0].rock = true;
        puzzle[i][puzzleWidth - 1].rock = true;
    }

    puzzle[start[0]][start[1]].start = true;
    // puzzle[start[0]][start[1]].slidable = false;
    puzzle[start[0]][start[1]].hasPlayer = true;
    puzzle[start[0]][start[1]].rock = false;

    for (let endTile of end) {
        puzzle[endTile[0]][endTile[1]].end = true;
        puzzle[endTile[0]][endTile[1]].slidable = false;
        puzzle[endTile[0]][endTile[1]].rock = false;
    }

    for (let rockTile of rocks) {
        puzzle[rockTile[0]][rockTile[1]].rock = true;
    }

    const [key, setKey] = useState("No key");

    document.addEventListener('keydown', function(event) {
        if (event.key === "w" || event.key === "ArrowUp") {
            setKey("up");
            move(-1, 0);
        } else if (event.key === "a" || event.key === "ArrowLeft") {
            setKey("left");
            move(0, -1);
        } else if (event.key === "s" || event.key === "ArrowDown") {
            setKey("down");
            move(1, 0);
        } else if (event.key === "d" || event.key === "ArrowRight") {
            setKey("right");
            move(0, 1);
        }
    })

    function move(vertical: number, horizontal: number) {
        try {
            let tempPlayer = player;
            while ( puzzle[tempPlayer[0]][tempPlayer[1]].slidable &&
                    !puzzle[tempPlayer[0] + vertical][tempPlayer[1] + horizontal].rock) {
                tempPlayer[0] += vertical;
                tempPlayer[1] += horizontal;
            }
            puzzle[player[0]][player[1]].hasPlayer = false;
            setPlayer(tempPlayer);
            puzzle[tempPlayer[0]][tempPlayer[1]].hasPlayer = true;
        } catch {
            console.error('ERROR: Out of Bounds Error');
        }
    }

    function checkPlayerLocation() {
        let playerLocations: number[][] = [];
        let playerFound: boolean = false;
        for (let i = 0; i < puzzleHeight; i++) {
            for (let j = 0; j < puzzleWidth; j++) {
                if (puzzle[i][j].hasPlayer) {
                    playerLocations[playerLocations.length] = [i, j];
                    if (playerFound) {
                        console.error("ERROR: Player in multiple spots.", playerLocations)
                    } else {
                        playerFound = true;
                    }
                } 
            }
        }
        if (playerLocations.length === 0) {
            console.error("ERROR: Player not found.")
        } else if ( !(player[0] === playerLocations[0][0] && player[1] === playerLocations[0][1]) ) {
            console.error("ERROR: Player location mismatch.", 
                "Player", player, 
                "Grid Location", playerLocations[0]
            );
        }
    }

    return (
        <div className="App">
            <Puzzle puzzle={puzzle} player={player}/>
            <Graph/>
            {key}
        </div>
    );
}

export default App;
