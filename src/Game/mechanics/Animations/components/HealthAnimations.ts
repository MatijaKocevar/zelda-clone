export class HealthAnimations {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    init() {
        const { scene } = this;

        scene.anims.create({
            key: 'heart-full',
            frames: scene.anims.generateFrameNumbers('heart', {
                start: 0,
                end: 0,
            }),
            frameRate: 1,
            repeat: -1,
        });

        scene.anims.create({
            key: 'heart-3/4',
            frames: scene.anims.generateFrameNumbers('heart', {
                start: 1,
                end: 1,
            }),
            frameRate: 1,
            repeat: -1,
        });

        scene.anims.create({
            key: 'heart-1/2',
            frames: scene.anims.generateFrameNumbers('heart', {
                start: 2,
                end: 2,
            }),
            frameRate: 1,
            repeat: -1,
        });

        scene.anims.create({
            key: 'heart-1/4',
            frames: scene.anims.generateFrameNumbers('heart', {
                start: 3,
                end: 3,
            }),
            frameRate: 1,
            repeat: -1,
        });

        scene.anims.create({
            key: 'heart-empty',
            frames: scene.anims.generateFrameNumbers('heart', {
                start: 4,
                end: 4,
            }),
            frameRate: 1,
            repeat: -1,
        });
    }
}
