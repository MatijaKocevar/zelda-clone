import { Position } from '../../../types/Position.interface';
import { EnemyMovement } from './components/EnemyMovement';
import { IEnemy } from './entities/IEnemy.interface';

export class Enemy {
    scene: Phaser.Scene;
    position: Position;
    sprite: Phaser.Physics.Arcade.Sprite;
    enemyMovement: EnemyMovement;

    constructor({ position, scene }: IEnemy) {
        this.position = position;
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(
            position.x,
            position.y,
            'pinkazoid'
        );

        this.enemyMovement = new EnemyMovement({
            enemy: this,
        });

        this.sprite.body?.setSize(27, 50);
        this.sprite.body?.setOffset(35, 20);
    }

    public update() {
        this.enemyMovement.update();
    }

    public destroy() {
        console.log('Enemy destroyed');
    }
}
