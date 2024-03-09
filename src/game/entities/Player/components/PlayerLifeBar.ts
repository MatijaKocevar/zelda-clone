import { Player } from '../Player';
import { PlayerStats } from './PlayerStats';

export class PlayerLifeBar {
    scene: Phaser.Scene;
    playerStats: PlayerStats;
    hearts: Phaser.Physics.Arcade.Sprite[] = [];
    maxHeartsVisible: number;
    backgroundBox!: Phaser.GameObjects.Graphics;

    constructor(player: Player) {
        this.scene = player.scene;
        this.playerStats = player.playerStats;
        this.maxHeartsVisible = 20;

        this.createBackgroundBox();
        this.initializeHearts();
    }

    private initializeHearts() {
        const rowOffset = 30;
        const heartWidth = 30;
        const startX = 30;
        const startY = 30;

        const heartsToDisplay = Math.min(this.playerStats.maxHealth / 100, this.maxHeartsVisible);

        for (let i = 0; i < heartsToDisplay; i++) {
            const rowNum = Math.floor(i / 10);
            const heartX = startX + (i % 10) * heartWidth;
            const heartY = startY + rowNum * rowOffset;

            const heart = this.scene.physics.add.sprite(heartX, heartY, 'heart');
            heart.setDepth(100);
            heart.setScrollFactor(0);
            this.hearts.push(heart);
        }
    }

    private createBackgroundBox() {
        const heartsToDisplay = Math.min(this.playerStats.maxHealth / 100, this.maxHeartsVisible);

        const rows = Math.ceil(heartsToDisplay / 10);
        const heartsInFirstRow = heartsToDisplay > 10 ? 10 : heartsToDisplay;
        const boxWidth = heartsInFirstRow * 30;
        const boxHeight = rows * 27;
        const cornerRadius = 5;

        this.backgroundBox = this.scene.add.graphics();
        this.backgroundBox.fillStyle(0x000000, 0.3);
        this.backgroundBox.fillRoundedRect(15, 17, boxWidth, boxHeight, cornerRadius);
        this.backgroundBox.setScrollFactor(0);
        this.backgroundBox.setDepth(99);
    }

    update() {
        const fullHearts = Math.floor(this.playerStats.health / 100);
        const partialHeart = this.playerStats.health % 100;

        for (let i = 0; i < fullHearts; i++) {
            if (i < this.hearts.length) {
                this.hearts[i].anims.play('heart-full');
            }
        }

        if (fullHearts < this.hearts.length) {
            const partialIndex = fullHearts;
            if (partialHeart >= 75) {
                this.hearts[partialIndex].anims.play('heart-3/4');
            } else if (partialHeart >= 50) {
                this.hearts[partialIndex].anims.play('heart-1/2');
            } else if (partialHeart >= 25) {
                this.hearts[partialIndex].anims.play('heart-1/4');
            } else if (partialHeart >= 0) {
                this.hearts[partialIndex].anims.play('heart-empty');
            }
        }

        for (let i = fullHearts + 1; i < this.hearts.length; i++) {
            this.hearts[i].anims.play('heart-empty');
        }
    }
}
