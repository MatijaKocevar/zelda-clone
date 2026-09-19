import { getMobileControlsVisible, toggleMobileControls } from '../../input/mobile-controls-state';

export class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5);

        this.add
            .text(width / 2, height / 2 - 90, 'PAUSED', {
                fontSize: '32px',
                color: '#ffffff',
            })
            .setOrigin(0.5);

        this.add
            .text(width / 2, height / 2 + 40, 'Press ESC or tap to resume', {
                fontSize: '18px',
                color: '#ffffff',
            })
            .setOrigin(0.5);

        const controlsToggle = this.add
            .text(width / 2, height / 2 + 110, '', {
                fontSize: '22px',
                color: '#00ff00',
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const renderToggle = () => {
            controlsToggle.setText(`Touch controls: ${getMobileControlsVisible() ? 'ON' : 'OFF'}`);
        };

        renderToggle();

        controlsToggle.on(
            'pointerdown',
            (
                _pointer: Phaser.Input.Pointer,
                _localX: number,
                _localY: number,
                event: Phaser.Types.Input.EventData,
            ) => {
                event.stopPropagation();
                toggleMobileControls();
                renderToggle();
            },
        );

        controlsToggle.on('pointerover', () => controlsToggle.setColor('#ffff00'));
        controlsToggle.on('pointerout', () => controlsToggle.setColor('#00ff00'));

        this.input.keyboard?.once('keydown-ESC', this.resumeGame);
        this.input.once('pointerdown', this.resumeGame);
    }

    private resumeGame = () => {
        this.scene.resume('GameScene');
        this.scene.stop();
    };
}
