import { Animations } from '../../../../mechanics/Animations/Animations';

export function setupAnimations(scene: Phaser.Scene): Animations {
    return new Animations(scene);
}
