import { Tile } from '../App'
import './puzzle.css'

export interface IProps {
    puzzle: Tile[][],
    player: number[]
}

// export default function Puzzle({ puzzle }: { puzzle: Tile[][]}) {
export default function Puzzle(props: IProps) {
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
                    {props.player[0]}
                </div>
                {props.puzzle.map((row, i) => (
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
                                {tile.rock ? "" : ""}
                            </div>
                        ))}
                    </div> 
                ))}
                {props.player[0]} <br /> {props.player[1]}
            </div>
        </div>
    )
}