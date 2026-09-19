import { InputState } from '../input/InputState';
import { HomeScene } from './HomeScene/HomeScene';

export class GameScene extends Phaser.Scene {
    homeScene: HomeScene;
    inputState: InputState;

    constructor(inputState: InputState) {
        super({ key: 'GameScene' });
        this.inputState = inputState;

        this.homeScene = new HomeScene(this);
    }

    preload() {
        this.homeScene.preload();
    }

    create() {
        this.homeScene.create();

        this.input.keyboard?.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });

        this.events.once('player-died', () => {
            this.scene.pause();
            this.scene.launch('GameOverScene');
        });
    }

    update() {
        this.homeScene.update();
    }
}
