// import GetChampions from './api/getChampions';
import { useState, useEffect } from 'react';
import './index.css';
import logo from './assets/tft-odds-logo.svg';
// import CostButtons from './components/costButtons';
import * as Constants from './constants/set';
import { rollPrice, rollingChancesByLevel, championsPerRoll } from './constants/game';
import { numberOfChampionsByCost, numberOfCopiesByCost } from './constants/champions';
import { fetchChampions } from './api/fetchChampions';
import ChampionsSelector from './components/championsSelector';
import LevelSelector from './components/levelSelector';
import CopiesNumber from './components/copiesNumber';

const App: React.FC = () => {
  const [selectedCost, setSelectedCost] = useState<string>("1 cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [numberOfCopies, setNumberOfCopies] = useState<number>(0);
  const [champs, setChamps] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const champions = await fetchChampions();
      setChamps(champions);
    })();
  }, []);

  const rollingChances = rollingChancesByLevel[`level ${selectedLevel}`][selectedCost] || 0;
  const championsByCost = numberOfChampionsByCost[selectedCost];
  const copiesByCost = numberOfCopiesByCost[selectedCost];
  const copiesNeeded = 9 - numberOfCopies;
  const rollNeeded = Math.ceil((championsByCost / (rollingChances * championsPerRoll / 100)) * (copiesNeeded));
  const goldForRoll = rollNeeded * rollPrice;
  const goldToBuyChampions = copiesNeeded * parseInt(selectedCost.split(' ')[0]);
  const goldTotal = goldForRoll + goldToBuyChampions;

  return (
    <div className="App container p-4">
      <h1 className="text-4xl font-extrabold mb-12"><img className="logo" src={logo} width="160" alt="tft odds logo" /></h1>

      {/* <h2 className="mt-6 mb-2 text-lg">Champion Tier</h2>
      <CostButtons selectedCost={selectedCost} setSelectedCost={setSelectedCost} /> */}

      <ChampionsSelector champs={champs} selectedCost={selectedCost} setSelectedCost={setSelectedCost} />
      
      <h2 className="mt-6 mb-2 text-lg">Level</h2>
      <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> 

      <h2 className="mt-6 mb-2 text-lg">Copies</h2>
      <CopiesNumber numberOfCopies={numberOfCopies} setNumberOfCopies={setNumberOfCopies} /> 

      <div className="mt-6">
        {selectedCost} – {championsByCost} champions – {copiesByCost} copies
        <br/>Level { selectedLevel } – {rollingChances}&nbsp;% – {rollingChances * championsPerRoll / 100} champion per roll
        <br/>{9 - numberOfCopies } copies needed
        <br/>You will need to roll { rollNeeded } times
        <br/>{ goldForRoll } + { goldToBuyChampions } = { goldTotal } golds
      </div>

      {/* <GetChampions /> */}
    </div>
  )
}

export default App
