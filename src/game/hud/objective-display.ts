import Phaser from 'phaser';
import { getLevel, getXp, xpToNextLevel } from '../state/player-state';
import { getCurrentObjective } from '../story/objectives';

const TEXT_DEPTH = 100;
const MARGIN = 24;
const LEVEL_OFFSET_Y = 26;
const MAX_WIDTH = 340;
const LEVEL_FONT_SIZE = '18px';
const OBJECTIVE_FONT_SIZE = '17px';
const LEVEL_COLOR = '#e8c07a';
const OBJECTIVE_COLOR = '#f2eaf1';

export class ObjectiveDisplay {
    private scene: Phaser.Scene;
    private levelText: Phaser.GameObjects.Text;
    private objectiveText: Phaser.GameObjects.Text;
    private lastSignature = '';

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.levelText = scene.add
            .text(0, 0, '', {
                fontFamily: 'Arial',
                fontSize: LEVEL_FONT_SIZE,
                fontStyle: 'bold',
                color: LEVEL_COLOR,
            })
            .setOrigin(1, 0)
            .setScrollFactor(0)
            .setDepth(TEXT_DEPTH)
            .setShadow(1, 1, '#000000', 2);

        this.objectiveText = scene.add
            .text(0, 0, '', {
                fontFamily: 'Arial',
                fontSize: OBJECTIVE_FONT_SIZE,
                color: OBJECTIVE_COLOR,
                align: 'right',
            })
            .setOrigin(1, 0)
            .setScrollFactor(0)
            .setDepth(TEXT_DEPTH)
            .setShadow(1, 1, '#000000', 2);

        const handleResize = () => this.layout();

        this.scene.scale.on(Phaser.Scale.Events.RESIZE, handleResize);
        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.scene.scale.off(Phaser.Scale.Events.RESIZE, handleResize);
        });

        this.update();
    }

    getObjects(): Phaser.GameObjects.GameObject[] {
        return [this.levelText, this.objectiveText];
    }

    update(): void {
        const level = getLevel();
        const xp = getXp();
        const objective = getCurrentObjective();
        const signature = `${level}:${xp}:${objective?.id ?? 'none'}`;

        if (signature === this.lastSignature) {
            return;
        }

        this.lastSignature = signature;
        this.levelText.setText(`Lv ${level}  (${xp} / ${xpToNextLevel()} XP)`);
        this.objectiveText.setText(objective?.text ?? '');
        this.layout();
    }

    private layout(): void {
        const right = this.scene.scale.width - MARGIN;

        this.levelText.setPosition(right, MARGIN);
        this.objectiveText.setPosition(right, MARGIN + LEVEL_OFFSET_Y);
        this.objectiveText.setWordWrapWidth(MAX_WIDTH);
    }
}
