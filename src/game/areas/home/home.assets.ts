import tilemapColor1 from '../../../assets/OG/tiny-swords/Terrain/Tileset/Tilemap_color1.png';
import waterBackground from '../../../assets/OG/tiny-swords/Terrain/Tileset/Water Background color.png';
import homeMapUrl from '../../../assets/map/home/tiled/home.tmj?url';
import { AreaDefinition, TilesetImageAsset } from '../area.types';

const homeTilesetImages: TilesetImageAsset[] = [
    { name: 'Water Background color', key: 'home-water-background', path: waterBackground },
    { name: 'Tilemap_color1', key: 'home-tilemap-color1', path: tilemapColor1 },
];

export const homeArea: AreaDefinition = {
    key: 'home',
    mapUrl: homeMapUrl,
    playerSpawn: { x: 2400, y: 1250 },
    backgroundImages: [],
    foregroundImages: [],
    tilesetImages: homeTilesetImages,
};
