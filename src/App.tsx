// import GetChampions from './api/getChampions';
import { useState } from 'react';
import LvlButtons from './components/lvl-buttons';
import './index.css';

function App() {
  const [selectedCost, setSelectedCost] = useState<string>("1 cost");

  return (
    <div className="App container p-10">
      <LvlButtons />
      {/* <GetChampions /> */}
    </div>
  )
}

export default App
