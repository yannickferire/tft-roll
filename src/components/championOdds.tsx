import { useState } from 'react';
import OwnedCopies from './ownedCopies';
import OpponentsCopies from './opponentsCopies';
import OutOfThePool from './outOfThePool';
import GoldIcon from './icons/goldIcon';
import OddsByStar from './oddsByStar';

interface IChampionOdds {
  champion: {
    apiName: string,
    image: string,
    cost: number,
    name: string,
    traits: string[],
    selected: boolean
  }
  selectedLevel: number;
  pool: {[cost: string]: number};
  setPool: (cost: string) => void;
  champs: any[];
  setChamps: (champions: any[]) => void;
  traits: any[];
}

const ChampionOdds: React.FC<IChampionOdds> = ({ champion, selectedLevel, pool, setPool, champs, setChamps, traits }) => {
  const [ownedCopies, setOwnedCopies] = useState(0);
  const [opponentsCopies, setOpponentsCopies] = useState(0);
  const [sameCostCopies, setSameCostCopies] = useState(0);

  const handleRemoveChampion = (name: string) => {
    setChamps(
      champs.map((champion) => {
        if (champion.name === name) {
          return { ...champion, selected: false, position: 0 };
        } else {
          return { ...champion };
        }
      })
    )
  }

  return (
    <>
      <header className="flex flex-col mr-4">
        <div 
          onClick={() => handleRemoveChampion(champion.name)}
          className="w-24 relative bg-midnight rounded group cursor-pointer">
            <img 
              className={`mb-1 h-full border-4 border-${champion.cost}cost rounded group-hover:grayscale group-hover:opacity-25 transition duration-500`}
              src={champion.image} 
              alt={champion.name} />
            <span className={`group-hover:scale-100 group-hover:opacity-100 transition duration-500 scale-75 origin-center opacity-0 absolute -mt-1 ml-1 text-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 text-${champion.cost}cost`}>+</span>
          <p className={`absolute text-crema text-sm px-2 pb-0.5 text-center rounded bottom-0 bg-${champion.cost}cost group-hover:grayscale group-hover:opacity-25 transition duration-500`}> <GoldIcon color="crema" size={2.5} /> {champion.cost}</p>
        </div>
        <h3 className="w-24 mt-2 mb-2 text-center font-medium leading-4">{champion.name}</h3>
        <ul className="w-24 flex justify-center gap-1">
          {champion.traits.map((trait, index) => {
            const traitImage = traits.find(traitObj => traitObj.name === trait).image;
            const path = trait === 'Threat' ? 'triangle pt-2 px-[6px] w-7' : 'hex w-6';

            return (
              <li className={`${path} h-7 flex items-center justify-center p-1 text-xs bg-midnight opacity-50`} key={index}>
                <img src={traitImage} alt={trait} title={trait} />
              </li>
            )
          })}
        </ul>
      </header>
      <div className="mr-4 flex flex-1 flex-wrap">
        <OwnedCopies champion={champion} ownedCopies={ownedCopies} setOwnedCopies={setOwnedCopies} />
        <OpponentsCopies champion={champion} opponentsCopies={opponentsCopies} setOpponentsCopies={setOpponentsCopies} />
        <OutOfThePool champion={champion} sameCostCopies={sameCostCopies} setSameCostCopies={setSameCostCopies} pool={pool} />
      </div>
      <OddsByStar star={1} champion={champion} selectedLevel={selectedLevel} pool={pool} ownedCopies={ownedCopies} opponentsCopies={opponentsCopies} sameCostCopies={sameCostCopies} />
      <OddsByStar star={2} champion={champion} selectedLevel={selectedLevel} pool={pool} ownedCopies={ownedCopies}opponentsCopies={opponentsCopies} sameCostCopies={sameCostCopies} />
      <OddsByStar star={3} champion={champion} selectedLevel={selectedLevel} pool={pool} ownedCopies={ownedCopies}opponentsCopies={opponentsCopies} sameCostCopies={sameCostCopies} />
    </>
  )
}

export default ChampionOdds;