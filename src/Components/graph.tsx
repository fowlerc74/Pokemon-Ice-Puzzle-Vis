import ForceGraph2D from 'react-force-graph-2d';

const Graph = () => {
    const myData = {
        "nodes": [
            {
                "id": "id1",
                "name": "name1",
                "val": 1
            },
            { 
                "id": "id2",
                "name": "name2",
                "val": 1 
            }
        ],
        "links": [
            {
                "source": "id1",
                "target": "id2"
            }
        ]
    } 

    return (
        <div>
            graph
            <ForceGraph2D graphData={myData} />
        </div>
    )
}

export default Graph;