import { AreaSpawn } from '../../areas/area.types';

export interface Cinematic {
    id: string;
    steps: CinematicStep[];
}

export type CinematicStep = LetterboxStep | WaitStep | DialogStep | SetFlagsStep | ShakeStep | FadeStep | GoToAreaStep;

export interface LetterboxStep {
    type: 'letterbox';
    enabled: boolean;
}

export interface WaitStep {
    type: 'wait';
    duration: number;
}

export interface DialogStep {
    type: 'dialog';
    script: string;
}

export interface SetFlagsStep {
    type: 'setFlags';
    flags: string[];
}

export interface ShakeStep {
    type: 'shake';
    duration: number;
    intensity: number;
}

export interface FadeStep {
    type: 'fade';
    direction: 'out' | 'in';
    duration: number;
}

export interface GoToAreaStep {
    type: 'goToArea';
    area: string;
    spawn?: AreaSpawn;
}
