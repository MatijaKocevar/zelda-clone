import Phaser from 'phaser';
import { Player } from '../player';
import { PlayerStats } from './player-stats';

const BAR_X = 15;
const BAR_Y = 52;
const BAR_WIDTH = 150;
const BAR_HEIGHT = 12;
const BAR_PADDING = 2;
const CORNER_RADIUS = 3;

export class PlayerManaBar {
    private scene: Phaser.Scene;
    private playerStats: PlayerStats;
    private background: Phaser.GameObjects.Graphics;
    private fill: Phaser.GameObjects.Graphics;

    constructor(player: Player) {
        this.scene = player.scene;
        this.playerStats = player.playerStats;

        this.background = this.scene.add.graphics().setScrollFactor(0).setDepth(99);
        this.background.fillStyle(0x000000, 0.35);
        this.background.fillRoundedRect(BAR_X, BAR_Y, BAR_WIDTH, BAR_HEIGHT, CORNER_RADIUS);

        this.fill = this.scene.add.graphics().setScrollFactor(0).setDepth(100);
        this.update();
    }

    getObjects(): Phaser.GameObjects.GameObject[] {
        return [this.background, this.fill];
    }

    update(): void {
        const ratio = Phaser.Math.Clamp(this.playerStats.mana / this.playerStats.maxMana, 0, 1);

        this.fill.clear();

        if (ratio <= 0) {
            return;
        }

        this.fill.fillStyle(0x3b82f6, 0.95);
        this.fill.fillRoundedRect(
            BAR_X + BAR_PADDING,
            BAR_Y + BAR_PADDING,
            (BAR_WIDTH - BAR_PADDING * 2) * ratio,
            BAR_HEIGHT - BAR_PADDING * 2,
            CORNER_RADIUS,
        );
    }
}
