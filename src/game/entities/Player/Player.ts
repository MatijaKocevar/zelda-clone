import { PlayerMovement } from './components/PlayerMovement';
import { PlayerAttack } from './components/PlayerAttack';
import { PlayerStats } from './components/PlayerStats';
import { PlayerLifeBar } from './components/PlayerLifeBar';
import { IPlayer } from './Player.types';

export class Player {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    playerMovement: PlayerMovement;
    playerAttack: PlayerAttack;
    playerStats: PlayerStats;
    playerLifeBar: PlayerLifeBar;

    constructor({ position, scene, enemies }: IPlayer) {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(position.x, position.y, 'player1');
        this.playerStats = new PlayerStats({
            health: 300,
            maxHealth: 300,
            damage: 10,
        });
        this.playerLifeBar = new PlayerLifeBar(this);
        this.playerMovement = new PlayerMovement(this);
        this.playerAttack = new PlayerAttack(this, enemies);

        this.sprite.body?.setSize(20, 40, true);
        this.sprite.body?.setOffset(65, 90);
    }

    update() {
        this.playerAttack.update();
        this.playerMovement.update();
        this.playerLifeBar.update();
    }
}
