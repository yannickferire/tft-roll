import { useState } from 'react';
import OwnedCopies from './ownedCopies';
import OpponentsCopies from './opponentsCopies';
import OutOfThePool from './outOfThePool';
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
  const [opponentsCopies, setOpponentsCopies] = useState(0);

  return (
    <>
      <header className="flex flex-col mr-4">
        <div className="relative">
          <img 
            className={`w-24 mb-1 h-full border-4 border-${champion.cost}cost rounded`}
            src={`${championImageURL}/${champion.apiName.toLowerCase()}_square.tft_set${currentSet}.png`} 
            alt={champion.name} />
          <p className={`absolute text-crema text-sm px-2 pb-0.5 text-center rounded bottom-0 bg-${champion.cost}cost`}> <GoldIcon color="crema" size={2.5} /> {champion.cost}</p>
        </div>
        <h3 className="mt-1 text-center font-medium">{champion.name}</h3>
      </header>
      <div className="mr-4 flex flex-1 flex-wrap">
        <OwnedCopies champion={champion} ownedCopies={ownedCopies} setOwnedCopies={setOwnedCopies} />
        <OpponentsCopies champion={champion} opponentsCopies={opponentsCopies} setOpponentsCopies={setOpponentsCopies} />
        <OutOfThePool champion={champion} />
      </div>
      <OddsByStar star={1} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} ownedCopies={ownedCopies} opponentsCopies={opponentsCopies} />
      <OddsByStar star={2} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} ownedCopies={ownedCopies}opponentsCopies={opponentsCopies} />
      <OddsByStar star={3} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} ownedCopies={ownedCopies}opponentsCopies={opponentsCopies} />
    </>
  )
}

export default ChampionOdds;