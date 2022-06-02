import {createEffect, createStore} from "effector";
import {getAllEpisodes} from "../api/api";

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string;
  url: string;
  created: string
}
export type KeyOfEpisode = keyof  Episode

export const $episodes = createStore<Episode[][]>([]);

const updateStore = (state: Episode[], data: Episode[]) => {
  let season: Episode[] = []
  const result: Episode[][] = []
  data.forEach((item, index) => {
    if (!index) {
      return season.push(item)
    }
    if (item.episode.split('E')[1] > data[index - 1]?.episode.split('E')[1]) {
      season.push(item)
    } else {
      result.push(season)
      season = []
    }
  })
  return result;
};
export const updateListEpisodes = createEffect <void, Promise<Episode[]>>(async () => {
  const resp = await getAllEpisodes()
  return resp
});


// @ts-ignore
$episodes.on(updateListEpisodes.doneData, updateStore)
