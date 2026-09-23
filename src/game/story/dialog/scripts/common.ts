import { DialogScript } from '../dialog.types';

export const commonScripts: Record<string, DialogScript> = {
    'door-locked': {
        id: 'door-locked',
        lines: [{ text: 'The way is blocked for now.' }],
    },
};
