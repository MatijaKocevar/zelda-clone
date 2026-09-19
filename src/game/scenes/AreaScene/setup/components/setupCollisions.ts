import { Collisions } from '../../../../entities/Collisions/Collisions';
import { ICollisionRect } from '../../../../entities/Collisions/Collisions.types';
import { Enemy } from '../../../../entities/Enemy/Enemy';
import { Player } from '../../../../entities/Player/Player';

export function setupCollisions(
    scene: Phaser.Scene,
    player: Player,
    enemies: Enemy[],
    collisionRects: ICollisionRect[],
): Collisions {
    return new Collisions({
        collisionRects: collisionRects,
        player: player,
        enemies: enemies,
        scene: scene,
    });
}
