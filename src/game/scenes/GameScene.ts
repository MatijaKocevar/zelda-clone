import { InputState } from '../input/InputState';
import { AreaScene } from './AreaScene/AreaScene';
import { AssetLoader } from '../utils/AssetLoader/AssetLoader';
import { globalSpriteSheetAssets } from '../assets/globalAssets';
import { defaultAreaKey, getArea } from '../areas/areas';
import { TOGGLE_PAUSE_EVENT } from '../events';

interface GameSceneData {
    area?: string;
}

export class GameScene extends Phaser.Scene {
    areaScene!: AreaScene;
    inputState: InputState;
    areaKey: string = defaultAreaKey;

    constructor(inputState: InputState) {
        super({ key: 'GameScene' });
        this.inputState = inputState;
    }

    init(data: GameSceneData) {
        this.areaKey = data.area ?? defaultAreaKey;
        this.areaScene = new AreaScene(this, getArea(this.areaKey));
    }

    preload() {
        AssetLoader.loadSpriteSheets(this, globalSpriteSheetAssets);
        this.areaScene.preload();
    }

    create() {
        this.areaScene.create();

        this.events.off('player-died');
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

    goToArea(key: string) {
        this.scene.restart({ area: key });
    }

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
