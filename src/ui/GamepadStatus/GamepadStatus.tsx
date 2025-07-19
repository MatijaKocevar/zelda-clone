import React, { useEffect, useState } from 'react';
import './GamepadStatus.scss';

interface GamepadWithBattery extends Gamepad {
    battery?: { level: number; charging: boolean };
}

const GamepadStatus: React.FC = () => {
    const [showLowBatteryWarning, setShowLowBatteryWarning] = useState(false);
    const [gamepadName, setGamepadName] = useState<string>('');

    useEffect(() => {
        const checkGamepads = () => {
            const gamepads = navigator.getGamepads();
            const connectedGamepad = Array.from(gamepads).find(gamepad => gamepad && gamepad.connected) as GamepadWithBattery | undefined;
            
            if (connectedGamepad) {
                setGamepadName(connectedGamepad.id);
                
                if (connectedGamepad.battery) {
                    const batteryLevel = connectedGamepad.battery.level;
                    const isCharging = connectedGamepad.battery.charging;
                    
                    setShowLowBatteryWarning(batteryLevel < 0.2 && !isCharging);
                } else {
                    setShowLowBatteryWarning(false);
                }
            } else {
                setShowLowBatteryWarning(false);
                setGamepadName('');
            }
        };

        checkGamepads();

        const handleGamepadConnected = (event: GamepadEvent) => {
            setGamepadName(event.gamepad.id);
        };

        const handleGamepadDisconnected = () => {
            setShowLowBatteryWarning(false);
            setGamepadName('');
        };

        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

        const intervalId = setInterval(checkGamepads, 5000);

        return () => {
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
            clearInterval(intervalId);
        };
    }, []);

    if (!showLowBatteryWarning) {
        return null;
    }

    return (
        <div className="gamepad-status">
            <div className="gamepad-warning">
                🔋 Low Battery: {gamepadName}
            </div>
        </div>
    );
};

export default GamepadStatus;
