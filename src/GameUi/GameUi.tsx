import './GameUi.scss';

interface GameUiProps {
    children?: React.ReactNode;
}

export const GameUi: React.FC<GameUiProps> = ({ children }) => {
    return <div className="game-ui">{children}</div>;
};
