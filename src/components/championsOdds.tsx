import { useState } from 'react';
import ChampionOdds from './championOdds';
import { numberOfChampionsByCost, numberOfCopiesByCost } from '../constants/champions';

interface IChampionsOdds {
  champs: any[];
  setChamps: (champions: any[]) => void;
  selectedLevel: number;
  traits: any[];
}

const ChampionsOdds: React.FC<IChampionsOdds> = ({ champs, setChamps, selectedLevel, traits }) => {
  const getPool = () => {
    const newPool: any = [];
    Object.keys(numberOfChampionsByCost).forEach((cost) => {
      newPool[cost] = numberOfChampionsByCost[cost] * numberOfCopiesByCost[cost];
    });
    return newPool;
  }
  const [pool, setPool] = useState(getPool());

  let selectedChampions = champs.filter((champion) => champion.selected);
  selectedChampions.sort((a, b) => b.position - a.position);

  return (
    <main className="flex-1 ml-6 px-4 bg-crema text-midnight relative ticket">
      {selectedChampions.length > 0 ? (
        <ul>
        {selectedChampions.map((champion, index) => {
          return (
              <li key={index} className="flex flex-wrap border-b border-dashed py-6 content-center last:border-0">
                <ChampionOdds champs={champs} setChamps={setChamps} champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} traits={traits} />
              </li>
        )})}
        </ul>
        ):
        <p className="p-10 text-center"><strong>Choose one or multiple champions</strong> to see <br/>how much average gold you will need to hit them. <br/>Good Luck, Have Fun!</p>
      }
    </main>
  )
}

export default ChampionsOdds;