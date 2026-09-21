import Phaser from 'phaser';
import { Position } from '../../types/position.interface';
import { Enemy } from './enemy';

export type EnemyType = 'pinkazoid' | 'zomboi';

export interface PatrolPath {
    direction: 'left' | 'right' | 'up' | 'down';
    distance: number;
}

export interface EnemyMovementConfig {
    moveSpeed: number;
    chaseSpeed: number;
    detectionRange: number;
    pauseDuration: number;
    initialDelay: number;
}

export interface EnemyAttackConfig {
    damage: number;
    rangeMargin: number;
    windUp: number;
    cooldown: number;
}

export interface EnemyDefinition {
    spriteName: string;
    health: number;
    movement: EnemyMovementConfig;
    attack: EnemyAttackConfig;
}

export interface IEnemy {
    scene: Phaser.Scene;
    position: Position;
    type: EnemyType;
    patrolPath: PatrolPath[];
    initialDelay?: number;
    onDeath?: () => void;
}

export interface IMovementBehavior {
    enemy: Enemy;
    patrolPath: PatrolPath[];
    config: EnemyMovementConfig;
    initialDelay: number;
}

export interface IAttackBehavior {
    enemy: Enemy;
    config: EnemyAttackConfig;
}
