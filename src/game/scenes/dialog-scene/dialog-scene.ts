import Phaser from 'phaser';
import { areTouchControlsActive } from '../../input/mobile-controls-state';
import { InputState } from '../../input/input-state';
import { signControlKeys } from '../../assets/sign-assets';
import { dialogImageAssets } from '../../assets/dialog-assets';
import { GamepadInput } from '../../mechanics/gamepad-input';
import { INTERACT, SPACE } from '../../mechanics/input/input';
import { DialogScript } from '../../story/dialog/dialog.types';
import { getDialogScript } from '../../story/dialog/dialog-scripts';
import { setFlags } from '../../story/story-flags';
import { markPlayerStatsDirty } from '../../state/player-state';
import { AssetLoader } from '../../utils/asset-loader/asset-loader';

export const DIALOG_SCENE_KEY = 'DialogScene';

const GAME_SCENE_KEY = 'GameScene';
const BOX_TEXTURE = 'dialog-box';
const FACESET_TEXTURE = 'dialog-box-faceset';
const BODY_FRAME = 'dialog-body';
const TAIL_FRAME = 'dialog-tail';
const BOX_WIDTH = 1200;
const BOX_HEIGHT = 200;
const TAIL_HEIGHT = 32;
const TAIL_WIDTH = 288;
const BOX_MARGIN = 16;
const PLAIN_SLICE_X = 32;
const FACESET_SLICE_X = 200;
const SLICE_RIGHT = 24;
const SLICE_Y = 24;
const TEXT_PADDING = 20;
const PORTRAIT_SIZE = 152;
const PORTRAIT_MARGIN = 24;
const SPEAKER_Y = 34;
const BODY_Y = 76;
const BODY_Y_NO_SPEAKER = 54;
const SPEAKER_FONT_SIZE = '22px';
const BODY_FONT_SIZE = '24px';
const LINE_SPACING = 8;
const SPEAKER_COLOR = '#a34a1c';
const BODY_COLOR = '#33241a';
const TYPE_DELAY = 14;
const ADVANCE_COOLDOWN = 150;
const HINT_ICON_HEIGHT = 28;
const HINT_GAP = 6;
const HINT_MARGIN = 18;

interface DialogSceneData {
    scriptId: string;
    inputState: InputState;
    onComplete?: () => void;
}

export class DialogScene extends Phaser.Scene {
    inputState!: InputState;
    private script!: DialogScript;
    private onComplete?: () => void;
    private lineIndex = 0;
    private visibleChars = 0;
    private typingTimer?: Phaser.Time.TimerEvent;
    private lastAdvanceTime = 0;
    private advanceLocked = true;
    private gamepadInput?: GamepadInput;

