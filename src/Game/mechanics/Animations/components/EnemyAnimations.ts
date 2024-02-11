export class EnemyAnimations {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    init() {
        const { scene } = this;

        scene.anims.create({
            key: 'slime-walk-horizontal',
            frames: scene.anims.generateFrameNumbers('slime', {
                start: 24,
                end: 29,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'slime-walk-up',
            frames: scene.anims.generateFrameNumbers('slime', {
                start: 30,
                end: 35,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'slime-walk-down',
            frames: scene.anims.generateFrameNumbers('slime', {
                start: 18,
                end: 23,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'slime-idle-down',
            frames: scene.anims.generateFrameNumbers('slime', {
                start: 0,
                end: 5,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'slime-idle-horizontal',
            frames: scene.anims.generateFrameNumbers('slime', {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'slime-idle-up',
            frames: scene.anims.generateFrameNumbers('slime', {
                start: 12,
                end: 17,
            }),
            frameRate: 10,
            repeat: 0,
        });
    }
}
