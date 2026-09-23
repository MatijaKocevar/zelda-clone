import Phaser from 'phaser';
import { AreaDefinition, AreaTrigger } from '../../../areas/area.types';
import { InteractPrompt } from '../../../entities/interact-prompt';
import { Player } from '../../../entities/player/player';
import { InputState } from '../../../input/input-state';
import { INTERACT } from '../../../mechanics/input/input';
import { markPlayerStatsDirty } from '../../../state/player-state';
import { launchCinematic } from '../../../story/cinematics/cinematic-service';
import { launchDialog } from '../../../story/dialog/dialog-service';
import { hasFlag, passesFlagConditions, setFlag, setFlags } from '../../../story/story-flags';

const CONSUMED_FLAG_PREFIX = 'trigger';
const PROMPT_DEPTH = 5900;
const PROMPT_OFFSET = 84;
const DEFAULT_INTERACT_RADIUS = 110;

export class TriggerManager {
    private scene: Phaser.Scene;
    private player: Player;
    private inputState: InputState;
    private areaKey: string;
    private triggers: AreaTrigger[];
    private overlapping = new Set<string>();
    private interactPrompts = new Map<string, InteractPrompt>();

    constructor(scene: Phaser.Scene, player: Player, area: AreaDefinition) {
        this.scene = scene;
        this.player = player;
        this.inputState = player.playerMovement.input.inputState;
        this.areaKey = area.key;
        this.triggers = area.triggers ?? [];

        this.createInteractPrompts();
    }

    update(): void {
        if (this.player.controlsLocked) {
            return;
        }

        this.triggers
            .filter((trigger) => trigger.type === 'enter')
            .forEach((trigger) => this.updateEnterTrigger(trigger));
        this.triggers
            .filter((trigger) => trigger.type === 'interact')
            .forEach((trigger) => this.updateInteractTrigger(trigger));
    }

    fireVictory(): boolean {
        const trigger = this.triggers.find((candidate) => candidate.type === 'victory' && this.canFire(candidate));

        if (!trigger) {
            return false;
        }

        this.fire(trigger);

        return trigger.suppressWin === true;
    }

    private createInteractPrompts(): void {
        this.triggers
            .filter((trigger) => trigger.type === 'interact')
            .forEach((trigger) => {
                const prompt = new InteractPrompt(
                    this.scene,
                    trigger.x ?? 0,
                    (trigger.y ?? 0) - PROMPT_OFFSET,
                    PROMPT_DEPTH,
                    true,
                );

                this.interactPrompts.set(trigger.id, prompt);
            });
    }

    private updateEnterTrigger(trigger: AreaTrigger): void {
        const inside = this.isPlayerInside(trigger);

        if (inside && !this.overlapping.has(trigger.id)) {
            this.overlapping.add(trigger.id);

            if (this.canFire(trigger)) {
                this.fire(trigger);
            }

            return;
        }

        if (!inside) {
            this.overlapping.delete(trigger.id);
        }
    }

    private updateInteractTrigger(trigger: AreaTrigger): void {
        const prompt = this.interactPrompts.get(trigger.id);

        if (!prompt) {
            return;
        }

        prompt.update();

        const available = this.isPlayerWithinRadius(trigger) && this.canFire(trigger);

        prompt.setVisible(available);

        if (!available || !this.inputState.isPressed(INTERACT)) {
            return;
        }

        this.inputState.release(INTERACT);
        prompt.setVisible(false);
        this.fire(trigger);
    }

    private isPlayerInside(trigger: AreaTrigger): boolean {
        if (trigger.x === undefined || trigger.y === undefined || !trigger.width || !trigger.height) {
            return false;
        }

        const body = this.player.sprite.body as Phaser.Physics.Arcade.Body | null;

        if (!body) {
            return false;
        }

        const zone = new Phaser.Geom.Rectangle(trigger.x, trigger.y, trigger.width, trigger.height);
        const playerRect = new Phaser.Geom.Rectangle(body.x, body.y, body.width, body.height);

        return Phaser.Geom.Rectangle.Overlaps(zone, playerRect);
    }

    private isPlayerWithinRadius(trigger: AreaTrigger): boolean {
        if (trigger.x === undefined || trigger.y === undefined) {
            return false;
        }

        const radius = trigger.radius ?? DEFAULT_INTERACT_RADIUS;
        const distance = Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, trigger.x, trigger.y);

        return distance <= radius;
    }

    private canFire(trigger: AreaTrigger): boolean {
        if (trigger.once && hasFlag(this.consumedFlag(trigger))) {
            return false;
        }

        return passesFlagConditions(trigger.requiresFlags, trigger.forbidsFlags);
    }

    private fire(trigger: AreaTrigger): void {
        if (trigger.once) {
            setFlag(this.consumedFlag(trigger));
        }

        setFlags(trigger.setFlags);

        if (trigger.setFlags?.length) {
            markPlayerStatsDirty();
        }

        if (trigger.cinematic) {
            launchCinematic(this.scene, trigger.cinematic);
            return;
        }

        if (trigger.dialog) {
            launchDialog(this.scene, trigger.dialog, this.inputState);
        }
    }

    private consumedFlag(trigger: AreaTrigger): string {
        return `${CONSUMED_FLAG_PREFIX}:${this.areaKey}:${trigger.id}`;
    }
}
