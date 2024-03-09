import { Collisions } from '../../../../entities/Collisions/Collisions';
import { Enemy } from '../../../../entities/Enemy/Enemy';
import { Player } from '../../../../entities/Player/Player';
import { getHomeCollisions2dArray } from '../../data/homeCollisions';

export function setupCollisions(scene: Phaser.Scene, player: Player, enemies: Enemy[]): Collisions {
    return new Collisions({
        collisions2dArray: getHomeCollisions2dArray(),
        player: player,
        enemies: enemies,
        scene: scene,
    });
}
