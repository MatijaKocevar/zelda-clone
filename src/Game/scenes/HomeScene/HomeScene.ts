import playerSprite1 from '../../../assets/characters/player.png';
import tieHome from '../../../assets/map/TieHome.png';
import tieHomeForeground from '../../../assets/map/TieHomeForeground.png';
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
        this.setupImages();
        this.setupPlayerAndCamera();
        this.createCollisions();
    }

    update() {
        this.player?.update();
    }

    private preloadSprites() {
        const { load } = this.scene;
        load.spritesheet('player1', playerSprite1, {
            frameWidth: FRAME_WIDTH,
            frameHeight: FRAME_HEIGHT,
        });
    }

    private preloadImages() {
        const { load } = this.scene;
        load.image('tie-home', tieHome);
        load.image('tie-home-foreground', tieHomeForeground);
    }

    private setupImages() {
        const { add } = this.scene;
        add.image(0, 0, 'tie-home').setOrigin(0, 0);
        add.image(0, 0, 'tie-home-foreground').setOrigin(0, 0);
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
