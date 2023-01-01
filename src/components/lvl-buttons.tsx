import { useState } from 'react';
import { possibleCost } from '../constants/cost';
import './lvl-buttons.css';

function LvlButtons() {
  const [selectedCost, setSelectedCost] = useState<string>("1 cost");

  return (
    <div className="inline-flex">
    {
      /* map over the array of possible cost of champions in order to show clickable buttons for each one */
      Object.keys(possibleCost).map((cost, index) => (
        <button 
          type="button"
          key={index} 
          onClick={(e) => {
            e.preventDefault;
            setSelectedCost(e.currentTarget.innerText);
          }} 
          className={`${(selectedCost == cost + ' cost')?'selected':''} border font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 lvl-buttons lvl-button-${cost}`}>
          {cost} cost
        </button>
      ))
    }
  </div>
  )
}

export default LvlButtons;