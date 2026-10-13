import './install-prompt.scss';

const DISMISSED_AT_KEY = 'install-prompt-dismissed-at';
const INSTALLED_KEY = 'install-prompt-installed';
const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 4000;

const IOS_MESSAGE = 'To install, tap Share, then "Add to Home Screen"';
const BROWSER_MENU_MESSAGE = 'To install, open the browser menu and tap "Add to Home screen"';

export class InstallPrompt {
    private banner: HTMLDivElement;
    private message: HTMLParagraphElement;

    constructor() {
        this.banner = document.createElement('div');
        this.banner.className = 'install-prompt';

        this.message = document.createElement('p');
        this.message.className = 'install-prompt-message';

        const dismissButton = document.createElement('button');
        dismissButton.className = 'install-prompt-dismiss';
        dismissButton.type = 'button';
        dismissButton.textContent = '✕';
        dismissButton.setAttribute('aria-label', 'Dismiss install suggestion');
        dismissButton.addEventListener('click', () => this.dismiss());

        this.banner.append(this.message, dismissButton);
        document.body.appendChild(this.banner);

        this.init();
    }

    private init() {
        if (this.isInstalled() || !this.isMobile()) {
            return;
        }

        window.addEventListener('appinstalled', () => {
            this.store(INSTALLED_KEY, '1');
            this.hide();
        });

        const standaloneQuery = window.matchMedia('(display-mode: standalone)');
        standaloneQuery.addEventListener('change', (event) => {
            if (event.matches) {
                this.store(INSTALLED_KEY, '1');
                this.hide();
            }
        });

        window.setTimeout(() => this.show(), SHOW_DELAY_MS);
    }

    private dismiss() {
        this.store(DISMISSED_AT_KEY, String(Date.now()));
        this.hide();
    }

    private show() {
        if (this.isInstalled() || this.isDismissed()) {
            return;
        }

        this.message.textContent = this.isIos() ? IOS_MESSAGE : BROWSER_MENU_MESSAGE;
        this.banner.classList.add('install-prompt-visible');
    }

    private hide() {
        this.banner.classList.remove('install-prompt-visible');
    }

    private isDismissed(): boolean {
        const dismissedAt = Number(this.read(DISMISSED_AT_KEY) ?? 0);

        return Date.now() - dismissedAt < DISMISS_COOLDOWN_MS;
    }

    private isInstalled(): boolean {
        const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };
        const standalone = navigatorWithStandalone.standalone === true;
        const displayMode =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.matchMedia('(display-mode: fullscreen)').matches;

        return standalone || displayMode || this.read(INSTALLED_KEY) === '1';
    }

    private isMobile(): boolean {
        return (
            window.matchMedia('(pointer: coarse)').matches ||
            /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent)
        );
    }

    private isIos(): boolean {
        const ipadOs = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;

        return /iPad|iPhone|iPod/.test(window.navigator.userAgent) || ipadOs;
    }

    private read(key: string): string | null {
        try {
            return window.localStorage.getItem(key);
        } catch {
            return null;
        }
    }

    private store(key: string, value: string) {
        try {
            window.localStorage.setItem(key, value);
        } catch {
            // Private browsing can block storage; the prompt still works for this session.
        }
    }
}
