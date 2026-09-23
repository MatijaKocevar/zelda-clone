import Phaser from 'phaser';
import './main.scss';
import { MenuScene } from './game/scenes/menu-scene/menu-scene';
import { GameScene } from './game/scenes/game-scene';
import { PauseScene } from './game/scenes/pause-scene/pause-scene';
import { GameOverScene } from './game/scenes/game-over-scene/game-over-scene';
import { WinScene } from './game/scenes/win-scene/win-scene';
import { PrologueScene } from './game/scenes/prologue-scene/prologue-scene';
import { CinematicScene } from './game/scenes/cinematic-scene/cinematic-scene';
import { DialogScene } from './game/scenes/dialog-scene/dialog-scene';
import { InputState } from './game/input/input-state';
import { MobileControls } from './ui/mobile-controls/mobile-controls';
import { GamepadStatus } from './ui/gamepad-status/gamepad-status';
import { RotateOverlay } from './ui/rotate-overlay/rotate-overlay';
import { PauseControl } from './ui/pause-control/pause-control';
import { FpsCounter } from './ui/fps-counter/fps-counter';
import { getMobileControlsVisible, onMobileControlsVisibilityChange } from './game/input/mobile-controls-state';

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
    scene: [
        new MenuScene(),
        new GameScene(inputState),
        new PauseScene(),
        new GameOverScene(),
        new WinScene(),
        new PrologueScene(),
        new CinematicScene(),
        new DialogScene(),
    ],
};

const game = new Phaser.Game(gameConfig);

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

if (import.meta.env.DEV) {
    new FpsCounter(game);
}
