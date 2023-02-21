// import GetChampions from './api/getChampions';
import { useState, useEffect } from 'react';
import './index.css';
import logo from './assets/tft-odds-logo.svg';
import { fetchChampions } from './api/fetchChampions';
import LevelSelector from './components/levelSelector';
import ResetButton from './components/resetButton';
import ChampionsSelector from './components/championsSelector';
import ChampionsOdds from './components/championsOdds';
import RollingOdds from './components/RollingOdds';
import { baseCost, baseLevel } from './constants/constants';

const App: React.FC = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [selectedCost, setSelectedCost] = useState<string>(baseCost + " cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(baseLevel);
  const [championsLoaded, setchampionsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const champions = await fetchChampions();
      setChamps(champions);
      setchampionsLoaded(true);
    })();
  }, []);

  return (
    <div className="App container px-5 py-6">
      <h1 className="text-4xl font-extrabold mb-12"><img className="logo" src={logo} width="160" alt="tft odds logo" /></h1>

      <div className="flex items-start">
        <aside className="flex flex-col w-96">
          <div className="flex justify-between">
            <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> 
            <ResetButton selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} champs={champs} setChamps={setChamps} />
          </div>
          <RollingOdds selectedLevel={selectedLevel} selectedCost={selectedCost}  />
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
