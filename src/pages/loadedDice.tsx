import { useState, useEffect } from "react";
import { fetchChampions } from '../api/fetchChampions';
import { Helmet } from 'react-helmet-async';
import ChampionSelector from "../components/loaded-dice/championSelector";
import ResetButton from "../components/loaded-dice/resetButton";
import SelectedChampion from "../components/loaded-dice/selectedChampion";

const LoadedDice: React.FC = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);
  const [championsLoaded, setChampionsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchChampions();
      const champions = data.champions;
      champions.forEach((champion: any) => {
        if (champion.name === "Janna") {
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
      <h2 className="hidden">Loaded dice odds and probabilites – Use it correctly will lead you to victory!</h2>
      <section className="flex items-start flex-col flex-1">
        <aside className="flex flex-col w-full mb-6">
          <h2 className="hidden">Select a champion to get with your loaded dice</h2>
          <div className="flex justify-between gap-4 md:gap-6 mb-4 md:mb-6 flex-wrap md:flex-nowrap">
            <ResetButton />
          </div>
          <ChampionSelector 
            champs={champs} 
            setChamps={setChamps}
            championsLoaded={championsLoaded}
          />
        </aside>
        <main className="mb-16 w-full">
          <SelectedChampion champs={champs} traits={traits} />
        </main>
      </section>
    </>
  )
}

export default LoadedDice;