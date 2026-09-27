import { hasAllFlags, hasFlag } from './story-flags';

export interface StoryObjective {
    id: string;
    text: string;
    isActive: () => boolean;
}

const CHORES = ['chore-wood', 'chore-water', 'chore-herbs'];

const objectives: StoryObjective[] = [
    {
        id: 'meet-lira',
        text: 'Check in with Lira at her cottage.',
        isActive: () => !hasFlag('met-lira'),
    },
    {
        id: 'chores',
        text: 'Do the village list: chop wood, water the garden, gather herbs.',
        isActive: () => hasFlag('lira-asked') && !hasAllFlags(CHORES),
    },
    {
        id: 'report',
        text: 'Bring Lira the list — finished.',
        isActive: () => hasAllFlags(CHORES) && !hasFlag('act1-chores-done'),
    },
    {
        id: 'burning',
        text: 'Something is burning. Get back outside.',
        isActive: () => hasFlag('act1-chores-done') && !hasFlag('act1-attack'),
    },
    {
        id: 'find-lira',
        text: 'Lira’s cottage. Now.',
        isActive: () => hasFlag('act1-attack') && !hasFlag('act1-lira-taken'),
    },
    {
        id: 'hermit',
        text: 'Find the old soldier in the cave south of the fields.',
        isActive: () => hasFlag('act1-revenge') && !hasFlag('act2-hermit-met'),
    },
    {
        id: 'strike-post',
        text: 'Strike the old blade until your arms remember.',
        isActive: () => hasFlag('act2-hermit-met') && !hasFlag('act2-melee-training'),
    },
    {
        id: 'clear-cave',
        text: 'Clear the beasts from the cave.',
        isActive: () => hasFlag('act2-melee-training') && !hasFlag('act2-cave-trial'),
    },
    {
        id: 'learn-magic',
        text: 'Ask the hermit about the old magic.',
        isActive: () => hasFlag('act2-cave-trial') && !hasFlag('unlocked-magic'),
    },
    {
        id: 'hunt-begins',
        text: 'Follow the ash-mark east. Bring her home.',
        isActive: () => hasFlag('unlocked-magic'),
    },
];

export function getCurrentObjective(): StoryObjective | undefined {
    return objectives.find((objective) => objective.isActive());
}
