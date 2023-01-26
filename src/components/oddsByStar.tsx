import { rollingChancesByLevel, championsPerRoll, rollPrice } from '../constants/game';
import { numberOfChampionsByCost, numberOfCopiesByCost, numberOfCopiesForTier } from '../constants/champions';
import GoldIcon from './icons/goldIcon';
import StarIcon from './icons/starIcon';
import RollIcon from './icons/rollIcon';
import CopyIcon from './icons/copyIcon';

interface IOddsByStar {
  star: number,
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

const OddsByStar: React.FC<IOddsByStar> = ({ star, champion, selectedLevel, pool, setPool }) => {
  const starColors = ['midnight', 'silver', 'gold'];
  const starArray = Array.from({ length: star }, (_, index) => index + 1);
  const rollsNeeded = (copiesNeeded: number) => {
    const numberOfRolls = Math.ceil(numberOfChampionsByCost[champion.cost + ' cost'] / (rollingChancesByLevel['level ' + selectedLevel][champion.cost + ' cost'] * 5 / 100)) * copiesNeeded;
    return numberOfRolls;
  }
  const goldsNeeded = (rolls: number) => {
    const goldsNeeded = rolls * rollPrice;
    return goldsNeeded;
  }
  return (
    <div className="flex flex-col text-center mr-10 flex-1">
      <span className="mb-3">
        <span className="rounded border border-1 align-center justify-center px-2 pb-1">
          {starArray.map((index) => (
              <StarIcon key={index} size={4} color={starColors[star-1]} />
          ))}
        </span>
      </span>
      <span>{ rollsNeeded(numberOfCopiesForTier[star+' star']) } <RollIcon color="midnight" /> = <GoldIcon color="midnight" /> { goldsNeeded(rollsNeeded(numberOfCopiesForTier[star+' star'])) }</span>
      <span>{ numberOfCopiesForTier[star+' star'] } <CopyIcon color="midnight" /> = <GoldIcon color="midnight" /> {champion.cost * numberOfCopiesForTier[star+' star'] }</span>
      <span>Total = <GoldIcon color="midnight" /> {goldsNeeded(rollsNeeded(numberOfCopiesForTier[star+' star'])) + champion.cost * numberOfCopiesForTier[star+' star']}</span>
    </div>
  )
}

export default OddsByStar;