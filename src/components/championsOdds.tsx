import { championImageURL, currentSet } from '../constants/set';
import { rollingChancesByLevel, championsPerRoll, rollPrice } from '../constants/game';
import { numberOfChampionsByCost, numberOfCopiesByCost, numberOfCopiesForTier } from '../constants/champions';
import GoldIcon from './goldIcon';
import ChampionOdds from './championOdds';

interface IChampionsOdds {
  champs: any[];
  selectedLevel: number;
}

const ChampionsOdds: React.FC<IChampionsOdds> = ({ champs, selectedLevel }) => {
  let selectedChampions = champs.filter((champion) => champion.selected);
  selectedChampions.sort((a, b) => a.cost - b.cost);

  return (
    <section className="block mt-6 p-5 bg-crema text-midnight rounded">
      <ul>
      {selectedChampions.map((champion, index) => {
        return (
            <li key={index} className="flex flex-wrap border-b border-dashed py-5 content-center">
              <ChampionOdds champion={champion} selectedLevel={selectedLevel} />
            </li>
      )})}
      </ul>
    </section>
  )
}

export default ChampionsOdds;