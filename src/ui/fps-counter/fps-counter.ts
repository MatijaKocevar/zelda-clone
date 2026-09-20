import Phaser from 'phaser';
import './fps-counter.scss';

const UPDATE_INTERVAL_MS = 200;
const LOW_FPS = 50;
const CRITICAL_FPS = 30;

export class FpsCounter {
    private game: Phaser.Game;
    private element: HTMLDivElement;
    private lastUpdate = 0;

    constructor(game: Phaser.Game) {
        this.game = game;

        this.element = document.createElement('div');
        this.element.className = 'fps-counter';

        document.body.appendChild(this.element);

        requestAnimationFrame(this.loop);
    }

    private loop = (time: number) => {
        if (time - this.lastUpdate >= UPDATE_INTERVAL_MS) {
            this.lastUpdate = time;
            this.render();
        }

        requestAnimationFrame(this.loop);
    };

    private render(): void {
        const fps = this.game.loop.actualFps;
        const frameMs = this.game.loop.delta;

        this.element.textContent = `${Math.round(fps)} FPS · ${frameMs.toFixed(1)} ms`;
        this.element.classList.toggle('fps-counter-low', fps < LOW_FPS);
        this.element.classList.toggle('fps-counter-critical', fps < CRITICAL_FPS);
    }
}
