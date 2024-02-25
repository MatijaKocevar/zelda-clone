import { IPlayer } from './entities/IPlayer.interface';
import { PlayerMovement } from './components/PlayerMovement';
import { PlayerAttack } from './components/PlayerAttack';
import { PlayerStats } from './components/PlayerStats';
import { PlayerLifeBar } from './components/PlayerLifeBar';

export class Player {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    playerMovement: PlayerMovement;
    playerAttack: PlayerAttack;
    playerStats: PlayerStats;
    playerLifeBar: PlayerLifeBar;

    constructor({ position, scene }: IPlayer) {
        this.scene = scene;

        this.playerStats = new PlayerStats({
            health: 2000,
            maxHealth: 2000,
            damage: 10,
        });
        this.playerLifeBar = new PlayerLifeBar({ player: this });
        this.sprite = scene.physics.add.sprite(
            position.x,
            position.y,
            'player1'
        );
        this.playerMovement = new PlayerMovement({
            player: this,
        });
        this.playerAttack = new PlayerAttack({
            player: this,
        });

        this.sprite.body?.setSize(20, 45);
        this.sprite.body?.setOffset(65, 84);
    }

    update() {
        this.playerAttack.update();
        this.playerMovement.update();
        this.playerLifeBar.update();
    }
}
