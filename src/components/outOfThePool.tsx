interface IOutOfThePool {
  champion: {
    cost: number
  }
}

const OutOfThePool: React.FC<IOutOfThePool> = ({ champion }) => {
  return (
    <div className="inline-block w-full bg-crema rounded">
      <h4 className="text-sm mb-1"><strong className={`text-${champion.cost}cost font-medium`}>{champion.cost} cost</strong> out of the pool</h4>
    </div>
  )
}

export default OutOfThePool;