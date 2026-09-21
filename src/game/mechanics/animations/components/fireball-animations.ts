import Phaser from 'phaser';

export class FireballAnimations {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    init() {
        this.scene.anims.create({
            key: 'fireball-spin',
            frames: this.scene.anims.generateFrameNumbers('fireball', {
                start: 0,
                end: 3,
            }),
            frameRate: 12,
            repeat: -1,
        });
    }
}
