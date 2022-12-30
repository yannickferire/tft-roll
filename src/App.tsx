// import GetChampions from './api/getChampions';
import { useState } from 'react';
import { maxCost } from './constants/game';
import './index.css';

function App() {
  const [cost, setCost] = useState<string>("1-cost");

  // generate an array with all the possible cost of champions
  const possibleCost = [];
  for (let i = 0; i < maxCost; i++) {
    possibleCost.push(i+1);
  }

  return (
    <div className="App container p-10">
      {/* cost of champions */}
      <div className="inline-flex rounded-md shadow-sm">
        {
          /* map over the array of possible cost of champions in order to show clickable buttons for each one */
          possibleCost.map((costing, index) => (
            <a key={index} href="#" onClick={(e) => {
              e.preventDefault
              setCost(e.currentTarget.innerText)
            }} className={`${(cost == costing+'-cost')?'text-red-700':''} ${(index == 0)?'rounded-l-lg border-l':''} ${(index == maxCost - 1)?'rounded-r-lg':''} py-2 px-4 text-sm font-medium bg-white border-r border-t border-b border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}>
              {costing}-cost
            </a>
          ))
        }
      </div>

      {/* <GetChampions /> */}
    </div>
  )
}

export default App
