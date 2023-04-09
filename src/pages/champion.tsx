import { useState, useEffect } from 'react';
import { fetchChampions } from '../api/fetchChampions';
import { Helmet } from 'react-helmet-async';
import LevelSelector from '../components/champion/levelSelector';
import ResetButton from '../components/champion/resetButton';
import ChampionsSelector from '../components/champion/championsSelector';
import ChampionsOdds from '../components/champion/championsOdds';
import RollingOdds from '../components/champion/rollingOdds';
import { baseCost, baseLevel } from '../constants/constants';

const Champion: React.FC = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);
  const [selectedCost, setSelectedCost] = useState<string>(baseCost + " cost");
  const [selectedLevel, setSelectedLevel] = useState<number>(baseLevel);
  const [championsLoaded, setChampionsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchChampions();
      const champions = data.champions;
      setChamps(champions);
      setChampionsLoaded(true);
      const traits = data.traits;
      setTraits(traits);
    })();
  }, []);

  return(
    <>
      <Helmet>
        <title>Teamfight Tactics Odds – TFT Set 8.5 Champions rolling probabilities</title>
        <meta name="description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder. Get ahead of the game and dominate your opponents. Check it out now!" />
        <meta property="og:title" content="Teamfight Tactics Odds – TFT Set 8.5 Champions rolling probabilities" />
		    <meta property="og:description" content="Know your chances of hitting champions in any scenario. Mastering the odds will help you managing your golds and climb the ranks in the ladder. Get ahead of the game and dominate your opponents. Check it out now!" />
      </Helmet>
      <h2 className="text-3xl mt-4 mb-12 font-bold px-4 text-center"><strong className="text-morning">Champions</strong> rolling odds<span className="hidden"> – See how much gold you need for every units!</span></h2>
      <section className="flex items-start flex-col md:flex-row flex-1">
        <aside className="flex flex-col w-full md:w-2/6 xl:w-96 mb-6">
          <h2 className="hidden">Select your level and a champion</h2>
          <div className="flex justify-between">
            <LevelSelector selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> 
            <ResetButton selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} champs={champs} setChamps={setChamps} />
          </div>
          <RollingOdds selectedLevel={selectedLevel} selectedCost={selectedCost}  />
          <ChampionsSelector 
            champs={champs} 
            setChamps={setChamps}
            selectedCost={selectedCost} 
            setSelectedCost={setSelectedCost}
            championsLoaded={championsLoaded}
          />
        </aside>
          
        <ChampionsOdds selectedLevel={selectedLevel} champs={champs} setChamps={setChamps} traits={traits} />
      </section>
    </>
  )
}

export default Champion;