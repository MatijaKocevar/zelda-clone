import { useEffect } from 'react';
import Phaser from 'phaser';
import playerSprite from '../../sprites/temp-player.png';

const GameComponent = () => {
    useEffect(() => {
        const gameConfig: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-game-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: true,
                },
            },
            scene: {
                preload() {
                    this.load.image('player', playerSprite);
                },
                create() {
                    const gameWidth = this.sys.game.config.width as number;
                    const platforms = this.physics.add.staticGroup();

                    platforms
                        .create(gameWidth / 2, 615, 'platform')
                        .setScale(gameWidth / 2, 1)
                        .refreshBody();

                    const player = this.physics.add.sprite(400, 300, 'player');
                    player.setGravityY(300);
                    player.setBounce(0.8);

                    this.physics.add.collider(player, platforms);

                    const cursors = this.input.keyboard?.createCursorKeys();

                    if (cursors) {
                        this.cursors = cursors;
                        this.player = player;
                    }
                    player.setCollideWorldBounds(true);
                },
                update() {
                    //eslint-disable-next-line
                    const { cursors, player } = this as Phaser.Scene;

                    if (cursors) {
                        if (cursors.left.isDown) {
                            player.setVelocityX(-160);
                        } else if (cursors.right.isDown) {
                            player.setVelocityX(160);
                        } else {
                            player.setVelocityX(0);
                        }

                        if (cursors.up.isDown && player.body?.touching.down) {
                            player.setVelocityY(-330);
                        }
                    }
                },
            },
        };

        const game = new Phaser.Game(gameConfig);

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div id="phaser-game-container"></div>;
};

export default GameComponent;
