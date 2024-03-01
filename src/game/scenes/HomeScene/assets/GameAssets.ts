import playerSprite from '../../../../assets/characters/player/player.png';
import pinkazoidSprite from '../../../../assets/characters/enemies/pinkazoid.png';
import zomboiSprite from '../../../../assets/characters/enemies/zomboi.png';
import heartSprite from '../../../../assets/lifebar/heart_animated_2.png';
import backgroundTopLeft from '../../../../assets/map/background/topLeft.png';
import backgroundTopRight from '../../../../assets/map/background/topRight.png';
import backgroundBottomLeft from '../../../../assets/map/background/bottomLeft.png';
import backgroundBottomRight from '../../../../assets/map/background/bottomRight.png';
import foregroundTopLeft from '../../../../assets/map/foreground/topLeft.png';
import foregroundTopRight from '../../../../assets/map/foreground/topRight.png';
import foregroundBottomLeft from '../../../../assets/map/foreground/bottomLeft.png';
import foregroundBottomRight from '../../../../assets/map/foreground/bottomRight.png';
import {
    ImageAsset,
    SpriteSheetAsset,
} from '../../../utils/AssetLoader/AssetLoader.types';

export const imageAssets: ImageAsset[] = [
    {
        key: 'background-top-left',
        path: backgroundTopLeft,
    },
    {
        key: 'background-top-right',
        path: backgroundTopRight,
    },
    {
        key: 'background-bottom-left',
        path: backgroundBottomLeft,
    },
    {
        key: 'background-bottom-right',
        path: backgroundBottomRight,
    },
    {
        key: 'foreground-top-left',
        path: foregroundTopLeft,
    },
    {
        key: 'foreground-top-right',
        path: foregroundTopRight,
    },
    {
        key: 'foreground-bottom-left',
        path: foregroundBottomLeft,
    },
    {
        key: 'foreground-bottom-right',
        path: foregroundBottomRight,
    },
];

export const spriteSheetAssets: SpriteSheetAsset[] = [
    {
        key: 'player1',
        path: playerSprite,
        frameConfig: { frameWidth: 144, frameHeight: 144 },
    },
    {
        key: 'pinkazoid',
        path: pinkazoidSprite,
        frameConfig: { frameWidth: 96, frameHeight: 96 },
    },
    {
        key: 'zomboi',
        path: zomboiSprite,
        frameConfig: { frameWidth: 96, frameHeight: 96 },
    },
    {
        key: 'heart',
        path: heartSprite,
        frameConfig: { frameWidth: 17, frameHeight: 17 },
    },
];
