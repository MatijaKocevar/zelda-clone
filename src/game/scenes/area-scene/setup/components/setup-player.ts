import Phaser from 'phaser';
import { Enemy } from '../../../../entities/enemy/enemy';
import { Player } from '../../../../entities/player/player';
import { AreaDefinition } from '../../../../areas/area.types';

const DEBUG_FULL_MAP = false;
const TARGET_VIEW_HEIGHT = 720;

function applyGameplayZoom(camera: Phaser.Cameras.Scene2D.Camera): void {
    camera.setZoom(camera.height / TARGET_VIEW_HEIGHT);
}

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
        applyGameplayZoom(camera);

        if (player.sprite) {
            camera.startFollow(player.sprite, true, 1, 1);
        }

        const handleResize = () => applyGameplayZoom(camera);
        scene.scale.on(Phaser.Scale.Events.RESIZE, handleResize);
        scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            scene.scale.off(Phaser.Scale.Events.RESIZE, handleResize);
        });
    }

    return player;
}
