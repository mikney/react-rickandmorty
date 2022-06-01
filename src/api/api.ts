import axios from "./axios"
import {AxiosResponse} from "axios"

import {Episode} from "../effector/effector";
interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

export const getAllEpisodes = async (): Promise<Episode[]> => {
  const result = []
  const resp: AxiosResponse<{results: Episode[], info: Info}> = await axios.get('/episode')
  result.push(...resp.data.results)
  const respArray = await Promise.all(new Array(resp.data.info.pages - 1).fill('').map(async (_, index) => {
    return await axios.get<{results: Episode[], info: Info}>('/episode'+ `?page=${index + 2}`)
  }))
  respArray.forEach((item) => {
    result.push(...item.data.results)
  })
  return result
}