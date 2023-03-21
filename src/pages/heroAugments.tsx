import { useState, useEffect } from "react";
import { fetchAugments } from '../api/fetchAugments';
import StageSelection from "../components/hero-augments/stageSelection";
import ResetButton from "../components/hero-augments/resetButton";
import Slot from "../components/hero-augments/slot";
import { numberOfSlots } from '../constants/hero-augments';
import { baseStage, baseSlots } from '../constants/constants';
import TraitsSelector from "../components/hero-augments/traitsSelector";
import ResultChampions from "../components/hero-augments/resultChampions";

const HeroAugments: React.FC = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);
  const [stageSelected, setStageSelected] = useState(baseStage);
  const [slotsCost, setSlotsCost] = useState(baseSlots);
  const [traitsLoaded, setTraitsLoaded] = useState(false);
  
  useEffect(() => {
    (async () => {
      const data = await fetchAugments();
      const champions = data.champions;
      setChamps(champions);
      const traits = data.traits;
      setTraits(traits);
      setTraitsLoaded(true);
    })();
  }, []);

  const slotsArray = Array.from({ length: numberOfSlots }, (_, index) => index + 1);

  return (
    <section className="flex items-start flex-col flex-1">
      <aside className="flex flex-col w-full mb-6">
        <h2 className="hidden">Select your stage and your active traits</h2>
        <div className="flex justify-between gap-4 md:gap-6 mb-4 md:mb-6 flex-wrap md:flex-nowrap">
          <StageSelection stageSelected={stageSelected} setStageSelected={setStageSelected} slotsCost={slotsCost} setSlotsCost={setSlotsCost} />
          <div className="min-w-full md:min-w-0 order-3 md:order-2 flex flex-1 justify-between gap-4 md:gap-6">
            {slotsArray.map((slot) => (
              <Slot
                key={slot} index={slot} 
                stageSelected={stageSelected} 
                slotsCost={slotsCost}
                setSlotsCost={setSlotsCost}
              />
            ))}
          </div>
          <ResetButton stageSelected={stageSelected} setStageSelected={setStageSelected} slotsCost={slotsCost} setSlotsCost={setSlotsCost} traits={traits} setTraits={setTraits} />
        </div>
        <TraitsSelector traits={traits} setTraits={setTraits} traitsLoaded={traitsLoaded} />
      </aside>
      <main className="mt-4 mb-16 w-full">
        <ResultChampions champs={champs} slotsCost={slotsCost} traits={traits} />
      </main>
    </section>
  )
}

export default HeroAugments;