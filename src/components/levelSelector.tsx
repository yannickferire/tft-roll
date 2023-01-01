interface ILevelSelector {
  selectedLevel: number;
  setSelectedLevel: (level: number) => void;
}

const LevelSelector: React.FC<ILevelSelector> = ({ selectedLevel, setSelectedLevel }) => {
  return (
    <div className="inline-block text-lg bg-slate-200 rounded">
      <button 
        onClick={() => setSelectedLevel(selectedLevel - 1)}
        className={`py-2 px-4 rounded-l ${(selectedLevel <= 1)?'text-slate-400':'hover:bg-slate-300'}`} 
        disabled={selectedLevel <= 1}
      >-</button>
      <span className="p-2 w-20 inline-block text-center">{selectedLevel}</span>
      <button
        onClick={() => setSelectedLevel(selectedLevel + 1)} 
        className={`py-2 px-4 rounded-r ${(selectedLevel >= 11)?'text-slate-400':'hover:bg-slate-300'}`} 
        disabled={selectedLevel >= 11}
      >+</button>
    </div>
  )
}

export default LevelSelector;