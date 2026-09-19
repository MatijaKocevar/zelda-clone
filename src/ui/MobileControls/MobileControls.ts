import './MobileControls.scss';
import { InputState } from '../../game/input/InputState';
import { MobileInput } from '../../game/mechanics/MobileInput/MobileInputs';

export class MobileControls {
    private container: HTMLDivElement;

    constructor(inputState: InputState) {
        const mobileInput = new MobileInput(inputState);

        this.container = document.createElement('div');
        this.container.className = 'mobile-controls';

        this.container.appendChild(this.createDPad(mobileInput));
        this.container.appendChild(this.createActionButtons(mobileInput));

        document.body.appendChild(this.container);
    }

    setVisible(visible: boolean): void {
        this.container.style.display = visible ? '' : 'none';
    }

    private createButton(className: string, label: string, onStart: () => void, onEnd: () => void): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = className;
        button.textContent = label;
        button.addEventListener('touchstart', (event) => {
            event.preventDefault();
            onStart();
        });
        button.addEventListener('touchend', onEnd);
        button.addEventListener('touchcancel', onEnd);
        return button;
    }

    private createDPad(mobileInput: MobileInput): HTMLDivElement {
        const dPad = document.createElement('div');
        dPad.className = 'd-pad';

        const upRow = document.createElement('div');
        upRow.className = 'button-row';
        upRow.appendChild(this.createButton('up', '↑', mobileInput.onTouchStartUp, mobileInput.onTouchEndUp));

        const middleRow = document.createElement('div');
        middleRow.className = 'button-row';
        middleRow.appendChild(this.createButton('left', '←', mobileInput.onTouchStartLeft, mobileInput.onTouchEndLeft));
        middleRow.appendChild(
            this.createButton('right', '→', mobileInput.onTouchStartRight, mobileInput.onTouchEndRight),
        );

        const downRow = document.createElement('div');
        downRow.className = 'button-row';
        downRow.appendChild(this.createButton('down', '↓', mobileInput.onTouchStartDown, mobileInput.onTouchEndDown));

        dPad.appendChild(upRow);
        dPad.appendChild(middleRow);
        dPad.appendChild(downRow);

        return dPad;
    }

    private createActionButtons(mobileInput: MobileInput): HTMLDivElement {
        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';

        actionButtons.appendChild(this.createButton('a', 'A', mobileInput.onTouchStartA, mobileInput.onTouchEndA));
        actionButtons.appendChild(this.createButton('b', 'B', mobileInput.onTouchStartB, mobileInput.onTouchEndB));

        return actionButtons;
    }
}
