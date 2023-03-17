import { possibleStages } from '../../constants/hero-augments';

interface IStageSelection {
  stageSelected: number;
  setStageSelected: (stage: number) => void;
  slotsCost: number[];
  setSlotsCost: (cost: number[]) => void;
}

const StageSelection: React.FC<IStageSelection> = ({ stageSelected, setStageSelected, slotsCost, setSlotsCost }) => {
  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setStageSelected(value);
    // This function is used to disable the options that are not available for the selected stage
    function isCostEnabled(n: number): boolean {
      return n === value || n === value - 1 || n === value + 1;
    }
    const updatedSlotsCost: number[] = [];
    slotsCost.map((cost) => {
      if (isCostEnabled(cost)) {
        updatedSlotsCost.push(cost);
      } else {
        updatedSlotsCost.push(0);
        setSlotsCost(updatedSlotsCost);
      }
    });
  }

  return (
    <div className="select bg-earlynight text-midday rounded leading-10 hover-effect cursor-pointer transition-all duration-300 ease-in-out">
      <select defaultValue={stageSelected} value={stageSelected} onChange={handleStageChange} className="bg-earlynight text-crema pl-4 pr-9 z-10 relative rounded focus:outline-none focus:ring focus:ring-midday">
        <option disabled>Select your stage</option>
        {Object.keys(possibleStages).map((stage, index) => {
          return (
            <option value={possibleStages[stage]} key={index}>Stage {stage}</option>
          )
        })}
      </select>
    </div>
  )
}

export default StageSelection;