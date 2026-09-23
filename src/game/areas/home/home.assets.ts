import homeMapUrl from '../../../assets/map/home/tiled/home.tmj?url';
import tilesetWater from '../../../assets/OG/ninja-4x/TilesetWater.png';
import tilesetField from '../../../assets/OG/ninja-4x/TilesetField.png';
import tilesetNature from '../../../assets/OG/ninja-4x/TilesetNature.png';
import tilesetHouse from '../../../assets/OG/ninja-4x/TilesetHouse.png';
import propAxe from '../../../assets/OG/ninja-4x/Axe.png';
import propWateringCan from '../../../assets/OG/ninja-4x/WateringCan.png';
import propGrass from '../../../assets/OG/ninja-4x/Grass.png';
import { AreaDefinition, AreaTrigger, PlacedImage, TilesetImageAsset } from '../area.types';
import { homeEnemySpawns } from './home-enemies';

const homeTilesetImages: TilesetImageAsset[] = [
    { name: 'TilesetWater', key: 'home-tileset-water', path: tilesetWater },
    { name: 'TilesetField', key: 'home-tileset-field', path: tilesetField },
    { name: 'TilesetNature', key: 'home-tileset-nature', path: tilesetNature },
    { name: 'TilesetHouse', key: 'home-tileset-house', path: tilesetHouse },
];

const homeProps: PlacedImage[] = [
    { key: 'home-prop-axe', path: propAxe, x: 2816, y: 2112, depth: 2176 },
    { key: 'home-prop-watering-can', path: propWateringCan, x: 2112, y: 1024, depth: 1088 },
    { key: 'home-prop-herbs', path: propGrass, x: 3136, y: 1792, depth: 1856 },
];

const homeTriggers: AreaTrigger[] = [
    {
        id: 'intro',
        type: 'enter',
        x: 2464,
        y: 1344,
        width: 192,
        height: 192,
        once: true,
        cinematic: 'home-arrival',
    },
    {
        id: 'chore-wood',
        type: 'interact',
        x: 2848,
        y: 2152,
        radius: 130,
        once: true,
        requiresFlags: ['mom-asked'],
        dialog: 'chore-wood',
        setFlags: ['chore-wood'],
    },
    {
        id: 'chore-water',
        type: 'interact',
        x: 2144,
        y: 1088,
        radius: 130,
        once: true,
        requiresFlags: ['mom-asked'],
        dialog: 'chore-water',
        setFlags: ['chore-water'],
    },
    {
        id: 'chore-herbs',
        type: 'interact',
        x: 3168,
        y: 1832,
        radius: 130,
        once: true,
        requiresFlags: ['mom-asked'],
        dialog: 'chore-herbs',
        setFlags: ['chore-herbs'],
    },
    {
        id: 'attack-start',
        type: 'enter',
        x: 2896,
        y: 1960,
        width: 160,
        height: 128,
        once: true,
        requiresFlags: ['act1-chores-done'],
        forbidsFlags: ['act1-attack'],
        cinematic: 'attack-start',
    },
    {
        id: 'wave-cleared',
        type: 'victory',
        once: true,
        requiresFlags: ['act1-attack'],
        forbidsFlags: ['act1-wave-cleared', 'act1-mom-dead'],
        suppressWin: true,
        dialog: 'wave-cleared',
        setFlags: ['act1-wave-cleared'],
    },
    {
        id: 'wave-cleared-after',
        type: 'victory',
        once: true,
        requiresFlags: ['act1-attack'],
        forbidsFlags: ['act1-wave-cleared'],
        suppressWin: true,
        setFlags: ['act1-wave-cleared'],
    },
];

export const homeArea: AreaDefinition = {
    key: 'home',
    mapUrl: homeMapUrl,
    playerSpawn: { x: 2560, y: 1440 },
    backgroundColor: '#0d1b2a',
    backgroundImages: homeProps,
    foregroundImages: [],
    tilesetImages: homeTilesetImages,
    enemySpawns: homeEnemySpawns,
    triggers: homeTriggers,
};
