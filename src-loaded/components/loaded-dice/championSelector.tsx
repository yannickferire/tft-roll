import { totalNumberOfChampions } from "../../constants/champions";

interface IChampionSelector {
  champs: any[];
  setChamps: (champions: any[]) => void;
  championsLoaded: boolean;
}

const ChampionSelector: React.FC<IChampionSelector> = ({ champs, setChamps, championsLoaded }) => {
  const handleChampionSelection = (index: number) => {
    setChamps(
      champs.map((champion, i) => {
        if (i === index) {
          return  { ...champion, selected: true }
        } else {
          return { ...champion, selected: false }
        }
      })
    )
  }

  
  const sortedChamps = champs.sort((a, b) => {
    if (a.cost === b.cost) {
      return a.name.localeCompare(b.name);
    }
    return a.cost - b.cost;
  });

  const skeletonNumberOfChampions = Array.from({ length: totalNumberOfChampions }, (_, index) => index + 1);

  let isExpanded = false; 
  const screenWidth = window.innerWidth;
  const toggleExpansion = () => {
    const breakpoint = 819;
    const content = document.querySelector(".expandable") as HTMLElement;
    const select = document.querySelector(".select") as HTMLElement;
    if (content != null && screenWidth <= breakpoint) {
      if (!isExpanded) {
        content.style.maxHeight = "0";
        content.classList.remove("h-0");
        content.classList.add("h-auto", "transition-height", "!py-3");
        var height = content.scrollHeight + "px";
        content.style.maxHeight = height;
        isExpanded = true;
        select.classList.add("select--open");
      } else {
        content.classList.add("transition-height");
        content.style.height = content.scrollHeight + "px";
        setTimeout(function () {
          content.style.maxHeight = "0";
        }, 0);
        content.classList.remove("!py-3");
        isExpanded = false;
        select.classList.remove("select--open");
      }
      content.addEventListener("transitionend", function (event) {
        if (event.target === content && !isExpanded) {
          content.classList.remove("transition-height");
          content.classList.add("h-0");
          content.style.height = "";
        }
      })
    }
  }

  return (
    <div className="flex flex-col rounded w-100 overflow-hidden">
      <h2 
        className={`${screenWidth > 819 ? '' : 'select'} relative rounded md:rounded-b-none px-4 py-3 bg-earlynight`}
        onClick={() => toggleExpansion()}>Select the champion you want</h2>
      {championsLoaded === true ? (
      <ul className="expandable box-content overflow-hidden transition ease-out duration-1000 h-0 py-0 relative grid grid-cols-5 sm:flex bg-midday md:h-auto md:py-3 px-4 gap-2.5 rounded-b flex-wrap">
        {sortedChamps.map((champion, index) => (
            <li 
              key={index} 
              className={`min-w-[50px] w-[50px] max-w-[50px] flex-1 champion aspect-square border-2 border-${champion.cost}cost rounded relative cursor-pointer hover-effect ${champion.selected === true ? "champ-selected ": ""} text-${champion.cost}cost`}
              onClick={() => handleChampionSelection(index)}
              title={champion.name}
            >
              <div className="w-full h-full relative block rounded overflow-hidden">
                <img 
                className={`w-20 -left-7 -top-1 max-w-none absolute z-10`}
                src={champion.image} 
                alt={champion.name} />
              </div>
            </li>
          ))}
      </ul>
      ) : (
        <ul className="expandable box-content overflow-hidden transition ease-out duration-1000 h-0 py-0 relative grid grid-cols-5 sm:flex bg-midday md:h-auto md:py-3 px-4 gap-2.5 rounded-b flex-wrap">
          {skeletonNumberOfChampions.map((index) => (
            <li 
              key={index} 
              role="status"
              className={`animate-pulse min-w-[50px] w-[50px] max-w-[50px] flex-1`}
            >
              <div className="flex items-center justify-center aspect-square mx-auto bg-1cost rounded">
              </div>
            </li>
          ))}
        </ul>
      )
      }
    </div>
  )
}

export default ChampionSelector;