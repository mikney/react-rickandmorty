import {combine, createEffect, createStore, restore} from "effector";
import {getAllCharacterInEpisode} from "../api/api";
import {CharacterModel} from "../types";
import {AxiosError} from "axios";
import {$episode, getEpisode} from "./effector-episodes";



export const $charactersInEpisode = createStore<CharacterModel[]>([])

export const getALlCharactersInEpisode = createEffect(async (ids: number[]) => {
  const resp = await getAllCharacterInEpisode(ids)
  return resp
})

$charactersInEpisode.on(getALlCharactersInEpisode.doneData, ((state, payload) => {
  return payload
}))

