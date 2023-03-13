import { fetchChampionsURL, currentSet, championImageURL, gameURL } from "../constants/set";

export async function fetchChampions() {
  const response = await fetch(fetchChampionsURL);
  const data = await response.json();

  const dataChampions = data.sets[currentSet].champions;
  const filteredChampions = dataChampions.filter((champion: any) => champion.traits.length > 0);
  const withSelectionChampions = filteredChampions.map((champion: any) => ({ ...champion, selected: false }));
  const withImageChampions = withSelectionChampions.map((champion: any) => ({
    ...champion,
    // if champion is from Stage 2, then modifie url to get the correct image
    image: champion.icon.includes("Stage2")
      ? `${championImageURL}/${champion.apiName.toLowerCase()}_mobile.tft_set${currentSet}_stage2.png`
      : `${championImageURL}/${champion.apiName.toLowerCase()}_square.tft_set${currentSet}.png`
  }));
  const dataTraits = data.sets[currentSet].traits.map((trait: any) => ({
    ...trait,
    image: `${gameURL}/${trait.icon.toLowerCase().replace(".tex", ".png")}`
  }));
  
  const enhancedData = { champions: withImageChampions, traits: dataTraits };

  return enhancedData;
}