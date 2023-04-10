import { useState, useEffect } from "react";
import { fetchChampions } from '../api/fetchChampions';
import { Helmet } from 'react-helmet-async';
import ChampionSelector from "../components/loaded-dice/championSelector";
// import ResetButton from "../components/loaded-dice/resetButton";
import SelectedChampion from "../components/loaded-dice/selectedChampion";
import DiceOdds from "../components/loaded-dice/diceOdds";

const LoadedDice: React.FC = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);
  const [championsLoaded, setChampionsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchChampions();
      const champions = data.champions;
      champions.forEach((champion: any) => {
        if (champion.name === "Jhin") {
          champion.selected = true;
        } else {
          champion.selected = false;
        }
      });
      setChamps(champions);
      setChampionsLoaded(true);
      const traits = data.traits;
      setTraits(traits);
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Loaded Dice cheatsheet – TFT odds Set 8.5</title>
        <link data-react-helmet="true" rel="canonical" href="https://tftodds.com/loaded-dice" />
        <meta data-react-helmet="true" name="description" content="Maximize your chances of getting the champion you want with the Loaded Dice cheatsheet. Based on detailed statistics, this tool provides you with the optimal strategy to manipulate the odds. Good luck!" />
        <meta data-react-helmet="true" property="og:title" content="Loaded Dice cheatsheet – TFT odds Set 8.5" />
		    <meta data-react-helmet="true" property="og:description" content="Maximize your chances of getting the champion you want with the Loaded Dice cheatsheet. Based on detailed statistics, this tool provides you with the optimal strategy to manipulate the odds. Good luck!" />
        <meta data-react-helmet="true" property="og:image" content="/share.jpg" />
        <meta data-react-helmet="true" property="og:url" content="https://tftodds.com" />
        <meta data-react-helmet="true" property="og:type" content="website" />
        <meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
		    <meta data-react-helmet="true" name="twitter:site" content="@tftodds" />
        <meta data-react-helmet="true" name="twitter:title" content="Loaded Dice cheatsheet – TFT odds Set 8.5" />
        <meta data-react-helmet="true" name="twitter:description" content="Maximize your chances of getting the champion you want with the Loaded Dice cheatsheet. Based on detailed statistics, this tool provides you with the optimal strategy to manipulate the odds. Good luck!" />
        <meta data-react-helmet="true" name="twitter:image" content="/share.jpg" />
      </Helmet>
      <h1 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Loaded dice</strong> cheatsheet<span className="hidden"> – Use it correctly will lead you to victory!</span></h1>
      <section className="flex items-start flex-col flex-1">
        <aside className="flex flex-col w-full mb-8">
          <ChampionSelector 
            champs={champs} 
            setChamps={setChamps}
            championsLoaded={championsLoaded}
          />
        </aside>
        <main className="mb-16 w-full">
          <SelectedChampion champs={champs} traits={traits} />
          <DiceOdds champs={champs} setChamps={setChamps} traits={traits} />
        </main>
      </section>
    </>
  )
}

export default LoadedDice;