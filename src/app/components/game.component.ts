import { Game } from './../models/game';
import { Component } from '@angular/core';

@Component({
    selector: 'game',
    templateUrl: '../html/game.component.html',
    styleUrls: ['../css/game.component.css']
})
export class GameComponent {
    game: Game;

    constructor() {
        this.game = new Game();
    }

    reset() {
        this.game.reset();
    }
}
