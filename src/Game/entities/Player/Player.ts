import { Input } from '../../mechanics/Input/Input';
import { IPlayer } from './entities/IPlayer.interface';
import { PlayerMovement } from './components/PlayerMovement';
import { PlayerAttack } from './components/PlayerAttack';
import { Position } from '../../../types/Position.interface';
import { PlayerStats } from './components/PlayerStats';
import { PlayerLifeBar } from './components/PlayerLifeBar';

export class Player {
    scene: Phaser.Scene;
    position: Position;
    input: Input;
    sprite: Phaser.Physics.Arcade.Sprite;
    playerMovement: PlayerMovement;
    playerAttack: PlayerAttack;
    playerStats: PlayerStats;
    playerLifeBar: PlayerLifeBar;

    constructor({ position, scene }: IPlayer) {
        this.scene = scene;
        this.position = position;
        this.input = new Input(scene);

        this.playerStats = new PlayerStats({
            health: 2000,
            maxHealth: 2000,
            damage: 10,
        });
        this.playerLifeBar = new PlayerLifeBar({
            scene,
            playerStats: this.playerStats,
        });
        this.sprite = scene.physics.add.sprite(
            position.x,
            position.y,
            'player1'
        );
        this.playerMovement = new PlayerMovement({
            player: this.sprite,
            scene,
        });
        this.playerAttack = new PlayerAttack({
            player: this.sprite,
            scene,
            playerMovement: this.playerMovement,
        });

        this.sprite.body?.setSize(25, 30);
        this.sprite.body?.setOffset(62, 100);
    }

    update() {
        this.playerAttack.update();
        this.playerMovement.update();
        this.playerLifeBar.update();
    }
}
