import { HomeLevel } from './HomeLevel/HomeLevel';

export class GameScene extends Phaser.Scene {
    level1: HomeLevel;

    constructor() {
        super('GameScene');

        this.level1 = new HomeLevel(this);
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
