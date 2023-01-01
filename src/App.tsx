// import GetChampions from './api/getChampions';
import { useState } from 'react';
import CostButtons from './components/costButtons';
import './index.css';

const App: React.FC = () => {
  const [selectedCost, setSelectedCost] = useState<string>("1 cost");

  return (
    <div className="App container p-10">
      <h2 className="mt-6 mb-3 text-xl">Wich champions are you looking for?</h2>
      <CostButtons selectedCost={selectedCost} setSelectedCost={setSelectedCost} />
      
      <h2 className="mt-6 mb-3 text-xl">What level are you?</h2>
      {/* <GetChampions /> */}
    </div>
  )
}

export default App
