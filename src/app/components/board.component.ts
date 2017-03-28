import { BoardLocation } from './../models/position';
import { Game } from './../models/game';
import { Component } from '@angular/core/core';
@Component({
  selector: 'board',
  templateUrl: '../html/board.component.html',
  styleUrls: ['../css/board.component.css']
})
export class BoardComponent {
    private game: Game;

    constructor() { }
}
