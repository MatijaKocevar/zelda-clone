import { useRef } from 'react';
import { MobileInput } from '../../../Game/mechanics/MobileInput/MobileInputs';
import './MobileControls.scss';

export interface MobileControlsProps {
    gameRef: React.MutableRefObject<Phaser.Game | undefined>;
}

export const MobileControls = (props: MobileControlsProps) => {
    const mobileInputRef = useRef<MobileInput>();

    if (props.gameRef.current) {
        const game = props.gameRef.current;

        const input =
            //@ts-expect-error - Property 'config' does not exist on type 'Game'.ts(2339)
            game.config.sceneConfig?.level1?.player?.playerMovement?.input;

        console.log(input);
        mobileInputRef.current = new MobileInput(input);
    }

    console.log(props.gameRef);

    return (
        <div className="mobile-controls">
            <div className="d-pad">
                <div className="button-row">
                    <button
                        onTouchStart={mobileInputRef.current?.onTouchStartUp}
                        onTouchEnd={mobileInputRef.current?.onTouchEndUp}
                        className="up"
                    >
                        ↑
                    </button>
                </div>
                <div className="button-row">
                    <button
                        onTouchStart={mobileInputRef.current?.onTouchStartLeft}
                        onTouchEnd={mobileInputRef.current?.onTouchEndLeft}
                        className="left"
                    >
                        ←
                    </button>
                    {/* <div className="middle-button"></div> */}
                    <button
                        onTouchStart={mobileInputRef.current?.onTouchStartRight}
                        onTouchEnd={mobileInputRef.current?.onTouchEndRight}
                        className="right"
                    >
                        →
                    </button>
                </div>
                <div className="button-row">
                    <button
                        onTouchStart={mobileInputRef.current?.onTouchStartDown}
                        onTouchEnd={mobileInputRef.current?.onTouchEndDown}
                        className="down"
                    >
                        ↓
                    </button>
                </div>
            </div>
            <div className="action-buttons">
                <button
                    onTouchStart={mobileInputRef.current?.onTouchStartA}
                    onTouchEnd={mobileInputRef.current?.onTouchEndA}
                    className="a"
                >
                    A
                </button>
                <button
                    onTouchStart={mobileInputRef.current?.onTouchStartB}
                    onTouchEnd={mobileInputRef.current?.onTouchEndB}
                    className="b"
                >
                    B
                </button>
            </div>
        </div>
    );
};
