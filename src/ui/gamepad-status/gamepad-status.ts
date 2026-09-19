import './gamepad-status.scss';

interface GamepadWithBattery extends Gamepad {
    battery?: { level: number; charging: boolean };
}

export interface GamepadStatusOptions {
    onConnectionChange?: (connected: boolean) => void;
}

export class GamepadStatus {
    private container: HTMLDivElement;
    private warning: HTMLDivElement;
    private gamepadName = '';
    private connected = false;
    private onConnectionChange?: (connected: boolean) => void;

    constructor(options: GamepadStatusOptions = {}) {
        this.onConnectionChange = options.onConnectionChange;

        this.container = document.createElement('div');
        this.container.className = 'gamepad-status';

        this.warning = document.createElement('div');
        this.warning.className = 'gamepad-warning';

        this.container.appendChild(this.warning);
        this.container.style.display = 'none';

        document.body.appendChild(this.container);

        this.init();
    }

    private init() {
        this.checkGamepads();

        const handleGamepadConnected = (event: GamepadEvent) => {
            this.gamepadName = event.gamepad.id;
            this.setConnected(true);
        };

        const handleGamepadDisconnected = () => {
            this.hideWarning();
            this.gamepadName = '';
            this.setConnected(false);
        };

        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

        setInterval(() => this.checkGamepads(), 2000);
    }

    private setConnected(connected: boolean) {
        if (this.connected === connected) {
            return;
        }

        this.connected = connected;
        this.onConnectionChange?.(connected);
    }

    private checkGamepads() {
        const gamepads = navigator.getGamepads();
        const connectedGamepad = Array.from(gamepads).find((gamepad) => gamepad && gamepad.connected) as
            | GamepadWithBattery
            | undefined;

        if (connectedGamepad) {
            this.gamepadName = connectedGamepad.id;
            this.setConnected(true);

            if (connectedGamepad.battery) {
                const batteryLevel = connectedGamepad.battery.level;
                const isCharging = connectedGamepad.battery.charging;

                if (batteryLevel < 0.2 && !isCharging) {
                    this.showWarning();
                    return;
                }
            }

            this.hideWarning();
        } else {
            this.hideWarning();
            this.gamepadName = '';
            this.setConnected(false);
        }
    }

    private showWarning() {
        this.warning.textContent = `🔋 Low Battery: ${this.gamepadName}`;
        this.container.style.display = '';
    }

    private hideWarning() {
        this.container.style.display = 'none';
    }
}
