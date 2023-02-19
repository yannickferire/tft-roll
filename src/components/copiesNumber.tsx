interface ICopiesNumber {
  ownedCopies: number;
  setOwnedCopies: (copies: number) => void;
}

const CopiesNumber: React.FC<ICopiesNumber> = ({ ownedCopies, setOwnedCopies }) => {
  return (
    <div className="inline-block w-full bg-crema rounded">
      <h4 className="text-sm mb-1">Copies owned</h4>
      <div className="flex text-lg w-full justify-between mb-2">
        <button 
          onClick={() => { setOwnedCopies(ownedCopies - 1)}}
          className={`text-midday h-10 text-lg ${(ownedCopies <= 0)?'opacity-40':'hover-effect'}`} 
          disabled={ownedCopies <= 0}
        ><span className="w-10 h-10 block leading-8 rounded bg-crema text-midnight border-2 border-midnight relative z-10">–</span></button>
        <span className="p-2 w-10 inline-block text-center">{ownedCopies}</span>
        <button
          onClick={() => setOwnedCopies(ownedCopies + 1)} 
          className={`text-midday h-10 text-lg ${(ownedCopies >= 9)?'opacity-40':'hover-effect'}`} 
          disabled={ownedCopies >= 9}
        ><span className="w-10 h-10 block leading-8 rounded bg-crema text-midnight border-2 border-midnight relative z-10">+</span></button>
      </div>
    </div>
  )
}

export default CopiesNumber;