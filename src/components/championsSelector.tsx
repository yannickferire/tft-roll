import { possibleCost } from '../constants/cost';
import goldIcon from '../assets/icons/gold.svg';
import { championImageURL, currentSet } from '../constants/set';

interface IChampionsSelector {
  champs: any[];
  setChamps: (champions: any[]) => void;
  selectedCost: string;
  setSelectedCost: (cost: string) => void;
}

const ChampionsSelector: React.FC<IChampionsSelector> = ({ champs, setChamps, selectedCost, setSelectedCost }) => {
  const handleChampionSelection = (index: number) => {
    setChamps(
      champs.map((champion, i) => {
        if (i === index) {
          if (champion.selected == false) {
            return { ...champion, selected: true };
          } else {
            return { ...champion, selected: false };
          }
        } else {
          return { ...champion };
        }
      })
    )
  }
  
  return (
    <div className="flex flex-col bg-earlynight rounded w-100 overflow-hidden">
      <div className="inline-flex">
        {
          /* map over the array of possible cost of champions in order to show clickable buttons for each one */
          Object.keys(possibleCost).map((cost, index) => (
            <button 
              type="button"
              key={index} 
              onClick={(e) => {
                e.preventDefault;
                setSelectedCost(e.currentTarget.innerText + ' cost');
              }} 
              className={`${(selectedCost == cost + ' cost')?'bg-midday':''} h-12 px-5 py-1 flex content-center justify-center hover:bg-midday`}>
              <span className="my-auto flex"><img className="mr-2 w-3" src={goldIcon} alt="cost" /> {cost}</span>
            </button>
          ))
        }
      </div>
      <ul className="flex flex-wrap p-5 pb-2 bg-midday">
        <li className="border-1cost hidden"></li>
        <li className="border-2cost hidden"></li>
        <li className="border-3cost hidden"></li>
        <li className="border-4cost hidden"></li>
        <li className="border-5cost hidden"></li>
        {champs.map((champion, index) => (
          <li 
            key={index} 
            className={`${champion.cost + ' cost' !== selectedCost ? "hidden " : ""}${champion.selected === true ? "selected ": ""}cursor-pointer mr-3 mb-3`}
            onClick={() => handleChampionSelection(index)}
          >
            <img 
              className={`w-16 mx-auto border-2 transition-all duration-300 border-${champion.cost}cost rounded hover:border-4`}
              src={`${championImageURL}/${champion.apiName.toLowerCase()}_square.tft_set${currentSet}.png`} 
              alt={champion.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChampionsSelector;