export class MenuScene extends Phaser.Scene {
    private startButton!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add
            .text(width / 2, height / 3, 'A Tie to the Past', {
                fontSize: '48px',
                color: '#ffffff',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5);

        this.startButton = this.add
            .text(width / 2, height / 2, 'Start Game', {
                fontSize: '32px',
                color: '#00ff00',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            })
            .on('pointerover', () => {
                this.startButton.setStyle({ color: '#ffff00' });
            })
            .on('pointerout', () => {
                this.startButton.setStyle({ color: '#00ff00' });
            });

        this.input.keyboard?.on('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}
