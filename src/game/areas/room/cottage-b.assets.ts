import cottageBMapUrl from '../../../assets/map/room/cottage-b.tmj?url';
import { AreaDefinition } from '../area.types';
import { houseTilesetImages } from './room-tilesets';

export const cottageBArea: AreaDefinition = {
    key: 'cottage-b',
    mapUrl: cottageBMapUrl,
    playerSpawn: { x: 512, y: 560 },
    backgroundColor: '#141b1b',
    backgroundImages: [],
    foregroundImages: [],
    tilesetImages: houseTilesetImages,
};
