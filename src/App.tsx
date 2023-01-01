// import GetChampions from './api/getChampions';
import { useState } from 'react';
import CostButtons from './components/cost-buttons';
import './index.css';

function App() {
  const [selectedCost, setSelectedCost] = useState<string>("1 cost");

  return (
    <div className="App container p-10">
      <CostButtons />
      {/* <GetChampions /> */}
    </div>
  )
}

export default App
