import { HomeScene } from './HomeScene/HomeScene';

export class GameScene extends Phaser.Scene {
    level1: HomeScene;
    keysPressedRef: React.MutableRefObject<string[]>;
    lastKeyRef: React.MutableRefObject<string>;

    constructor(
        keysPressedRef: React.MutableRefObject<string[]>,
        lastKeyRef: React.MutableRefObject<string>
    ) {
        super('GameScene');
        this.keysPressedRef = keysPressedRef;
        this.lastKeyRef = lastKeyRef;

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
