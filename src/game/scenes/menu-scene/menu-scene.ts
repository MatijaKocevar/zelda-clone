import Phaser from 'phaser';
import { clearSave, hasSave, loadGame } from '../../state/save';

export class MenuScene extends Phaser.Scene {
    private title!: Phaser.GameObjects.Text;
    private buttons: Phaser.GameObjects.Text[] = [];

    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.cameras.main;
        const saveAvailable = hasSave();

        this.title = this.add
            .text(width / 2, height / 3, 'A Tie to the Past', {
                fontSize: '48px',
                color: '#ffffff',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5);

        this.buttons = [];

        if (saveAvailable) {
            this.buttons.push(this.createButton('Continue', () => this.continueGame()));
        }

        this.buttons.push(this.createButton(saveAvailable ? 'New Game' : 'Start Game', () => this.startNewGame()));

        const handleResize = (gameSize: Phaser.Structs.Size) => {
            this.title.setPosition(gameSize.width / 2, gameSize.height / 3);
            this.layoutButtons(gameSize.width, gameSize.height);
        };

        this.scale.on(Phaser.Scale.Events.RESIZE, handleResize);
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.scale.off(Phaser.Scale.Events.RESIZE, handleResize);
        });

        this.layoutButtons(width, height);

        this.input.keyboard?.on('keydown-SPACE', () => {
            if (hasSave()) {
                this.continueGame();
                return;
            }

            this.startNewGame();
        });
    }

    private createButton(label: string, onClick: () => void): Phaser.GameObjects.Text {
        const button = this.add
            .text(0, 0, label, {
                fontSize: '32px',
                color: '#00ff00',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', onClick)
            .on('pointerover', () => {
                button.setStyle({ color: '#ffff00' });
            })
            .on('pointerout', () => {
                button.setStyle({ color: '#00ff00' });
            });

        return button;
    }

    private layoutButtons(width: number, height: number): void {
        if (this.buttons.length === 1) {
            this.buttons[0].setPosition(width / 2, height / 2);
            return;
        }

        this.buttons[0].setPosition(width / 2, height / 2 - 20);
        this.buttons[1].setPosition(width / 2, height / 2 + 30);
    }

    private continueGame(): void {
        const data = loadGame();

        if (!data) {
            this.startNewGame();
            return;
        }

        this.scene.start('GameScene', { area: data.area });
    }

    private startNewGame(): void {
        clearSave();
        this.scene.start('PrologueScene');
    }
}
