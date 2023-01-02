// import GetChampions from './api/getChampions';
import { useState } from 'react';
import './index.css';
import CostButtons from './components/costButtons';
import LevelSelector from './components/levelSelector';
import CopiesNumber from './components/CopiesNumber';
import { rollingChancesByLevel } from './constants/game';

const App: React.FC = () => {
  const [selectedCost, setSelectedCost] = useState<string>("1 cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [numberOfCopies, setNumberOfCopies] = useState<number>(0);

  const rollingChances = rollingChancesByLevel[`level ${selectedLevel}`][selectedCost] || 0;

  return (
    <div className="App container p-10">
      <h1 className="text-4xl font-extrabold">TFT Odds</h1>

      <h2 className="mt-6 mb-3 text-xl">Wich champion tier are you looking for?</h2>
      <CostButtons selectedCost={selectedCost} setSelectedCost={setSelectedCost} />
      
      <h2 className="mt-6 mb-3 text-xl">What level are you?</h2>
      <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> 
      <span className="ml-4 text-md text-slate-400">{rollingChances}&nbsp;%</span>

      <h2 className="mt-6 mb-3 text-xl">How much copies of your champion do you have?</h2>
      <CopiesNumber numberOfCopies={numberOfCopies} setNumberOfCopies={setNumberOfCopies} /> 

      {/* <GetChampions /> */}
    </div>
  )
}

export default App
