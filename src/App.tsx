import GameComponent from './components/Game/GameComponent';
import './App.scss';
import { GameUi } from './components/GameUi/GameUi';

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
