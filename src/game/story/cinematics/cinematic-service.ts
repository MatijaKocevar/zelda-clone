import Phaser from 'phaser';
import { CINEMATIC_SCENE_KEY } from '../../scenes/cinematic-scene/cinematic-scene';
import { getCinematic } from './cinematics';

export function launchCinematic(scene: Phaser.Scene, id: string, onComplete?: () => void): boolean {
    if (!getCinematic(id) || scene.scene.isActive(CINEMATIC_SCENE_KEY)) {
        return false;
    }

    scene.scene.launch(CINEMATIC_SCENE_KEY, { id, onComplete });

    return true;
}
