import { Enemy } from '../enemy/enemy';
import { Player } from '../player/player';

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
