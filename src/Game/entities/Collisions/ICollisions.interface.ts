import { Player } from '../Player/Player';

export interface ICollisionBlock {
    scene: Phaser.Scene;
    player: Player;
    collisions2dArray: number[][];
}
