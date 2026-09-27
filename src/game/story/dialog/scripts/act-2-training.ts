import { DialogScript } from '../dialog.types';

export const HERMIT_FACE = 'face-oldman3';

export const act2TrainingScripts: Record<string, DialogScript> = {
    'cave-arrival': {
        id: 'cave-arrival',
        lines: [
            { speaker: 'Tie', text: '(A fire, deep in the cave. Someone has been living here a long time.)' },
            {
                speaker: 'Tie',
                text: '(An old man. He looks at the scarf around my neck, and something in his face closes like a door.)',
            },
        ],
    },
    'hermit-early': {
        id: 'hermit-early',
        lines: [
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Hm. You’ve the look of a boy carrying something heavier than his own name.',
            },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Go home, lad. Caves keep their best lessons for people with nothing left to lose.',
            },
        ],
    },
    'hermit-first': {
        id: 'hermit-first',
        setFlags: ['act2-hermit-met'],
        lines: [
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'That scarf. I’d know that stitch in my sleep. Bran wore it the day they marched us east.',
            },
            { speaker: 'Tie', text: 'You knew my father.' },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Knew him? I carried him off two battlefields. He carried me off three. Now — tell me what happened.',
            },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: '(The old man goes very still. He turns a patch on his pack toward the fire — a grey sun, burnt at the edges.)',
            },
            { speaker: 'Tie', text: 'That mark. It was on their shoulders. They took her.' },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'The eastern legion. Your father and I wore that sun. When the war ended, nobody told the war. What’s left of it went feral — takes what’s useful, burns the rest.',
            },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'A healer is worth more than a village to a dying army, boy. They’ll keep her breathing. They’ll keep her close.',
            },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Vengeance is a blade with no hilt. Swing it hard enough and it takes your hands with it.',
            },
            { speaker: 'Tie', text: 'I’m not here for vengeance.' },
            { speaker: 'Hermit', portrait: HERMIT_FACE, text: 'No? Then what are you here for?' },
            { speaker: 'Tie', text: 'To bring her home.' },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: '...Good. Hold onto that. It cuts cleaner. There’s an old blade in the rock by the fire — strike it until your hands remember what your heart already knows.',
            },
        ],
    },
    'hermit-waiting': {
        id: 'hermit-waiting',
        lines: [
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'The blade won’t strike itself, boy. Again.',
            },
        ],
    },
    'training-post': {
        id: 'training-post',
        lines: [
            { speaker: 'Tie', text: '(The old blade rings like a bell. Again. Again. My palms split, and close.)' },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Better. Your father swung like a farmer. You’ll do worse before you do better.',
            },
        ],
    },
    'hermit-post': {
        id: 'hermit-post',
        lines: [
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Now the beasts. They came in with the smoke and made my home theirs.',
            },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Clear them out — all of them — and I’ll teach you a trick your father never learned.',
            },
        ],
    },
    'cave-trial': {
        id: 'cave-trial',
        lines: [
            {
                speaker: 'Tie',
                text: '(That’s the last of them. The cave is quiet. The old man watches from his fire.)',
            },
        ],
    },
    'hermit-magic': {
        id: 'hermit-magic',
        setFlags: ['unlocked-magic'],
        lines: [
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Clean work. You’ve his shoulders and, worse, his temper.',
            },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Now the real lesson. The old magic isn’t in books. It lives where the world is thin — caves, ruins, graves.',
            },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Hold out your hands. This will feel like winter.',
            },
            { speaker: 'Tie', text: '(Fire. Small, and mine.)' },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'They went east, boy — that’s where the legion keeps its kennels. Ash shows the way. Feed the fire with breath, not rage.',
            },
        ],
    },
    'hermit-after': {
        id: 'hermit-after',
        lines: [
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Rage burns the one holding it. When you can hold the fire without shaking, you’ll be ready to walk east.',
            },
            {
                speaker: 'Hermit',
                portrait: HERMIT_FACE,
                text: 'Rest tonight. Tomorrow you bring her home.',
            },
        ],
    },
};
