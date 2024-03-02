import { Position } from '../../types/Position.interface';
import { Enemy } from './Enemy';

export interface IEnemy {
    scene: Phaser.Scene;
    position: Position;
    moveDirection: 'horizontal' | 'vertical';
    spriteName: string;
}

export interface IEnemyAttack {
    enemy: Enemy;
}

export interface IEnemyMovement {
    enemy: Enemy;
    moveDirection: 'horizontal' | 'vertical';
    spriteName: string;
}
