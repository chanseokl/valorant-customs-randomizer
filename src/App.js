import './App.css';
import MainSelection from './components/MainSelection';
import RandomizeButtons from './components/RandomizeButtons';
import SubSelection from './components/SubSelection';

function App() {
  return (
    <div>
      <RandomizeButtons />
      <MainSelection />
      <SubSelection />
    </div>
  );
}

export default App;
