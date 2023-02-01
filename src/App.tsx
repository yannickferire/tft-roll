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
  const [selectedCost, setSelectedCost] = useState<string>("5 cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [championsLoaded, setchampionsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const champions = await fetchChampions();
      setChamps(champions);
      setchampionsLoaded(true);
    })();
  }, []);

  return (
    <div className="App container p-4">
      <h1 className="text-4xl font-extrabold mb-12"><img className="logo" src={logo} width="160" alt="tft odds logo" /></h1>

      <div className="flex items-start">
        <aside className="flex flex-col w-96">
          <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> 
          <ChampionsSelector 
            champs={champs} 
            setChamps={setChamps}
            selectedCost={selectedCost} 
            setSelectedCost={setSelectedCost}
            championsLoaded={championsLoaded}
          />
        </aside>
        
        <ChampionsOdds selectedLevel={selectedLevel} champs={champs}  />
      </div>
    </div>
  )
}

export default App
