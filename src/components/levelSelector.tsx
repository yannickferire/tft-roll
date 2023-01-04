interface ILevelSelector {
  selectedLevel: number;
  setSelectedLevel: (level: number) => void;
}

const LevelSelector: React.FC<ILevelSelector> = ({ selectedLevel, setSelectedLevel }) => {
  const maxLevel = 11;
  return (
    <div className="inline-block text-lg bg-earlynight rounded">
      <button 
        onClick={() => setSelectedLevel(selectedLevel - 1)}
        className={`py-2 px-4 rounded-l ${(selectedLevel <= 1)?'opacity-40':'hover:bg-midday'}`} 
        disabled={selectedLevel <= 1}
      >-</button>
      <span className="p-2 w-20 inline-block text-center">{selectedLevel}</span>
      <button
        onClick={() => setSelectedLevel(selectedLevel + 1)} 
        className={`py-2 px-4 rounded-r ${(selectedLevel >= maxLevel)?'opacity-40':'hover:bg-midday'}`} 
        disabled={selectedLevel >= maxLevel}
      >+</button>
    </div>
  )
}

export default LevelSelector;