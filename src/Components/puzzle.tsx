import { Tile } from '../App'
import './puzzle.css'

export default function Puzzle({ puzzle }: { puzzle: Tile[][]}) {

    

    return (
        <div className="puzzle">
            {puzzle.map((row, i) => (
                <div key={i} className="row">
                    {row.map((tile, j) => (
                        <div 
                            key={j} 
                            className={
                                `tile  
                                ${tile.end ? "end " : ""} 
                                ${tile.hasPlayer ? "player " : ""} +
                                ${tile.rock ? "rock " : ""} +
                                ${tile.slidable ? "ice " : ""} +
                                ${tile.start ? "start " : ""} `
                            }
                        >
                            {tile.rock ? "" : ""}
                        </div>
                    ))}
                </div> 
            ))}
        </div>
    )
}