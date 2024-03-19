import { useRef, useEffect } from 'react';
import Phaser from 'phaser';
import { GameScene } from '../scenes/GameScene';

type UsePhaserGameProps = {
    gameContainerId: string;
    keysPressedRef: React.MutableRefObject<string[]>;
    lastKeyRef: React.MutableRefObject<string>;
};

export const usePhaserGame = ({ gameContainerId, keysPressedRef, lastKeyRef }: UsePhaserGameProps) => {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        const gameScene = new GameScene(keysPressedRef, lastKeyRef);
        const gameConfig: Phaser.Types.Core.GameConfig = {
            mode: Phaser.Scale.FIT,
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: gameContainerId,
            render: {
                pixelArt: true,
                roundPixels: true,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: true,
                },
            },
            scene: gameScene,
        };

        gameRef.current = new Phaser.Game(gameConfig);

        const resizeGame = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            gameRef.current?.scale.resize(width, height);
        };
        window.addEventListener('resize', resizeGame);

        return () => {
            gameRef.current?.destroy(true);
            window.removeEventListener('resize', resizeGame);
        };
    }, [gameContainerId, keysPressedRef, lastKeyRef]);

    return { gameRef };
};
