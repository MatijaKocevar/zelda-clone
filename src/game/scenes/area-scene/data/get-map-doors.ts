import Phaser from 'phaser';
import { AreaDoor } from '../../../areas/area.types';

function readProperty(object: Phaser.Types.Tilemaps.TiledObject, name: string): unknown {
    return object.properties?.find((entry: { name: string }) => entry.name === name)?.value;
}

export function getMapDoors(map: Phaser.Tilemaps.Tilemap): AreaDoor[] {
    const doors: AreaDoor[] = [];

    map.objects.forEach((layer) => {
        if (layer.name !== 'doors') {
            return;
        }

        layer.objects.forEach((object) => {
            const width = object.width ?? 0;
            const height = object.height ?? 0;

            if (width <= 0 || height <= 0) {
                return;
            }

            const target = readProperty(object, 'target');
            const spawnX = readProperty(object, 'spawnX');
            const spawnY = readProperty(object, 'spawnY');

            doors.push({
                x: object.x ?? 0,
                y: object.y ?? 0,
                width,
                height,
                target: typeof target === 'string' ? target : undefined,
                spawn: typeof spawnX === 'number' && typeof spawnY === 'number' ? { x: spawnX, y: spawnY } : undefined,
            });
        });
    });

    return doors;
}
