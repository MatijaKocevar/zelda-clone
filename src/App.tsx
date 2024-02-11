import './App.scss';
import Game from './Game/Game';
import { GameUI } from './GameUI/GameUI';

function App() {
    return (
        <div className="app">
            <GameUI>
                <Game />
            </GameUI>
        </div>
    );
}

export default App;
