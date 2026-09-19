import backgroundTopLeft from '../../assets/map/background/top-left.png';
import backgroundTopRight from '../../assets/map/background/top-right.png';
import backgroundBottomLeft from '../../assets/map/background/bottom-left.png';
import backgroundBottomRight from '../../assets/map/background/bottom-right.png';
import foregroundTopLeft from '../../assets/map/foreground/top-left.png';
import foregroundTopRight from '../../assets/map/foreground/top-right.png';
import foregroundBottomLeft from '../../assets/map/foreground/bottom-left.png';
import foregroundBottomRight from '../../assets/map/foreground/bottom-right.png';
import homeMapUrl from '../../assets/map/tiled/home.tmj?url';
import testMapUrl from '../../assets/map/tiled/test-map.tmj?url';
import { AreaDefinition } from './area.types';

const homeBackgroundImages = [
    { key: 'background-top-left', path: backgroundTopLeft, x: 0, y: 0, depth: 0 },
    { key: 'background-top-right', path: backgroundTopRight, x: 2560, y: 0, depth: 0 },
    { key: 'background-bottom-left', path: backgroundBottomLeft, x: 0, y: 1440, depth: 0 },
    { key: 'background-bottom-right', path: backgroundBottomRight, x: 2560, y: 1440, depth: 0 },
];

const homeForegroundImages = [
    { key: 'foreground-top-left', path: foregroundTopLeft, x: 0, y: 0, depth: 50 },
    { key: 'foreground-top-right', path: foregroundTopRight, x: 2560, y: 0, depth: 50 },
    { key: 'foreground-bottom-left', path: foregroundBottomLeft, x: 0, y: 1440, depth: 50 },
    { key: 'foreground-bottom-right', path: foregroundBottomRight, x: 2560, y: 1440, depth: 50 },
];

export const defaultAreaKey = 'home';

export const areas: Record<string, AreaDefinition> = {
    home: {
        key: 'home',
        mapUrl: homeMapUrl,
        playerSpawn: { x: 2400, y: 1250 },
        backgroundImages: homeBackgroundImages,
        foregroundImages: homeForegroundImages,
    },
    north: {
        key: 'north',
        mapUrl: testMapUrl,
        playerSpawn: { x: 2560, y: 1440 },
        backgroundImages: [],
        foregroundImages: [],
    },
    south: {
        key: 'south',
        mapUrl: testMapUrl,
        playerSpawn: { x: 2560, y: 1440 },
        backgroundImages: [],
        foregroundImages: [],
    },
    east: {
        key: 'east',
        mapUrl: testMapUrl,
        playerSpawn: { x: 2560, y: 1440 },
        backgroundImages: [],
        foregroundImages: [],
    },
    west: {
        key: 'west',
        mapUrl: testMapUrl,
        playerSpawn: { x: 2560, y: 1440 },
        backgroundImages: [],
        foregroundImages: [],
    },
};

export function getArea(key: string): AreaDefinition {
    return areas[key] ?? areas[defaultAreaKey];
}
