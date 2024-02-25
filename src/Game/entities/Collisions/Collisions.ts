import { TILE_SIZE } from '../../scene/HomeLevel/HomeLevel';
import { Enemy } from '../Enemy/Enemy';
import { Player } from '../Player/Player';
import { ICollisionBlock } from './entities/ICollisions.interface';

export class Collisions {
    private scene: Phaser.Scene;
    private player: Player;
    private enemy: Enemy;
    private collisions2dArray: number[][];

    constructor({ scene, player, enemy, collisions2dArray }: ICollisionBlock) {
        this.scene = scene;
        this.player = player;
        this.enemy = enemy;
        this.collisions2dArray = collisions2dArray;

        this.setupCollisions();
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
            .setVisible(false);

        block.body.setSize(TILE_SIZE * 4, TILE_SIZE * 4);

        block.setImmovable(true);
        // this.player.sprite.setImmovable(true);
        this.enemy.sprite.setImmovable(true);

        physics.add.collider(this.player.sprite, this.enemy.sprite);
        physics.add.collider(this.player.sprite, block);
        physics.add.collider(this.enemy.sprite, block);
    }
}
