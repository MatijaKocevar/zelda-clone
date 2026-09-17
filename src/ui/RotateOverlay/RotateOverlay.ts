import './RotateOverlay.scss';

export class RotateOverlay {
    private overlay: HTMLDivElement;

    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'rotate-overlay';

        const icon = document.createElement('div');
        icon.className = 'rotate-overlay-icon';

        const message = document.createElement('p');
        message.className = 'rotate-overlay-message';
        message.textContent = 'Please rotate your device to landscape';

        this.overlay.appendChild(icon);
        this.overlay.appendChild(message);

        if (!this.isInstalled()) {
            const hint = document.createElement('p');
            hint.className = 'rotate-overlay-hint';
            hint.textContent = 'Tip: install this app on your device for the best experience';
            this.overlay.appendChild(hint);
        }

        document.body.appendChild(this.overlay);
    }

    private isInstalled(): boolean {
        const standalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
        const displayMode =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.matchMedia('(display-mode: fullscreen)').matches;

        return standalone || displayMode;
    }
}
