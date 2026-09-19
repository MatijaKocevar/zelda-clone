import Phaser from 'phaser';
import { PlayerMovement } from './components/player-movement';
import { PlayerAttack } from './components/player-attack';
import { PlayerStats } from './components/player-stats';
import { PlayerLifeBar } from './components/player-life-bar';
import { PlayerDamage } from './components/player-damage';
import { IPlayer } from './player.types';

export class Player {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    playerMovement: PlayerMovement;
    playerAttack: PlayerAttack;
    playerStats: PlayerStats;
    playerLifeBar: PlayerLifeBar;
    playerDamage: PlayerDamage;

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
        this.sprite.body?.setSize(20, 40, true);
        this.sprite.body?.setOffset(65, 90);
        (this.sprite.body as Phaser.Physics.Arcade.Body).pushable = false;
    }

    update() {
        this.playerAttack.update();
        this.playerMovement.update();
        this.playerDamage.update();
        this.playerLifeBar.update();
    }
}
