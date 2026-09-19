import { Collisions } from '../../entities/Collisions/Collisions';
import { Player } from '../../entities/Player/Player';
import { Animations } from '../../mechanics/Animations/Animations';
import { Enemy } from '../../entities/Enemy/Enemy';
import { AreaDefinition } from '../../areas/Area.types';
import { UpdateManager } from './update/UpdateManager';
import { SetupManager } from './setup/SetupManager';
import { AssetLoader } from '../../utils/AssetLoader/AssetLoader';

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
