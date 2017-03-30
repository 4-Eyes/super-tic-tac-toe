import { Board } from './../models/board';
import { BoardLocation } from './../models/position';
import { Game } from './../models/game';

export class GameTree {
    private game: Game;
    private treeGenerated: boolean;
    private rootNode: GameNode;

    constructor(game: Game) {
        this.game = game;
        this.treeGenerated = false;
    }

    generateTree() {
        if (this.treeGenerated) {
            return;
        }

        this.rootNode = new GameNode(null, null, null, this.game);

        this.treeGenerated = true;
    }
}

export class GameNode {
    private move: BoardLocation;
    private token: string;
    private children: GameNode[];
    private parent: GameNode;
    private winningState: boolean;
    private currentGame: Game;

    constructor(move: BoardLocation, token: string, parent: GameNode, currentGame: Game) {
        this.move = move;
        this.token = token;
        this.parent = parent;
        this.currentGame = currentGame;
        this.children = [];
        this.generateChildren();
    }

    generateChildren() {

    }
}
