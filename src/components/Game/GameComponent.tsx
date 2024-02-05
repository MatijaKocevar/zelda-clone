import { createRef, useEffect } from 'react';
import Phaser from 'phaser';
import { GameScene } from './GameScene/GameScene';

const preventDefaults = (event: KeyboardEvent) => {};

const GameComponent = () => {
    const gameComponentRef = createRef<HTMLDivElement>();

    useEffect(() => {
        document.addEventListener('keydown', preventDefaults);

        return () => {
            document.removeEventListener('keydown', preventDefaults);
        };
    }, []);

    useEffect(() => {
        const gameConfig: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: innerWidth,
            height: innerHeight,
            parent: 'phaser-game-container',
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

export default GameComponent;
