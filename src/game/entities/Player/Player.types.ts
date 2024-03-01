import { Position } from '../../types/Position.interface';

export interface IPlayer {
    scene: Phaser.Scene;
    position: Position;
}

export interface IPlayerStats {
    health: number;
    maxHealth: number;
    damage: number;
}
