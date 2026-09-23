import caveMapUrl from '../../../assets/map/room/cave.tmj?url';
import swordSprite from '../../../assets/OG/ninja-4x/Sword.png';
import { AreaDefinition, AreaNpc, AreaTrigger, EnemySpawn, PlacedImage } from '../area.types';
import { caveTilesetImages } from './room-tilesets';

const caveNpcs: AreaNpc[] = [
    {
        id: 'hermit',
        x: 704,
        y: 224,
        spriteKey: 'oldman3',
        direction: 'down',
        dialogs: [
            { script: 'hermit-after', requiresFlags: ['unlocked-magic'] },
            { script: 'hermit-magic', requiresFlags: ['act2-cave-trial'], forbidsFlags: ['unlocked-magic'] },
            { script: 'hermit-post', requiresFlags: ['act2-melee-training'], forbidsFlags: ['act2-cave-trial'] },
            { script: 'hermit-waiting', requiresFlags: ['act2-hermit-met'], forbidsFlags: ['act2-melee-training'] },
            { script: 'hermit-first', requiresFlags: ['act1-revenge'], forbidsFlags: ['act2-hermit-met'] },
            { script: 'hermit-early' },
        ],
    },
];

const caveProps: PlacedImage[] = [{ key: 'cave-training-blade', path: swordSprite, x: 628, y: 280, depth: 348 }];

const caveEnemyPositions = [
    { x: 288, y: 288, type: 'pinkazoid' as const },
    { x: 416, y: 224, type: 'pinkazoid' as const },
    { x: 320, y: 512, type: 'zomboi' as const },
];

const caveEnemySpawns: EnemySpawn[] = caveEnemyPositions.map((spawn): EnemySpawn => ({
    requiresFlags: ['act1-revenge'],
    forbidsFlags: ['act2-cave-trial'],
    position: { x: spawn.x, y: spawn.y },
    type: spawn.type,
    patrolPath: [
        { direction: 'left', distance: 100 },
        { direction: 'right', distance: 100 },
        { direction: 'up', distance: 80 },
        { direction: 'down', distance: 80 },
    ],
}));

const caveTriggers: AreaTrigger[] = [
    {
        id: 'training-post',
        type: 'interact',
        x: 640,
        y: 320,
        radius: 110,
        once: true,
        requiresFlags: ['act2-hermit-met'],
        forbidsFlags: ['act2-melee-training'],
        dialog: 'training-post',
        setFlags: ['act2-melee-training'],
    },
    {
        id: 'cave-trial',
        type: 'victory',
        once: true,
        requiresFlags: ['act1-revenge'],
        forbidsFlags: ['act2-cave-trial'],
        suppressWin: true,
        dialog: 'cave-trial',
        setFlags: ['act2-cave-trial'],
    },
];

export const caveArea: AreaDefinition = {
    key: 'cave',
    mapUrl: caveMapUrl,
    playerSpawn: { x: 480, y: 480 },
    backgroundColor: '#141b1b',
    backgroundImages: caveProps,
    foregroundImages: [],
    tilesetImages: caveTilesetImages,
    npcs: caveNpcs,
    enemySpawns: caveEnemySpawns,
    triggers: caveTriggers,
};
