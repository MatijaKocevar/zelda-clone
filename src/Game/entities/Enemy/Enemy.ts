import { Position } from '../../../types/Position.interface';
import { IEnemy } from './entities/IEnemy.interface';

export class Enemy {
    scene: Phaser.Scene;
    position: Position;
    sprite: Phaser.Physics.Arcade.Sprite;

    constructor({ position, scene }: IEnemy) {
        this.position = position;
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(position.x, position.y, 'slime');

        this.sprite.body?.setSize(27, 20);
        this.sprite.body?.setOffset(35, 45);
    }

    public update() {
        this.sprite.anims.play('slime-idle-horizontal', true);
    }

    public destroy() {
        console.log('Enemy destroyed');
    }
}
