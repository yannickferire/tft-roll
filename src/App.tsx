// import GetChampions from './api/getChampions';
import { useState, useEffect } from 'react';
import './index.css';
import logo from './assets/tft-odds-logo.svg';
import { fetchChampions } from './api/fetchChampions';
import ChampionsSelector from './components/championsSelector';
import LevelSelector from './components/levelSelector';
import ChampionsOdds from './components/championsOdds';

const App: React.FC = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [selectedCost, setSelectedCost] = useState<string>("3 cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(7);

  useEffect(() => {
    (async () => {
      const champions = await fetchChampions();
      setChamps(champions);
    })();
  }, []);

  return (
    <div className="App container p-4">
      <h1 className="text-4xl font-extrabold mb-12"><img className="logo" src={logo} width="160" alt="tft odds logo" /></h1>

      <ChampionsSelector 
        champs={champs} 
        setChamps={setChamps}
        selectedCost={selectedCost} 
        setSelectedCost={setSelectedCost}
      />
      
      <h2 className="mt-6 mb-2 text-lg">Level</h2>
      <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> 
      
      <ChampionsOdds champs={champs}  />
    </div>
  )
}

export default App
