import Phaser from 'phaser';
import { Enemy } from '../../../../entities/enemy/enemy';
import { Player } from '../../../../entities/player/player';
import { AreaDefinition, AreaSpawn } from '../../../../areas/area.types';

const DEBUG_FULL_MAP = import.meta.env.DEV;
const TARGET_VIEW_HEIGHT = 720;

function applyGameplayZoom(camera: Phaser.Cameras.Scene2D.Camera): void {
    const zoom = Math.max(1, Math.round(camera.height / TARGET_VIEW_HEIGHT));
    camera.setZoom(zoom);
}

export function setupPlayer(
    scene: Phaser.Scene,
    enemies: Enemy[],
    map: Phaser.Tilemaps.Tilemap,
    area: AreaDefinition,
    spawnOverride?: AreaSpawn,
): Player {
    const spawn = spawnOverride ?? area.playerSpawn ?? { x: map.widthInPixels / 2, y: map.heightInPixels / 2 };

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
        const applyCameraBounds = () => {
            const viewWidth = camera.width / camera.zoom;
            const viewHeight = camera.height / camera.zoom;
            const offsetX = (worldWidth - viewWidth) / 2;
            const offsetY = (worldHeight - viewHeight) / 2;

            camera.setBounds(
                Math.min(0, offsetX),
                Math.min(0, offsetY),
                Math.max(worldWidth, viewWidth),
                Math.max(worldHeight, viewHeight),
            );
        };

        applyGameplayZoom(camera);
        applyCameraBounds();

        if (player.sprite) {
            camera.startFollow(player.sprite, true, 1, 1);
        }

        const handleResize = () => {
            applyGameplayZoom(camera);
            applyCameraBounds();
        };
        scene.scale.on(Phaser.Scale.Events.RESIZE, handleResize);
        scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            scene.scale.off(Phaser.Scale.Events.RESIZE, handleResize);
        });
    }

    return player;
}
