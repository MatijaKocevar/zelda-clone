import playerSprite from '../../assets/characters/player/player.png';
import pinkazoidSprite from '../../assets/characters/enemies/pinkazoid.png';
import zomboiSprite from '../../assets/characters/enemies/zomboi.png';
import heartSprite from '../../assets/lifebar/heart-animated-2.png';
import fireballSprite from '../../assets/OG/ninja-4x/Fireball.png';
import womanSprite from '../../assets/OG/ninja-4x/Woman.png';
import oldMan3Sprite from '../../assets/OG/ninja-4x/OldMan3.png';
import { SpriteSheetAsset } from '../utils/asset-loader/asset-loader.types';

export const globalSpriteSheetAssets: SpriteSheetAsset[] = [
    {
        key: 'player1',
        path: playerSprite,
        frameConfig: {
            frameWidth: 144,
            frameHeight: 144,
        },
    },
    {
        key: 'pinkazoid',
        path: pinkazoidSprite,
        frameConfig: {
            frameWidth: 96,
            frameHeight: 96,
        },
    },
    {
        key: 'zomboi',
        path: zomboiSprite,
        frameConfig: {
            frameWidth: 96,
            frameHeight: 96,
        },
    },
    {
        key: 'heart',
        path: heartSprite,
        frameConfig: {
            frameWidth: 17,
            frameHeight: 17,
        },
    },
    {
        key: 'fireball',
        path: fireballSprite,
        frameConfig: {
            frameWidth: 64,
            frameHeight: 64,
        },
    },
    {
        key: 'woman',
        path: womanSprite,
        frameConfig: {
            frameWidth: 64,
            frameHeight: 64,
        },
    },
    {
        key: 'oldman3',
        path: oldMan3Sprite,
        frameConfig: {
            frameWidth: 64,
            frameHeight: 64,
        },
    },
];
