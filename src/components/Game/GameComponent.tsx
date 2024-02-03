import { useEffect } from 'react';
import Phaser from 'phaser';
import { GameScene } from './GameScene/GameScene';

const GameComponent = () => {
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
                    debug: true,
                },
            },
            scene: GameScene,
        };

        const game = new Phaser.Game(gameConfig);

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div id="phaser-game-container"></div>;
};

export default GameComponent;
