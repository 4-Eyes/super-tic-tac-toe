import { SectionLocation } from './position';
export class Section {
    static NOT_WON = 'NOT WON';

    miniBoard: string[][];
    private isWon: boolean;
    private winningToken: string;

    isActive: boolean;
    isFull: boolean;

    constructor() {
        this.miniBoard = [];
        for (let i = 0; i < 3; i++) {
            this.miniBoard.push(['', '', '']);
        }
        this.isWon = false;
        this.winningToken = Section.NOT_WON;
        this.isActive = true;
        this.isFull = false;
    }

    getWinningToken(): string {
        return this.winningToken;
    }

    sectionWon(): boolean {
        return this.isWon;
    }

    wipeWinner(): void {
        this.isWon = false;
        this.winningToken = Section.NOT_WON;
    }

    get(location: SectionLocation): string {
        return this.miniBoard[location.y][location.x];
    }

    getAvailableMoves(): SectionLocation[] {
        const moves = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.miniBoard[i][j] === '') {
                    moves.push(new SectionLocation(j, i));
                }
            }
        }
        return moves;
    }

    set(location: SectionLocation, token: string): void {
        this.miniBoard[location.y][location.x] = token;
        let checkFull = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.miniBoard[i][j] === '') {
                    checkFull = false;
                    break;
                }
            }
            if (!checkFull) {
                break;
            }
        }
        this.isFull = checkFull;
        if (!this.isWon) {
            this.checkForWinner();
        }
    }

    checkForWinner(): void {
        // check rows/columns
        for (let i = 0; i < 3; i++) {
            // checks rows
            if (this.miniBoard[i][0] === this.miniBoard[i][1] && this.miniBoard[i][1] === this.miniBoard[i][2] &&
            this.miniBoard[i][0] !== '') {
                this.isWon = true;
                this.winningToken = this.miniBoard[i][0];
                return;
            }
            // checks columns
            if (this.miniBoard[0][i] === this.miniBoard[1][i] && this.miniBoard[1][i] === this.miniBoard[2][i] &&
            this.miniBoard[0][i] !== '') {
                this.isWon = true;
                this.winningToken = this.miniBoard[0][i];
                return;
            }
        }

        // check diagonals
        if (((this.miniBoard[0][0] === this.miniBoard[1][1] && this.miniBoard[1][1] === this.miniBoard[2][2]) ||
            (this.miniBoard[0][2] === this.miniBoard[1][1] && this.miniBoard[1][1] === this.miniBoard[2][0])) &&
            this.miniBoard[1][1] !== '') {
            this.isWon = true;
            this.winningToken = this.miniBoard[1][1];
        }
    }
}
