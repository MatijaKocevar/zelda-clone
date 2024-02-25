import { Position } from '../../../types/Position.interface';
import { EnemyMovement } from './components/EnemyMovement';
import { IEnemy } from './entities/IEnemy.interface';

export class Enemy {
    scene: Phaser.Scene;
    position: Position;
    sprite: Phaser.Physics.Arcade.Sprite;
    enemyMovement: EnemyMovement;

    constructor({ position, scene, moveDirection, spriteName }: IEnemy) {
        this.position = position;
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(
            position.x,
            position.y,
            spriteName
        );

        this.enemyMovement = new EnemyMovement({
            enemy: this,
            moveDirection: moveDirection,
            spriteName,
        });

        this.sprite.body?.setSize(27, 35);
        this.sprite.body?.setOffset(35, 35);
    }

    public update() {
        this.enemyMovement.update();
    }

    public destroy() {
        console.log('Enemy destroyed');
    }
}
