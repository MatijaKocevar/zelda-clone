import { DialogScript } from '../dialog.types';

export const LIRA_FACE = 'face-woman';

export const act1HomeScripts: Record<string, DialogScript> = {
    'intro-home': {
        id: 'intro-home',
        setFlags: ['intro-home-done'],
        lines: [
            {
                speaker: 'Tie',
                text: 'Home again. Same gate, same quiet, same thin line of smoke from the mill.',
            },
            {
                speaker: 'Tie',
                text: 'The woods have been spitting things out all season. The fences hold because I hold them.',
            },
            {
                speaker: 'Tie',
                text: 'Lira first. She’ll want to see I’m still in one piece.',
            },
        ],
    },
    'lira-first': {
        id: 'lira-first',
        setFlags: ['met-lira', 'lira-asked'],
        lines: [
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'There you are! Half the village was ready to send a search party, and the other half wanted to sell your boots.',
            },
            { speaker: 'Tie', text: 'I was only gone the morning.' },
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'A morning is how funerals start, Tie. Sit. Let me see that arm.',
            },
            { speaker: 'Tie', text: 'It’s a scratch.' },
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'It’s a scratch the way the lake is a puddle. Hold still.',
            },
            {
                speaker: 'Tie',
                text: '(Her hands are quick and certain. The sting goes out of the cut like it was never there.)',
            },
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'There. Now — the list. Gran wants the stump split, Old Pella’s garden is dying of thirst, and the herb bush behind the east field is ready.',
            },
            { speaker: 'Tie', text: 'Wood, water, herbs. The usual.' },
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'The usual. The whole village keeps adding to my list, and I keep being the one scolded when it isn’t done. So. Make me look good.',
            },
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'And Tie — the birds went south last week and didn’t come back. It’s too early for that. Be careful out there.',
            },
        ],
    },
    'lira-reminder-wood': {
        id: 'lira-reminder-wood',
        lines: [
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'The stump, Tie. Gran counts the firewood when she visits, and she only visits when she’s suspicious.',
            },
        ],
    },
    'lira-reminder-water': {
        id: 'lira-reminder-water',
        lines: [
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'Old Pella’s garden first, hm? The can’s down by the lake — that water won’t walk itself.',
            },
        ],
    },
    'lira-reminder-herbs': {
        id: 'lira-reminder-herbs',
        lines: [
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'The herb bush behind the east field — before the sun takes the good of it. You know how Gran’s knees get.',
            },
        ],
    },
    'lira-chores-done': {
        id: 'lira-chores-done',
        setFlags: ['act1-chores-done'],
        lines: [
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'Look at you. Wood stacked, garden green, herbs on the sill. The village will start expecting things from you.',
            },
            { speaker: 'Tie', text: 'Let them expect. I owe them all anyway.' },
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'You don’t owe anyone anything, you mule. That isn’t how family works.',
            },
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: '...You bled through the bandage. All afternoon, weren’t you. Sit.',
            },
            { speaker: 'Tie', text: '(She ties it off tight. Her hands are steady. Mine, all of a sudden, aren’t.)' },
            {
                speaker: 'Lira',
                portrait: LIRA_FACE,
                text: 'There. Come inside when the light goes. I’ll have stew on, and I will absolutely make you talk about something other than fences.',
            },
        ],
    },
    'chore-wood': {
        id: 'chore-wood',
        lines: [
            { speaker: 'Tie', text: 'There. Enough firewood for a week of stews — Gran’s stove included.' },
            { speaker: 'Tie', text: 'The axe still smells of the workshop. Everything in this village smells of someone keeping me alive.' },
        ],
    },
    'chore-water': {
        id: 'chore-water',
        lines: [{ speaker: 'Tie', text: 'Watered. Old Pella’s beans will live another day.' }],
    },
    'chore-herbs': {
        id: 'chore-herbs',
        lines: [{ speaker: 'Tie', text: 'Enough herbs to make the whole village smell like spring.' }],
    },
    'attack-smoke': {
        id: 'attack-smoke',
        lines: [
            { speaker: 'Tie', text: '(Smoke. Black and thin, over the east field. Too much of it.)' },
            { speaker: 'Tie', text: '(The fence I fixed this morning. The gate. All of it, burning.)' },
            {
                speaker: 'Tie',
                text: '(Not bandits. They move in ranks. There’s a mark on their shoulders — a grey sun, burnt at the edges.)',
            },
            { speaker: 'Tie', text: 'Lira. She’s at the cottage. I have to get to the cottage.' },
        ],
    },
    'wave-cleared': {
        id: 'wave-cleared',
        lines: [
            { speaker: 'Tie', text: '(The yard goes quiet. Quiet is worse than the screaming.)' },
            { speaker: 'Tie', text: '(Bodies in the lane. Neighbors. Some of them still—)' },
            { speaker: 'Tie', text: '(Don’t look. Stand up. Lira. Find Lira.)' },
        ],
    },
    'lira-taken': {
        id: 'lira-taken',
        lines: [
            { speaker: 'Tie', text: 'Lira? Lira!' },
            {
                speaker: 'Tie',
                text: '(The door hangs broken. The table’s on its side. There’s blood on the boards — spattered, boot-trodden. Not hers. Please. Not hers.)',
            },
            { speaker: 'Tie', text: 'Let her GO—' },
            { speaker: 'Lira', text: 'Tie, don’t—!' },
            {
                speaker: 'Tie',
                text: '(The big one takes my legs out at the knees. Another puts a boot on my chest and leans until the room goes white at the edges.)',
            },
            {
                speaker: 'Raider',
                text: 'That the one she keeps talking about? Leave him. The healer is what the captain wants.',
            },
            {
                speaker: 'Tie',
                text: '(They drag her through the door. She claws at the frame and they just— take her. I crawl through my own blood and I am not fast enough. I am never fast enough.)',
            },
            { speaker: 'Lira', text: 'TIE—' },
            {
                speaker: 'Tie',
                text: '(Her voice goes far away. The door knocks against the wall, over and over, in a wind that smells like the village burning.)',
            },
        ],
    },
    'lira-vow': {
        id: 'lira-vow',
        setFlags: ['act1-revenge'],
        lines: [
            { speaker: 'Tie', text: '(They left me my life. I don’t think it was mercy. I think it was weight.)' },
            {
                speaker: 'Tie',
                text: '(Her ribbon in the doorway. The one she never ties straight. It’s all I get to keep.)',
            },
            {
                speaker: 'Tie',
                text: '(Father spoke once of an old soldier who lives in the cave south of the fields. Father’s war. The same grey sun. If anyone knows that mark, it’s him.)',
            },
            { speaker: 'Tie', text: 'I will bring her home. And every one of them will answer for what they did here.' },
            {
                speaker: 'Tie',
                text: '(Something goes quiet inside me. It doesn’t feel like grief. It feels like permission.)',
            },
        ],
    },
};
