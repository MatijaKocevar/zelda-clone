import { Enemy } from '../../../../entities/Enemy/Enemy';
import { Player } from '../../../../entities/Player/Player';

export const WORLD_WIDTH = 5120;
export const WORLD_HEIGHT = 2880;

const DEBUG_FULL_MAP = false;

export function setupPlayer(scene: Phaser.Scene, enemies: Enemy[]): Player {
    const player = new Player({
        position: { x: 2400, y: 1250 },
        scene,
        enemies,
    });

    scene.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    const camera = scene.cameras.main;
    camera.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    if (DEBUG_FULL_MAP) {
        camera.stopFollow();
        camera.setZoom(Math.min(camera.width / WORLD_WIDTH, camera.height / WORLD_HEIGHT));
        camera.centerOn(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
    } else if (player.sprite) {
        camera.startFollow(player.sprite, true, 1, 1);
    }

    return player;
}
