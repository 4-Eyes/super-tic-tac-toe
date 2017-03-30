import { BoardLocation } from './position';
import { Section } from './section';

export class Board {
    sections: Section[][];
    private winningToken: string;
    private undoStack: BoardLocation[];
    private redoStack: BoardLocation[];

    constructor() {
        this.sections = [];
        for (let i = 0; i < 3; i++) {
            this.sections.push([new Section, new Section, new Section]);
        }
        this.winningToken = null;
        this.undoStack = [];
        this.redoStack = [];
    }

    get(x: number, y: number): Section {
        return this.sections[y][x];
    }

    getAvailableMoves(): BoardLocation[] {
        const moves = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.sections[i][j].isActive) {
                    for (const move of this.sections[i][j].getAvailableMoves()) {
                        moves.push(new BoardLocation(j, i, move));
                    }
                }
            }
        }
        return moves;
    }

    getWinner(): string {
        return this.winningToken;
    }

    setSectionsEnabled(enabled: boolean): void {
        for (const sectionRow of this.sections) {
            for (const section of sectionRow) {
                section.isActive = enabled;
            }
        }
    }

    undo(): void {
        const move = this.undoStack.pop();
        const section = this.sections[move.y][move.x];
        section.wipeWinner();
        section.set(move.sectionLocation, '');
        if (this.undoStack.length === 0 || // if it was the first move
        (this.undoStack[this.undoStack.length - 1].sameUpperAndInner() && // or if it was a move after filling a section and sending the next move to the same section
        this.sections[this.undoStack[this.undoStack.length - 1].y][this.undoStack[this.undoStack.length - 1].x].isFull)) {
            this.setSectionsEnabled(true);
        } else {
            this.setSectionsEnabled(false);
            section.isActive = true;
        }
        this.redoStack.push(move);
    }

    redo(token: string): void {
        const move = this.redoStack.pop();
        this.insertMove(move, token);
    }

    canRedo(): boolean {
        return this.redoStack.length > 0;
    }

    clearRedoStack(): void {
        this.redoStack = [];
    }

    insertMove(location: BoardLocation, token: string): void {
        if (this.winningToken) {
            return;
        }
        this.sections[location.y][location.x].set(location.sectionLocation, token);

        this.undoStack.push(location);
        const newSection = this.sections[location.sectionLocation.y][location.sectionLocation.x];
        if (newSection.isFull) {
            // if the section the person is being sent to is full then enabled all sections
            this.setSectionsEnabled(true);
        } else {
            // Disable all sections
            this.setSectionsEnabled(false);
            // Now enable the one where play can take place next
            newSection.isActive = true;
        }
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
