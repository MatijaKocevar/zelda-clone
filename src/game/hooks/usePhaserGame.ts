import { useRef, useEffect } from 'react';
import Phaser from 'phaser';
import { GameScene } from '../scenes/GameScene';
import { MenuScene } from '../scenes/MenuScene/MenuScene';
import { PauseScene } from '../scenes/PauseScene/PauseScene';

type UsePhaserGameProps = {
    gameContainerId: string;
    keysPressedRef: React.MutableRefObject<string[]>;
    lastKeyRef: React.MutableRefObject<string>;
};

export const usePhaserGame = ({ gameContainerId, keysPressedRef, lastKeyRef }: UsePhaserGameProps) => {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        const menuScene = new MenuScene();
        const gameScene = new GameScene(keysPressedRef, lastKeyRef);
        const pauseScene = new PauseScene();

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
                    gravity: { x: 0, y: 0 },
                    debug: false,
                },
            },
            input: {
                gamepad: true,
            },
            scene: [menuScene, gameScene, pauseScene],
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
