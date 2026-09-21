import Phaser from 'phaser';
import { SPACE } from '../../mechanics/input/input';
import { ISign } from './sign.types';

const INTERACT_RADIUS = 110;
const PROMPT_DEPTH = 5900;
const POPUP_DEPTH = 6000;
const POPUP_MAX_WIDTH = 320;
const POPUP_DURATION = 4500;
const POPUP_FADE_DURATION = 400;

export class Sign {
    private scene: Phaser.Scene;
    private player: ISign['player'];
    private inputState: ISign['inputState'];
    private text: string;
    private x: number;
    private y: number;
    private prompt: Phaser.GameObjects.Image;
    private popup?: Phaser.GameObjects.Container;
    private hideTimer?: Phaser.Time.TimerEvent;

    constructor({ x, y, text, scene, player, inputState }: ISign) {
        this.scene = scene;
        this.player = player;
        this.inputState = inputState;
        this.text = text;
        this.x = x;
        this.y = y;

        const signpost = scene.add.image(x, y, 'signpost').setOrigin(0.5, 1).setDepth(y);
        scene.physics.add.existing(signpost, true);
        (signpost.body as Phaser.Physics.Arcade.StaticBody).setSize(36, 28, true);
        scene.physics.add.collider(player.sprite, signpost);

        this.prompt = scene.add
            .image(x, y - 88, 'sign-interact')
            .setDepth(PROMPT_DEPTH)
            .setVisible(false);
        scene.tweens.add({
            targets: this.prompt,
            y: this.prompt.y - 10,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut',
        });
    }

    update(): void {
        const distance = Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, this.x, this.y);
        const inRange = distance <= INTERACT_RADIUS;

        this.prompt.setVisible(inRange && !this.popup);

        if (!inRange || !this.inputState.isPressed(SPACE)) {
            return;
        }

        this.inputState.release(SPACE);
        this.showPopup();
    }

    private showPopup(): void {
        this.popup?.destroy();
        this.hideTimer?.remove();

        const label = this.scene.add
            .text(0, 0, this.text, {
                fontSize: '22px',
                fontFamily: 'Arial',
                color: '#ffe9c7',
                align: 'center',
                wordWrap: { width: POPUP_MAX_WIDTH },
            })
            .setOrigin(0.5);

        const width = label.width + 44;
        const height = label.height + 32;

        const background = this.scene.add.graphics();
        background.fillStyle(0x1a120b, 0.7);
        background.lineStyle(3, 0x8a5a2b, 1);
        background.fillRoundedRect(-width / 2, -height / 2, width, height, 10);
        background.strokeRoundedRect(-width / 2, -height / 2, width, height, 10);
        background.fillTriangle(-12, height / 2 - 4, 12, height / 2 - 4, 0, height / 2 + 14);

        this.popup = this.scene.add
            .container(this.x, this.y - 110 - height / 2, [background, label])
            .setDepth(POPUP_DEPTH)
            .setAlpha(0);

        this.scene.tweens.add({ targets: this.popup, alpha: 1, duration: 150 });

        this.hideTimer = this.scene.time.delayedCall(POPUP_DURATION, () => this.hidePopup());
    }

    private hidePopup(): void {
        const popup = this.popup;

        if (!popup) {
            return;
        }

        this.popup = undefined;
        this.hideTimer = undefined;

        this.scene.tweens.add({
            targets: popup,
            alpha: 0,
            duration: POPUP_FADE_DURATION,
            onComplete: () => popup.destroy(),
        });
    }
}
