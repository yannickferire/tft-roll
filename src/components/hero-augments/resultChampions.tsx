import GoldIcon from "../../components/icons/goldIcon";
import { bestItems } from '../../data/bestItems';
import { numberOfHeroAugments, numberOfRerolls } from "../../constants/hero-augments";

interface IResultChampions {
  champs: any[];
  traits: any[];
  slotsCost: number[];
  stageSelected: number;
}

const ResultChampions: React.FC<IResultChampions> = ({ champs, traits, slotsCost, stageSelected }) => {
  let selectedTraits = traits.filter((trait) => trait.selected).map((trait) => trait.name);

  const filteredChamps = champs.filter(champion => {
    let hasSelectedTrait;
    if (stageSelected !== 2) {
      hasSelectedTrait = champion.traits.some((trait: string) => selectedTraits.includes(trait));
    } else {
      hasSelectedTrait = true;
    }
    return slotsCost.includes(champion.cost) && hasSelectedTrait;
  });

  const chanceToGetAugment = (cost: number) => {
    const slots = slotsCost.filter(slotCost => slotCost === cost).length;
    const champs = filteredChamps.filter(champion => champion.cost === cost).length;
    const chance = Math.round(slots * (100 / champs) / numberOfHeroAugments * 100) / 100;
    return chance;
  }
  const chanceToGetOneAugmentWithRerolls = (cost: number) => {
    const slots = slotsCost.filter(slotCost => slotCost === cost).length;
    const champs = filteredChamps.filter(champion => champion.cost === cost).length;
    const chance = Math.round(slots * (numberOfRerolls + 1) / (champs * numberOfHeroAugments) * 10000) / 100;
    if (chance > 100) return 100;
    return chance;
  }
  const chanceToGetBothAugmentWithRerolls = (cost: number) => {
    const slots = slotsCost.filter(slotCost => slotCost === cost).length;
    const champs = filteredChamps.filter(champion => champion.cost === cost).length;
    const firstAugmentChance = slots * (numberOfRerolls + 1) / (champs * numberOfHeroAugments);
    const secondAugmentChance = ((slots * (numberOfRerolls + 1)) - 1) / ((champs * numberOfHeroAugments) - 1);
    const chance =  Math.round((firstAugmentChance * secondAugmentChance) * 10000) / 100;
    if (chance > 100) return 100;
    return chance;
  }

  // sort champs by chance to get augment
  const compareChampsByChance = (a: any, b: any) => {
    const chanceA = chanceToGetAugment(a.cost);
    const chanceB = chanceToGetAugment(b.cost);
    if (chanceA === chanceB) {
      return a.cost - b.cost;
    } else {
      return chanceB - chanceA;
    }
  }
  const sortedChamps = filteredChamps.sort(compareChampsByChance);

  return (
    <>
    <header className="grid grid-cols-10 gap-2 w-full mb-6">
      <h3 className="col-span-2 text-xs opacity-30 text-center">Champions ({filteredChamps.length})</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">Augments</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">% to get <br/>on show</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">% to get atleast 1<br/>with { numberOfRerolls } rerolls</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">% to get both<br/>with { numberOfRerolls } rerolls</h3>
    </header>
    <ul className="flex flex-col">  
    {sortedChamps.map((champion, index) => (
      <li key={index} className="grid grid-cols-10 gap-2 h-24 mb-6 relative items-start">
        <div className="col-span-2 flex">
          <img 
          className={`mb-1 h-24 border-4 border-${champion.cost}cost rounded group-hover:grayscale group-hover:opacity-25 transition duration-500`}
          src={champion.image} 
          alt={champion.name} />
          <p className={`absolute text-crema text-sm px-2 pb-0.5 text-center rounded bottom-0 bg-${champion.cost}cost group-hover:grayscale group-hover:opacity-25 transition duration-500`}> <GoldIcon color="crema" size={2.5} /> {champion.cost}</p>
          <header className="flex-1">
            <h3 className="-mt-0.5 mb-1 text-center">{champion.name}</h3>
            <ul className="animate-fromtop animate-delay-2 w-20 lg:w-24 justify-center mx-auto flex items-center gap-1">
              {champion.traits.map((trait:string, index:number) => {
                const traitImage = traits.find(traitObj => traitObj.name === trait).image;
                const path = trait === 'Threat' ? 'triangle pt-0 px-[6px] w-6 h-5' : 'hex w-5 h-6';
                return (
                  <li className={`${path} flex items-center justify-center p-[3px] text-xs bg-midday ${selectedTraits.includes(trait)?'opacity-100':'opacity-50'}`} key={index}>
                    <img src={traitImage} alt={trait} title={trait} />
                  </li>
                )
              })}
            </ul>
            {bestItems[champion.name] &&
              <ul className={`animate-fromtop animate-delay-3 border-2 border-midnight mt-3 flex mx-auto w-16 lg:w-20 z-10 overflow-hidden rounded`}>
                {bestItems[champion.name].map((item, index) => (
                  <li className={`flex-1 ${index == 1?'border-l-2 border-r-2 border-midnight':null}`} key={index}>
                    <img src={`/images/items/${item.replace(/\s/g, '')}.png`} alt={item} title={item} />
                  </li>
                ))}
              </ul>
            }
          </header>
        </div>
        <div className="col-span-2 mt-0.5">
          {Object.keys(champion.augments).map((augment: string) => (
            <div className="mb-3" key={champion.augments[augment].apiName}>
              <h4 className="text-center">
                <span className={`block mx-auto w-fit ${augment == 'support'?'bg-support':'bg-carry'} rounded-sm px-1 leading-3 pb-0.5 text-xs mb-0.5`}>{augment}</span> 
                {champion.augments[augment].name}
              </h4>
            </div>
          ))}
        </div>
        <div className="col-span-2 text-center flex flex-col">
          <span className="h-10 flex items-end justify-center mb-3">{ chanceToGetAugment(champion.cost) }%</span>
          <span className="h-10 flex items-star justify-center">{ chanceToGetAugment(champion.cost) }%</span>
        </div>
        <div className="col-span-2 h-20 text-center flex justify-center items-center"><span>{ chanceToGetOneAugmentWithRerolls(champion.cost) }%</span></div>
        <div className="col-span-2 h-20 text-center flex justify-center items-center"><span>{ chanceToGetBothAugmentWithRerolls(champion.cost) }%</span></div>
      </li>
    ))}
    </ul>
    </>
  )
}

export default ResultChampions;