import { useState, useEffect } from 'react';
import * as Constants from '../constants/set';

function GetChampions() {
  const [champs, setChamps] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(Constants.apiURL);
    const data = await response.json();

    const dataChampions = data.sets[Constants.currentSet].champions;
    const sortedDataChampions = [...dataChampions].sort((a, b) => a.cost - b.cost);
    setChamps(sortedDataChampions);
  }

  return (
    <ul>
      {champs.map((champion, index) => (
        <li key={index}>{champion.name}</li>
      ))}
    </ul>
  )
}

export default GetChampions;