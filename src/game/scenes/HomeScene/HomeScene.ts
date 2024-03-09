import { Collisions } from '../../entities/Collisions/Collisions';
import { Player } from '../../entities/Player/Player';
import { Animations } from '../../mechanics/Animations/Animations';
import { Enemy } from '../../entities/Enemy/Enemy';
import { homeImageAssets, homeSpriteSheetAssets } from './assets/HomeAssets';
import { UpdateManager } from './update/UpdateManager';
import { SetupManager } from './setup/SetupManager';
import { AssetLoader } from '../../utils/AssetLoader/AssetLoader';

export class HomeScene {
    player: Player | undefined;
    enemies: Enemy[] = [];
    animations: Animations | undefined;
    collisions: Collisions | undefined;
    scene: Phaser.Scene;
    setupManager!: SetupManager;
    updateManager!: UpdateManager;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    preload() {
        AssetLoader.loadImages(this.scene, homeImageAssets);
        AssetLoader.loadSpriteSheets(this.scene, homeSpriteSheetAssets);
    }

    create() {
        this.setupManager = new SetupManager(this.scene);
        this.updateManager = new UpdateManager(this.setupManager.player, this.setupManager.enemies);
    }

    update() {
        this.updateManager.update();
    }
}
