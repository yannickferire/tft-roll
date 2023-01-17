import { championImageURL, currentSet } from '../constants/set';
import { rollingChancesByLevel, championsPerRoll, rollPrice } from '../constants/game';
import { numberOfChampionsByCost, numberOfCopiesByCost, numberOfCopiesForTier } from '../constants/champions';
import GoldIcon from './goldIcon';

interface IChampionOdds {
  champion: {
    apiName: string,
    cost: number,
    name: string,
    traits: string[],
    selected: boolean
  }
  selectedLevel: number;
}

const ChampionOdds: React.FC<IChampionOdds> = ({ champion, selectedLevel }) => {
  const rollsNeeded = (copiesNeeded: number) => {
    const numberOfRolls = Math.ceil(numberOfChampionsByCost[champion.cost + ' cost'] / (rollingChancesByLevel['level ' + selectedLevel][champion.cost + ' cost'] * 5 / 100)) * copiesNeeded;
    return numberOfRolls;
  }
  const goldsNeeded = (rolls: number) => {
    const goldsNeeded = rolls * rollPrice;
    return goldsNeeded;
  }
  return (
    <>
      <img 
        className={`w-24 mr-4 border-4 border-${champion.cost}cost rounded`}
        src={`${championImageURL}/${champion.apiName.toLowerCase()}_square.tft_set${currentSet}.png`} 
        alt={champion.name} />
      <div className="mr-4 flex flex-1 flex-wrap content-center">
        <div className="flex">
          <h3 className="text-lg">{champion.name}</h3>
          <span className="mx-1">–</span>
          <p><GoldIcon color="midnight" /> {champion.cost}</p>
        </div>
      </div>
      <div className="flex flex-col text-center mr-10 flex-1">
        <span>1 ⭐</span>
        <span>{ rollsNeeded(numberOfCopiesForTier['1 star']) } 🔄 = { goldsNeeded(rollsNeeded(numberOfCopiesForTier['1 star'])) } <GoldIcon color="midnight" /></span>
        <span>{ numberOfCopiesForTier['1 star'] } 🃏 = {champion.cost * numberOfCopiesForTier['1 star'] } <GoldIcon color="midnight" /></span>
        <span>Total = {goldsNeeded(rollsNeeded(numberOfCopiesForTier['1 star'])) + champion.cost * numberOfCopiesForTier['1 star']} <GoldIcon color="midnight" /></span>
        </div>
        <div className="flex flex-col text-center flex-1">
          <span>2 ⭐</span>
          <span>{ rollsNeeded(numberOfCopiesForTier['2 star']) } 🔄 = { goldsNeeded(rollsNeeded(numberOfCopiesForTier['2 star'])) } <GoldIcon color="midnight" /></span>
          <span>{ numberOfCopiesForTier['2 star'] } 🃏 = {champion.cost * numberOfCopiesForTier['2 star']} <GoldIcon color="midnight" /></span>
          <span>Total = {goldsNeeded(rollsNeeded(numberOfCopiesForTier['2 star'])) + champion.cost * numberOfCopiesForTier['2 star']} <GoldIcon color="midnight" /></span>
        </div>
    </>
  )
}

export default ChampionOdds;