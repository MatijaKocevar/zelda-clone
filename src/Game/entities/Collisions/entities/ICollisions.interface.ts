import { Enemy } from '../../Enemy/Enemy';
import { Player } from '../../Player/Player';

export interface ICollisionBlock {
    scene: Phaser.Scene;
    player: Player;
    enemies: Enemy[];
    collisions2dArray: number[][];
}
