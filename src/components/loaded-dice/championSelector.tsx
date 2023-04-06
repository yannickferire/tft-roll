import { totalNumberOfChampions } from "../../constants/champions";

interface IChampionSelector {
  champs: any[];
  setChamps: (champions: any[]) => void;
  championsLoaded: boolean;
}

const ChampionSelector: React.FC<IChampionSelector> = ({ champs, setChamps, championsLoaded }) => {
  const handleChampionSelection = (index: number) => {
    setChamps(
      champs.map((champion, i) => {
        if (i === index) {
          return  { ...champion, selected: true }
        } else {
          return { ...champion, selected: false }
        }
      })
    )
  }

  
  const sortedChamps = champs.sort((a, b) => {
    if (a.cost === b.cost) {
      return a.name.localeCompare(b.name);
    }
    return a.cost - b.cost;
  });

  const skeletonNumberOfChampions = Array.from({ length: totalNumberOfChampions }, (_, index) => index + 1);

  return (
    <div className="flex flex-col rounded w-100 overflow-hidden">
      <h2 className="rounded-t px-4 py-3 bg-earlynight">Select the champion you want</h2>
      {championsLoaded === true ? (
      <ul className="relative flex bg-midday py-3 px-4 gap-2.5 rounded-b flex-wrap">
        {sortedChamps.map((champion, index) => (
            <li 
              key={index} 
              className={`min-w-[50px] w-[50px] max-w-[50px] flex-1 champion aspect-square border-2 border-${champion.cost}cost rounded relative cursor-pointer hover-effect ${champion.selected === true ? "champ-selected ": ""} text-${champion.cost}cost`}
              onClick={() => handleChampionSelection(index)}
              title={champion.name}
            >
              <div className="w-full h-full relative block rounded overflow-hidden">
                <img 
                className={`w-20 -left-7 -top-1 max-w-none absolute z-10`}
                src={champion.image} 
                alt={champion.name} />
              </div>
            </li>
          ))}
      </ul>
      ) : (
        <ul className="relative flex bg-midday py-3 px-4 gap-2.5 rounded-b flex-wrap">
          {skeletonNumberOfChampions.map((index) => (
            <li 
              key={index} 
              role="status"
              className={`animate-pulse min-w-[50px] w-[50px] max-w-[50px] flex-1`}
            >
              <div className="flex items-center justify-center aspect-square mx-auto bg-1cost rounded">
              </div>
            </li>
          ))}
        </ul>
      )
      }
    </div>
  )
}

export default ChampionSelector;