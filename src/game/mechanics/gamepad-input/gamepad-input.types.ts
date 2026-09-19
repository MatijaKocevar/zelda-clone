export interface GamepadInfo {
    id: string;
    connected: boolean;
}

export interface GamepadInputConfig {
    deadZone?: number;
    enableAnalogSticks?: boolean;
    enableDPad?: boolean;
}
