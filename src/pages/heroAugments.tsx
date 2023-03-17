import { useState, useEffect } from "react";
import { fetchChampions } from '../api/fetchChampions';
import StageSelection from "../components/hero-augments/stageSelection";
import ResetButton from "../components/hero-augments/resetButton";
import Slot from "../components/hero-augments/slot";
import { numberOfSlots } from '../constants/hero-augments';
import TraitsSelector from "../components/hero-augments/traitsSelector";

const HeroAugments: React.FC = () => {
  const [champs, setChamps] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);
  const [stageSelected, setStageSelected] = useState(3);
  const [slotsCost, setSlotsCost] = useState([0, 0, 0]);
  const [traitsLoaded, setTraitsLoaded] = useState(false);
  
  useEffect(() => {
    (async () => {
      const data = await fetchChampions();
      const champions = data.champions;
      setChamps(champions);
      const traits = data.traits;
      setTraits(traits);
      setTraitsLoaded(true);
    })();
  }, []);

  const slotsArray = Array.from({ length: numberOfSlots }, (_, index) => index + 1);

  return (
    <section className="flex items-start flex-col md:flex-row flex-1">
      <aside className="flex flex-col w-full mb-6">
          <h2 className="hidden">Select your stage and your active traits</h2>
          <div className="flex justify-between mb-6">
            <StageSelection stageSelected={stageSelected} setStageSelected={setStageSelected} slotsCost={slotsCost} setSlotsCost={setSlotsCost} />
            <ResetButton stageSelected={stageSelected} setStageSelected={setStageSelected} slotsCost={slotsCost} setSlotsCost={setSlotsCost} traits={traits} setTraits={setTraits} />
          </div>
          <div className="flex justify-between mb-6 gap-6">
            {slotsArray.map((slot) => (
              <Slot
                key={slot} index={slot} 
                stageSelected={stageSelected} 
                slotsCost={slotsCost}
                setSlotsCost={setSlotsCost}
              />
            ))}
          </div>
          <TraitsSelector traits={traits} setTraits={setTraits} traitsLoaded={traitsLoaded} />
        </aside>
    </section>
  )
}

export default HeroAugments;