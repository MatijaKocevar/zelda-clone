import Phaser from 'phaser';
import { INTERACT } from '../../mechanics/input/input';
import { AreaSignControl } from '../../areas/area.types';
import { InteractPrompt } from '../interact-prompt';
import { ISign } from './sign.types';

const INTERACT_RADIUS = 110;
const PROMPT_DEPTH = 5900;
const POPUP_DEPTH = 6000;
const POPUP_MAX_WIDTH = 320;
const POPUP_DURATION = 4500;
const POPUP_FADE_DURATION = 400;
const POPUP_FONT_SIZE = '18px';
const CONTROL_LABEL_FONT_SIZE = '14px';
const PROMPT_OFFSET = 88;
const SIGN_HEIGHT = 64;
const POPUP_MARGIN = 12;
const POPUP_PADDING_X = 28;
const POPUP_PADDING_Y = 18;
const CONTROLS_GAP = 12;
const ICON_HEIGHT = 24;
const ICON_GAP = 3;
const GROUP_GAP = 18;
const CONTROL_LABEL_GAP = 10;
const ROW_GAP = 8;

interface ControlRow {
    container: Phaser.GameObjects.Container;
    width: number;
    height: number;
}

export class Sign {
    private scene: Phaser.Scene;
    private player: ISign['player'];
    private inputState: ISign['inputState'];
    private text: string;
    private controls: AreaSignControl[];
    private x: number;
    private y: number;
    private prompt: InteractPrompt;
    private popup?: Phaser.GameObjects.Container;
    private popupWidth = 0;
    private popupHeight = 0;
    private hideTimer?: Phaser.Time.TimerEvent;

    constructor({ x, y, text, controls, interactHint, scene, player, inputState }: ISign) {
        this.scene = scene;
        this.player = player;
        this.inputState = inputState;
        this.text = text;
        this.controls = controls ?? [];
        this.x = x;
        this.y = y;

        const signpost = scene.add.image(x, y, 'signpost').setOrigin(0.5, 1).setDepth(y);
        scene.physics.add.existing(signpost, true);
        (signpost.body as Phaser.Physics.Arcade.StaticBody).setSize(36, 28, true);
        scene.physics.add.collider(player.sprite, signpost);

        this.prompt = new InteractPrompt(scene, x, y - PROMPT_OFFSET, PROMPT_DEPTH, interactHint ?? false);
    }

    update(): void {
        if (this.popup) {
            this.positionPopup();
        }

        this.prompt.update();

        const distance = Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, this.x, this.y);
        const inRange = distance <= INTERACT_RADIUS;

        this.prompt.setVisible(inRange && !this.popup);

        if (!inRange || !this.inputState.isPressed(INTERACT)) {
            return;
        }

        this.inputState.release(INTERACT);
        this.showPopup();
    }

    private showPopup(): void {
        this.popup?.destroy();
        this.hideTimer?.remove();

        const label = this.scene.add
            .text(0, 0, this.text, {
                fontSize: POPUP_FONT_SIZE,
                fontFamily: 'Arial',
                color: '#ffe9c7',
                align: 'center',
                wordWrap: { width: POPUP_MAX_WIDTH },
            })
            .setOrigin(0.5);

        const rows = this.controls.map((control) => this.createControlRow(control));
        const contentWidth = Math.max(label.width, ...rows.map((row) => row.width));
        const rowsHeight = rows.reduce((sum, row) => sum + row.height, 0) + ROW_GAP * Math.max(0, rows.length - 1);
        const contentHeight = label.height + (rows.length ? CONTROLS_GAP + rowsHeight : 0);

        const width = contentWidth + POPUP_PADDING_X;
        const height = contentHeight + POPUP_PADDING_Y;

        this.popupWidth = width;
        this.popupHeight = height;

        const background = this.scene.add.graphics();
        background.fillStyle(0x1a120b, 0.7);
        background.lineStyle(3, 0x8a5a2b, 1);
        background.fillRoundedRect(-width / 2, -height / 2, width, height, 10);
        background.strokeRoundedRect(-width / 2, -height / 2, width, height, 10);
        background.fillTriangle(-12, height / 2 - 4, 12, height / 2 - 4, 0, height / 2 + 14);

        const top = -contentHeight / 2;
        label.setY(top + label.height / 2);

        const objects: Phaser.GameObjects.GameObject[] = [background, label];
        let rowTop = top + label.height + CONTROLS_GAP;

        rows.forEach((row) => {
            row.container.setPosition(0, rowTop + row.height / 2);
            objects.push(row.container);
            rowTop += row.height + ROW_GAP;
        });

        this.popup = this.scene.add.container(0, 0, objects).setDepth(POPUP_DEPTH).setAlpha(0);
        this.scene.cameras.main.ignore(this.popup);
        this.positionPopup();

        this.scene.tweens.add({ targets: this.popup, alpha: 1, duration: 150 });

        this.hideTimer = this.scene.time.delayedCall(POPUP_DURATION, () => this.hidePopup());
    }

    private createControlRow(control: AreaSignControl): ControlRow {
        const label = control.label
            ? this.scene.add
                  .text(0, 0, control.label, {
                      fontSize: CONTROL_LABEL_FONT_SIZE,
                      fontFamily: 'Arial',
                      color: '#c9b28f',
                  })
                  .setOrigin(0, 0.5)
            : undefined;
        const groups = [control.keyboard, control.gamepad]
            .filter((keys) => keys.length > 0)
            .map((keys) =>
                keys.map((key) => {
                    const image = this.scene.add.image(0, 0, key).setOrigin(0.5);
                    const width = (image.width * ICON_HEIGHT) / image.height;

                    image.setDisplaySize(width, ICON_HEIGHT);

                    return { image, width };
                }),
            );

        let totalWidth = label ? label.width + CONTROL_LABEL_GAP : 0;

        groups.forEach((group, index) => {
            if (index > 0) {
                totalWidth += GROUP_GAP;
            }

            totalWidth += group.reduce((sum, item) => sum + item.width, 0) + ICON_GAP * Math.max(0, group.length - 1);
        });

        let x = -totalWidth / 2;

        if (label) {
            label.setPosition(x, 0);
            x += label.width + CONTROL_LABEL_GAP;
        }

        groups.forEach((group, groupIndex) => {
            if (groupIndex > 0) {
                x += GROUP_GAP;
            }

            group.forEach(({ image, width }, index) => {
                if (index > 0) {
                    x += ICON_GAP;
                }

                image.setPosition(x + width / 2, 0);
                x += width;
            });
        });

        const images = groups.flatMap((group) => group.map(({ image }) => image));
        const container = this.scene.add.container(0, 0, label ? [label, ...images] : images);

        return { container, width: totalWidth, height: ICON_HEIGHT };
    }

    private positionPopup(): void {
        if (!this.popup) {
            return;
        }

        const camera = this.scene.cameras.main;
        const screenX = (this.x - camera.worldView.x) * camera.zoom;
        const screenY = (this.y - camera.worldView.y) * camera.zoom;
        const fitScale = Math.min(
            1,
            (this.scene.scale.width - POPUP_MARGIN * 2) / this.popupWidth,
            (this.scene.scale.height - POPUP_MARGIN * 2) / this.popupHeight,
        );
        const halfHeight = (this.popupHeight * fitScale) / 2;

        this.popup.setScale(fitScale);
        this.popup.setPosition(screenX, screenY - SIGN_HEIGHT * camera.zoom - POPUP_MARGIN - halfHeight);
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
