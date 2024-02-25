export class EnemyAnimations {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    init() {
        const { scene } = this;

        // Walk animations
        scene.anims.create({
            key: 'pinkazoid-walk-horizontal',
            frames: scene.anims.generateFrameNumbers('pinkazoid', {
                start: 20,
                end: 23,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'pinkazoid-walk-up',
            frames: scene.anims.generateFrameNumbers('pinkazoid', {
                start: 16,
                end: 19,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'pinkazoid-walk-down',
            frames: scene.anims.generateFrameNumbers('pinkazoid', {
                start: 12,
                end: 15,
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Idle animations
        scene.anims.create({
            key: 'pinkazoid-idle-horizontal',
            frames: scene.anims.generateFrameNumbers('pinkazoid', {
                start: 8,
                end: 9,
            }),
            frameRate: 3,
            repeat: 0,
        });

        scene.anims.create({
            key: 'pinkazoid-idle-up',
            frames: scene.anims.generateFrameNumbers('pinkazoid', {
                start: 4,
                end: 5,
            }),
            frameRate: 3,
            repeat: 0,
        });

        scene.anims.create({
            key: 'pinkazoid-idle-down',
            frames: scene.anims.generateFrameNumbers('pinkazoid', {
                start: 0,
                end: 1,
            }),
            frameRate: 3,
            repeat: 0,
        });

        // Attack animations
        scene.anims.create({
            key: 'pinkazoid-attack-horizontal',
            frames: scene.anims.generateFrameNumbers('pinkazoid', {
                start: 32,
                end: 35,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'pinkazoid-attack-up',
            frames: scene.anims.generateFrameNumbers('pinkazoid', {
                start: 28,
                end: 31,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'pinkazoid-attack-down',
            frames: scene.anims.generateFrameNumbers('pinkazoid', {
                start: 24,
                end: 27,
            }),
            frameRate: 10,
            repeat: 0,
        });
    }
}
