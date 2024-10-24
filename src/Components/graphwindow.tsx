import ForceGraph2D from 'react-force-graph-2d';
import './graphwindow.css'
import Puzzle from '../Puzzle';
import { useEffect, useMemo } from 'react';

export interface IProps {
    puzzle: Puzzle,
    player: number[]
}

interface Graph {
    nodes: Node[],
    links: Link[]
}

interface Node {
    id: string,
    name: string,
    val: number,
    color: string,
    neighbors: Node[],
    distance: number,
    visited: boolean
}

interface Link {
    source: string,
    target: string
}

export default function GraphWindow(props: IProps) {

    const orange = "#FFA500";
    const green = "#ADFF2F";
    const red = "#FF0000";
    const blue = "#2277FF";
    const darkblue = "#0033BB"


    const graph: Graph = useMemo(() => {
        function createGraph(puzzle: Puzzle): Graph {
            var graph = {
                "nodes": [] as Node[],
                "links": [] as Link[]
            } 

            function playersEqual(player1: number[], player2: number[]): boolean {
                return (player1[0] === player2[0]) && (player1[1] === player2[1]);
            }
    
            // Push node to graph
            // Move Up, Right, Down, Left
            // For each direction, if moved and position is new, traverse again
            function traversePuzzle(currentPlayer: number[], counter: number): number {
                if ( currentPlayer[0] < 0) {
                    return counter;
                }
                
                let nodeID = currentPlayer[0].toString() + ',' + currentPlayer[1].toString();
                let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
                for (let direction of directions) {
                    // If attempting to move actually moves and its not an error
                    var newPlayer = props.puzzle.move(currentPlayer, direction[0], direction[1]);
                    if (! playersEqual(currentPlayer, newPlayer)) { 
                        let newNodeID = newPlayer[0].toString() + ',' + newPlayer[1].toString();
                        // If doesn't already exist
                        if ( ! graph.nodes.find((node) => node.id === newNodeID) ) {
                            graph.nodes.push({
                                "id": newNodeID,
                                "name": '(' + newNodeID + ')',
                                "val": 1,
                                "color": (puzzle.isEnd(newPlayer) ? red : blue),
                                neighbors: [],
                                distance: Infinity,
                                visited: false
                            });
                            counter += traversePuzzle(props.puzzle.move(currentPlayer, direction[0], direction[1]), counter++);
                        } 
                        graph.links.push({
                            source: nodeID,
                            target: newNodeID
                        });
                        let fromNode = graph.nodes.find((node) => node.id === nodeID);
                        let toNode = graph.nodes.find((node) => node.id === newNodeID);
                        if (fromNode && toNode) {
                            fromNode.neighbors.push(toNode);
                        }
                    }
                }

                return counter;
            }
            
            let nodeID = props.puzzle.getStart()[0].toString() + ',' + props.puzzle.getStart()[1].toString()
            graph.nodes.push({
                "id": nodeID,
                "name": '(' + nodeID + ')',
                "val": 1,
                "color": green,
                neighbors: [],
                distance: 0,
                visited: false
            });

            traversePuzzle(props.puzzle.getStart(), 1);
            return graph;
        }

        return createGraph(props.puzzle);
    }, [props.puzzle])

    useEffect(() => {
        let currentID: string = props.player[0].toString() + ',' + props.player[1].toString();
        let currentNode: Node | undefined = graph.nodes.find((node) => node.id === currentID);
        if (currentNode) {
            currentNode.color = green
            console.log(currentNode.color === green)
        } 
    }, [graph.nodes, props.player])

    function dijkstra() {
        let unvisited: Node[] = []
        graph.nodes.forEach(node => unvisited.push(Object.assign({}, node)));
    }

    return (
        <div className="graph">
            <div className="graphwindow">
                <ForceGraph2D 
                    graphData={graph} 
                    width={800}
                    height={800}
                    backgroundColor={'light'}
                    linkDirectionalArrowLength={8}
                    linkDirectionalArrowRelPos={1}
                />
                <button onClick={dijkstra}> Dijkstra's </button>
            </div>
        </div>
    )
}