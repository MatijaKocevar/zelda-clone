import { PlayerMovement } from './components/PlayerMovement';
import { PlayerAttack } from './components/PlayerAttack';
import { PlayerStats } from './components/PlayerStats';
import { PlayerLifeBar } from './components/PlayerLifeBar';
import { IPlayer } from './Player.types';
import { PlayerSprite } from './components/PlayerSprite';
import { Position } from '../../types/common';

export class Player {
    scene: Phaser.Scene;
    position: Position;
    playerSprite: PlayerSprite;
    playerMovement: PlayerMovement;
    playerAttack: PlayerAttack;
    playerStats: PlayerStats;
    playerLifeBar: PlayerLifeBar;

    constructor({ position, scene, enemies }: IPlayer) {
        this.scene = scene;
        this.position = position;

        this.playerStats = new PlayerStats({
            health: 300,
            maxHealth: 300,
            damage: 25,
        });
        this.playerLifeBar = new PlayerLifeBar(this);
        this.playerMovement = new PlayerMovement(this);
        this.playerAttack = new PlayerAttack(this, enemies);
        this.playerSprite = new PlayerSprite(this);
    }

    update() {
        this.playerSprite.update();
        this.playerAttack.update();
        this.playerLifeBar.update();
        this.playerMovement.update();
    }
}
