import backgroundTopLeft from '../../../assets/map/home/background/top-left.png';
import backgroundTopRight from '../../../assets/map/home/background/top-right.png';
import backgroundBottomLeft from '../../../assets/map/home/background/bottom-left.png';
import backgroundBottomRight from '../../../assets/map/home/background/bottom-right.png';
import foregroundTopLeft from '../../../assets/map/home/foreground/top-left.png';
import foregroundTopRight from '../../../assets/map/home/foreground/top-right.png';
import foregroundBottomLeft from '../../../assets/map/home/foreground/bottom-left.png';
import foregroundBottomRight from '../../../assets/map/home/foreground/bottom-right.png';
import homeMapUrl from '../../../assets/map/home/tiled/home.tmj?url';
import { AreaDefinition, PlacedImage } from '../area.types';

const homeBackgroundImages: PlacedImage[] = [
    { key: 'home-background-top-left', path: backgroundTopLeft, x: 0, y: 0, depth: 0 },
    { key: 'home-background-top-right', path: backgroundTopRight, x: 2560, y: 0, depth: 0 },
    { key: 'home-background-bottom-left', path: backgroundBottomLeft, x: 0, y: 1440, depth: 0 },
    { key: 'home-background-bottom-right', path: backgroundBottomRight, x: 2560, y: 1440, depth: 0 },
];

const homeForegroundImages: PlacedImage[] = [
    { key: 'home-foreground-top-left', path: foregroundTopLeft, x: 0, y: 0, depth: 50 },
    { key: 'home-foreground-top-right', path: foregroundTopRight, x: 2560, y: 0, depth: 50 },
    { key: 'home-foreground-bottom-left', path: foregroundBottomLeft, x: 0, y: 1440, depth: 50 },
    { key: 'home-foreground-bottom-right', path: foregroundBottomRight, x: 2560, y: 1440, depth: 50 },
];

export const homeArea: AreaDefinition = {
    key: 'home',
    mapUrl: homeMapUrl,
    playerSpawn: { x: 2400, y: 1250 },
    backgroundImages: homeBackgroundImages,
    foregroundImages: homeForegroundImages,
};
