export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.6);

        this.add
            .text(width / 2, height / 2 - 50, 'GAME OVER', {
                fontSize: '48px',
                color: '#ff0000',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5);

        this.add
            .text(width / 2, height / 2 + 30, 'Press SPACE to restart', {
                fontSize: '20px',
                color: '#ffffff',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5);

        this.add
            .text(width / 2, height / 2 + 70, 'Press ESC for menu', {
                fontSize: '20px',
                color: '#ffffff',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5);

        this.input.keyboard?.once('keydown-SPACE', () => this.restart());
        this.input.keyboard?.once('keydown-ESC', () => this.goToMenu());
    }

    private restart() {
        this.scene.stop('GameScene');
        this.scene.start('GameScene');
    }

    private goToMenu() {
        this.scene.stop('GameScene');
        this.scene.start('MenuScene');
    }
}
