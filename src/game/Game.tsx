import React, { useRef } from 'react';
import './Game.scss';
import { usePhaserGame } from './hooks/usePhaserGame';
import { MobileControls } from '../ui/MobileControls/MobileControls';
import GamepadStatus from '../ui/GamepadStatus/GamepadStatus';

const Game: React.FC = () => {
    const gameComponentRef = useRef<HTMLDivElement>(null);
    const keysPressedRef = useRef<string[]>([]);
    const lastKeyRef = useRef<string>('RIGHT');

    usePhaserGame({
        gameContainerId: 'phaser-game-container',
        keysPressedRef,
        lastKeyRef,
    });

    return (
        <>
            <GamepadStatus />
            <MobileControls keysPressedRef={keysPressedRef} lastKeyRef={lastKeyRef} />
            <div ref={gameComponentRef} id="phaser-game-container"></div>
        </>
    );
};

export default Game;
