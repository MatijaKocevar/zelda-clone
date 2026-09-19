import { Enemy } from '../Enemy/Enemy';
import { Player } from '../Player/Player';
import { ICollisionBlock, ICollisionRect } from './Collisions.types';

export class Collisions {
    private scene: Phaser.Scene;
    private player: Player;
    private enemies: Enemy[];
    private collisionRects: ICollisionRect[];
    private collisionGroup: Phaser.Physics.Arcade.StaticGroup;

    constructor({ scene, player, enemies, collisionRects }: ICollisionBlock) {
        this.scene = scene;
        this.player = player;
        this.enemies = enemies;
        this.collisionRects = collisionRects;
        this.collisionGroup = scene.physics.add.staticGroup();

        this.init();
    }

    private init() {
        this.setupCollisions();
        this.addColliders();
    }

    private setupCollisions() {
        this.collisionRects.forEach((rect) => this.createCollisionBlock(rect));
    }

    private createCollisionBlock({ x, y, width, height }: ICollisionRect) {
        const zone = this.scene.add.zone(x + width / 2, y + height / 2, width, height);
        this.scene.physics.add.existing(zone, true);
        this.collisionGroup.add(zone);
    }

    private addColliders() {
        const { physics } = this.scene;
        const { player, enemies } = this;

        physics.add.collider(player.sprite, this.collisionGroup);
        enemies.forEach((enemy) => physics.add.collider(enemy.sprite, this.collisionGroup));
        enemies.forEach((enemy) => physics.add.collider(player.sprite, enemy.sprite));
    }
}
