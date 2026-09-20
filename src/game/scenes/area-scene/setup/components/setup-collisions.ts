import Phaser from 'phaser';
import { Collisions } from '../../../../entities/collisions/collisions';
import { ICollisionRect } from '../../../../entities/collisions/collisions.types';
import { Enemy } from '../../../../entities/enemy/enemy';
import { Player } from '../../../../entities/player/player';

const DEBUG_COLLISIONS = true;

export function setupCollisions(
    scene: Phaser.Scene,
    player: Player,
    enemies: Enemy[],
    collisionRects: ICollisionRect[],
): Collisions {
    if (DEBUG_COLLISIONS) {
        scene.physics.world.createDebugGraphic();
    }

    return new Collisions({
        collisionRects: collisionRects,
        player: player,
        enemies: enemies,
        scene: scene,
    });
}
