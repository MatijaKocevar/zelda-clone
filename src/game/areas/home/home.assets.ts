import homeMapUrl from '../../../assets/map/home/tiled/home.tmj?url';
import tilesetWater from '../../../assets/OG/ninja-4x/TilesetWater.png';
import tilesetField from '../../../assets/OG/ninja-4x/TilesetField.png';
import tilesetNature from '../../../assets/OG/ninja-4x/TilesetNature.png';
import { AreaDefinition, TilesetImageAsset } from '../area.types';
import { homeEnemySpawns } from './home-enemies';

const homeTilesetImages: TilesetImageAsset[] = [
    { name: 'TilesetWater', key: 'home-tileset-water', path: tilesetWater },
    { name: 'TilesetField', key: 'home-tileset-field', path: tilesetField },
    { name: 'TilesetNature', key: 'home-tileset-nature', path: tilesetNature },
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
};
