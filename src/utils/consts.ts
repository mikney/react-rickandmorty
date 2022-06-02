import {KeyOfEpisode} from "../types";

export const HOME_ROUTE = '/';
export const EPISODE_ROUTE = '/episode';

export const options: {value: KeyOfEpisode, name: string}[] = [
  {value: 'id', name: 'id'},
  {value: 'name', name: 'name'},
  {value: 'air_date', name: 'air date'},
  {value: 'episode', name: 'episode'},
  {value: 'characters', name: 'characters'},
]