import {createEffect, createStore} from "effector";
import {getAllCharacterInEpisode} from "../api/api";
import {CharacterModel} from "../types";




export const $charactersInEpisode = createStore<CharacterModel[]>([])

export const getALlCharactersInEpisode = createEffect(async (ids: number[]) => {
  const resp = await getAllCharacterInEpisode(ids)
  return resp
})

$charactersInEpisode.on(getALlCharactersInEpisode.doneData, ((state, payload) => {
  return payload
}))

