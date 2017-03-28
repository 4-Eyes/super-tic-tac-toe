import { BoardLocation } from './position';
import { Section } from './section';

export class Board {
    private sections: Section[][];
    private winningToken: string;

    constructor() {
        this.sections = new Section[3][3];
        this.winningToken = null;
    }

    get(x: number, y: number): Section {
        return this.sections[y][x];
    }

    getWinner(): string {
        return this.winningToken;
    }

    insertMove(location: BoardLocation, token: string): void {
        if (this.winningToken) {
            return;
        }
        this.sections[location.y][location.x].set(location.sectionLocation, token);
    }

    checkForWinner(): boolean {
        if (this.winningToken) {
            return true;
        }
        // check rows/columns
        for (let i = 0; i < 3; i++) {
            // checks rows
            if (this.sections[i][0].getWinningToken() === this.sections[i][1].getWinningToken() &&
            this.sections[i][1].getWinningToken() === this.sections[i][2].getWinningToken() &&
            this.sections[i][0].sectionWon()) {
            this.winningToken = this.sections[i][0].getWinningToken();
                return true;
            }
            // checks columns
            if (this.sections[0][i].getWinningToken() === this.sections[1][i].getWinningToken() &&
            this.sections[1][i].getWinningToken() === this.sections[2][i].getWinningToken() &&
            this.sections[0][i].sectionWon()) {
                this.winningToken = this.sections[0][i].getWinningToken();
                return true;
            }
        }

        // check diagonals
        if (((this.sections[0][0].getWinningToken() === this.sections[1][1].getWinningToken() &&
        this.sections[1][1].getWinningToken() === this.sections[2][2].getWinningToken()) ||
        (this.sections[0][2].getWinningToken() === this.sections[1][1].getWinningToken() &&
        this.sections[1][1].getWinningToken() === this.sections[2][0].getWinningToken())) &&
        this.sections[1][1].sectionWon()) {
            return true;
        }

        return false;
    }
}
