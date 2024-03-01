import { useEffect, useRef } from 'react';
import { MobileInput } from '../../../Game/mechanics/MobileInput/MobileInputs';
import './MobileControls.scss';
import { MobileControlsProps } from './MobileControls.types';

export const MobileControls = (props: MobileControlsProps) => {
    const mobileInputRef = useRef<MobileInput>();

    useEffect(() => {
        if (props.keysPressedRef.current) {
            mobileInputRef.current = new MobileInput(
                props.keysPressedRef,
                props.lastKeyRef
            );
        }
    }, [props.keysPressedRef, props.lastKeyRef]);

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
