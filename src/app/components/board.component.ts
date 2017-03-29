import { BoardLocation } from './../models/position';
import { Game } from './../models/game';
import { Component } from '@angular/core';
@Component({
  selector: 'board',
  templateUrl: '../html/board.component.html',
  styleUrls: ['../css/board.component.css']
})
export class BoardComponent {
    private game: Game;

    constructor() {
        this.game = new Game();
    }

    selectChoice(upperX: number, upperY: number, x: number, y: number) {
        if (this.game.board.get(upperX, upperY).isActive) {
            const move = new BoardLocation(upperX, upperY, x, y);
            this.game.makeMove(move);
        }
    }
}
