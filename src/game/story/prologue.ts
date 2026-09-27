export interface PrologueSlide {
    text: string;
    background: string;
    tint?: number;
    image?: string;
}

export const prologueSlides: PrologueSlide[] = [
    {
        text: 'Elna died bringing him into the world. Bran buried her under the apple tree, and learned to be two parents badly, and gently.',
        background: 'prologue-field',
        tint: 0xb08a66,
    },
    {
        text: 'He was a farmer who could mend anything — fences, roofs, broken things. He never learned to mend the quiet in that house.',
        background: 'prologue-interior',
        tint: 0xa39280,
    },
    {
        text: 'When the east called, the king’s men handed him a spear and a flag — same as every farmer with strong hands and nothing left to lose.',
        background: 'prologue-camp',
        tint: 0x9a8a76,
    },
    {
        text: 'What came home was a letter, a medal, and a scarf. Tie was six years old.',
        background: 'prologue-interior',
        tint: 0x8a7a6a,
        image: 'prologue-letter',
    },
    {
        text: 'The village raised him. Every door was his, every table set one extra place. He owed everyone. Everyone pretended he didn’t.',
        background: 'prologue-field',
        tint: 0xb0a080,
    },
    {
        text: 'He grew up fixing what he could and hunting what crept too close to the fences. Lira mended him after every hunt, and scolded him better than any grandmother.',
        background: 'prologue-nature',
        tint: 0x93a894,
    },
    {
        text: 'Today begins like any other day.\n\nIt will not end like one.',
        background: 'prologue-field',
        tint: 0x6d7f9c,
    },
];
