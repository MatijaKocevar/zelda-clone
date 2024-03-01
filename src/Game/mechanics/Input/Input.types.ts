export interface CustomScene extends Phaser.Scene {
    keysPressedRef: React.MutableRefObject<string[]>;
    lastKeyRef: React.MutableRefObject<string>;
}
