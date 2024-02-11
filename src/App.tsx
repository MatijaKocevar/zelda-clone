import './App.scss';
import GameComponent from './Game/Game';
import { GameUi } from './GameUi/GameUi';

function App() {
    return (
        <div className="app">
            <GameUi>
                <GameComponent />
            </GameUi>
        </div>
    );
}

export default App;
