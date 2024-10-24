export interface Tile {
    rock: boolean,
    start: boolean,
    end: boolean,
    slidable: boolean
}

export default class Puzzle {
    private puzzleWidth: number = 16;
    private puzzleHeight: number = 14;
    // Coordinates are (y, x) from top left
    // private start = [5, 5];
    private start = [13, 14];
    private end = [[7, 15], [8, 15]];
    private rocks = [
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

    private puzzle: Tile[][] = [];
    // let player: number[] = [13, 14];
    // const [player, setPlayer] = useState(start);

    public constructor(width: number, height: number) {
        this.puzzleWidth = width;
        this.puzzleHeight = height;

        for (let i = 0; i < this.puzzleHeight; i++) {
            this.puzzle[i] = [];
            for (let j = 0; j < this.puzzleWidth; j++) {
                this.puzzle[i][j] = {
                    rock: false,
                    start: false,
                    end: false,
                    slidable: true
                };
            }
        }
    
        for (let i = 0; i < this.puzzleWidth; i++) {
            this.puzzle[0][i].rock = true;
            this.puzzle[this.puzzleHeight - 1][i].rock = true;
        }
        for (let i = 0; i < this.puzzleHeight; i++) {
            this.puzzle[i][0].rock = true;
            this.puzzle[i][this.puzzleWidth - 1].rock = true;
        }
    
        this.puzzle[this.start[0]][this.start[1]].start = true;
        this.puzzle[this.start[0]][this.start[1]].slidable = false;
        this.puzzle[this.start[0]][this.start[1]].rock = false;
    
        for (let endTile of this.end) {
            this.puzzle[endTile[0]][endTile[1]].end = true;
            this.puzzle[endTile[0]][endTile[1]].slidable = false;
            this.puzzle[endTile[0]][endTile[1]].rock = false;
        }
    
        for (let rockTile of this.rocks) {
            this.puzzle[rockTile[0]][rockTile[1]].rock = true;
        }
    }

    public getStart(this: any) {
        return this.start;
    }

    public isEnd(this: any, player: number[]): boolean {
        return this.puzzle[player[0]][player[1]].end;
    }

    public getArray(this: any) {
        return this.puzzle;
    }

    public move(this: any, player: number[], vertical: number, horizontal: number): number[] {
        if (vertical !== 0 && horizontal !== 0) {
            console.error('ERROR: Invalid move call.')
            return [-1, -1];
        }

        var playerY = player[0];
        var playerX = player[1];

        try {
            while ( !this.puzzle[playerY + vertical][playerX + horizontal].rock ) {
                playerY += vertical;
                playerX += horizontal;
                if (!this.puzzle[playerY][playerX].slidable) break;
            }
            return [playerY, playerX];
        } catch {
            // console.error('ERROR: Out of Bounds Error.', playerY, playerX);
            return [playerY, playerX];
        }
    }
}