import Phaser from 'phaser';
import './main.scss';
import { MenuScene } from './game/scenes/MenuScene/MenuScene';
import { GameScene } from './game/scenes/GameScene';
import { PauseScene } from './game/scenes/PauseScene/PauseScene';
import { GameOverScene } from './game/scenes/GameOverScene/GameOverScene';
import { InputState } from './game/input/InputState';
import { MobileControls } from './ui/MobileControls/MobileControls';
import { GamepadStatus } from './ui/GamepadStatus/GamepadStatus';
import { RotateOverlay } from './ui/RotateOverlay/RotateOverlay';
import { PauseControl } from './ui/PauseControl/PauseControl';
import {
    getMobileControlsVisible,
    onMobileControlsVisibilityChange,
} from './game/input/MobileControlsState';

const inputState = new InputState();

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'phaser-game-container',
        width: '100%',
        height: '100%',
    },
    render: {
        pixelArt: true,
        roundPixels: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
        },
    },
    scene: [new MenuScene(), new GameScene(inputState), new PauseScene(), new GameOverScene()],
};

new Phaser.Game(gameConfig);

const mobileControls = new MobileControls(inputState);
const pauseControl = new PauseControl();

let gamepadConnected = false;

const updatePauseButton = () => {
    pauseControl.setVisible(getMobileControlsVisible() || !gamepadConnected);
};

mobileControls.setVisible(getMobileControlsVisible());
onMobileControlsVisibilityChange((visible) => {
    mobileControls.setVisible(visible);
    updatePauseButton();
});
updatePauseButton();

new GamepadStatus({
    onConnectionChange: (connected) => {
        gamepadConnected = connected;
        updatePauseButton();
    },
});
new RotateOverlay();
