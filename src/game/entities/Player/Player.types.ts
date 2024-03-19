import { Position } from '../../types/common';
import { Enemy } from '../Enemy/Enemy';

export interface IPlayer {
    scene: Phaser.Scene;
    position: Position;
    enemies: Enemy[];
}

export interface IPlayerStats {
    health: number;
    maxHealth: number;
    damage: number;
}
