import { Enemy } from '../Enemy/Enemy';
import { Player } from '../Player/Player';
import { ICollisionBlock } from './Collisions.types';

export const TILE_SIZE = 16;

const BLOCK_SIZE = TILE_SIZE * 4;

export class Collisions {
    private static readonly DEBUG_COLLISIONS = true;
    private scene: Phaser.Scene;
    private player: Player;
    private enemies: Enemy[];
    private collisions2dArray: number[][];
    private debugGraphics?: Phaser.GameObjects.Graphics;

    constructor({ scene, player, enemies, collisions2dArray }: ICollisionBlock) {
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

        if (Collisions.DEBUG_COLLISIONS) {
            this.debugGraphics = this.scene.add.graphics().setDepth(1000);
        }

        collisions2dArray.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col === 1) this.createCollisionBlock(x, y);
            });
        });
    }

    private createCollisionBlock(x: number, y: number) {
        const { physics } = this.scene;

        const block = physics.add
            .staticImage(x * BLOCK_SIZE + BLOCK_SIZE / 2, y * BLOCK_SIZE + BLOCK_SIZE / 2, '')
            .setOrigin(0, 0)
            .setDisplayOrigin(BLOCK_SIZE / 2, BLOCK_SIZE / 2)
            .setVisible(false)
            .setSize(BLOCK_SIZE, BLOCK_SIZE)
            .setImmovable(true);

        if (this.debugGraphics && block.body) {
            const { x: bodyX, y: bodyY, width, height } = block.body;
            this.debugGraphics.fillStyle(0xff0000, 0.35).fillRect(bodyX, bodyY, width, height);
            this.debugGraphics.lineStyle(1, 0xff0000, 0.8).strokeRect(bodyX, bodyY, width, height);
        }

        physics.add.collider(this.player.sprite, block);

        this.enemies.forEach((enemy) => physics.add.collider(enemy.sprite, block));
    }

    private addColliders() {
        const { physics } = this.scene;
        const { player, enemies } = this;

        enemies.forEach((enemy) => physics.add.collider(player.sprite, enemy.sprite));
    }
}
