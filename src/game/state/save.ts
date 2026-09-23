import { SAVES_ENABLED } from '../dev-flags';
import { getStoryFlags, setStoryFlags } from '../story/story-flags';
import { getDefeatedEnemies, setDefeatedEnemies } from './defeated-enemies';
import { getPlayerStateSnapshot, PlayerStateSnapshot, restorePlayerStateSnapshot } from './player-state';

const STORAGE_KEY = 'a-tie-to-the-past-save';
const SAVE_VERSION = 1;

export interface SaveData {
    version: number;
    area: string;
    flags: string[];
    defeatedEnemies: string[];
    player: PlayerStateSnapshot;
}

export function saveGame(area: string): void {
    if (!SAVES_ENABLED) {
        return;
    }

    const data: SaveData = {
        version: SAVE_VERSION,
        area,
        flags: getStoryFlags(),
        defeatedEnemies: getDefeatedEnemies(),
        player: getPlayerStateSnapshot(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function hasSave(): boolean {
    if (!SAVES_ENABLED) {
        return false;
    }

    return localStorage.getItem(STORAGE_KEY) !== null;
}

export function loadGame(): SaveData | undefined {
    if (!SAVES_ENABLED) {
        return undefined;
    }

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return undefined;
    }

    try {
        const data = JSON.parse(raw) as SaveData;

        if (data.version !== SAVE_VERSION || !data.area) {
            return undefined;
        }

        setStoryFlags(data.flags ?? []);
        setDefeatedEnemies(data.defeatedEnemies ?? []);
        restorePlayerStateSnapshot(data.player);

        return data;
    } catch {
        return undefined;
    }
}

export function clearSave(): void {
    localStorage.removeItem(STORAGE_KEY);
}
