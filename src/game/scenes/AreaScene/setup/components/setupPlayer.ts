import { Enemy } from '../../../../entities/Enemy/Enemy';
import { Player } from '../../../../entities/Player/Player';
import { AreaDefinition } from '../../../../areas/Area.types';

const DEBUG_FULL_MAP = false;

export function setupPlayer(
    scene: Phaser.Scene,
    enemies: Enemy[],
    map: Phaser.Tilemaps.Tilemap,
    area: AreaDefinition,
): Player {
    const spawn = area.playerSpawn ?? { x: map.widthInPixels / 2, y: map.heightInPixels / 2 };

    const player = new Player({
        position: spawn,
        scene,
        enemies,
    });

    const worldWidth = map.widthInPixels;
    const worldHeight = map.heightInPixels;

    scene.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    const camera = scene.cameras.main;

    if (DEBUG_FULL_MAP) {
        camera.stopFollow();
        camera.useBounds = false;
        camera.setZoom(Math.min(camera.width / worldWidth, camera.height / worldHeight));
        camera.centerOn(worldWidth / 2, worldHeight / 2);
    } else {
        camera.setBounds(0, 0, worldWidth, worldHeight);

        if (player.sprite) {
            camera.startFollow(player.sprite, true, 1, 1);
        }
    }

    return player;
}
