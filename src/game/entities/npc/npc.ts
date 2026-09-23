import Phaser from 'phaser';
import { AreaNpcDialog, NpcDirection } from '../../areas/area.types';
import { INTERACT } from '../../mechanics/input/input';
import { InputState } from '../../input/input-state';
import { launchDialog } from '../../story/dialog/dialog-service';
import { passesFlagConditions } from '../../story/story-flags';
import { InteractPrompt } from '../interact-prompt';
import { Player } from '../player/player';
import { INpc } from './npc.types';

const INTERACT_RADIUS = 110;
const PROMPT_DEPTH = 5900;
const PROMPT_OFFSET = 100;
const COLLIDER_WIDTH = 40;
const COLLIDER_HEIGHT = 28;

const DIRECTION_FRAMES: Record<NpcDirection, number> = {
    down: 0,
    up: 1,
    left: 2,
    right: 3,
};

export class Npc {
    private player: Player;
    private inputState: InputState;
    private dialogs: AreaNpcDialog[];
    private x: number;
    private y: number;
    private prompt?: InteractPrompt;

    constructor({ x, y, spriteKey, direction = 'down', frame, solid = true, dialogs, scene, player }: INpc) {
        this.player = player;
        this.inputState = player.playerMovement.input.inputState;
        this.dialogs = dialogs;
        this.x = x;
        this.y = y;

        scene.add.image(x, y, spriteKey, frame ?? DIRECTION_FRAMES[direction]).setOrigin(0.5, 1).setDepth(y);

        if (solid) {
            const collider = scene.add.zone(x, y - COLLIDER_HEIGHT / 2, COLLIDER_WIDTH, COLLIDER_HEIGHT);

            scene.physics.add.existing(collider, true);
            scene.physics.add.collider(player.sprite, collider);
        }

        if (dialogs.length > 0) {
            this.prompt = new InteractPrompt(scene, x, y - PROMPT_OFFSET, PROMPT_DEPTH, true);
        }
    }

    update(): void {
        if (!this.prompt) {
            return;
        }

        this.prompt.update();

        if (this.player.controlsLocked) {
            this.prompt.setVisible(false);
            return;
        }

        const distance = Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, this.x, this.y);
        const inRange = distance <= INTERACT_RADIUS;

        this.prompt.setVisible(inRange);

        if (!inRange || !this.inputState.isPressed(INTERACT)) {
            return;
        }

        this.inputState.release(INTERACT);

        const script = this.resolveScript();

        if (!script) {
            return;
        }

        this.prompt.setVisible(false);
        launchDialog(this.player.scene, script, this.inputState);
    }

    private resolveScript(): string | undefined {
        const dialog =
            this.dialogs.find((entry) => passesFlagConditions(entry.requiresFlags, entry.forbidsFlags)) ??
            this.dialogs[this.dialogs.length - 1];

        return dialog?.script;
    }
}
