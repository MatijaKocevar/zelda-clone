import { HomeScene } from './HomeScene/HomeScene';

export class GameScene extends Phaser.Scene {
    level1: HomeScene;

    constructor() {
        super('GameScene');

        this.level1 = new HomeScene(this);
    }

    preload() {
        this.level1.preload();
    }

    create() {
        this.level1.create();
    }

    update() {
        this.level1.update();
    }
}
