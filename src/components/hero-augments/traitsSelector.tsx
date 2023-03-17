import { numberOfTraits } from '../../constants/hero-augments';

interface ITraitsSelector {
  traits: any[];
  setTraits: (traits: any[]) => void;
  traitsLoaded: boolean;
}

const TraitsSelector: React.FC<ITraitsSelector> = ({ traits, setTraits, traitsLoaded }) => {
  const handleTraitSelection = (index: number) => {
    setTraits(
      traits.map((trait, i) => {
        if (i === index) {
          if (trait.selected) {
            return { ...trait, selected: false };
          } else {
            return  { ...trait, selected: true }
          }
        } else {
          return { ...trait };
        }
      })
    )
  }

  const skeletonNumberOfTraits = Array.from({ length: numberOfTraits }, (_, index) => index + 1);
  return (
    <div className="flex flex-col bg-midday rounded w-100 py-3 px-4 overflow-hidden">
      <h2 className="mb-2">Select your actives traits <small className="opacity-50">(during the previous stage)</small></h2>
      {traitsLoaded === true ? (
      <ul className="grid grid-cols-10 gap-y-2 gap-x-1">
        {traits.map((trait, index) => {
          const path = trait.name === 'Threat' ? 'triangle pt-0 px-[6px] w-7 h-6' : 'hex w-6 h-7';
          return(
          <li 
            key={index} 
            className={`relative`}
            onClick={() => handleTraitSelection(index)}
          >
            <div className={`h-full py-1 px-1.5 relative flex items-center rounded overflow-hidden cursor-pointer transition-all duration-500 ${trait.selected === true ? "opacity-100 border border-crema": "opacity-50 border border-midday"} hover:opacity-100`}>
              <figure className={`${path} flex items-center justify-center p-1 text-xs bg-midnight`}>
                <img src={trait.image} alt={trait.name} />
              </figure>
              <h3 className="text-xs ml-2">{trait.name}</h3>
            </div>
          </li>
        )})}
      </ul>
      ):(
        <ul className="grid grid-cols-10">
          {skeletonNumberOfTraits.map((index) => (
          <li key={index} className="relative">
            <div className="h-full py-1 px-1.5 relative flex items-center rounded overflow-hidden cursor-pointer transition-all duration-500 opacity-50 border border-midday  ">
              <span className={`hex w-6 h-7 flex items-center justify-center p-1 text-xs bg-midnight`}>
              </span>
              <span className="ml-2 w-16 h-2.5 bg-crema rounded"></span>
            </div>
          </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TraitsSelector;