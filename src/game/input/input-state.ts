export class InputState {
    keysPressed: string[] = [];
    lastKey = 'RIGHT';

    press(key: string) {
        if (!this.keysPressed.includes(key)) {
            this.keysPressed.unshift(key);
        }
    }

    push(key: string) {
        if (!this.keysPressed.includes(key)) {
            this.keysPressed.push(key);
        }
    }

    release(key: string) {
        const index = this.keysPressed.indexOf(key);
        if (index !== -1) {
            this.keysPressed.splice(index, 1);
        }
    }

    isPressed(key: string): boolean {
        return this.keysPressed.includes(key);
    }
}
