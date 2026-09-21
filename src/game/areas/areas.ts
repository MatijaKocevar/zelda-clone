import { AreaDefinition } from './area.types';
import { homeArea } from './home/home.assets';
import { roomArea } from './room/room.assets';
import { sharedTestMapUrl } from './shared/test-map.assets';
import { tutorialArea } from './tutorial/tutorial.assets';

export const defaultAreaKey = 'home';

function createTestArea(key: string): AreaDefinition {
    return {
        key,
        mapUrl: sharedTestMapUrl,
        playerSpawn: { x: 2560, y: 1440 },
        backgroundImages: [],
        foregroundImages: [],
    };
}

export const areas: Record<string, AreaDefinition> = {
    home: homeArea,
    room: roomArea,
    tutorial: tutorialArea,
    north: createTestArea('north'),
    south: createTestArea('south'),
    east: createTestArea('east'),
    west: createTestArea('west'),
};

export function getArea(key: string): AreaDefinition {
    return areas[key] ?? areas[defaultAreaKey];
}
