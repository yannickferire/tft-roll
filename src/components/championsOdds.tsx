interface IChampionsOdds {
  champs: any[];
}

const ChampionsOdds: React.FC<IChampionsOdds> = ({ champs }) => {
  const selectedChampions = champs.filter((champion) => champion.selected);

  return (
    <section className="block mt-6 p-5 bg-crema text-midnight rounded">
      {selectedChampions.map((champion, index) => (
        <p key={index}>{champion.name}</p>
      ))}
    </section>
  )
}

export default ChampionsOdds;