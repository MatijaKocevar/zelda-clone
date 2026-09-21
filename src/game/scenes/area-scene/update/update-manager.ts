import { Enemy } from '../../../entities/enemy/enemy';
import { Player } from '../../../entities/player/player';
import { Sign } from '../../../entities/sign/sign';

export class UpdateManager {
    private player: Player;
    private enemies: Enemy[];
    private signs: Sign[];

    constructor(player: Player, enemies: Enemy[], signs: Sign[]) {
        this.player = player;
        this.enemies = enemies;
        this.signs = signs;
    }

    public update(): void {
        this.updateSigns();
        this.updateEntities();
    }

    private updateSigns(): void {
        this.signs.forEach((sign) => sign.update());
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
