// import GetChampions from './api/getChampions';
import { useState } from 'react';
import CostButtons from './components/costButtons';
import LevelSelector from './components/levelSelector';
import './index.css';

const App: React.FC = () => {
  const [selectedCost, setSelectedCost] = useState<string>("1 cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  return (
    <div className="App container p-10">
      <h1 className="text-4xl font-extrabold">TFT Odds</h1>

      <h2 className="mt-6 mb-3 text-xl">Wich champion are you looking for?</h2>
      <CostButtons selectedCost={selectedCost} setSelectedCost={setSelectedCost} />
      
      <h2 className="mt-6 mb-3 text-xl">What level are you?</h2>
      <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />

      {/* <GetChampions /> */}
    </div>
  )
}

export default App
