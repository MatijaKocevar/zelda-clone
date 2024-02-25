import './GameUi.scss';
import { IGameUI } from './entities/IGameUI.interface';

export const GameUI: React.FC<IGameUI> = ({ children }) => {
    return <div className="game-ui">{children}</div>;
};
