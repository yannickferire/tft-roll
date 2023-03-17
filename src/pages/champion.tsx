import { useState, useEffect } from 'react';
import { fetchChampions } from '../api/fetchChampions';
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
  )
}

export default Champion;