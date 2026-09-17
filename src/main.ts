import Phaser from 'phaser';
import './main.scss';
import { MenuScene } from './game/scenes/MenuScene/MenuScene';
import { GameScene } from './game/scenes/GameScene';
import { PauseScene } from './game/scenes/PauseScene/PauseScene';
import { InputState } from './game/input/InputState';
import { MobileControls } from './ui/MobileControls/MobileControls';
import { GamepadStatus } from './ui/GamepadStatus/GamepadStatus';

const inputState = new InputState();

const gameConfig: Phaser.Types.Core.GameConfig = {
    mode: Phaser.Scale.FIT,
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'phaser-game-container',
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
    input: {
        gamepad: true,
    },
    scene: [new MenuScene(), new GameScene(inputState), new PauseScene()],
};

const game = new Phaser.Game(gameConfig);

new MobileControls(inputState);
new GamepadStatus();

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
