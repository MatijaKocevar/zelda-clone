import { Enemy } from '../../../entities/enemy/enemy';
import { Player } from '../../../entities/player/player';

export class UpdateManager {
    private player: Player;
    private enemies: Enemy[];

    constructor(player: Player, enemies: Enemy[]) {
        this.player = player;
        this.enemies = enemies;
    }

    public update(): void {
        this.updateEntities();
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
