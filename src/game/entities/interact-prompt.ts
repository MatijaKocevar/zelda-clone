import Phaser from 'phaser';
import { areTouchControlsActive } from '../input/mobile-controls-state';
import { signControlKeys } from '../assets/sign-assets';

const ICON_SIZE = 32;
const ICON_GAP = 4;
const BOB_DISTANCE = 10;
const BOB_DURATION = 600;

export class InteractPrompt {
    private prompt: Phaser.GameObjects.Image | Phaser.GameObjects.Container;
    private hand?: Phaser.GameObjects.Image;
    private key?: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, x: number, y: number, depth: number, interactHint: boolean) {
        if (!interactHint) {
            this.prompt = scene.add.image(x, y, 'sign-interact').setDepth(depth).setVisible(false);
        } else {
            const hand = scene.add.image(0, 0, 'sign-interact').setOrigin(0.5);
            const key = scene.add.image(0, 0, this.getInteractKey()).setOrigin(0.5);

            this.hand = hand;
            this.key = key;
            this.layoutIcons();

            this.prompt = scene.add.container(x, y, [hand, key]).setDepth(depth).setVisible(false);
        }

        scene.tweens.add({
            targets: this.prompt,
            y: this.prompt.y - BOB_DISTANCE,
            duration: BOB_DURATION,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut',
        });
    }

    setVisible(visible: boolean): void {
        this.prompt.setVisible(visible);
    }

    update(): void {
        if (!this.key) {
            return;
        }

        const interactKey = this.getInteractKey();

        if (this.key.texture.key === interactKey) {
            return;
        }

        this.key.setTexture(interactKey);
        this.layoutIcons();
    }

    private getInteractKey(): string {
        return areTouchControlsActive() ? signControlKeys.buttonX : signControlKeys.keyE;
    }

    private layoutIcons(): void {
        const { hand, key } = this;

        if (!hand || !key) {
            return;
        }

        const keyWidth = (key.width * ICON_SIZE) / key.height;

        key.setDisplaySize(keyWidth, ICON_SIZE);

        const totalWidth = hand.width + ICON_GAP + keyWidth;
        let cursor = -totalWidth / 2;

        hand.setPosition(cursor + hand.width / 2, 0);
        cursor += hand.width + ICON_GAP;
        key.setPosition(cursor + keyWidth / 2, 0);
    }
}
