import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { GameScene } from './scene/GameScene';
import './Game.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { MobileControls } from '../GameUI/components/MobileControls/MobileControls';

const Game: React.FC = () => {
    const gameComponentRef = useRef<HTMLDivElement>(null);
    const [showFullScreenButton, setShowFullScreenButton] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const gameref = useRef<Phaser.Game>();
    const keysPressedref = useRef<string[]>([]);

    useEffect(() => {
        const checkMobileDevice = () => {
            const screenWidth = window.innerWidth;
            setShowFullScreenButton(screenWidth <= 991 && !isFullScreen);
        };

        const updateFullScreenStatus = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        checkMobileDevice();
        window.addEventListener('resize', checkMobileDevice);

        document.addEventListener('fullscreenchange', updateFullScreenStatus);

        const gamescene = new GameScene(keysPressedref);

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
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: gamescene,
        };

        gameref.current = new Phaser.Game(gameConfig);

        const resizeGame = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            gameref.current?.scale.resize(width, height);
        };

        window.addEventListener('resize', resizeGame);

        return () => {
            gameref.current?.destroy(true);
            window.removeEventListener('resize', resizeGame);
            window.removeEventListener('resize', checkMobileDevice);
            document.removeEventListener(
                'fullscreenchange',
                updateFullScreenStatus
            );
        };
    }, [isFullScreen]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(
                    `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
                );
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <>
            {showFullScreenButton && (
                <button
                    onClick={toggleFullScreen}
                    style={{
                        position: 'absolute',
                        top: '25px',
                        right: '20px',
                        zIndex: 1000,
                        padding: '10px',
                        opacity: 0.8,
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '25px',
                    }}
                    aria-label="Toggle Fullscreen"
                >
                    <FontAwesomeIcon icon={faExpandAlt} />
                </button>
            )}
            <MobileControls keysPressedref={keysPressedref} />
            <div ref={gameComponentRef} id="phaser-game-container"></div>
        </>
    );
};

export default Game;
