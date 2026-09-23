import hallMapUrl from '../../../assets/map/room/hall.tmj?url';
import { AreaDefinition } from '../area.types';
import { houseTilesetImages } from './room-tilesets';

export const hallArea: AreaDefinition = {
    key: 'hall',
    mapUrl: hallMapUrl,
    playerSpawn: { x: 512, y: 560 },
    backgroundColor: '#141b1b',
    backgroundImages: [],
    foregroundImages: [],
    tilesetImages: houseTilesetImages,
};
