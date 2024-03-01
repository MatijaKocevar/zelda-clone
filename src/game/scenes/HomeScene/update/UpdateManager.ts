import { Enemy } from '../../../entities/Enemy/Enemy';
import { Player } from '../../../entities/Player/Player';

export class UpdateManager {
    private player: Player;
    private enemies: Enemy[];

    constructor(player: Player, enemies: Enemy[]) {
        this.player = player;
        this.enemies = enemies;
    }

    public update(): void {
        this.updateEntities();
        this.updateEntityDepth();
    }

    private updateEntities(): void {
        this.player.update();
        this.enemies.forEach((enemy) => {
            enemy.update();
        });

        this.enemies = this.enemies.filter((enemy) => !enemy.isDestroyed);
    }

    private updateEntityDepth(): void {
        const areaWidth = 200;
        const areaHeight = 200;

        const playerX = this.player.sprite.getCenter()?.x ?? 0;
        const playerY = this.player.sprite.getCenter()?.y ?? 0;

        const leftBound = playerX - areaWidth / 2;
        const rightBound = playerX + areaWidth / 2;
        const topBound = playerY - areaHeight / 2;
        const bottomBound = playerY + areaHeight / 2;

        this.enemies.forEach((enemy) => {
            const enemyX = enemy.sprite.getCenter()?.x ?? 0;
            const enemyY = enemy.sprite.getCenter()?.y ?? 0;

            if (
                enemyX >= leftBound &&
                enemyX <= rightBound &&
                enemyY >= topBound &&
                enemyY <= bottomBound
            ) {
                const playerCenterY = this.player.sprite.getCenter()?.y ?? 0;
                const enemyCenterY = enemy.sprite.getCenter()?.y ?? 0;

                const playerDepth = playerCenterY > enemyCenterY ? 10 : 5;
                const enemyDepth = playerDepth === 10 ? 5 : 10;

                this.player.sprite.setDepth(playerDepth);
                enemy.sprite.setDepth(enemyDepth);
            }
        });
    }
}
