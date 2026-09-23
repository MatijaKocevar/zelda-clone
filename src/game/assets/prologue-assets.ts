import tilesetCamp from '../../assets/OG/ninja-4x/TilesetCamp.png';
import tilesetDesert from '../../assets/OG/ninja-4x/TilesetDesert.png';
import tilesetField from '../../assets/OG/ninja-4x/TilesetField.png';
import tilesetInterior from '../../assets/OG/ninja-4x/TilesetInterior.png';
import tilesetNature from '../../assets/OG/ninja-4x/TilesetNature.png';
import letter from '../../assets/OG/ninja-4x/Letter.png';
import { ImageAsset } from '../utils/asset-loader/asset-loader.types';

export const prologueImageAssets: ImageAsset[] = [
    { key: 'prologue-field', path: tilesetField },
    { key: 'prologue-nature', path: tilesetNature },
    { key: 'prologue-camp', path: tilesetCamp },
    { key: 'prologue-desert', path: tilesetDesert },
    { key: 'prologue-interior', path: tilesetInterior },
    { key: 'prologue-letter', path: letter },
];
