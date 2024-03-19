import { Position } from '../../types/common';
import { Enemy } from './Enemy';

export interface IEnemy {
    scene: Phaser.Scene;
    position: Position;
    spriteName: string;
    patrolPath: PatrolPath[];
}

export interface IEnemyAttack {
    enemy: Enemy;
}

export interface PatrolPath {
    direction: 'left' | 'right' | 'up' | 'down';
    distance: number;
}

export interface IEnemyMovement {
    enemy: Enemy;
    spriteName: string;
    patrolPath: PatrolPath[];
}
