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

        AssetLoader.loadImages(this.scene, [...this.area.backgroundImages, ...this.area.foregroundImages]);
    }

    create() {
        const map = this.scene.make.tilemap({ key: this.area.key });
        this.setupManager = new SetupManager(this.scene, map, this.area);
        this.updateManager = new UpdateManager(this.setupManager.player, this.setupManager.enemies);
    }

    update() {
        this.updateManager.update();
    }
}
