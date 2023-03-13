import { useState } from 'react';
import { rollingChancesByLevel, championsPerRoll, rollPrice } from '../constants/game';
import { numberOfCopiesByCost, numberOfCopiesForTier } from '../constants/champions';
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
  pool: {[cost: string]: number};
  ownedCopies: number;
  opponentsCopies: number
  sameCostCopies: number;
}

const OddsByStar: React.FC<IOddsByStar> = ({ star, champion, selectedLevel, pool, ownedCopies, opponentsCopies, sameCostCopies }) => {
  const [championCopies, setChampionCopies] = useState(numberOfCopiesByCost[champion.cost + " cost"]);

  const starColors = ['midnight', 'silver', 'gold'];
  const starArray = Array.from({ length: star }, (_, index) => index + 1);
  const copiesNeeded = numberOfCopiesForTier[star+' star'] - ownedCopies;

  const championOfThisCostPerRoll = (rollingChancesByLevel['level ' + selectedLevel][champion.cost + ' cost']) * championsPerRoll / 100;
  const rollsNeeded = (copiesNeeded: number) => {
    let championCostPool = pool[champion.cost + " cost"];
    let numberOfRolls = 0;
    for (let i = ownedCopies; i < copiesNeeded + ownedCopies; i++) {
      let championRemainingInPool = championCopies - i - opponentsCopies;
      let championSameCostRemainingInPool = championCostPool - i - opponentsCopies - sameCostCopies;
      let goodChampionOdds = (championRemainingInPool / championSameCostRemainingInPool) * 100;
      numberOfRolls += (100 / goodChampionOdds) / championOfThisCostPerRoll;
    }
    return Math.ceil(numberOfRolls);
  }
  const goldsNeeded = (rolls: number) => {
    const goldsNeeded = rolls * rollPrice;
    return goldsNeeded;
  }
  return (
    <div className="flex flex-col text-center flex-1">
      <span className="mb-4">
        <span className={`rounded bg-${starColors[star-1]} align-center justify-center px-2 pb-1`}>
          {starArray.map((index) => (
              <StarIcon key={index} size={4} color={starColors[star-1]} />
          ))}
        </span>
      </span>
      {copiesNeeded > 0 ? (
        <>
          { // If there is 0% chance of getting a champion of this cost per roll, display infinity sign
            // & if there is no enough copies of the champion in the pool, display infinity sign
            championOfThisCostPerRoll !== 0 && (copiesNeeded < (championCopies - ownedCopies - opponentsCopies)) ? (
            <>
              <span>{ rollsNeeded(copiesNeeded) } <RollIcon color="midnight" /> = <GoldIcon color="midnight" /> { goldsNeeded(rollsNeeded(copiesNeeded)) }</span>
              <span>{ copiesNeeded } <CopyIcon color="midnight" /> = <GoldIcon color="midnight" /> {champion.cost * copiesNeeded }</span>
              <span className="mt-2 text-2xl font-medium"><GoldIcon size={4} color="midnight" /> {goldsNeeded(rollsNeeded(copiesNeeded)) + champion.cost * copiesNeeded}</span>
            </>
          ):(
            <>
              <span>∞ <RollIcon color="midnight" /> = <GoldIcon color="midnight" /> ∞</span>
              <span>{ copiesNeeded } <CopyIcon color="midnight" /> = <GoldIcon color="midnight" /> {champion.cost * copiesNeeded }</span>
              <span className="mt-2 text-2xl font-medium"><GoldIcon size={4} color="midnight" /> ∞</span>
            </>
          )}
          
        </>
      ): <span>GG</span>
      }
    </div>
  )
}

export default OddsByStar;