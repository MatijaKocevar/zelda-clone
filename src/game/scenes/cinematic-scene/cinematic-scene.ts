import Phaser from 'phaser';
import type { GameScene } from '../game-scene';
import { AreaSpawn } from '../../areas/area.types';
import { Player } from '../../entities/player/player';
import { CinematicStep } from '../../story/cinematics/cinematic.types';
import { getCinematic } from '../../story/cinematics/cinematics';
import { launchDialog } from '../../story/dialog/dialog-service';
import { setFlags } from '../../story/story-flags';

export const CINEMATIC_SCENE_KEY = 'CinematicScene';

const GAME_SCENE_KEY = 'GameScene';
const BAR_RATIO = 0.11;
const BAR_TWEEN_DURATION = 350;

interface CinematicSceneData {
    id: string;
    onComplete?: () => void;
}

export class CinematicScene extends Phaser.Scene {
    private steps: CinematicStep[] = [];
    private onComplete?: () => void;
    private barTop!: Phaser.GameObjects.Rectangle;
    private barBottom!: Phaser.GameObjects.Rectangle;
    private curtain!: Phaser.GameObjects.Rectangle;
    private letterboxEnabled = false;
    private stopped = false;

    constructor() {
        super({ key: CINEMATIC_SCENE_KEY });
    }

    init(data: CinematicSceneData) {
        this.steps = getCinematic(data.id)?.steps ?? [];
        this.onComplete = data.onComplete;
        this.letterboxEnabled = false;
        this.stopped = false;
    }

    create() {
        const height = Math.round(this.scale.height * BAR_RATIO);

        this.barTop = this.add.rectangle(0, 0, this.scale.width, height, 0x000000).setOrigin(0, 0).setAlpha(0);
        this.barBottom = this.add
            .rectangle(0, this.scale.height, this.scale.width, height, 0x000000)
            .setOrigin(0, 1)
            .setAlpha(0);
        this.curtain = this.add
            .rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
            .setOrigin(0, 0)
            .setAlpha(0);

        this.lockPlayer();

        const handleResize = () => this.layout();

        this.scale.on(Phaser.Scale.Events.RESIZE, handleResize);
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.stopped = true;
            this.scale.off(Phaser.Scale.Events.RESIZE, handleResize);
            this.unlockCurrentPlayer();
        });

        this.run();
    }

    private async run(): Promise<void> {
        for (const step of this.steps) {
            if (this.stopped) {
                return;
            }

            this.lockPlayer();
            await this.runStep(step);
        }

        if (!this.stopped) {
            this.finish();
        }
    }

    private runStep(step: CinematicStep): Promise<void> {
        switch (step.type) {
            case 'letterbox':
                return this.setLetterbox(step.enabled);
            case 'wait':
                return new Promise((resolve) => this.time.delayedCall(step.duration, resolve));
            case 'dialog':
                return this.showDialog(step.script);
            case 'setFlags':
                setFlags(step.flags);
                return Promise.resolve();
            case 'shake':
                return this.shake(step.duration, step.intensity);
            case 'fade':
                return this.fade(step.direction, step.duration);
            case 'goToArea':
                return this.goToArea(step.area, step.spawn);
        }
    }

    private setLetterbox(enabled: boolean): Promise<void> {
        if (this.letterboxEnabled === enabled) {
            return Promise.resolve();
        }

        this.letterboxEnabled = enabled;

        return new Promise((resolve) => {
            this.tweens.add({
                targets: [this.barTop, this.barBottom],
                alpha: enabled ? 1 : 0,
                duration: BAR_TWEEN_DURATION,
                onComplete: () => resolve(),
            });
        });
    }

    private showDialog(script?: string): Promise<void> {
        if (!script) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            const inputState = this.getPlayer().playerMovement.input.inputState;
            const launched = launchDialog(this, script, inputState, () => resolve());

            if (!launched) {
                resolve();
            }
        });
    }

    private shake(duration: number, intensity: number): Promise<void> {
        this.getGameScene().cameras.main.shake(duration, intensity);

        return new Promise((resolve) => this.time.delayedCall(duration, resolve));
    }

    private fade(direction: 'out' | 'in', duration: number): Promise<void> {
        return new Promise((resolve) => {
            this.tweens.add({
                targets: this.curtain,
                alpha: direction === 'out' ? 1 : 0,
                duration,
                onComplete: () => resolve(),
            });
        });
    }

    private goToArea(area: string, spawn?: AreaSpawn): Promise<void> {
        const gameScene = this.getGameScene();

        return new Promise((resolve) => {
            gameScene.events.once(Phaser.Scenes.Events.CREATE, () => resolve());
            gameScene.goToArea(area, spawn);
        });
    }

    private getGameScene(): GameScene {
        return this.scene.get(GAME_SCENE_KEY) as GameScene;
    }

    private getPlayer(): Player {
        return this.getGameScene().areaScene.setupManager.player;
    }

    private lockPlayer(): void {
        const player = this.getPlayer();

        player.controlsLocked = true;
        player.sprite.setVelocity(0, 0);
    }

    private unlockCurrentPlayer(): void {
        const gameScene = this.scene.get(GAME_SCENE_KEY) as GameScene | undefined;
        const player = gameScene?.areaScene?.setupManager?.player;

        if (player) {
            player.controlsLocked = false;
        }
    }

    private layout(): void {
        const height = Math.round(this.scale.height * BAR_RATIO);

        this.barTop.setSize(this.scale.width, height).setPosition(0, 0);
        this.barBottom.setSize(this.scale.width, height).setPosition(0, this.scale.height);
        this.curtain.setSize(this.scale.width, this.scale.height).setPosition(0, 0);
    }

    private finish(): void {
        this.unlockCurrentPlayer();

        const onComplete = this.onComplete;

        this.onComplete = undefined;
        onComplete?.();
        this.scene.stop();
    }
}