    private boxPlain!: Phaser.GameObjects.NineSlice;
    private boxFaceset!: Phaser.GameObjects.NineSlice;
    private tail!: Phaser.GameObjects.Image;
    private portrait!: Phaser.GameObjects.Image;
    private speakerText!: Phaser.GameObjects.Text;
    private bodyText!: Phaser.GameObjects.Text;
    private hintHand!: Phaser.GameObjects.Image;
    private hintKey!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: DIALOG_SCENE_KEY });
    }

    init(data: DialogSceneData) {
        this.inputState = data.inputState;
        this.onComplete = data.onComplete;
        this.lineIndex = 0;
        this.visibleChars = 0;
        this.lastAdvanceTime = 0;
        this.advanceLocked = true;
        this.script = getDialogScript(data.scriptId) ?? { id: data.scriptId, lines: [] };
    }

    preload() {
        AssetLoader.loadImages(this, dialogImageAssets);
    }

    create() {
        this.scene.pause(GAME_SCENE_KEY);

        if (this.script.lines.length === 0) {
            this.close();
            return;
        }

        this.createFrames();
        this.createObjects();
        this.gamepadInput = new GamepadInput(this);
        this.bindInput();
        this.showLine(0);

        const handleResize = () => this.layout();

        this.scale.on(Phaser.Scale.Events.RESIZE, handleResize);
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.scale.off(Phaser.Scale.Events.RESIZE, handleResize);
        });
    }

    update() {
        this.gamepadInput?.update();

        if (this.advanceLocked) {
            if (!this.inputState.isPressed(SPACE) && !this.inputState.isPressed(INTERACT)) {
                this.advanceLocked = false;
            }

            return;
        }

        if (!this.inputState.isPressed(SPACE) && !this.inputState.isPressed(INTERACT)) {
            return;
        }

        this.inputState.release(SPACE);
        this.inputState.release(INTERACT);
        this.advance();
    }

    private createFrames(): void {
        this.addFrames(BOX_TEXTURE);
        this.addFrames(FACESET_TEXTURE);
    }

    private addFrames(textureKey: string): void {
        const texture = this.textures.get(textureKey);

        if (!texture.has(BODY_FRAME)) {
            texture.add(BODY_FRAME, 0, 0, TAIL_HEIGHT, BOX_WIDTH, BOX_HEIGHT);
        }

        if (!texture.has(TAIL_FRAME)) {
            texture.add(TAIL_FRAME, 0, 0, 0, TAIL_WIDTH, TAIL_HEIGHT);
        }
    }

    private createObjects(): void {
        this.boxPlain = this.add
            .nineslice(0, 0, BOX_TEXTURE, BODY_FRAME, BOX_WIDTH, BOX_HEIGHT, PLAIN_SLICE_X, SLICE_RIGHT, SLICE_Y, SLICE_Y)
            .setOrigin(0, 0);
        this.boxFaceset = this.add
            .nineslice(
                0,
                0,
                FACESET_TEXTURE,
                BODY_FRAME,
                BOX_WIDTH,
                BOX_HEIGHT,
                FACESET_SLICE_X,
                SLICE_RIGHT,
                SLICE_Y,
                SLICE_Y,
            )
            .setOrigin(0, 0)
            .setVisible(false);
        this.tail = this.add.image(0, 0, BOX_TEXTURE, TAIL_FRAME).setOrigin(0, 1);
        this.portrait = this.add.image(0, 0, 'face-woman').setOrigin(0, 0).setVisible(false);
        this.speakerText = this.add.text(0, 0, '', {
            fontFamily: 'Arial',
            fontSize: SPEAKER_FONT_SIZE,
            fontStyle: 'bold',
            color: SPEAKER_COLOR,
        });
        this.bodyText = this.add.text(0, 0, '', {
            fontFamily: 'Arial',
            fontSize: BODY_FONT_SIZE,
            color: BODY_COLOR,
            lineSpacing: LINE_SPACING,
        });
        this.hintHand = this.add.image(0, 0, 'sign-interact').setOrigin(0.5);
        this.hintKey = this.add.image(0, 0, signControlKeys.keyE).setOrigin(0.5);

        this.tweens.add({
            targets: [this.hintHand, this.hintKey],
            alpha: { from: 1, to: 0.3 },
            duration: 500,
            yoyo: true,
            repeat: -1,
        });
    }

    private bindInput(): void {
        this.input.keyboard?.on('keydown-E', this.advance);
        this.input.keyboard?.on('keydown-SPACE', this.advance);
        this.input.keyboard?.on('keydown-ENTER', this.advance);
        this.input.on('pointerdown', this.advance);
    }

    private showLine(index: number): void {
        const line = this.script.lines[index];

        this.lineIndex = index;
        this.visibleChars = 0;
        this.typingTimer?.remove();
        this.typingTimer = undefined;

        this.speakerText.setText(line.speaker ?? '');
        this.speakerText.setVisible(Boolean(line.speaker));

        if (line.portrait) {
            this.portrait.setTexture(line.portrait);
        }

        this.portrait.setVisible(Boolean(line.portrait));

        this.updateHintKey();
        this.layout();

        this.bodyText.setText('');
        this.typingTimer = this.time.addEvent({
            delay: TYPE_DELAY,
            repeat: Math.max(0, line.text.length - 1),
            callback: () => {
                this.visibleChars += 1;
                this.bodyText.setText(line.text.slice(0, this.visibleChars));
            },
        });
    }

    private layout(): void {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
        const width = Math.min(BOX_WIDTH, screenWidth - BOX_MARGIN * 2);
        const left = (screenWidth - width) / 2;
        const top = screenHeight - BOX_MARGIN - BOX_HEIGHT;
        const faceset = this.portrait.visible;

        this.boxPlain.setSize(width, BOX_HEIGHT).setPosition(left, top).setVisible(!faceset);
        this.boxFaceset.setSize(width, BOX_HEIGHT).setPosition(left, top).setVisible(faceset);
        this.tail.setTexture(faceset ? FACESET_TEXTURE : BOX_TEXTURE, TAIL_FRAME).setPosition(left, top);

        if (faceset) {
            this.portrait.setPosition(left + PORTRAIT_MARGIN, top + (BOX_HEIGHT - PORTRAIT_SIZE) / 2);
        }

        const textLeft = left + (faceset ? FACESET_SLICE_X : PLAIN_SLICE_X) + TEXT_PADDING;
        const textRight = left + width - SLICE_RIGHT - TEXT_PADDING;
        const textWidth = Math.max(0, textRight - textLeft);

        this.speakerText.setPosition(textLeft, top + SPEAKER_Y);
        this.bodyText.setPosition(textLeft, top + (this.speakerText.visible ? BODY_Y : BODY_Y_NO_SPEAKER));
        this.bodyText.setWordWrapWidth(textWidth);

        const keyWidth = (this.hintKey.width * HINT_ICON_HEIGHT) / this.hintKey.height;

        this.hintKey.setDisplaySize(keyWidth, HINT_ICON_HEIGHT);

        const hintWidth = this.hintHand.width + HINT_GAP + keyWidth;
        const hintLeft = left + width - HINT_MARGIN - hintWidth;
        const hintY = top + BOX_HEIGHT - HINT_MARGIN - HINT_ICON_HEIGHT / 2;

        this.hintHand.setPosition(hintLeft + this.hintHand.width / 2, hintY);
        this.hintKey.setPosition(hintLeft + this.hintHand.width + HINT_GAP + keyWidth / 2, hintY);
    }

    private updateHintKey(): void {
        const interactKey = areTouchControlsActive() ? signControlKeys.buttonX : signControlKeys.keyE;

        if (this.hintKey.texture.key !== interactKey) {
            this.hintKey.setTexture(interactKey);
        }
    }

    private isTyping(): boolean {
        return this.visibleChars < this.script.lines[this.lineIndex].text.length;
    }

    private finishTyping(): void {
        const line = this.script.lines[this.lineIndex];

        this.typingTimer?.remove();
        this.typingTimer = undefined;
        this.visibleChars = line.text.length;
        this.bodyText.setText(line.text);
    }

    private advance = (): void => {
        const now = this.time.now;

        if (now - this.lastAdvanceTime < ADVANCE_COOLDOWN) {
            return;
        }

        this.lastAdvanceTime = now;

        if (this.isTyping()) {
            this.finishTyping();
            return;
        }

        if (this.lineIndex < this.script.lines.length - 1) {
            this.showLine(this.lineIndex + 1);
            return;
        }

        this.close();
    };

    private close = (): void => {
        this.typingTimer?.remove();
        this.typingTimer = undefined;
        setFlags(this.script.setFlags);

        if (this.script.setFlags?.length) {
            markPlayerStatsDirty();
        }

        this.inputState.reset();
        this.scene.resume(GAME_SCENE_KEY);

        const onComplete = this.onComplete;

        this.onComplete = undefined;
        onComplete?.();
        this.scene.stop();
    };
}
