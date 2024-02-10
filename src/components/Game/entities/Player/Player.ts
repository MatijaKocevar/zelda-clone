import { Position } from '../../../../types/Position.interface';
import { PlayerAnimations } from './components/PlayerAnimations';
import { Input } from '../../mechanics/Input/Input';
import { IPlayer } from './IPlayer.interface';
import { PlayerMovement } from './components/PlayerMovement';
import { PlayerAttack } from './components/PlayerAttack';

export class Player {
    scene: Phaser.Scene;
    position: Position;
    input: Input;
    player: Phaser.Physics.Arcade.Sprite;
    playerMovement: PlayerMovement;
    playerAttack: PlayerAttack;

    constructor({ position, scene }: IPlayer) {
        this.scene = scene;
        this.position = position;
        new PlayerAnimations(scene);
        this.input = new Input(scene);
        this.player = scene.physics.add.sprite(
            position.x,
            position.y,
            'player1'
        );
        this.playerMovement = new PlayerMovement({
            player: this.player,
            scene,
        });
        this.playerAttack = new PlayerAttack({
            player: this.player,
            scene,
            playerMovement: this.playerMovement,
        });

        this.setPlayerOptions();
    }

    setPlayerOptions() {
        this.player.setCollideWorldBounds(true);
    }

    update() {
        this.playerAttack.update();
        this.playerMovement.update();
    }
}
