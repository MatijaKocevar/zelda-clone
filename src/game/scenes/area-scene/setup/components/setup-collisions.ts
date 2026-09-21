import Phaser from 'phaser';
import { Collisions } from '../../../../entities/collisions/collisions';
import { ICollisionRect } from '../../../../entities/collisions/collisions.types';
import { Enemy } from '../../../../entities/enemy/enemy';
import { Player } from '../../../../entities/player/player';

const DEBUG_COLLISIONS = true;
const DEBUG_FILL_COLOR = 0xef4444;
const DEBUG_FILL_ALPHA = 0.6;

function drawCollisionDebug(scene: Phaser.Scene, collisionRects: ICollisionRect[]): void {
    const graphics = scene.add.graphics().setDepth(Number.MAX_VALUE);

    graphics.fillStyle(DEBUG_FILL_COLOR, DEBUG_FILL_ALPHA);

    collisionRects.forEach(({ x, y, width, height }) => {
        graphics.fillRect(x, y, width, height);
    });
}

export function setupCollisions(
    scene: Phaser.Scene,
    player: Player,
    enemies: Enemy[],
    collisionRects: ICollisionRect[],
): Collisions {
    if (DEBUG_COLLISIONS) {
        scene.physics.world.createDebugGraphic();
        scene.physics.world.defaults.debugShowStaticBody = false;
        drawCollisionDebug(scene, collisionRects);
    }

    return new Collisions({
        collisionRects: collisionRects,
        player: player,
        enemies: enemies,
        scene: scene,
    });
}
