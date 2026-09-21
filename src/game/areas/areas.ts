import { AreaDefinition } from './area.types';
import { homeArea } from './home/home.assets';
import { roomArea } from './room/room.assets';

export const defaultAreaKey = 'home';

export const areas: Record<string, AreaDefinition> = {
    home: homeArea,
    room: roomArea,
};

export function getArea(key: string): AreaDefinition {
    return areas[key] ?? areas[defaultAreaKey];
}
