interface IResetButton {
}

const ResetButton: React.FC<IResetButton> = ({ }) => {
  let resetEnabled = false;
  const handleReset = () => {
  }
  return (
    <button 
      onClick={() => handleReset()} 
      className={`order-2 md:order-3 h-10 text-midday ${(resetEnabled == false)?'opacity-40':'hover-effect'} transition-all duration-300 ease-in-out`}
      disabled={resetEnabled == false}>
      <span className="w-full px-4 h-10 block leading-10 rounded bg-earlynight text-crema relative z-10">
        <span className="inline-block leading-9 text-xl rotate-45 mr-2">+</span>Reset
      </span>
    </button>
  )
}

export default ResetButton;