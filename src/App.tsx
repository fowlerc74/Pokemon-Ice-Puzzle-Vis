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
    puzzle[start[0]][start[1]].slidable = false;
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

    return (
        <div className="App">
            <Puzzle puzzle={puzzle}/>
            <Graph/>
        </div>
    );
}

export default App;
