
import Puzzle, { Tile } from '../Puzzle'
import './puzzlewindow.css'

export interface IProps {
    puzzle: Puzzle,
    player: number[]
}

export default function PuzzleWindow(props: IProps) {
    let puzzleArray: Tile[][] = props.puzzle.getArray();
    return (
        <div className="puzzle-window">
            <div className="puzzle">
                <div 
                    className="player" 
                    style={
                        {
                            top: props.player[0] * 50 + 10,
                            left: props.player[1] * 50 + 10
                        }
                }>
                    {/* {props.player[0]} */}
                </div>
                {puzzleArray.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((tile, j) => (
                            <div 
                            key={j} 
                            className={
                                `tile  
                                ${tile.end ? "end " : ""} 
                                ${tile.rock ? "rock " : ""} +
                                ${tile.slidable ? "ice " : ""} +
                                ${tile.start ? "start " : ""} `
                            }>
                                {i}, {j}
                            </div>
                        ))}
                    </div> 
                ))}
                {props.player[0]} <br /> {props.player[1]}
            </div>
        </div>
    )
}