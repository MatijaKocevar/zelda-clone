import Phaser from 'phaser';
import { AreaDoor } from '../../../areas/area.types';

function readProperty(object: Phaser.Types.Tilemaps.TiledObject, name: string): unknown {
    return object.properties?.find((entry: { name: string }) => entry.name === name)?.value;
}

function readFlagList(object: Phaser.Types.Tilemaps.TiledObject, name: string): string[] | undefined {
    const value = readProperty(object, name);

    if (typeof value !== 'string') {
        return undefined;
    }

    const flags = value
        .split(',')
        .map((flag) => flag.trim())
        .filter(Boolean);

    return flags.length ? flags : undefined;
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
            const lockedDialog = readProperty(object, 'lockedDialog');

            doors.push({
                x: object.x ?? 0,
                y: object.y ?? 0,
                width,
                height,
                target: typeof target === 'string' ? target : undefined,
                spawn: typeof spawnX === 'number' && typeof spawnY === 'number' ? { x: spawnX, y: spawnY } : undefined,
                requiresFlags: readFlagList(object, 'requiresFlags'),
                forbidsFlags: readFlagList(object, 'forbidsFlags'),
                lockedDialog: typeof lockedDialog === 'string' ? lockedDialog : undefined,
            });
        });
    });

    return doors;
}
