import { useState } from 'react';
import ChampionOdds from './championOdds';
import { numberOfChampionsByCost, numberOfCopiesByCost } from '../constants/champions';

interface IChampionsOdds {
  champs: any[];
  selectedLevel: number;
}

const ChampionsOdds: React.FC<IChampionsOdds> = ({ champs, selectedLevel }) => {
  const getPool = () => {
    const newPool: any = [];
    Object.keys(numberOfChampionsByCost).forEach((cost) => {
        newPool[cost] = numberOfChampionsByCost[cost] * numberOfCopiesByCost[cost];
    });
    return newPool;
  }
  const [pool, setPool] = useState(getPool());

  let selectedChampions = champs.filter((champion) => champion.selected);
  selectedChampions.sort((a, b) => a.cost - b.cost);

  return (
    <section className="flex-1 ml-4 px-4 bg-crema text-midnight rounded">
      <ul>
      {selectedChampions.map((champion, index) => {
        return (
            <li key={index} className="flex flex-wrap border-b border-dashed py-6 content-center last:border-0">
              <ChampionOdds champion={champion} selectedLevel={selectedLevel} pool={pool} setPool={setPool} />
            </li>
      )})}
      </ul>
    </section>
  )
}

export default ChampionsOdds;