import Phaser from 'phaser';
import { prologueImageAssets } from '../../assets/prologue-assets';
import { prologueSlides } from '../../story/prologue';
import { AssetLoader } from '../../utils/asset-loader/asset-loader';

const GAME_SCENE_KEY = 'GameScene';
const BAR_RATIO = 0.12;
const FADE_DURATION = 350;
const TILE_SCALE = 2;
const TEXT_WIDTH_RATIO = 0.62;
const IMAGE_DISPLAY_WIDTH = 192;

export class PrologueScene extends Phaser.Scene {
    private slideIndex = 0;
    private transitioning = false;
    private finished = false;
    private backdrop!: Phaser.GameObjects.TileSprite;
    private shade!: Phaser.GameObjects.Rectangle;
    private image!: Phaser.GameObjects.Image;
    private text!: Phaser.GameObjects.Text;
    private counter!: Phaser.GameObjects.Text;
    private hint!: Phaser.GameObjects.Text;
    private skip!: Phaser.GameObjects.Text;
    private barTop!: Phaser.GameObjects.Rectangle;
    private barBottom!: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: 'PrologueScene' });
    }

    preload() {
        AssetLoader.loadImages(this, prologueImageAssets);
    }

    create() {
        this.backdrop = this.add
            .tileSprite(0, 0, this.scale.width, this.scale.height, prologueSlides[0].background)
            .setOrigin(0, 0)
            .setTileScale(TILE_SCALE);
        this.shade = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.55).setOrigin(0, 0);
        this.image = this.add.image(0, 0, 'prologue-letter').setVisible(false);
        this.text = this.add
            .text(0, 0, '', {
                fontFamily: 'Arial',
                fontSize: '30px',
                color: '#f2eaf1',
                align: 'center',
                lineSpacing: 14,
            })
            .setOrigin(0.5);
        this.barTop = this.add.rectangle(0, 0, this.scale.width, 0, 0x000000).setOrigin(0, 0);
        this.barBottom = this.add.rectangle(0, this.scale.height, this.scale.width, 0, 0x000000).setOrigin(0, 1);
        this.counter = this.add
            .text(0, 0, '', { fontFamily: 'Arial', fontSize: '16px', color: '#9a9a9a' })
            .setOrigin(1, 0.5);
        this.hint = this.add
            .text(0, 0, 'SPACE / E / TAP  —  CONTINUE          ESC  —  SKIP', {
                fontFamily: 'Arial',
                fontSize: '16px',
                color: '#b9b9b9',
            })
            .setOrigin(0.5);
        this.skip = this.add
            .text(0, 0, 'SKIP ▶', { fontFamily: 'Arial', fontSize: '18px', color: '#e8c07a' })
            .setOrigin(1, 0.5)
            .setInteractive({ useHandCursor: true });

        this.skip.on(
            'pointerdown',
            (_pointer: Phaser.Input.Pointer, _localX: number, _localY: number, event: Phaser.Types.Input.EventData) => {
                event.stopPropagation();
                this.finish();
            },
        );

        this.input.keyboard?.on('keydown-SPACE', this.advance);
        this.input.keyboard?.on('keydown-E', this.advance);
        this.input.keyboard?.on('keydown-ENTER', this.advance);
        this.input.keyboard?.on('keydown-ESC', this.finish);
        this.input.on('pointerdown', this.advance);

        const handleResize = () => this.layout();

        this.scale.on(Phaser.Scale.Events.RESIZE, handleResize);
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.scale.off(Phaser.Scale.Events.RESIZE, handleResize);
        });

        this.showSlide(0);
    }

    private showSlide(index: number): void {
        const slide = prologueSlides[index];

        this.slideIndex = index;
        this.backdrop.setTexture(slide.background).setTint(slide.tint ?? 0xffffff);

        if (slide.image) {
            this.image.setTexture(slide.image).setVisible(true);
        } else {
            this.image.setVisible(false);
        }

        this.text.setText(slide.text);
        this.counter.setText(`${index + 1} / ${prologueSlides.length}`);
        this.layout();
    }

    private layout(): void {
        const width = this.scale.width;
        const height = this.scale.height;
        const barHeight = Math.round(height * BAR_RATIO);
        const hasImage = this.image.visible;

        this.backdrop.setSize(width, height);
        this.shade.setSize(width, height);
        this.barTop.setSize(width, barHeight).setPosition(0, 0);
        this.barBottom.setSize(width, barHeight).setPosition(0, height);
        this.text.setWordWrapWidth(width * TEXT_WIDTH_RATIO);
        this.text.setPosition(width / 2, hasImage ? height / 2 + 40 : height / 2);
        this.image.setPosition(width / 2, height / 2 - 120);
        this.image.setDisplaySize(IMAGE_DISPLAY_WIDTH, (IMAGE_DISPLAY_WIDTH * this.image.height) / this.image.width);
        this.counter.setPosition(width - 40, height - barHeight / 2);
        this.hint.setPosition(width / 2, height - barHeight / 2);
        this.skip.setPosition(width - 40, barHeight / 2);
    }

    private advance = (): void => {
        if (this.transitioning || this.finished) {
            return;
        }

        if (this.slideIndex >= prologueSlides.length - 1) {
            this.finish();
            return;
        }

        this.transitioning = true;
        this.cameras.main.fadeOut(FADE_DURATION, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.showSlide(this.slideIndex + 1);
            this.cameras.main.fadeIn(FADE_DURATION, 0, 0, 0);
            this.transitioning = false;
        });
    };

    private finish = (): void => {
        if (this.finished) {
            return;
        }

        this.finished = true;
        this.cameras.main.fadeOut(FADE_DURATION, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(GAME_SCENE_KEY));
    };
}
