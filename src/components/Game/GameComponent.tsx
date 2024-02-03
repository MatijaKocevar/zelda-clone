import { createRef, useEffect } from 'react';
import Phaser from 'phaser';
import { GameScene } from './GameScene/GameScene';

const preventDefaults = (event: KeyboardEvent) => {
    if (
        event.shiftKey &&
        (event.key === 'd' ||
            event.key === 'D' ||
            event.key === 's' ||
            event.key === 'S' ||
            event.key === 'a' ||
            event.key === 'A' ||
            event.key === 'w' ||
            event.key === 'W')
    ) {
        event.preventDefault();
    }
};

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
            width: 800,
            height: 600,
            parent: 'phaser-game-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
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
