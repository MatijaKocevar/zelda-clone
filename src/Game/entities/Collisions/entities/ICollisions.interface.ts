import { Enemy } from '../../Enemy/Enemy';
import { Player } from '../../Player/Player';

export interface ICollisionBlock {
    scene: Phaser.Scene;
    player: Player;
    enemy: Enemy;
    collisions2dArray: number[][];
}
