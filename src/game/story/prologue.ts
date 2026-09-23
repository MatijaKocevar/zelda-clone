export interface PrologueSlide {
    text: string;
    background: string;
    tint?: number;
    image?: string;
}

export const prologueSlides: PrologueSlide[] = [
    {
        text: 'Twenty years ago, the war in the east swallowed a generation whole.',
        background: 'prologue-desert',
        tint: 0xb08a66,
    },
    {
        text: 'Tomas was a farmer who could mend anything. They handed him a spear and a flag, and told him his hands belonged to the king now.',
        background: 'prologue-camp',
        tint: 0x9a8a76,
    },
    {
        text: 'What came home was a letter, a medal, and a quiet that never quite left the house.',
        background: 'prologue-interior',
        tint: 0xa39280,
        image: 'prologue-letter',
    },
    {
        text: 'Maya raised their son alone. Aren grew up handy and kind, fixing what he could — and keeping the rest to himself.',
        background: 'prologue-field',
        tint: 0xb0a080,
    },
    {
        text: 'He wears his father’s old scarf. It is the only thing the war did not take.',
        background: 'prologue-nature',
        tint: 0x93a894,
    },
    {
        text: 'Today begins like any other day.\n\nIt will not end like one.',
        background: 'prologue-field',
        tint: 0x6d7f9c,
    },
];
