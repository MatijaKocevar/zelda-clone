export const createPlayerControls = (scene: Phaser.Scene) => {
    if (scene.input.keyboard) {
        const cursors = {
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.D
            ),
            space: scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            ),
            shift: scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SHIFT
            ),
            lastDirection: '',
        };

        cursors.left.on('down', () => {
            cursors.lastDirection = 'left';
        });
        cursors.right.on('down', () => {
            cursors.lastDirection = 'right';
        });

        cursors.up.on('down', () => {
            cursors.lastDirection = 'up';
        });
        cursors.down.on('down', () => {
            cursors.lastDirection = 'down';
        });
        return cursors;
    }
};
