import { BoardLocation, SectionLocation } from './../models/position';
import { Game } from './../models/game';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'board',
  templateUrl: '../html/board.component.html',
  styleUrls: ['../css/board.component.css']
})
export class BoardComponent {
    @Input() game: Game;

    constructor() {
    }

    selectChoice(upperX: number, upperY: number, x: number, y: number) {
        if (this.game.board.get(upperX, upperY).isActive &&
        this.game.board.get(upperX, upperY).get(new SectionLocation(x, y)) === '') {
            const move = new BoardLocation(upperX, upperY, x, y);
            this.game.makeMove(move);
        }
    }
}
