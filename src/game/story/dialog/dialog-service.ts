import Phaser from 'phaser';
import { InputState } from '../../input/input-state';
import { DIALOG_SCENE_KEY } from '../../scenes/dialog-scene/dialog-scene';
import { getDialogScript } from './dialog-scripts';

export function launchDialog(
    scene: Phaser.Scene,
    scriptId: string,
    inputState: InputState,
    onComplete?: () => void,
): boolean {
    if (!getDialogScript(scriptId) || scene.scene.isActive(DIALOG_SCENE_KEY)) {
        return false;
    }

    scene.scene.launch(DIALOG_SCENE_KEY, { scriptId, inputState, onComplete });

    return true;
}
