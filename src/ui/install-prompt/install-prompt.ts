import './install-prompt.scss';

const DISMISSED_AT_KEY = 'install-prompt-dismissed-at';
const INSTALLED_KEY = 'install-prompt-installed';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const IOS_HINT_DELAY_MS = 5000;

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export class InstallPrompt {
    private banner: HTMLDivElement;
    private message: HTMLParagraphElement;
    private installButton: HTMLButtonElement;
    private deferredPrompt: BeforeInstallPromptEvent | null = null;
    private visible = false;

    constructor() {
        this.banner = document.createElement('div');
        this.banner.className = 'install-prompt';

        this.message = document.createElement('p');
        this.message.className = 'install-prompt-message';

        this.installButton = document.createElement('button');
        this.installButton.className = 'install-prompt-install';
        this.installButton.type = 'button';
        this.installButton.textContent = 'Install';
        this.installButton.addEventListener('click', () => void this.install());

        const dismissButton = document.createElement('button');
        dismissButton.className = 'install-prompt-dismiss';
        dismissButton.type = 'button';
        dismissButton.textContent = '✕';
        dismissButton.setAttribute('aria-label', 'Dismiss install suggestion');
        dismissButton.addEventListener('click', () => this.dismiss());

        this.banner.append(this.message, this.installButton, dismissButton);
        document.body.appendChild(this.banner);

        this.init();
    }

    private init() {
        if (this.isInstalled()) {
            return;
        }

        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            this.deferredPrompt = event as BeforeInstallPromptEvent;
            this.show('Install this game for the best experience');
        });

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

        // iOS never fires beforeinstallprompt, so the only option is pointing at the share sheet.
        if (this.isIos() && !this.isDismissed()) {
            window.setTimeout(() => {
                if (this.deferredPrompt) {
                    return;
                }

                this.installButton.hidden = true;
                this.show('To install, tap Share, then "Add to Home Screen"');
            }, IOS_HINT_DELAY_MS);
        }
    }

    private async install() {
        const prompt = this.deferredPrompt;

        if (!prompt) {
            return;
        }

        this.deferredPrompt = null;
        this.hide();

        try {
            await prompt.prompt();
            const { outcome } = await prompt.userChoice;

            if (outcome !== 'accepted') {
                this.rememberDismissal();
            }
        } catch {
            this.rememberDismissal();
        }
    }

    private dismiss() {
        this.rememberDismissal();
        this.hide();
    }

    private rememberDismissal() {
        this.store(DISMISSED_AT_KEY, String(Date.now()));
    }

    private show(message: string) {
        if (this.visible || this.isInstalled() || this.isDismissed()) {
            return;
        }

        this.message.textContent = message;
        this.visible = true;
        this.banner.classList.add('install-prompt-visible');
    }

    private hide() {
        this.visible = false;
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
