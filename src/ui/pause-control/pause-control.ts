import './pause-control.scss';
import { TOGGLE_PAUSE_EVENT } from '../../game/events';

const START_BUTTON_INDEX = 9;
const TOGGLE_DEBOUNCE_MS = 300;

export class PauseControl {
    private button: HTMLButtonElement;
    private startPressed = false;
    private lastToggle = 0;

    constructor() {
        this.button = document.createElement('button');
        this.button.className = 'pause-button';
        this.button.type = 'button';
        this.button.setAttribute('aria-label', 'Pause');
        this.button.textContent = '❚❚';

        this.button.addEventListener('click', this.requestToggle);
        this.button.addEventListener('touchstart', this.handleTouchStart, { passive: false });

        document.body.appendChild(this.button);

        this.watchGamepadStart();
    }

    setVisible(visible: boolean): void {
        this.button.style.display = visible ? '' : 'none';
    }

    private handleTouchStart = (event: TouchEvent) => {
        event.preventDefault();
        this.requestToggle();
    };

    private requestToggle = () => {
        const now = Date.now();

        if (now - this.lastToggle < TOGGLE_DEBOUNCE_MS) {
            return;
        }

        this.lastToggle = now;
        window.dispatchEvent(new Event(TOGGLE_PAUSE_EVENT));
    };

    private watchGamepadStart() {
        const loop = () => {
            const pressed = Array.from(navigator.getGamepads()).some(
                (gamepad) => !!gamepad?.connected && !!gamepad.buttons[START_BUTTON_INDEX]?.pressed,
            );

            if (pressed && !this.startPressed) {
                this.requestToggle();
            }

            this.startPressed = pressed;
            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }
}
