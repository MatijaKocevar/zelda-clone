import { Enemy } from '../Enemy/Enemy';
import { Player } from '../Player/Player';

export interface ICollisionRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ICollisionBlock {
    scene: Phaser.Scene;
    player: Player;
    enemies: Enemy[];
    collisionRects: ICollisionRect[];
}
