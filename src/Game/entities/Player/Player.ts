import { IPlayer } from './entities/IPlayer.interface';
import { PlayerMovement } from './components/PlayerMovement';
import { PlayerAttack } from './components/PlayerAttack';
import { Position } from '../../../types/Position.interface';
import { PlayerStats } from './components/PlayerStats';
import { PlayerLifeBar } from './components/PlayerLifeBar';

export class Player {
    scene: Phaser.Scene;
    position: Position;
    sprite: Phaser.Physics.Arcade.Sprite;
    playerMovement: PlayerMovement;
    playerAttack: PlayerAttack;
    playerStats: PlayerStats;
    playerLifeBar: PlayerLifeBar;

    constructor({ position, scene }: IPlayer) {
        this.scene = scene;
        this.position = position;

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

        this.sprite.body?.setSize(25, 50);
        this.sprite.body?.setOffset(62, 70);
    }

    update() {
        this.playerAttack.update();
        this.playerMovement.update();
        this.playerLifeBar.update();
    }
}
