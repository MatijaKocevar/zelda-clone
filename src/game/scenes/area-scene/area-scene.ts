import Phaser from 'phaser';
import { Collisions } from '../../entities/collisions/collisions';
import { Player } from '../../entities/player/player';
import { Animations } from '../../mechanics/animations/animations';
import { Enemy } from '../../entities/enemy/enemy';
import { AreaDefinition, AreaSpawn } from '../../areas/area.types';
import { UpdateManager } from './update/update-manager';
import { SetupManager } from './setup/setup-manager';
import { AssetLoader } from '../../utils/asset-loader/asset-loader';

const SPRITE_LAYER_NAMES = ['Buildings', 'Decor'];

interface TileBounds {
    top: number;
    bottom: number;
}

export class AreaScene {
    player: Player | undefined;
    enemies: Enemy[] = [];
    animations: Animations | undefined;
    collisions: Collisions | undefined;
    scene: Phaser.Scene;
    area: AreaDefinition;
    setupManager!: SetupManager;
    updateManager!: UpdateManager;
    private spawn?: AreaSpawn;

    constructor(scene: Phaser.Scene, area: AreaDefinition, spawn?: AreaSpawn) {
        this.scene = scene;
        this.area = area;
        this.spawn = spawn;
    }

    preload() {
        if (!this.scene.cache.tilemap.exists(this.area.key)) {
            this.scene.load.tilemapTiledJSON(this.area.key, this.area.mapUrl);
        }

        AssetLoader.loadImages(this.scene, [
            ...this.area.backgroundImages,
            ...this.area.foregroundImages,
            ...(this.area.tilesetImages ?? []),
        ]);
    }

    create() {
        this.scene.cameras.main.setBackgroundColor(this.area.backgroundColor ?? 'rgba(0,0,0,0)');

        const map = this.scene.make.tilemap({ key: this.area.key });
        this.createTileLayers(map);
        this.setupManager = new SetupManager(this.scene, map, this.area, this.spawn);
        this.updateManager = new UpdateManager(this.setupManager.player, this.setupManager.enemies);
    }

    update() {
        this.updateManager.update();
    }

    private createTileLayers(map: Phaser.Tilemaps.Tilemap): void {
        const tilesetImages = this.area.tilesetImages;

        if (!tilesetImages?.length) {
            return;
        }

        const textureKeys = new Map(tilesetImages.map(({ name, key }) => [name, key]));

        const tilesets = tilesetImages
            .map(({ name, key }) => map.addTilesetImage(name, key))
            .filter((tileset): tileset is Phaser.Tilemaps.Tileset => Boolean(tileset))
            .map((tileset) => {
                // Tiled anchors tiles to the bottom-left of their cell.
                tileset.tileOffset.set(0, tileset.tileHeight - map.tileHeight);

                return tileset;
            });

        let depth = -50;

        map.layers.forEach((layer) => {
            if (layer.name === 'collisions') {
                return;
            }

            if (SPRITE_LAYER_NAMES.includes(layer.name)) {
                this.createSortedSprites(map, layer, textureKeys);
                return;
            }

            map.createLayer(layer.name, tilesets)?.setDepth(depth);
            depth += 1;
        });
    }

    private createSortedSprites(
        map: Phaser.Tilemaps.Tilemap,
        layer: Phaser.Tilemaps.LayerData,
        textureKeys: Map<string, string>,
    ): void {
        const frameBounds = new Map<string, TileBounds | null>();

        for (let column = 0; column < layer.width; column++) {
            let runDepth: number | null = null;
            let connectsUp = false;

            for (let row = layer.height - 1; row >= 0; row--) {
                const tile = layer.data[row][column];

                if (!tile || tile.index < 0) {
                    runDepth = null;
                    connectsUp = false;
                    continue;
                }

                const tileset = map.tilesets.find((candidate) => candidate.containsTileIndex(tile.index));
                const textureKey = tileset ? textureKeys.get(tileset.name) : undefined;

                if (!tileset || !textureKey) {
                    runDepth = null;
                    connectsUp = false;
                    continue;
                }

                const localId = tile.index - tileset.firstgid;
                const tileColumn = localId % tileset.columns;
                const tileRow = Math.floor(localId / tileset.columns);
                const sx = tileset.tileMargin + tileColumn * (tileset.tileWidth + tileset.tileSpacing);
                const sy = tileset.tileMargin + tileRow * (tileset.tileHeight + tileset.tileSpacing);
                const frameName = `tile-${tile.index}`;
                const texture = this.scene.textures.get(textureKey);

                if (!texture.has(frameName)) {
                    texture.add(frameName, 0, sx, sy, tileset.tileWidth, tileset.tileHeight);
                }

                const frameKey = `${textureKey}:${frameName}`;
                let bounds = frameBounds.get(frameKey);

                if (bounds === undefined) {
                    bounds = this.getOpaqueBounds(texture, sx, sy, tileset.tileWidth, tileset.tileHeight);
                    frameBounds.set(frameKey, bounds);
                }

                if (!bounds) {
                    runDepth = null;
                    connectsUp = false;
                    continue;
                }

                const tileOffsetY = tileset.tileHeight - map.tileHeight;
                const x = tile.pixelX;
                const y = tile.pixelY - tileOffsetY;
                const reachesBottom = bounds.bottom === tileset.tileHeight - 1;
                const joinsRun: boolean = runDepth !== null && connectsUp && reachesBottom;
                const depth: number = joinsRun && runDepth !== null ? runDepth : y + bounds.bottom + 1;

                runDepth = depth;
                connectsUp = bounds.top === 0;

                this.scene.add.image(x, y, textureKey, frameName).setOrigin(0, 0).setDepth(depth);
            }
        }
    }

    private getOpaqueBounds(
        texture: Phaser.Textures.Texture,
        sx: number,
        sy: number,
        width: number,
        height: number,
    ): TileBounds | null {
        const source = texture.getSourceImage() as HTMLImageElement | HTMLCanvasElement;
        const canvas = document.createElement('canvas');
        canvas.width = source.width;
        canvas.height = source.height;

        const context = canvas.getContext('2d');

        if (!context) {
            return null;
        }

        context.drawImage(source, 0, 0);
        const { data } = context.getImageData(sx, sy, width, height);
        let top: number | null = null;
        let bottom: number | null = null;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (data[(y * width + x) * 4 + 3] > 128) {
                    if (top === null) {
                        top = y;
                    }

                    bottom = y;
                    break;
                }
            }
        }

        return top === null || bottom === null ? null : { top, bottom };
    }
}
