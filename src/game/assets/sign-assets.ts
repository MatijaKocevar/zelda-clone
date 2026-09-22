import signpost from '../../assets/props/signpost.png';
import interactIcon from '../../assets/OG/ninja-4x/Interact.png';
import keyW from '../../assets/OG/ninja-4x/KeyW.png';
import keyA from '../../assets/OG/ninja-4x/KeyA.png';
import keyS from '../../assets/OG/ninja-4x/KeyS.png';
import keyD from '../../assets/OG/ninja-4x/KeyD.png';
import keySpace from '../../assets/OG/ninja-4x/KeySpace.png';
import keyShift from '../../assets/OG/ninja-4x/KeyShift.png';
import keyE from '../../assets/OG/ninja-4x/KeyE.png';
import joystickLeft from '../../assets/OG/ninja-4x/JoystickLeft.png';
import buttonA from '../../assets/OG/ninja-4x/ButtonA.png';
import buttonB from '../../assets/OG/ninja-4x/ButtonB.png';
import buttonX from '../../assets/OG/ninja-4x/ButtonX.png';
import { ImageAsset } from '../utils/asset-loader/asset-loader.types';

export const signControlKeys = {
    keyW: 'sign-key-w',
    keyA: 'sign-key-a',
    keyS: 'sign-key-s',
    keyD: 'sign-key-d',
    keySpace: 'sign-key-space',
    keyShift: 'sign-key-shift',
    keyE: 'sign-key-e',
    joystickLeft: 'sign-joystick-left',
    buttonA: 'sign-button-a',
    buttonB: 'sign-button-b',
    buttonX: 'sign-button-x',
};

export const signImageAssets: ImageAsset[] = [
    { key: 'signpost', path: signpost },
    { key: 'sign-interact', path: interactIcon },
    { key: signControlKeys.keyW, path: keyW },
    { key: signControlKeys.keyA, path: keyA },
    { key: signControlKeys.keyS, path: keyS },
    { key: signControlKeys.keyD, path: keyD },
    { key: signControlKeys.keySpace, path: keySpace },
    { key: signControlKeys.keyShift, path: keyShift },
    { key: signControlKeys.keyE, path: keyE },
    { key: signControlKeys.joystickLeft, path: joystickLeft },
    { key: signControlKeys.buttonA, path: buttonA },
    { key: signControlKeys.buttonB, path: buttonB },
    { key: signControlKeys.buttonX, path: buttonX },
];
