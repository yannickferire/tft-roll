import { useState } from "react";
import StageSelection from "../components/hero-augments/stageSelection";
import ResetButton from "../components/hero-augments/resetButton";
import Slot from "../components/hero-augments/slot";
import { numberOfSlots } from '../constants/hero-augments';

const HeroAugments: React.FC = () => {
  const [stageSelected, setStageSelected] = useState(3);
  const [slotsCost, setSlotsCost] = useState([0, 0, 0]);
  console.log(slotsCost);

  const slotsArray = Array.from({ length: numberOfSlots }, (_, index) => index + 1);

  return (
    <section className="flex items-start flex-col md:flex-row flex-1">
      <aside className="flex flex-col w-full md:w-2/6 xl:w-96 mb-6">
          <h2 className="hidden">Select your stage and your active traits</h2>
          <div className="flex justify-between mb-6">
            <StageSelection stageSelected={stageSelected} setStageSelected={setStageSelected} slotsCost={slotsCost} setSlotsCost={setSlotsCost} />
            <ResetButton stageSelected={stageSelected} setStageSelected={setStageSelected} slotsCost={slotsCost} setSlotsCost={setSlotsCost} />
          </div>
          <div className="flex justify-between gap-6">
            {slotsArray.map((slot) => (
              <Slot
                key={slot} index={slot} 
                stageSelected={stageSelected} 
                slotsCost={slotsCost}
                setSlotsCost={setSlotsCost}
              />
            ))}
          </div>
        </aside>
    </section>
  )
}

export default HeroAugments;