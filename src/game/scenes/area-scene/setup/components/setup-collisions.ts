import Phaser from 'phaser';
import { Collisions } from '../../../../entities/collisions/collisions';
import { ICollisionRect } from '../../../../entities/collisions/collisions.types';
import { Enemy } from '../../../../entities/enemy/enemy';
import { Player } from '../../../../entities/player/player';

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
