import { baseStage } from "../../constants/constants";

interface IResetButton {
  stageSelected: number;
  setStageSelected: (stage: number) => void;
  slotsCost: number[];
  setSlotsCost: (cost: number[]) => void;
}

const ResetButton: React.FC<IResetButton> = ({ stageSelected, setStageSelected, slotsCost, setSlotsCost }) => {
  let resetEnabled = false;

  if (stageSelected !== baseStage || slotsCost.some((cost) => cost > 0)) {
    resetEnabled = true;
  }
  const handleReset = () => {
    setStageSelected(baseStage);
    setSlotsCost([0, 0, 0]);
  }
  return (
    <button 
      onClick={() => handleReset()} 
      className={`ml-2 h-10 text-midday ${(resetEnabled == false)?'opacity-40':'hover-effect'} transition-all duration-300 ease-in-out`}
      disabled={resetEnabled == false}>
      <span className="w-full px-4 h-10 block leading-10 rounded bg-earlynight text-crema relative z-10">
        <span className="inline-block leading-9 text-xl rotate-45 mr-2">+</span>Reset
      </span>
    </button>
  )
}

export default ResetButton;