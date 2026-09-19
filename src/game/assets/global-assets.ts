import playerSprite from '../../assets/characters/player/player.png';
import pinkazoidSprite from '../../assets/characters/enemies/pinkazoid.png';
import zomboiSprite from '../../assets/characters/enemies/zomboi.png';
import heartSprite from '../../assets/lifebar/heart-animated-2.png';
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
];
