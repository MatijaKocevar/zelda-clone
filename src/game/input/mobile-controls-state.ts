const STORAGE_KEY = 'mobile-controls-visible';

type VisibilityListener = (visible: boolean) => void;

const listeners: VisibilityListener[] = [];

export function getMobileControlsVisible(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== 'false';
}

export function setMobileControlsVisible(visible: boolean): void {
    localStorage.setItem(STORAGE_KEY, String(visible));
    listeners.forEach((listener) => listener(visible));
}

export function toggleMobileControls(): boolean {
    const next = !getMobileControlsVisible();
    setMobileControlsVisible(next);
    return next;
}

export function onMobileControlsVisibilityChange(listener: VisibilityListener): void {
    listeners.push(listener);
}
