import { Section } from './section';
import { BoardLocation } from './position';
import { Board } from './board';


export class Game {
    board: Board;
    turnCount: number;
    tokens: string[];

    constructor() {
        this.board = new Board();
        this.turnCount = 0;
        this.tokens = ['X', 'O']; // todo: add customisations when I can be bothered.
    }

    reset() {
        this.board = new Board();
        this.turnCount = 0;
    }

    getCurrentToken() {
        return this.tokens[this.turnCount % 2];
    }

    makeMove(moveLocation: BoardLocation): string {
        this.board.insertMove(moveLocation, this.tokens[this.turnCount++ % 2]);
        return this.board.checkForWinner() ? this.board.getWinner() : Section.NOT_WON;
    }

    undo() {
        if (this.turnCount >= 0) {
            this.turnCount--;
            this.board.undo();
        }
    }
}
