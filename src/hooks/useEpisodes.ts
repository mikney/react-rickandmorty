import {useMemo} from "react";
import {Episode, KeyOfEpisode} from "../effector/effector";

export const useSortedEpisodes = (episodes: Episode[][], season: number, sort: KeyOfEpisode): Episode[] => {
  return useMemo(() => {
    if (!episodes.length) return [];
    if (sort === "id") {
      return episodes[season].sort((a, b) => a[sort] > b[sort] ? 1 : -1)
    }
    if (sort === "characters") {
      return episodes[season].sort((a, b) => a[sort].length > b[sort].length ? 1 : -1)
    }
    return [...episodes[season]].sort((a, b) => a[sort].localeCompare(b[sort]))
  },[sort, season, episodes])
}

export const useFilteredAndSortedEpisodes = (episodes: Episode[][], season: number, sort: KeyOfEpisode, filter: string): Episode[] => {
  const sortedEpisodes = useSortedEpisodes(episodes, season, sort)
  return useMemo(() => {
    if (!filter.length) {
      return sortedEpisodes;
    }
    return sortedEpisodes?.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [filter, sortedEpisodes])
}