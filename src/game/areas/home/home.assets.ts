import homeMapUrl from '../../../assets/map/home/tiled/home.tmj?url';
import { AreaDefinition } from '../area.types';

export const homeArea: AreaDefinition = {
    key: 'home',
    mapUrl: homeMapUrl,
    playerSpawn: { x: 2560, y: 1440 },
    backgroundImages: [],
    foregroundImages: [],
};
