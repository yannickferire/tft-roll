interface ICopiesNumber {
  ownedCopies: number;
  setOwnedCopies: (copies: number) => void;
}

const CopiesNumber: React.FC<ICopiesNumber> = ({ ownedCopies, setOwnedCopies }) => {
  return (
    <div className="inline-block text-lg bg-crema rounded">
      <button 
        onClick={() => { setOwnedCopies(ownedCopies - 1)}}
        className={`py-2 px-4 rounded-l ${(ownedCopies <= 0)?'opacity-40':'hover:bg-midday'}`} 
        disabled={ownedCopies <= 0}
      >-</button>
      <span className="p-2 w-20 inline-block text-center">{ownedCopies}</span>
      <button
        onClick={() => setOwnedCopies(ownedCopies + 1)} 
        className={`py-2 px-4 rounded-r ${(ownedCopies >= 9)?'opacity-40':'hover:bg-midday'}`} 
        disabled={ownedCopies >= 9}
      >+</button>
    </div>
  )
}

export default CopiesNumber;