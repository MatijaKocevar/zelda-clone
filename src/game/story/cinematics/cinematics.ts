import { Cinematic } from './cinematic.types';

const cinematics: Record<string, Cinematic> = {
    'home-arrival': {
        id: 'home-arrival',
        steps: [
            { type: 'letterbox', enabled: true },
            { type: 'wait', duration: 350 },
            { type: 'dialog', script: 'intro-home' },
            { type: 'letterbox', enabled: false },
        ],
    },
    'attack-start': {
        id: 'attack-start',
        steps: [
            { type: 'letterbox', enabled: true },
            { type: 'shake', duration: 500, intensity: 0.008 },
            { type: 'dialog', script: 'attack-smoke' },
            { type: 'setFlags', flags: ['act1-attack'] },
            { type: 'goToArea', area: 'home', spawn: { x: 2976, y: 2140 } },
            { type: 'letterbox', enabled: false },
        ],
    },
    'mom-death': {
        id: 'mom-death',
        steps: [
            { type: 'letterbox', enabled: true },
            { type: 'wait', duration: 300 },
            { type: 'dialog', script: 'mom-death' },
            { type: 'shake', duration: 700, intensity: 0.012 },
            { type: 'fade', direction: 'out', duration: 700 },
            { type: 'setFlags', flags: ['act1-mom-dead'] },
            { type: 'goToArea', area: 'cottage-b', spawn: { x: 512, y: 470 } },
            { type: 'fade', direction: 'in', duration: 700 },
            { type: 'dialog', script: 'mom-vow' },
            { type: 'letterbox', enabled: false },
        ],
    },
};

export function getCinematic(id: string): Cinematic | undefined {
    return cinematics[id];
}
