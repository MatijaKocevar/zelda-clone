import caveMapUrl from '../../../assets/map/room/cave.tmj?url';
import { AreaDefinition } from '../area.types';
import { caveTilesetImages } from './room-tilesets';

export const caveArea: AreaDefinition = {
    key: 'cave',
    mapUrl: caveMapUrl,
    playerSpawn: { x: 480, y: 480 },
    backgroundColor: '#141b1b',
    backgroundImages: [],
    foregroundImages: [],
    tilesetImages: caveTilesetImages,
};
