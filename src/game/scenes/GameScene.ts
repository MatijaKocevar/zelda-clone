import { HomeScene } from './HomeScene/HomeScene';

export class GameScene extends Phaser.Scene {
    homeScene: HomeScene;
    keysPressedRef: React.MutableRefObject<string[]>;
    lastKeyRef: React.MutableRefObject<string>;

    constructor(keysPressedRef: React.MutableRefObject<string[]>, lastKeyRef: React.MutableRefObject<string>) {
        super({ key: 'GameScene' });
        this.keysPressedRef = keysPressedRef;
        this.lastKeyRef = lastKeyRef;

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
    }

    update() {
        this.homeScene.update();
    }
}
