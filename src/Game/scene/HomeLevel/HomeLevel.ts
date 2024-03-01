import { Collisions } from '../../entities/Collisions/Collisions';
import { Player } from '../../entities/Player/Player';
import { Animations } from '../../mechanics/Animations/Animations';
import { getHomeCollisions2dArray } from './data/homeCollisions';
import { Enemy } from '../../entities/Enemy/Enemy';
import { AssetLoader } from '../AssetLoader/AssetLoader';
import { imageAssets, spriteSheetAssets } from './assets/GameAssets';

export const PLAYER_WIDTH = 144;
export const PLAYER_HEIGHT = 144;
export const ENEMY_WIDTH = 96;
export const ENEMY_HEIGHT = 96;
export const WORLD_WIDTH = 5120;
export const WORLD_HEIGHT = 2880;
export const TILE_SIZE = 16;

export class HomeLevel {
    player: Player | undefined;
    enemies: Enemy[] = [];
    animations: Animations | undefined;
    collisions: Collisions | undefined;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    preload() {
        AssetLoader.loadImages(this.scene, imageAssets);
        AssetLoader.loadSpriteSheets(this.scene, spriteSheetAssets);
    }

    create() {
        this.animations = new Animations(this.scene);

        this.setupBackgroudImages();

        this.setupEnemies();
        this.setupPlayerAndCamera();
        this.createCollisions();

        this.setupForegroundImages();
    }

    update() {
        const { player, enemies } = this;
        this.updateEntityDepth();

        player?.update();
        enemies.forEach((enemy) => enemy.update());
    }

    updateEntityDepth() {
        const { player, enemies } = this;

        const areaWidth = 200;
        const areaHeight = 200;

        if (player) {
            const playerX = player.sprite.getCenter()?.x ?? 0;
            const playerY = player.sprite.getCenter()?.y ?? 0;

            const leftBound = playerX - areaWidth / 2;
            const rightBound = playerX + areaWidth / 2;
            const topBound = playerY - areaHeight / 2;
            const bottomBound = playerY + areaHeight / 2;

            enemies.forEach((enemy) => {
                const enemyX = enemy.sprite.getCenter()?.x ?? 0;
                const enemyY = enemy.sprite.getCenter()?.y ?? 0;

                const enemyInView =
                    enemyX >= leftBound &&
                    enemyX <= rightBound &&
                    enemyY >= topBound &&
                    enemyY <= bottomBound;

                if (enemyInView) {
                    const playerCenterY = player.sprite.getCenter()?.y ?? 0;
                    const enemyCenterY = enemy.sprite.getCenter()?.y ?? 0;

                    const playerDepth = playerCenterY > enemyCenterY ? 10 : 5;
                    const enemyDepth = playerDepth === 10 ? 5 : 10;

                    player.sprite.setDepth(playerDepth);
                    enemy.sprite.setDepth(enemyDepth);
                }
            });
        }
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

        add.image(0, 0, 'foreground-top-left').setOrigin(0, 0).setDepth(50);
        add.image(2560, 0, 'foreground-top-right').setOrigin(0, 0).setDepth(50);
        add.image(0, 1440, 'foreground-bottom-left')
            .setOrigin(0, 0)
            .setDepth(50);
        add.image(2560, 1440, 'foreground-bottom-right')
            .setOrigin(0, 0)
            .setDepth(50);
    }

    private setupPlayerAndCamera() {
        const { cameras, physics } = this.scene;

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
        if (this.player) {
            this.collisions = new Collisions({
                collisions2dArray: getHomeCollisions2dArray(),
                player: this.player,
                enemies: this.enemies,
                scene: this.scene,
            });
        }
    }

    private setupEnemies() {
        this.enemies = [
            new Enemy({
                position: { x: 2200, y: 1350 },
                scene: this.scene,
                moveDirection: 'horizontal',
                spriteName: 'pinkazoid',
            }),
            new Enemy({
                position: { x: 2400, y: 825 },
                scene: this.scene,
                moveDirection: 'horizontal',
                spriteName: 'zomboi',
            }),
            new Enemy({
                position: { x: 2000, y: 1750 },
                scene: this.scene,
                moveDirection: 'horizontal',
                spriteName: 'pinkazoid',
            }),
            new Enemy({
                position: { x: 2700, y: 950 },
                scene: this.scene,
                moveDirection: 'vertical',
                spriteName: 'zomboi',
            }),
            new Enemy({
                position: { x: 1850, y: 1100 },
                scene: this.scene,
                moveDirection: 'vertical',
                spriteName: 'pinkazoid',
            }),
            new Enemy({
                position: { x: 2700, y: 1500 },
                scene: this.scene,
                moveDirection: 'vertical',
                spriteName: 'zomboi',
            }),
        ];
    }
}
