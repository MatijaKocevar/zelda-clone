import homeMapUrl from '../../../assets/map/home/tiled/home.tmj?url';
import tilesetWater from '../../../assets/OG/ninja-4x/TilesetWater.png';
import tilesetField from '../../../assets/OG/ninja-4x/TilesetField.png';
import tilesetNature from '../../../assets/OG/ninja-4x/TilesetNature.png';
import tilesetHouse from '../../../assets/OG/ninja-4x/TilesetHouse.png';
import { AreaDefinition, AreaSign, TilesetImageAsset } from '../area.types';
import { homeEnemySpawns } from './home-enemies';

const homeTilesetImages: TilesetImageAsset[] = [
    { name: 'TilesetWater', key: 'home-tileset-water', path: tilesetWater },
    { name: 'TilesetField', key: 'home-tileset-field', path: tilesetField },
    { name: 'TilesetNature', key: 'home-tileset-nature', path: tilesetNature },
    { name: 'TilesetHouse', key: 'home-tileset-house', path: tilesetHouse },
];

const homeSigns: AreaSign[] = [
    { text: 'KILL THEM. KILL THEM ALL.', x: 2560, y: 1360 },
    { text: 'They know you are coming. They always did.', x: 960, y: 1500 },
    { text: 'All of them. Every last monster. Then the voices stop.', x: 3900, y: 1500 },
    { text: 'Kill them all — even the cute pink ones. Especially the cute pink ones.', x: 2560, y: 2460 },
    { text: 'They wanted this.', x: 320, y: 1500 },
];

export const homeArea: AreaDefinition = {
    key: 'home',
    mapUrl: homeMapUrl,
    playerSpawn: { x: 2560, y: 1440 },
    backgroundColor: '#0d1b2a',
    backgroundImages: [],
    foregroundImages: [],
    tilesetImages: homeTilesetImages,
    enemySpawns: homeEnemySpawns,
    signs: homeSigns,
};
