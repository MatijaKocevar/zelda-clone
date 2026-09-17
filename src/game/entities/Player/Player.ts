import { PlayerMovement } from './components/PlayerMovement';
import { PlayerAttack } from './components/PlayerAttack';
import { PlayerStats } from './components/PlayerStats';
import { PlayerLifeBar } from './components/PlayerLifeBar';
import { PlayerDamage } from './components/PlayerDamage';
import { IPlayer } from './Player.types';

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
        this.playerDamage = new PlayerDamage(this);
        this.playerAttack = new PlayerAttack(this, enemies);

        this.sprite.setCollideWorldBounds(true);
        this.sprite.body?.setSize(20, 40, true);
        this.sprite.body?.setOffset(65, 90);
    }

    update() {
        this.playerAttack.update();
        this.playerMovement.update();
        this.playerDamage.update();
        this.playerLifeBar.update();
        this.keepInsideWorldBounds();
    }

    private keepInsideWorldBounds() {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        if (!body) return;

        const bounds = this.scene.physics.world.bounds;

        body.x = Phaser.Math.Clamp(body.x, bounds.left, bounds.right - body.width);
        body.y = Phaser.Math.Clamp(body.y, bounds.top, bounds.bottom - body.height);
        body.updateCenter();
    }
}
