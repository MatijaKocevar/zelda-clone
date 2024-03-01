import { IGameUI } from './GameUI.types';
import './GameUI.scss';

export const GameUI: React.FC<IGameUI> = ({ children }) => {
    return <div className="game-ui">{children}</div>;
};
