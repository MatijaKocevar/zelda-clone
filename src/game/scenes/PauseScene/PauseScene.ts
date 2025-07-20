export class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5);

        this.add
            .text(width / 2, height / 2 - 50, 'PAUSED', {
                fontSize: '32px',
                color: '#ffffff',
            })
            .setOrigin(0.5);

        this.add
            .text(width / 2, height / 2 + 50, 'Press ESC to resume', {
                fontSize: '18px',
                color: '#ffffff',
            })
            .setOrigin(0.5);

        this.input.keyboard?.on('keydown-ESC', () => {
            this.scene.resume('GameScene');
            this.scene.stop();
        });
    }
}
