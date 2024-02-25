import playerSprite from '../../../assets/characters/player/player.png';
import pinkazoidSprite from '../../..//assets/characters/enemies/Pinkazoid.png';
import heartSprite from '../../../assets/lifebar/heart_animated_2.png';
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
import { getHomeCollisions2dArray } from './data/homeCollisions';
import { Enemy } from '../../entities/Enemy/Enemy';

export const PLAYER_WIDTH = 144;
export const PLAYER_HEIGHT = 144;
export const ENEMY_WIDTH = 96;
export const ENEMY_HEIGHT = 96;
export const WORLD_WIDTH = 5120;
export const WORLD_HEIGHT = 2880;
export const TILE_SIZE = 16;

export class HomeLevel {
    player: Player | undefined;
    enemy: Enemy | undefined;
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

        this.setupEnemies();
        this.setupPlayerAndCamera();
        this.createCollisions();

        this.setupForegroundImages();
    }

    update() {
        this.player?.update();
        this.enemy?.update();
    }

    private preloadSprites() {
        const { load } = this.scene;
        load.spritesheet('player1', playerSprite, {
            frameWidth: PLAYER_WIDTH,
            frameHeight: PLAYER_HEIGHT,
        });
        load.spritesheet('pinkazoid', pinkazoidSprite, {
            frameWidth: ENEMY_WIDTH,
            frameHeight: ENEMY_HEIGHT,
        });
        load.spritesheet('heart', heartSprite, {
            frameWidth: 17,
            frameHeight: 17,
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
            cameras.main.startFollow(this.player.sprite, true, 1, 1);
            cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        }
    }

    private createCollisions() {
        if (this.player && this.enemy) {
            this.collisions = new Collisions({
                collisions2dArray: getHomeCollisions2dArray(),
                player: this.player,
                enemy: this.enemy,
                scene: this.scene,
            });
        }
    }

    private setupEnemies() {
        this.enemy = new Enemy({
            position: { x: 2200, y: 1350 },
            scene: this.scene,
        });
    }
}
