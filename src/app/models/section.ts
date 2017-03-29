import { SectionLocation } from './position';
export class Section {
    static NOT_WON = 'NOT WON';

    miniBoard: string[][];
    private isWon: boolean;
    private winningToken: string;
    private inserts: number;

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
        this.inserts = 0;
        this.isFull = false;
    }

    getWinningToken(): string {
        return this.winningToken;
    }

    sectionWon(): boolean {
        return this.isWon;
    }

    get(location: SectionLocation): string {
        return this.miniBoard[location.y][location.x];
    }

    set(location: SectionLocation, token: string): void {
        this.miniBoard[location.y][location.x] = token;
        this.isFull = ++this.inserts === 9;
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
