import { Enemy } from '../../../entities/enemy/enemy';
import { Npc } from '../../../entities/npc/npc';
import { Player } from '../../../entities/player/player';
import { Sign } from '../../../entities/sign/sign';
import { TriggerManager } from './trigger-manager';

export class UpdateManager {
    private player: Player;
    private enemies: Enemy[];
    private signs: Sign[];
    private npcs: Npc[];
    private triggers: TriggerManager;

    constructor(player: Player, enemies: Enemy[], signs: Sign[], npcs: Npc[], triggers: TriggerManager) {
        this.player = player;
        this.enemies = enemies;
        this.signs = signs;
        this.npcs = npcs;
        this.triggers = triggers;
    }

    public update(): void {
        this.updateSigns();
        this.updateNpcs();
        this.triggers.update();
        this.updateEntities();
    }

    private updateSigns(): void {
        this.signs.forEach((sign) => sign.update());
    }

    private updateNpcs(): void {
        this.npcs.forEach((npc) => npc.update());
    }

    private updateEntities(): void {
        this.player.update();

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            if (this.enemies[i].isDestroyed) {
                this.enemies.splice(i, 1);
            }
        }

        this.enemies.forEach((enemy) => enemy.update());
    }
}
