import Phaser from 'phaser';
import { ICollisionRect } from '../../../entities/collisions/collisions.types';

const COLLISION_LAYER_PREFIX = 'collisions';
const HOLE_PROPERTY = 'hole';

type CellMap = Map<number, Set<number>>;

function isCollisionLayer(name: string): boolean {
    return name === COLLISION_LAYER_PREFIX || name.startsWith(`${COLLISION_LAYER_PREFIX}-`);
}

function readProperty(object: Phaser.Types.Tilemaps.TiledObject, name: string): unknown {
    return object.properties?.find((entry: { name: string }) => entry.name === name)?.value;
}

function isInsidePolygon(x: number, y: number, points: Phaser.Types.Math.Vector2Like[]): boolean {
    let inside = false;

    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const { x: xi, y: yi } = points[i];
        const { x: xj, y: yj } = points[j];

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
            inside = !inside;
        }
    }

    return inside;
}

function addCell(cells: CellMap, x: number, y: number): void {
    const row = cells.get(y);

    if (row) {
        row.add(x);
        return;
    }

    cells.set(y, new Set([x]));
}

function polygonToCells(
    object: Phaser.Types.Tilemaps.TiledObject,
    tileWidth: number,
    tileHeight: number,
): CellMap {
    const cells: CellMap = new Map();
    const polygon = object.polygon;

    if (!polygon || polygon.length < 3) {
        return cells;
    }

    const originX = object.x ?? 0;
    const originY = object.y ?? 0;
    const points = polygon.map((point) => ({ x: originX + point.x, y: originY + point.y }));
    const minTileX = Math.floor(Math.min(...points.map((point) => point.x)) / tileWidth);
    const maxTileX = Math.ceil(Math.max(...points.map((point) => point.x)) / tileWidth);
    const minTileY = Math.floor(Math.min(...points.map((point) => point.y)) / tileHeight);
    const maxTileY = Math.ceil(Math.max(...points.map((point) => point.y)) / tileHeight);

    for (let tileY = minTileY; tileY < maxTileY; tileY++) {
        for (let tileX = minTileX; tileX < maxTileX; tileX++) {
            const centerX = (tileX + 0.5) * tileWidth;
            const centerY = (tileY + 0.5) * tileHeight;

            if (isInsidePolygon(centerX, centerY, points)) {
                addCell(cells, tileX, tileY);
            }
        }
    }

    return cells;
}

function mergeCells(target: CellMap, source: CellMap): void {
    source.forEach((xs, tileY) => xs.forEach((tileX) => addCell(target, tileX, tileY)));
}

function subtractCells(target: CellMap, source: CellMap): void {
    source.forEach((xs, tileY) => xs.forEach((tileX) => target.get(tileY)?.delete(tileX)));
}

function cellsToRects(cells: CellMap, tileWidth: number, tileHeight: number): ICollisionRect[] {
    const rects: ICollisionRect[] = [];

    cells.forEach((xs, tileY) => {
        const sorted = Array.from(xs).sort((a, b) => a - b);

        if (sorted.length === 0) {
            return;
        }

        let runStart = sorted[0];

        for (let index = 1; index < sorted.length; index++) {
            if (sorted[index] === sorted[index - 1] + 1) {
                continue;
            }

            rects.push({
                x: runStart * tileWidth,
                y: tileY * tileHeight,
                width: (sorted[index - 1] - runStart + 1) * tileWidth,
                height: tileHeight,
            });
            runStart = sorted[index];
        }

        rects.push({
            x: runStart * tileWidth,
            y: tileY * tileHeight,
            width: (sorted[sorted.length - 1] - runStart + 1) * tileWidth,
            height: tileHeight,
        });
    });

    return rects;
}

export function getMapCollisionRects(map: Phaser.Tilemaps.Tilemap): ICollisionRect[] {
    const rects: ICollisionRect[] = [];
    const solidCells: CellMap = new Map();
    const holeCells: CellMap = new Map();

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
            if (object.polygon && object.polygon.length >= 3) {
                const cells = polygonToCells(object, map.tileWidth, map.tileHeight);
                mergeCells(readProperty(object, HOLE_PROPERTY) === true ? holeCells : solidCells, cells);
                return;
            }

            const width = object.width ?? 0;
            const height = object.height ?? 0;

            if (width > 0 && height > 0) {
                rects.push({ x: object.x ?? 0, y: object.y ?? 0, width, height });
            }
        });
    });

    subtractCells(solidCells, holeCells);
    return rects.concat(cellsToRects(solidCells, map.tileWidth, map.tileHeight));
}
