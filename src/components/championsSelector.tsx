import { possibleCost } from '../constants/cost';
import { championImageURL, currentSet } from '../constants/set';
import { numberOfChampionsByCost } from '../constants/champions';
import GoldIcon from './icons/goldIcon';

interface IChampionsSelector {
  champs: any[];
  setChamps: (champions: any[]) => void;
  selectedCost: string;
  setSelectedCost: (cost: string) => void;
  championsLoaded: boolean;
}

const ChampionsSelector: React.FC<IChampionsSelector> = ({ champs, setChamps, selectedCost, setSelectedCost, championsLoaded }) => {
  const handleChampionSelection = (index: number) => {
    setChamps(
      champs.map((champion, i) => {
        if (i === index) {
          return { ...champion, selected: champion.selected ? false : true };
        } else {
          return { ...champion };
        }
      })
    )
  }

  const skeletonNumberOfChampions = Array.from({ length: numberOfChampionsByCost["3 cost"] }, (_, index) => index + 1);
  
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
              <span className="my-auto flex">
                <GoldIcon color="crema" /> <span className="ml-2">{cost}</span>
              </span>
            </button>
          ))
        }
      </div>
      {championsLoaded === true ? (
        <ul className="flex flex-wrap p-5 pb-2 bg-midday">
          {champs.map((champion, index) => (
            <li 
              key={index} 
              className={`${champion.cost + ' cost' !== selectedCost ? "hidden " : ""}${champion.selected === true ? "champ-selected ": ""}cursor-pointer mr-3 mb-3 hover-effect text-${champion.cost}cost`}
              onClick={() => handleChampionSelection(index)}
            >
              <img 
                className={`w-16 mx-auto border-2 transition-all duration-300 border-${champion.cost}cost rounded relative z-10`}
                src={`${championImageURL}/${champion.apiName.toLowerCase()}_square.tft_set${currentSet}.png`} 
                alt={champion.name} />
            </li>
          ))}
        </ul>
        ): 
        <ul className="flex flex-wrap p-5 pb-2 bg-midday">
          {skeletonNumberOfChampions.map((index) => (
            <li 
              key={index} 
              role="status"
              className={`mr-3 mb-3 animate-pulse`}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-3cost rounded">
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default ChampionsSelector;