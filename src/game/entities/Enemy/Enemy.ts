import { Position } from '../../types/Position.interface';
import { IEnemy } from './Enemy.types';
import { EnemyMovement } from './components/EnemyMovement';

export class Enemy {
    scene: Phaser.Scene;
    position: Position;
    sprite: Phaser.Physics.Arcade.Sprite;
    enemyMovement: EnemyMovement;
    isDestroyed = false;

    health = 100;

    constructor({ position, scene, spriteName, patrolPath }: IEnemy) {
        this.position = position;
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(
            position.x,
            position.y,
            spriteName
        );

        this.enemyMovement = new EnemyMovement({
            enemy: this,
            spriteName,
            patrolPath: patrolPath,
        });

        this.sprite.body?.setSize(27, 35);
        this.sprite.body?.setOffset(35, 35);
    }

    public update() {
        this.enemyMovement.update();
    }

    public takeDamage(damage: number) {
        this.health -= damage;

        console.log('Enemy took damage', this.health);

        if (this.health <= 0) this.destroy();
    }

    public destroy() {
        this.isDestroyed = true;
        this.sprite.setVisible(false).setActive(false);
        this.sprite.destroy();
    }
}
