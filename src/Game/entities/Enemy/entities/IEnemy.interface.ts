import { Position } from '../../../../types/Position.interface';

export interface IEnemy {
    scene: Phaser.Scene;
    position: Position;
    moveDirection: 'horizontal' | 'vertical';
    spriteName: string;
}
