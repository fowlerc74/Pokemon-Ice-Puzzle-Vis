import ForceGraph2D from 'react-force-graph-2d';
import './graphwindow.css'
import Puzzle from '../Puzzle';
import { useMemo } from 'react';

export interface IProps {
    puzzle: Puzzle
}

interface Graph {
    nodes: Node[],
    links: Link[]
}

interface Node {
    id: string,
    name: string,
    val: number
}

interface Link {
    source: string,
    target: string
}

export default function GraphWindow(props: IProps) {

    const graph: Graph = useMemo(() => {
        function createGraph(puzzle: Puzzle): Graph {
            var graph = {
                "nodes": [] as Node[],
                "links": [] as Link[]
            } 

            function playersEqual(player1: number[], player2: number[]): boolean {
                return (player1[0] === player2[0]) && (player1[1] === player2[1]);
            }

            let testplayer: number[] = [5, 5]
            console.log(props.puzzle.move(testplayer, -1, 0))
            console.log(props.puzzle.move(testplayer, 1, 0))
            console.log(props.puzzle.move(testplayer, 0, -1))
            console.log(props.puzzle.move(testplayer, 0, 1))
    
            // Push node to graph
            // Move Up, Right, Down, Left
            // For each direction, if moved and position is new, traverse again
            function traversePuzzle(currentPlayer: number[], counter: number): number {
                let nodeID = currentPlayer[0].toString() + ',' + currentPlayer[1].toString();
                console.log('start', counter, currentPlayer);
                if ( ! graph.nodes.find((node) => node.id === nodeID)) {
                    graph.nodes.push({
                        "id": nodeID,
                        "name": '(' + nodeID + ')',
                        "val": 1
                    });
                } else {
                    return counter;
                }
                console.log(graph.nodes.length);
    
                // console.log( currentPlayer, props.puzzle.move(currentPlayer, -1, 0), playersEqual(currentPlayer, props.puzzle.move(currentPlayer, -1, 0)) )

                // if (! playersEqual(currentPlayer, props.puzzle.move(currentPlayer, -1, 0))) { // Up
                //     console.log("up")
                //     counter += traversePuzzle(props.puzzle.move(currentPlayer, -1, 0), counter++);
                // }
                
                // if (! playersEqual(currentPlayer, props.puzzle.move(currentPlayer, 0, 1))) { // right
                //     console.log("right")
                //     counter += traversePuzzle(props.puzzle.move(currentPlayer, 0, 1), counter++);
                // }

                // if (! playersEqual(currentPlayer, props.puzzle.move(currentPlayer, 1, 0))) { // down
                //     console.log("down")
                //     counter += traversePuzzle(props.puzzle.move(currentPlayer, 1, 0), counter++);
                // }

                // if (! playersEqual(currentPlayer, props.puzzle.move(currentPlayer, 0, 1))) { // left
                //     console.log("left")
                //     counter += traversePuzzle(props.puzzle.move(currentPlayer, 0, 1), counter++);
                // }
                return counter;
            }

            traversePuzzle(props.puzzle.getStart(), 1);
            return graph;
        }

        return createGraph(props.puzzle);
    }, [props.puzzle])

    console.log(graph);

    // let tempPlayer: number[] = props.player;

    // const myData = {
    //     "nodes": [
    //         {
    //             "id": "id1",
    //             "name": "name1",
    //             "val": 1
    //         },
    //         { 
    //             "id": "id2",
    //             "name": "name2",
    //             "val": 1 
    //         }
    //     ],
    //     "links": [
    //         {
    //             "source": "id1",
    //             "target": "id2"
    //         }
    //     ]
    // } 

    return (
        <div className="graph">
            <div className="graphwindow">
                <ForceGraph2D 
                    graphData={graph} 
                    width={800}
                    height={800}
                    backgroundColor={'light'}
                />
            </div>
        </div>
    )
}