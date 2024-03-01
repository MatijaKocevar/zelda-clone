export class EnemyAnimations {
    scene: Phaser.Scene;
    enemyKeys = ['pinkazoid', 'zomboi'];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    init() {
        const { scene } = this;

        this.enemyKeys.forEach((key) => {
            // Walk animations
            scene.anims.create({
                key: `${key}-walk-horizontal`,
                frames: scene.anims.generateFrameNumbers(key, {
                    start: 20,
                    end: 23,
                }),
                frameRate: 10,
                repeat: -1,
            });

            scene.anims.create({
                key: `${key}-walk-up`,
                frames: scene.anims.generateFrameNumbers(key, {
                    start: 16,
                    end: 19,
                }),
                frameRate: 10,
                repeat: -1,
            });

            scene.anims.create({
                key: `${key}-walk-down`,
                frames: scene.anims.generateFrameNumbers(key, {
                    start: 12,
                    end: 15,
                }),
                frameRate: 10,
                repeat: -1,
            });

            // Idle animations
            scene.anims.create({
                key: `${key}-idle-horizontal`,
                frames: scene.anims.generateFrameNumbers(key, {
                    start: 8,
                    end: 9,
                }),
                frameRate: 3,
                repeat: 0,
            });

            scene.anims.create({
                key: `${key}-idle-up`,
                frames: scene.anims.generateFrameNumbers(key, {
                    start: 4,
                    end: 5,
                }),
                frameRate: 3,
                repeat: 0,
            });

            scene.anims.create({
                key: `${key}-idle-down`,
                frames: scene.anims.generateFrameNumbers(key, {
                    start: 0,
                    end: 1,
                }),
                frameRate: 3,
                repeat: 0,
            });

            // Attack animations
            scene.anims.create({
                key: `${key}-attack-horizontal`,
                frames: scene.anims.generateFrameNumbers(key, {
                    start: 32,
                    end: 35,
                }),
                frameRate: 10,
                repeat: 0,
            });

            scene.anims.create({
                key: `${key}-attack-up`,
                frames: scene.anims.generateFrameNumbers(key, {
                    start: 28,
                    end: 31,
                }),
                frameRate: 10,
                repeat: 0,
            });

            scene.anims.create({
                key: `${key}-attack-down`,
                frames: scene.anims.generateFrameNumbers(key, {
                    start: 24,
                    end: 27,
                }),
                frameRate: 10,
                repeat: 0,
            });
        });
    }
}
