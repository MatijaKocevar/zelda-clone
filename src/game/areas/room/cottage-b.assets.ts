import cottageBMapUrl from '../../../assets/map/room/cottage-b.tmj?url';
import { AreaDefinition, AreaNpc, AreaTrigger } from '../area.types';
import { houseTilesetImages } from './room-tilesets';

const cottageBNpcs: AreaNpc[] = [
    {
        id: 'mom',
        x: 448,
        y: 352,
        spriteKey: 'woman',
        direction: 'down',
        forbidsFlags: ['act1-mom-dead'],
        dialogs: [
            { script: 'mom-first', forbidsFlags: ['met-mom'] },
            { script: 'mom-chores-done', requiresFlags: ['chore-wood', 'chore-water', 'chore-herbs'] },
            { script: 'mom-reminder-wood', forbidsFlags: ['chore-wood'] },
            { script: 'mom-reminder-water', forbidsFlags: ['chore-water'] },
            { script: 'mom-reminder-herbs', forbidsFlags: ['chore-herbs'] },
        ],
    },
    {
        id: 'mom-dead',
        x: 448,
        y: 372,
        spriteKey: 'woman',
        frame: 24,
        solid: false,
        requiresFlags: ['act1-mom-dead'],
        dialogs: [],
    },
];

const cottageBTriggers: AreaTrigger[] = [
    {
        id: 'mom-death',
        type: 'enter',
        x: 352,
        y: 400,
        width: 320,
        height: 160,
        once: true,
        requiresFlags: ['act1-attack'],
        forbidsFlags: ['act1-mom-dead'],
        cinematic: 'mom-death',
    },
];

export const cottageBArea: AreaDefinition = {
    key: 'cottage-b',
    mapUrl: cottageBMapUrl,
    playerSpawn: { x: 512, y: 480 },
    backgroundColor: '#141b1b',
    backgroundImages: [],
    foregroundImages: [],
    tilesetImages: houseTilesetImages,
    npcs: cottageBNpcs,
    triggers: cottageBTriggers,
};
