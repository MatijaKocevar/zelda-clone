import playerSprite from '../../../assets/characters/player.png';
import backgroundTopLeft from '../../../assets/map/background/topLeft.png';
import backgroundTopRight from '../../../assets/map/background/topRight.png';
import backgroundBottomLeft from '../../../assets/map/background/bottomLeft.png';
import backgroundBottomRight from '../../../assets/map/background/bottomRight.png';
import ForegroundTopLeft from '../../../assets/map/foreground/topLeft.png';
import ForegroundTopRight from '../../../assets/map/foreground/topRight.png';
import ForegroundBottomLeft from '../../../assets/map/foreground/bottomLeft.png';
import ForegroundBottomRight from '../../../assets/map/foreground/bottomRight.png';
import { Collisions } from '../../entities/Collisions/Collisions';
import { Player } from '../../entities/Player/Player';
import { Animations } from '../../mechanics/Animations/Animations';
import { getHomeCollisions2dArray } from './data/homeCollisions2dArray';

export const FRAME_WIDTH = 144;
export const FRAME_HEIGHT = 144;
export const WORLD_WIDTH = 5120;
export const WORLD_HEIGHT = 2880;
export const TILE_SIZE = 16;

export class HomeScene {
    player: Player | undefined;
    animations: Animations | undefined;
    collisions: Collisions | undefined;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    preload() {
        this.preloadSprites();
        this.preloadImages();
    }

    create() {
        this.setupBackgroudImages();
        this.setupPlayerAndCamera();
        this.createCollisions();
        this.setupForegroundImages();
    }

    update() {
        this.player?.update();
    }

    private preloadSprites() {
        const { load } = this.scene;
        load.spritesheet('player1', playerSprite, {
            frameWidth: FRAME_WIDTH,
            frameHeight: FRAME_HEIGHT,
        });
    }

    private preloadImages() {
        const { load } = this.scene;

        load.image('background-top-left', backgroundTopLeft);
        load.image('background-top-right', backgroundTopRight);
        load.image('background-bottom-left', backgroundBottomLeft);
        load.image('background-bottom-right', backgroundBottomRight);

        load.image('foreground-top-left', ForegroundTopLeft);
        load.image('foreground-top-right', ForegroundTopRight);
        load.image('foreground-bottom-left', ForegroundBottomLeft);
        load.image('foreground-bottom-right', ForegroundBottomRight);
    }

    private setupBackgroudImages() {
        const { add } = this.scene;

        add.image(0, 0, 'background-top-left').setOrigin(0, 0);
        add.image(2560, 0, 'background-top-right').setOrigin(0, 0);
        add.image(0, 1440, 'background-bottom-left').setOrigin(0, 0);
        add.image(2560, 1440, 'background-bottom-right').setOrigin(0, 0);
    }

    private setupForegroundImages() {
        const { add } = this.scene;

        add.image(0, 0, 'foreground-top-left').setOrigin(0, 0);
        add.image(2560, 0, 'foreground-top-right').setOrigin(0, 0);
        add.image(0, 1440, 'foreground-bottom-left').setOrigin(0, 0);
        add.image(2560, 1440, 'foreground-bottom-right').setOrigin(0, 0);
    }

    private setupPlayerAndCamera() {
        const { cameras, physics } = this.scene;
        this.animations = new Animations(this.scene);
        this.player = new Player({
            position: { x: 2400, y: 1250 },
            scene: this.scene,
        });

        physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        if (this.player.sprite) {
            cameras.main.startFollow(this.player.sprite, true, 0.05, 0.05);
            cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        }
    }

    private createCollisions() {
        if (this.player) {
            this.collisions = new Collisions({
                collisions2dArray: getHomeCollisions2dArray(),
                player: this.player,
                scene: this.scene,
            });
        }
    }
}
