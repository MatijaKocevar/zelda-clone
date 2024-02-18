import { createRef, useEffect } from 'react';
import Phaser from 'phaser';
import { GameScene } from './scene/GameScene';
import './Game.scss';

const Game = () => {
    const gameComponentRef = createRef<HTMLDivElement>();

    useEffect(() => {
        const gameConfig: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 1280,
            height: 720,
            parent: 'phaser-game-container',
            render: {
                pixelArt: true,
                roundPixels: true,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: GameScene,
        };

        const game = new Phaser.Game(gameConfig);

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref={gameComponentRef} id="phaser-game-container"></div>;
};

export default Game;
