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
        <title>Loaded dice probabilities – TFT odds</title>
        <meta name="description" content="Discover how you can have the best chance to hit the champion augment your team needs! Find out the probability to hit every hero augments. Optimize your gameplay and climb the ranks with ease." />
        <meta property="og:title" content="Loaded dice probabilities – TFT odds" />
		    <meta property="og:description" content="Discover how you can have the best chance to hit the champion augment your team needs! Find out the probability to hit every hero augments. Optimize your gameplay and climb the ranks with ease." />
      </Helmet>
      <h2 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Loaded dice</strong> cheatsheet<span className="hidden"> – Use it correctly will lead you to victory!</span></h2>
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