import {createEvent, createStore} from "effector";
import {KeyOfEpisode} from "../types";

interface TableTools {
  sort: KeyOfEpisode;
  filter: string;
  season: number;
  columns: {[key in KeyOfEpisode]: boolean}
}
export const $tableTools = createStore<TableTools>({
  sort: 'id',
  filter: '',
  season: 0,
  columns: {
    id: true,
    name: true,
    air_date: true,
    episode: true,
    characters: true,
    url: true,
    created: true
  }
})

export const setSort = createEvent<KeyOfEpisode>()
const updateSort = (state: TableTools, data: KeyOfEpisode) => {
  state.sort = data
  return {...state}
}

export const setFilter = createEvent<string>()
const updateFilter = (state: TableTools, data: string) => {
  state.filter = data
  return {...state}
}

export const setSeason = createEvent<number>()
const updateSeason = (state: TableTools, data: number) => {
  state.season = data
  return {...state}
}

export const setColumn = createEvent<{[key in KeyOfEpisode]: boolean}>()
const updateColumn = (state: TableTools, data: {[key in KeyOfEpisode]: boolean}) => {
  state.columns = data
  return {...state}
}


$tableTools.on(setSort, updateSort)
$tableTools.on(setFilter, updateFilter)
$tableTools.on(setSeason, updateSeason)
$tableTools.on(setColumn, updateColumn)
