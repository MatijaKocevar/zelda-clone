// Game.tsx
import React, { useRef } from 'react';
import './Game.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { MobileControls } from '../GameUI/components/MobileControls/MobileControls';
import { useFullScreen } from './hooks/useFullscreen';
import { usePhaserGame } from './hooks/usePhaserGame';
import { useMobileScreen } from './hooks/useMobileScreen';

const Game: React.FC = () => {
    const gameComponentRef = useRef<HTMLDivElement>(null);
    const keysPressedRef = useRef<string[]>([]);
    const lastKeyRef = useRef<string>('RIGHT');

    const { isFullScreen, toggleFullScreen } = useFullScreen();
    const showFullScreenButton = useMobileScreen(isFullScreen);
    usePhaserGame({
        gameContainerId: 'phaser-game-container',
        keysPressedRef,
        lastKeyRef,
    });

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
                    className="fullscreen-button"
                    aria-label="Toggle Fullscreen"
                >
                    <FontAwesomeIcon icon={faExpandAlt} />
                </button>
            )}
            <MobileControls
                keysPressedRef={keysPressedRef}
                lastKeyRef={lastKeyRef}
            />
            <div ref={gameComponentRef} id="phaser-game-container"></div>
        </>
    );
};

export default Game;
