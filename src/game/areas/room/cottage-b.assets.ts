import cottageBMapUrl from '../../../assets/map/room/cottage-b.tmj?url';
import { AreaDefinition, AreaNpc, AreaTrigger } from '../area.types';
import { houseTilesetImages } from './room-tilesets';

const cottageBNpcs: AreaNpc[] = [
    {
        id: 'lira',
        x: 448,
        y: 352,
        spriteKey: 'woman',
        direction: 'down',
        forbidsFlags: ['act1-lira-taken'],
        dialogs: [
            { script: 'lira-first', forbidsFlags: ['met-lira'] },
            { script: 'lira-chores-done', requiresFlags: ['chore-wood', 'chore-water', 'chore-herbs'] },
            { script: 'lira-reminder-wood', forbidsFlags: ['chore-wood'] },
            { script: 'lira-reminder-water', forbidsFlags: ['chore-water'] },
            { script: 'lira-reminder-herbs', forbidsFlags: ['chore-herbs'] },
        ],
    },
    {
        id: 'villager-dead-1',
        x: 400,
        y: 500,
        spriteKey: 'villager3',
        frame: 24,
        solid: false,
        corpse: true,
        requiresFlags: ['act1-lira-taken'],
        dialogs: [],
    },
    {
        id: 'villager-dead-2',
        x: 620,
        y: 470,
        spriteKey: 'village6',
        frame: 24,
        solid: false,
        corpse: true,
        requiresFlags: ['act1-lira-taken'],
        dialogs: [],
    },
];

const cottageBTriggers: AreaTrigger[] = [
    {
        id: 'lira-taken',
        type: 'enter',
        x: 352,
        y: 400,
        width: 320,
        height: 160,
        once: true,
        requiresFlags: ['act1-attack'],
        forbidsFlags: ['act1-lira-taken'],
        cinematic: 'lira-taken',
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
