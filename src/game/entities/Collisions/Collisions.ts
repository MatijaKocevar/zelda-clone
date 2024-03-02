import { Enemy } from '../Enemy/Enemy';
import { Player } from '../Player/Player';
import { ICollisionBlock } from './Collisions.types';

export const TILE_SIZE = 16;

export class Collisions {
    private scene: Phaser.Scene;
    private player: Player;
    private enemies: Enemy[];
    private collisions2dArray: number[][];

    constructor({
        scene,
        player,
        enemies,
        collisions2dArray,
    }: ICollisionBlock) {
        this.scene = scene;
        this.player = player;
        this.enemies = enemies;
        this.collisions2dArray = collisions2dArray;

        this.init();
    }

    private init() {
        this.setupCollisions();
        this.addColliders();
    }

    private setupCollisions() {
        const { collisions2dArray } = this;

        collisions2dArray.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col === 1) {
                    this.createCollisionBlock(x, y);
                }
            });
        });
    }

    private createCollisionBlock(x: number, y: number) {
        const { physics } = this.scene;

        const block = physics.add
            .staticImage(x * TILE_SIZE * 4 + 32, y * TILE_SIZE * 4 + 32, '')
            .setOrigin(0, 0)
            .setDisplayOrigin(32, 32)
            .setVisible(false)
            .setSize(TILE_SIZE * 4, TILE_SIZE * 4)
            .setImmovable(true);

        physics.add.collider(this.player.sprite, block);

        this.enemies.forEach((enemy) =>
            physics.add.collider(enemy.sprite, block)
        );
    }

    private addColliders() {
        const { physics, time } = this.scene;
        const { player, enemies } = this;

        enemies.forEach((enemy) => {
            physics.add.collider(player.sprite, enemy.sprite, () => {
                time.delayedCall(100, () => {
                    if (enemy.isDestroyed) return;

                    enemy.sprite.setVelocity(0, 0);
                });
            });
        });
    }
}
