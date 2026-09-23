import { DialogScript } from './dialog.types';
import { act1HomeScripts } from './scripts/act-1-home';
import { act2TrainingScripts } from './scripts/act-2-training';
import { commonScripts } from './scripts/common';

const scripts: Record<string, DialogScript> = {
    ...commonScripts,
    ...act1HomeScripts,
    ...act2TrainingScripts,
};

export function getDialogScript(id: string): DialogScript | undefined {
    return scripts[id];
}
