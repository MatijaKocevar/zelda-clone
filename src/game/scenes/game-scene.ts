import Phaser from 'phaser';
import { InputState } from '../input/input-state';
import { AreaScene } from './area-scene/area-scene';
import { AssetLoader } from '../utils/asset-loader/asset-loader';
import { globalSpriteSheetAssets } from '../assets/global-assets';
import { defaultAreaKey, getArea } from '../areas/areas';
import { AreaDoor, AreaSpawn } from '../areas/area.types';
import { DOOR_ENTERED_EVENT, ENEMIES_DEFEATED_EVENT, TOGGLE_PAUSE_EVENT } from '../events';
import { resetDefeatedEnemies } from '../state/defeated-enemies';

interface GameSceneData {
    area?: string;
    spawn?: AreaSpawn;
}

export class GameScene extends Phaser.Scene {
    areaScene!: AreaScene;
    inputState: InputState;
    areaKey: string = defaultAreaKey;
    private returnSpawn?: AreaSpawn;

    constructor(inputState: InputState) {
        super({ key: 'GameScene' });
        this.inputState = inputState;
    }

    init(data: GameSceneData) {
        if (!data.area) {
            resetDefeatedEnemies();
        }

        this.areaKey = data.area ?? defaultAreaKey;
        this.areaScene = new AreaScene(this, getArea(this.areaKey), data.spawn);
    }

    preload() {
        AssetLoader.loadSpriteSheets(this, globalSpriteSheetAssets);
        this.areaScene.preload();
    }

    create() {
        this.areaScene.create();

        this.events.off('player-died');
        this.events.off(DOOR_ENTERED_EVENT, this.handleDoorEntered);
        this.events.on(DOOR_ENTERED_EVENT, this.handleDoorEntered);
        this.events.off(ENEMIES_DEFEATED_EVENT, this.handleVictory);
        this.events.on(ENEMIES_DEFEATED_EVENT, this.handleVictory);
        this.input.keyboard?.removeAllListeners('keydown-ESC');

        this.input.keyboard?.on('keydown-ESC', this.pauseGame);

        window.removeEventListener(TOGGLE_PAUSE_EVENT, this.togglePause);
        window.addEventListener(TOGGLE_PAUSE_EVENT, this.togglePause);

        this.events.once('shutdown', () => {
            window.removeEventListener(TOGGLE_PAUSE_EVENT, this.togglePause);
        });

        this.events.once('player-died', () => {
            this.scene.pause();
            this.scene.launch('GameOverScene');
        });
    }

    update() {
        this.areaScene.update();
    }

    goToArea(key: string, spawn?: AreaSpawn) {
        this.scene.restart({ area: key, spawn });
    }

    private handleDoorEntered = (door: AreaDoor) => {
        if (!door.target) {
            return;
        }

        if (!door.spawn) {
            this.goToArea(door.target, this.returnSpawn);
            return;
        }

        this.returnSpawn = { x: door.x + door.width / 2, y: door.y + door.height + 40 };

        this.goToArea(door.target, door.spawn);
    };

    private handleVictory = () => {
        if (!this.scene.isActive('GameScene')) {
            return;
        }

        this.scene.pause();
        this.scene.launch('WinScene');
    };

    private pauseGame = () => {
        if (this.scene.isActive('PauseScene')) {
            return;
        }

        this.scene.pause();
        this.scene.launch('PauseScene');
    };

    private togglePause = () => {
        if (this.scene.isActive('PauseScene')) {
            this.scene.stop('PauseScene');
            this.scene.resume();
            return;
        }

        this.pauseGame();
    };
}
