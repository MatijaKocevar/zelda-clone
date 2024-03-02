import { Position } from '../../types/Position.interface';
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
