import { AreaDefinition } from './area.types';
import { homeArea } from './home/home.assets';
import { caveArea } from './room/cave.assets';
import { cottageAArea } from './room/cottage-a.assets';
import { cottageBArea } from './room/cottage-b.assets';
import { hallArea } from './room/hall.assets';

export const defaultAreaKey = 'home';

export const areas: Record<string, AreaDefinition> = {
    home: homeArea,
    'cottage-a': cottageAArea,
    'cottage-b': cottageBArea,
    hall: hallArea,
    cave: caveArea,
};

export function getArea(key: string): AreaDefinition {
    return areas[key] ?? areas[defaultAreaKey];
}
