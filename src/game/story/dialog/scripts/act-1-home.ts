import { DialogScript } from '../dialog.types';

export const MOTHER_FACE = 'face-woman';

export const act1HomeScripts: Record<string, DialogScript> = {
    'intro-home': {
        id: 'intro-home',
        setFlags: ['intro-home-done'],
        lines: [
            {
                speaker: 'Aren',
                text: 'Home again. Same gate, same quiet, same thin line of smoke from the chimney.',
            },
            {
                speaker: 'Aren',
                text: 'Mom is probably inside. I should let her see me before she starts worrying.',
            },
        ],
    },
    'mom-first': {
        id: 'mom-first',
        setFlags: ['met-mom', 'mom-asked'],
        lines: [
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'There you are! I was one deep breath away from sending the whole village after you.',
            },
            { speaker: 'Aren', text: 'I was only gone a little while.' },
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'A little while is how wars start, sweetheart. And keep your father’s scarf close — the wind has teeth today.',
            },
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'Since you’re up: the stump needs chopping, the garden is thirsty, and the herb bush behind the east field is ready.',
            },
            { speaker: 'Aren', text: 'Wood, water, herbs. The usual.' },
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'The usual. Your father used to say that too. Go on, then.',
            },
        ],
    },
    'mom-reminder-wood': {
        id: 'mom-reminder-wood',
        lines: [
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'The stump won’t chop itself, sweetheart. Your father used to make a whole afternoon of it, mind.',
            },
        ],
    },
    'mom-reminder-water': {
        id: 'mom-reminder-water',
        lines: [
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'The garden first, hm? That watering can has been giving me looks all morning.',
            },
        ],
    },
    'mom-reminder-herbs': {
        id: 'mom-reminder-herbs',
        lines: [
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'The herb bush behind the east field — before the sun takes the good of it.',
            },
        ],
    },
    'mom-chores-done': {
        id: 'mom-chores-done',
        setFlags: ['act1-chores-done'],
        lines: [
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'Look at this place. Wood stacked, garden green, herbs in the window.',
            },
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'Your father’s hands. He would have told you it was all wrong, and then bragged about it to the whole village.',
            },
            { speaker: 'Aren', text: '(The scarf itches against my neck.)' },
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'Come inside when the light goes. I’ll have the stew on.',
            },
        ],
    },
    'chore-wood': {
        id: 'chore-wood',
        lines: [
            { speaker: 'Aren', text: 'There. Enough firewood for a week of stews.' },
            { speaker: 'Aren', text: 'The axe still smells of the workshop.' },
        ],
    },
    'chore-water': {
        id: 'chore-water',
        lines: [
            { speaker: 'Aren', text: 'Watered. The beans will live another day.' },
        ],
    },
    'chore-herbs': {
        id: 'chore-herbs',
        lines: [{ speaker: 'Aren', text: 'Enough herbs to make the whole house smell like spring.' }],
    },
    'attack-smoke': {
        id: 'attack-smoke',
        lines: [
            { speaker: 'Aren', text: '(Smoke. Black and thin, over the east field. Too much of it.)' },
            { speaker: 'Aren', text: '(The fence I fixed this morning. The gate. All of it, burning.)' },
            { speaker: 'Aren', text: 'Mom. I have to get to Mom.' },
        ],
    },
    'wave-cleared': {
        id: 'wave-cleared',
        lines: [
            { speaker: 'Aren', text: '(The yard goes quiet. Quiet is worse than the screaming.)' },
            { speaker: 'Aren', text: "(Hold on, Mom. I'm coming.)" },
        ],
    },
    'mom-death': {
        id: 'mom-death',
        lines: [
            { speaker: 'Aren', text: 'Mom? ...Mom!' },
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'There you are. I told you... the wind had teeth.',
            },
            { speaker: 'Aren', text: "Don't talk. I'll get bandages, I'll—" },
            {
                speaker: 'Mom',
                portrait: MOTHER_FACE,
                text: 'You have his hands. And his stubbornness. Both of them trouble.',
            },
            { speaker: 'Mom', portrait: MOTHER_FACE, text: 'Don’t let it turn you into—' },
            { speaker: 'Aren', text: 'Mom. Mom!' },
        ],
    },
    'mom-vow': {
        id: 'mom-vow',
        setFlags: ['act1-revenge'],
        lines: [
            { speaker: 'Aren', text: '(They left her. They just... left her.)' },
            {
                speaker: 'Aren',
                text: '(My hands won’t stop shaking. The scarf is still warm where she held it.)',
            },
            {
                speaker: 'Aren',
                text: '(Father spoke once of an old soldier who lives in the cave south of the fields. If anyone knows how to fight this war, it’s him.)',
            },
            { speaker: 'Aren', text: 'I will find them. Every last one. I swear it on this scarf.' },
            { speaker: 'Aren', text: '(Something goes quiet inside me. It doesn’t feel like grief.)' },
        ],
    },
};
