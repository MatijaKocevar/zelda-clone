import Phaser from 'phaser';

const WIN_MESSAGE =
    'YEEY! Thou hast solved the puzzle of life, the universe, and everything. The monsters are gone. The real treasure was inside you all along — which is, frankly, a worrying place to keep treasure.';

export class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);

        this.add
            .text(width / 2, height / 2 - 110, 'VICTORY', {
                fontSize: '48px',
                color: '#ffd700',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5);

        this.add
            .text(width / 2, height / 2 - 10, WIN_MESSAGE, {
                fontSize: '22px',
                color: '#ffffff',
                fontFamily: 'Arial',
                align: 'center',
                wordWrap: { width: width * 0.7 },
            })
            .setOrigin(0.5);

        this.add
            .text(width / 2, height / 2 + 120, 'Click anywhere to play again', {
                fontSize: '20px',
                color: '#ffffff',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5);

        this.input.once('pointerdown', this.restart);
    }

    private restart = () => {
        this.scene.stop('GameScene');
        this.scene.start('GameScene');
    };
}
