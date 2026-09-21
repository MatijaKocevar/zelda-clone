import Phaser from 'phaser';
import { Position } from '../../types/position.interface';
import { Enemy } from '../enemy/enemy';

export interface IPlayer {
    scene: Phaser.Scene;
    position: Position;
    enemies: Enemy[];
}

export interface IPlayerStats {
    health: number;
    maxHealth: number;
    damage: number;
    armor: number;
    mana: number;
    maxMana: number;
}
