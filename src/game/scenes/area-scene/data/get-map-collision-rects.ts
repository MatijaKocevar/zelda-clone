import Phaser from 'phaser';
import { ICollisionRect } from '../../../entities/collisions/collisions.types';

const COLLISION_LAYER_PREFIX = 'collisions';

function isCollisionLayer(name: string): boolean {
    return name === COLLISION_LAYER_PREFIX || name.startsWith(`${COLLISION_LAYER_PREFIX}-`);
}

export function getMapCollisionRects(map: Phaser.Tilemaps.Tilemap): ICollisionRect[] {
    const rects: ICollisionRect[] = [];

    map.layers.forEach((layer) => {
        if (!isCollisionLayer(layer.name)) {
            return;
        }

        layer.data.forEach((row) => {
            row.forEach((tile) => {
                if (tile && tile.index >= 0) {
                    rects.push({
                        x: tile.x * layer.tileWidth,
                        y: tile.y * layer.tileHeight,
                        width: layer.tileWidth,
                        height: layer.tileHeight,
                    });
                }
            });
        });
    });

    map.objects.forEach((layer) => {
        if (!isCollisionLayer(layer.name)) {
            return;
        }

        layer.objects.forEach((object) => {
            const width = object.width ?? 0;
            const height = object.height ?? 0;

            if (width > 0 && height > 0) {
                rects.push({ x: object.x ?? 0, y: object.y ?? 0, width, height });
            }
        });
    });

    return rects;
}
