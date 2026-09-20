import Phaser from 'phaser';
import { Collisions } from '../../entities/collisions/collisions';
import { Player } from '../../entities/player/player';
import { Animations } from '../../mechanics/animations/animations';
import { Enemy } from '../../entities/enemy/enemy';
import { AreaDefinition } from '../../areas/area.types';
import { UpdateManager } from './update/update-manager';
import { SetupManager } from './setup/setup-manager';
import { AssetLoader } from '../../utils/asset-loader/asset-loader';

export class AreaScene {
    player: Player | undefined;
    enemies: Enemy[] = [];
    animations: Animations | undefined;
    collisions: Collisions | undefined;
    scene: Phaser.Scene;
    area: AreaDefinition;
    setupManager!: SetupManager;
    updateManager!: UpdateManager;

    constructor(scene: Phaser.Scene, area: AreaDefinition) {
        this.scene = scene;
        this.area = area;
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
        const map = this.scene.make.tilemap({ key: this.area.key });
        this.createTileLayers(map);
        this.setupManager = new SetupManager(this.scene, map, this.area);
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

        const tilesets = tilesetImages
            .map(({ name, key }) => map.addTilesetImage(name, key))
            .filter((tileset): tileset is Phaser.Tilemaps.Tileset => Boolean(tileset))
            .map((tileset) => {
                // Tiled anchors tiles larger than the grid to the bottom-left of their cell.
                tileset.tileOffset.set(0, Math.max(0, tileset.tileHeight - map.tileHeight));

                return tileset;
            });

        let depth = -50;

        map.layers.forEach((layer) => {
            if (layer.name === 'collisions') {
                return;
            }

            map.createLayer(layer.name, tilesets)?.setDepth(depth);
            depth += 1;
        });
    }
}
