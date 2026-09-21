import Phaser from 'phaser';
import { PlayerMovement } from './components/player-movement';
import { PlayerAttack } from './components/player-attack';
import { PlayerStats } from './components/player-stats';
import { PlayerLifeBar } from './components/player-life-bar';
import { PlayerDamage } from './components/player-damage';
import { IPlayer } from './player.types';

const BODY_WIDTH = 20;
const BODY_HEIGHT = 40;
const BODY_OFFSET_X = 65;
const BODY_OFFSET_Y = 90;

export class Player {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    playerMovement: PlayerMovement;
    playerAttack: PlayerAttack;
    playerStats: PlayerStats;
    playerLifeBar: PlayerLifeBar;
    playerDamage: PlayerDamage;
    private flipX: boolean | undefined;

    constructor({ position, scene, enemies }: IPlayer) {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(position.x, position.y, 'player1');
        this.playerStats = new PlayerStats({
            health: 300,
            maxHealth: 300,
            damage: 25,
            armor: 0,
        });
        this.playerLifeBar = new PlayerLifeBar(this);
        this.playerMovement = new PlayerMovement(this);
        this.playerDamage = new PlayerDamage(this, enemies);
        this.playerAttack = new PlayerAttack(this, enemies);

        this.sprite.setCollideWorldBounds(true);
        this.sprite.body?.setSize(BODY_WIDTH, BODY_HEIGHT, true);
        this.sprite.body?.setOffset(BODY_OFFSET_X, BODY_OFFSET_Y);
        (this.sprite.body as Phaser.Physics.Arcade.Body).pushable = false;
    }

    update() {
        this.syncBodyOffset();
        this.playerAttack.update();
        this.playerMovement.update();
        this.playerDamage.update();
        this.playerLifeBar.update();
        this.syncDepth();
    }

    private syncDepth(): void {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body | null;

        this.sprite.setDepth(body ? body.bottom : this.sprite.y);
    }

    private syncBodyOffset(): void {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body | null;

        if (!body || this.flipX === this.sprite.flipX) {
            return;
        }

        this.flipX = this.sprite.flipX;
        const offsetX = this.flipX ? this.sprite.width - BODY_OFFSET_X - BODY_WIDTH : BODY_OFFSET_X;

        body.setOffset(offsetX, BODY_OFFSET_Y);
    }
}
