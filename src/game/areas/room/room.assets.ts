import roomMapUrl from '../../../assets/map/room/room.tmj?url';
import exitBlock from '../../../assets/map/room/exit-block.png';
import { AreaDefinition } from '../area.types';

export const roomArea: AreaDefinition = {
    key: 'room',
    mapUrl: roomMapUrl,
    playerSpawn: { x: 512, y: 570 },
    backgroundColor: '#000000',
    backgroundImages: [{ key: 'room-exit-block', path: exitBlock, x: 488, y: 608, depth: 1 }],
    foregroundImages: [],
};
