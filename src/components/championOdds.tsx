import { championImageURL, currentSet } from '../constants/set';
import GoldIcon from './icons/goldIcon';
import OddsByStar from './oddsByStar';

interface IChampionOdds {
  champion: {
    apiName: string,
    cost: number,
    name: string,
    traits: string[],
    selected: boolean
  }
  selectedLevel: number;
  pool: [cost: string];
  setPool: (cost: string) => void;
}

const ChampionOdds: React.FC<IChampionOdds> = ({ champion, selectedLevel, pool, setPool }) => {
  return (
    <>
      <img 
        className={`w-24 h-full mr-4 border-4 border-${champion.cost}cost rounded`}
        src={`${championImageURL}/${champion.apiName.toLowerCase()}_square.tft_set${currentSet}.png`} 
        alt={champion.name} />
      <div className="mr-4 flex flex-1 flex-wrap content-center">
        <div className="flex">
          <h3 className="text-lg">{champion.name}</h3>
          <span className="mx-1">–</span>
          <p><GoldIcon color="midnight" /> {champion.cost}</p>
        </div>
      </div>
      <OddsByStar star={1} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} />
      <OddsByStar star={2} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} />
      <OddsByStar star={3} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} />
    </>
  )
}

export default ChampionOdds;