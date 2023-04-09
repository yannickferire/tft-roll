import { possibleLevels } from "../../constants/loaded-dice"

interface IResultHeader {
  numberOfChampsPossible: number
}

const ResultHeader: React.FC<IResultHeader> = ({ numberOfChampsPossible }) => {
  return (
    <div className="flex">
      <span className="w-40 text-xs opacity-30 text-center">Dice used on</span>
      <ul className="flex justify-around text-center gap-2 w-full mb-6">
        {Object.values(possibleLevels).map((level, index) => (
          <li key={index} className="w-20 text-xs opacity-30">Lvl. {level}</li>
        ))}
      </ul>
    </div>
  )
}

export default ResultHeader;