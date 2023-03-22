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
    if (stageSelected !== 2 && selectedTraits.length !== 0) {
      hasSelectedTrait = champion.traits.some((trait: string) => selectedTraits.includes(trait));
    } else {
      hasSelectedTrait = true;
    }
    return slotsCost.includes(champion.cost) && hasSelectedTrait;
  });
  const unFilteredChamps = champs.filter(champion => {
    let notSelectedTrait;
    notSelectedTrait = !champion.traits.some((trait: string) => selectedTraits.includes(trait));
    return notSelectedTrait;
  }); 

  const chanceToGetAugment = (cost: number, unfiltered?: boolean) => {
    const slots = slotsCost.filter(slotCost => slotCost === cost).length;
    const champs = filteredChamps.filter(champion => champion.cost === cost).length;
    if (unfiltered) {
      if (slots > champs) {
        const unFilteredchampions = unFilteredChamps.filter(champion => champion.cost === cost).length;
        const chance = Math.round((slots - champs) * (100 / unFilteredchampions) / numberOfHeroAugments * 100) / 100;
        if (chance > 100) return 100;
        return chance;
      }
      return 0;
    }
    const chance = Math.round(slots * (100 / champs) / numberOfHeroAugments * 100) / 100;
    if (chance > 100) return 100;
    return chance;
  }
  const chanceToGetOneAugmentWithRerolls = (cost: number, iteration?: number, unfiltered?: boolean) => {
    const slots = slotsCost.filter(slotCost => slotCost === cost).length;
    let champs;
    if (unfiltered) {
      champs = unFilteredChamps.filter(champion => champion.cost === cost).length;
    } else {
      champs = filteredChamps.filter(champion => champion.cost === cost).length;
    }
    iteration = iteration ? iteration : slots * (numberOfRerolls + 1);
    const chance = Math.round(iteration / (champs * numberOfHeroAugments) * 10000) / 100;
    if (chance > 100) return 100;
    return chance;
  }
  const chanceToGetBothAugmentWithRerolls = (cost: number, iteration?: number, unfiltered?: boolean) => {
    const slots = slotsCost.filter(slotCost => slotCost === cost).length;
    let champs;
    if (unfiltered) {
      champs = unFilteredChamps.filter(champion => champion.cost === cost).length;
    } else {
      champs = filteredChamps.filter(champion => champion.cost === cost).length;
    }
    iteration = iteration ? iteration : slots * (numberOfRerolls + 1);
    const firstAugmentChance = iteration / (champs * numberOfHeroAugments);
    const secondAugmentChance = (iteration - 1) / ((champs * numberOfHeroAugments) - 1);
    const chance =  Math.round((firstAugmentChance * secondAugmentChance) * 10000) / 100;
    if (chance > 100) return 100;
    return chance;
  }


  const costRandomized = () => {
    const slotsObject = slotsCost.reduce((acc: any, curr: number) => {
      curr in acc ? acc[curr]++ : acc[curr] = 1;
      return acc;
    }, {});
  
    let costWithRollsRemaining: any[] = [];
    const slots = Object.entries(slotsObject) as [string, number][];
    for (const [costStr, slot] of slots) {
      const cost = parseInt(costStr);
      const champs = filteredChamps.filter(champion => champion.cost === cost).length;
      const possibilities = champs * numberOfHeroAugments;
      if (possibilities < (slot * (numberOfRerolls + 1))) {
        const rollsRemaining = (slot * (numberOfRerolls + 1)) - possibilities;
        costWithRollsRemaining.push({ cost, rollsRemaining });
      }
    }
    costWithRollsRemaining.sort((a, b) => b.cost - a.cost);
    return costWithRollsRemaining;
  }
  const costWithRollsRemaining = costRandomized();

  // sort champs by chance to get augment
  const compareChampsByChance = (a: any, b: any) => {
    const chanceA = chanceToGetAugment(a.cost);
    const chanceB = chanceToGetAugment(b.cost);
    if (chanceA === chanceB) {
      return b.cost - a.cost;
    } else {
      return chanceB - chanceA;
    }
  }
  const sortedChamps = filteredChamps.sort(compareChampsByChance);

  return (
    <>
    <header className="grid grid-cols-12 md:grid-cols-10 gap-2 w-full mb-6">
      <h3 className="col-span-3 sm:col-span-2 text-xs opacity-30 text-center">Champions ({filteredChamps.length})</h3>
      <h3 className="col-span-3 sm:col-span-4 md:col-span-2 text-xs opacity-30 text-center">Augments</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">% to get <br/>on show</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">% <span className="hidden sm:inline-block">to get atleast</span> 1 <br className="hidden sm:inline-block" />with { numberOfRerolls }&nbsp;rerolls</h3>
      <h3 className="col-span-2 text-xs opacity-30 text-center">% <span className="hidden sm:inline-block">to get</span> both <br className="hidden sm:inline-block" />with { numberOfRerolls }&nbsp;rerolls</h3>
    </header>
    <ul className="flex flex-col">  
      {sortedChamps.map((champion, index) => (
        <li key={champion.name} className={`animate-fromtop animate-delay-${index} grid grid-cols-12 md:grid-cols-10 gap-2 mb-6 relative items-start`}>
          <div className="col-span-3 sm:col-span-2 flex flex-col md:flex md:flex-row">
            <div className="relative mb-1 md:mr-4">
            <img 
            className={`mb-1 w-full md:max-w-[96px] aspect-square border-4 border-${champion.cost}cost rounded group-hover:grayscale group-hover:opacity-25 transition duration-500`}
            src={champion.image} 
            alt={champion.name} />
            <p className={`absolute text-crema text-xs sm:text-sm px-2 pb-0.5 text-center rounded bottom-1 bg-${champion.cost}cost group-hover:grayscale group-hover:opacity-25 transition duration-500`}> <GoldIcon color="crema" size={2.5} /> {champion.cost}</p>
            </div>
            <header className="flex-1">
              <h3 className="-mt-0.5 mb-1 text-center">{champion.name}</h3>
              <ul className="w-full max-w-[96px] md:w-20 lg:w-24 justify-center mx-auto flex items-center gap-1">
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
                <ul className={`border-2 border-midnight mt-3 flex mx-auto w-full max-w-[80px] md:w-16 lg:w-20 z-10 overflow-hidden rounded`}>
                  {bestItems[champion.name].map((item, index) => (
                    <li className={`flex-1 ${index == 1?'border-l-2 border-r-2 border-midnight':null}`} key={index}>
                      <img src={`/images/items/${item.replace(/\s/g, '')}.png`} alt={item} title={item} />
                    </li>
                  ))}
                </ul>
              }
            </header>
          </div>
          <div className="col-span-3 sm:col-span-4 md:col-span-2 mt-0.5">
            {Object.keys(champion.augments).map((augment: string) => (
              <div className="mb-3" key={champion.augments[augment].apiName}>
                <h4 className="text-center text-sm sm:text-base">
                  <span className={`block mx-auto w-fit ${augment == 'support'?'bg-support':'bg-carry'} rounded-sm px-1 leading-3 pb-0.5 text-xs mb-0.5`}>{augment}</span> 
                  {champion.augments[augment].name}
                </h4>
              </div>
            ))}
          </div>
          <div className="col-span-2 text-center flex flex-col">
            <span className="h-10 text-sm sm:text-base flex items-end justify-center mb-3">{ chanceToGetAugment(champion.cost) }%</span>
            <span className="h-10 text-sm sm:text-base flex items-star justify-center">{ chanceToGetAugment(champion.cost) }%</span>
          </div>
          <div className="col-span-2 h-20 text-center flex justify-center items-center"><span className="text-sm sm:text-base">{ chanceToGetOneAugmentWithRerolls(champion.cost) }%</span></div>
          <div className="col-span-2 h-20 text-center flex justify-center items-center"><span className="text-sm sm:text-base">{ chanceToGetBothAugmentWithRerolls(champion.cost) }%</span></div>
        </li>
      ))}
      </ul>
        {costWithRollsRemaining.length > 0 && filteredChamps.length > 0 &&
          <div className="relative mt-6 mb-16 max-w-lg mx-auto opacity-30">
            <hr />
            <span className="max-w-[280px] w-full absolute -top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs bg-midnight px-6 text-center">After you've seen all the above augments, <br/>it will be randomized with the rest</span>
          </div>
        }
        {costWithRollsRemaining.map(({ cost, rollsRemaining }) => (
          <div key={cost} className="flex flex-col">
            <ul className="flex flex-col">  
            {unFilteredChamps.filter(champion => champion.cost === cost).map((champion, index) => (
              <li key={champion.name} className={`animate-fromtop animate-delay-${index} grid grid-cols-12 md:grid-cols-10 gap-2 mb-6 relative items-start`}>
                <div className="col-span-3 sm:col-span-2 flex flex-col md:flex md:flex-row">
                  <div className="relative mb-1 md:mr-4">
                  <img 
                  className={`mb-1 w-full md:max-w-[96px] aspect-square border-4 border-${champion.cost}cost rounded group-hover:grayscale group-hover:opacity-25 transition duration-500`}
                  src={champion.image} 
                  alt={champion.name} />
                  <p className={`absolute text-crema text-xs sm:text-sm px-2 pb-0.5 text-center rounded bottom-1 bg-${champion.cost}cost group-hover:grayscale group-hover:opacity-25 transition duration-500`}> <GoldIcon color="crema" size={2.5} /> {champion.cost}</p>
                  </div>
                  <header className="flex-1">
                    <h3 className="-mt-0.5 mb-1 text-center">{champion.name}</h3>
                    <ul className="w-full max-w-[96px] md:w-20 lg:w-24 justify-center mx-auto flex items-center gap-1">
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
                      <ul className={`border-2 border-midnight mt-3 flex mx-auto w-full max-w-[80px] md:w-16 lg:w-20 z-10 overflow-hidden rounded`}>
                        {bestItems[champion.name].map((item, index) => (
                          <li className={`flex-1 ${index == 1?'border-l-2 border-r-2 border-midnight':null}`} key={index}>
                            <img src={`/images/items/${item.replace(/\s/g, '')}.png`} alt={item} title={item} />
                          </li>
                        ))}
                      </ul>
                    }
                  </header>
                </div>
                <div className="col-span-3 sm:col-span-4 md:col-span-2 mt-0.5">
                  {Object.keys(champion.augments).map((augment: string) => (
                    <div className="mb-3" key={champion.augments[augment].apiName}>
                      <h4 className="text-center text-sm sm:text-base">
                        <span className={`block mx-auto w-fit ${augment == 'support'?'bg-support':'bg-carry'} rounded-sm px-1 leading-3 pb-0.5 text-xs mb-0.5`}>{augment}</span> 
                        {champion.augments[augment].name}
                      </h4>
                    </div>
                  ))}
                </div>
                <div className="col-span-2 text-center flex flex-col">
                  <span className="h-10 text-sm sm:text-base flex items-end justify-center mb-3">{ chanceToGetAugment(champion.cost, true) }%</span>
                  <span className="h-10 text-sm sm:text-base flex items-star justify-center">{ chanceToGetAugment(champion.cost, true) }%</span>
                </div>
                <div className="col-span-2 h-20 text-center flex justify-center items-center"><span className="text-sm sm:text-base">{ chanceToGetOneAugmentWithRerolls(champion.cost, rollsRemaining, true) }%</span></div>
                <div className="col-span-2 h-20 text-center flex justify-center items-center"><span className="text-sm sm:text-base">{ chanceToGetBothAugmentWithRerolls(champion.cost, rollsRemaining, true) }%</span></div>
              </li>
            ))}
            </ul>
          </div>
      )) }
    </>
  )
}

export default ResultChampions;