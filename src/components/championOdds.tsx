import { useState } from 'react';
import CopiesNumber from './copiesNumber';
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
  pool: {[cost: string]: number};
  setPool: (cost: string) => void;
}

const ChampionOdds: React.FC<IChampionOdds> = ({ champion, selectedLevel, pool, setPool }) => {
  const [ownedCopies, setOwnedCopies] = useState(0);

  return (
    <>
      <img 
        className={`w-24 h-full mr-4 border-4 border-${champion.cost}cost rounded`}
        src={`${championImageURL}/${champion.apiName.toLowerCase()}_square.tft_set${currentSet}.png`} 
        alt={champion.name} />
      <div className="mr-4 flex flex-1 flex-wrap">
        <div className="flex">
          <h3 className="text-lg">{champion.name}</h3>
          <span className="mx-1">–</span>
          <p><GoldIcon color="midnight" /> {champion.cost}</p>
        </div>
        <CopiesNumber ownedCopies={ownedCopies} setOwnedCopies={setOwnedCopies} />
      </div>
      <OddsByStar star={1} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} ownedCopies={ownedCopies} />
      <OddsByStar star={2} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} ownedCopies={ownedCopies} />
      <OddsByStar star={3} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} ownedCopies={ownedCopies} />
    </>
  )
}

export default ChampionOdds;