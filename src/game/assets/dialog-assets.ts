import dialogBox from '../../assets/OG/ninja-4x/DialogBox.png';
import dialogBoxFaceset from '../../assets/OG/ninja-4x/DialogBoxFaceset.png';
import womanFace from '../../assets/OG/ninja-4x/WomanFace.png';
import oldMan3Face from '../../assets/OG/ninja-4x/OldMan3Face.png';
import interactIcon from '../../assets/OG/ninja-4x/Interact.png';
import keyE from '../../assets/OG/ninja-4x/KeyE.png';
import buttonX from '../../assets/OG/ninja-4x/ButtonX.png';
import { ImageAsset } from '../utils/asset-loader/asset-loader.types';
import { signControlKeys } from './sign-assets';

export const dialogImageAssets: ImageAsset[] = [
    { key: 'dialog-box', path: dialogBox },
    { key: 'dialog-box-faceset', path: dialogBoxFaceset },
    { key: 'face-woman', path: womanFace },
    { key: 'face-oldman3', path: oldMan3Face },
    { key: 'sign-interact', path: interactIcon },
    { key: signControlKeys.keyE, path: keyE },
    { key: signControlKeys.buttonX, path: buttonX },
];
