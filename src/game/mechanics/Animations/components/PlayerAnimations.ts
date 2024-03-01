export class PlayerAnimations {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    init() {
        const { scene } = this;

        //WALKING ANIMATIONS
        scene.anims.create({
            key: 'walk-horizontal',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 24,
                end: 29,
            }),
            frameRate: 6,
            repeat: -1,
        });

        scene.anims.create({
            key: 'walk-up',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 30,
                end: 35,
            }),
            frameRate: 6,
            repeat: -1,
        });

        scene.anims.create({
            key: 'walk-down',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 18,
                end: 23,
            }),
            frameRate: 6,
            repeat: -1,
        });

        //RUNNING ANIMATIONS
        scene.anims.create({
            key: 'run-horizontal',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 24,
                end: 29,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'run-up',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 30,
                end: 35,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'run-down',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 18,
                end: 23,
            }),
            frameRate: 10,
            repeat: -1,
        });

        //IDLE ANIMATIONS
        scene.anims.create({
            key: 'idle-down',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 0,
                end: 5,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'idle-horizontal',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 6,
                end: 11,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'idle-up',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 12,
                end: 17,
            }),
            frameRate: 10,
            repeat: 0,
        });

        //JUMP ANIMATION
        scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 24,
                end: 39,
            }),
            frameRate: 10,
            repeat: 0,
        });

        //SLASH ANIMATIONS
        scene.anims.create({
            key: 'slash-horizontal',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 42,
                end: 44,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'slash-up',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 48,
                end: 51,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'slash-down',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 36,
                end: 39,
            }),
            frameRate: 10,
            repeat: 0,
        });
    }
}
