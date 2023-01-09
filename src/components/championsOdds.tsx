import { championImageURL, currentSet } from '../constants/set';
import { rollingChancesByLevel, championsPerRoll, rollPrice } from '../constants/game';
import { numberOfChampionsByCost, numberOfCopiesByCost } from '../constants/champions';
import GoldIcon from './goldIcon';
interface IChampionsOdds {
  champs: any[];
}

const ChampionsOdds: React.FC<IChampionsOdds> = ({ champs }) => {
  let selectedChampions = champs.filter((champion) => champion.selected);
  selectedChampions.sort((a, b) => a.cost - b.cost);

  return (
    <section className="block mt-6 p-5 bg-crema text-midnight rounded">
      {selectedChampions.map((champion, index) => (
        <ul key={index}>
          <li className="flex flex-auto border-b border-dashed py-5">
            <img 
                className={`w-24 mr-4 border-4 border-${champion.cost}cost rounded`}
                src={`${championImageURL}/${champion.apiName.toLowerCase()}_square.tft_set${currentSet}.png`} 
                alt={champion.name} />
            <div className="mr-4">
              <div className="flex">
                <h3 className="text-lg">{champion.name}</h3>
                <span className="mx-1">–</span>
                <p>
                  <GoldIcon color="midnight" /> {champion.cost}
                </p>
              </div>
            </div>
            <div className="flex flex-col text-center">
              <span>1 star</span>
              <span>{Math.ceil(numberOfChampionsByCost['3 cost'] / (rollingChancesByLevel['level 7']['3 cost'] * 5 / 100))} rolls – {Math.ceil(numberOfChampionsByCost['3 cost'] / (rollingChancesByLevel['level 7']['3 cost'] * 5 / 100)) * 2} <GoldIcon color="midnight" /></span>
              <span>1 copy = {champion.cost} <GoldIcon color="midnight" /></span>
              <span>Total = {Math.ceil(numberOfChampionsByCost['3 cost'] / (rollingChancesByLevel['level 7']['3 cost'] * 5 / 100)) * 2 + champion.cost} <GoldIcon color="midnight" /></span>
            </div>
          </li>
        </ul>
      ))}
    </section>
  )
}

export default ChampionsOdds;