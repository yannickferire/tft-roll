interface ICopiesNumber {
  numberOfCopies: number;
  setNumberOfCopies: (copies: number) => void;
}

const CopiesNumber: React.FC<ICopiesNumber> = ({ numberOfCopies, setNumberOfCopies }) => {
  return (
    <div className="inline-block text-lg bg-earlynight rounded">
      <button 
        onClick={() => { setNumberOfCopies(numberOfCopies - 1)}}
        className={`py-2 px-4 rounded-l ${(numberOfCopies <= 0)?'opacity-40':'hover:bg-midday'}`} 
        disabled={numberOfCopies <= 0}
      >-</button>
      <span className="p-2 w-20 inline-block text-center">{numberOfCopies}</span>
      <button
        onClick={() => setNumberOfCopies(numberOfCopies + 1)} 
        className={`py-2 px-4 rounded-r ${(numberOfCopies >= 8)?'opacity-40':'hover:bg-midday'}`} 
        disabled={numberOfCopies >= 8}
      >+</button>
    </div>
  )
}

export default CopiesNumber;