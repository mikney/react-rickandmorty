import {combine, createEffect, createStore, restore} from "effector";
import {Episode} from "../types";
import {AxiosError} from "axios";
import {getAllEpisodes, getEpisodeById} from "../api/api";
import {getALlCharactersInEpisode} from "./effector-characters";



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
      season.push(item)
    }
  })
  return result;
};
export const updateListEpisodes = createEffect <void, Promise<Episode[]>, AxiosError>(async () => {
  const resp = await getAllEpisodes()
  return resp
});
export const $fetchError = restore<AxiosError>(updateListEpisodes.failData, null);

export const $episodesGetStatus = combine({
  loading: updateListEpisodes.pending,
  error: $fetchError,
  data: $episodes,
});

// @ts-ignore
$episodes.on(updateListEpisodes.doneData, updateStore)

export const $episode = createStore<Episode>({} as Episode)

export const getEpisode = createEffect<number, Promise<Episode>, AxiosError>(async (id) => {
  const resp = await getEpisodeById(id)
  const idListCharacters = resp.characters.map((item) => {
    return +item.split('/character/')[1]
  })
  getALlCharactersInEpisode(idListCharacters)
  return resp
});

export const $episodeFetchError = restore<AxiosError>(getEpisode.failData, null);


export const $episodeGetStatus = combine({
  loading: getEpisode.pending,
  error: $episodeFetchError,
  data: $episode,
});

// @ts-ignore
$episode.on(getEpisode.doneData, ((state, payload) => (payload)))