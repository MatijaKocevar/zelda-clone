import cottageAMapUrl from '../../../assets/map/room/cottage-a.tmj?url';
import { AreaDefinition } from '../area.types';
import { houseTilesetImages } from './room-tilesets';

export const cottageAArea: AreaDefinition = {
    key: 'cottage-a',
    mapUrl: cottageAMapUrl,
    playerSpawn: { x: 512, y: 560 },
    backgroundColor: '#141b1b',
    backgroundImages: [],
    foregroundImages: [],
    tilesetImages: houseTilesetImages,
};
