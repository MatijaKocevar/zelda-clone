import Phaser from 'phaser';
import { Animations } from '../../../../mechanics/animations/animations';

export function setupAnimations(scene: Phaser.Scene): Animations {
    return new Animations(scene);
}
