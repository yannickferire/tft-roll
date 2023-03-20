import GoldIcon from "../../components/icons/goldIcon";

interface IResultChampions {
  champs: any[];
  traits: any[];
  slotsCost: number[];
}

const ResultChampions: React.FC<IResultChampions> = ({ champs, traits, slotsCost }) => {
  let selectedTraits = traits.filter((trait) => trait.selected).map((trait) => trait.name);

  const filteredChamps = champs.filter(champion => {
    const hasSelectedTrait = champion.traits.some((trait: string) => selectedTraits.includes(trait));
    return slotsCost.includes(champion.cost) && hasSelectedTrait;
  });

  return (
    <ul className="flex flex-col">  
    {filteredChamps.map((champion, index) => (
      <li key={index} className="flex h-20 py-2 relative gap-4 items-center">
        <img 
        className={`mb-1 h-full border-4 border-${champion.cost}cost rounded group-hover:grayscale group-hover:opacity-25 transition duration-500`}
        src={champion.image} 
        alt={champion.name} />
        <p className={`absolute text-crema text-sm px-2 pb-0.5 text-center rounded bottom-2.5 bg-${champion.cost}cost group-hover:grayscale group-hover:opacity-25 transition duration-500`}> <GoldIcon color="crema" size={2.5} /> {champion.cost}</p>
        <header>
          <h3 className="mb-0.5">{champion.name}</h3>
          <ul className="animate-fromtop animate-delay-2 w-20 lg:w-24 flex items-center gap-1">
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
        </header>
      </li>
    ))}
    </ul>
  )
}

export default ResultChampions;