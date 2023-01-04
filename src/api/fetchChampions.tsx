import { fetchChampionsURL, currentSet } from "../constants/set";

export async function fetchChampions() {
  const response = await fetch(fetchChampionsURL);
  const data = await response.json();

  const dataChampions = data.sets[currentSet].champions;
  const filteredChampions = dataChampions.filter((champion: any) => champion.traits.length > 0);
  const withSelectionChampions = filteredChampions.map((champion: any) => ({ ...champion, selected: false }))
  const sortedDataChampions = [...withSelectionChampions].sort((a, b) => a.name - b.name); // not working apparently

  return sortedDataChampions;
}