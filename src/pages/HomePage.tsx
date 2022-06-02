import React, {useEffect, useState} from 'react';
import {Container, Pagination} from "react-bootstrap";
import TableSeason from "../components/TableSeason";
import {useStore} from "effector-react";
import MySelect from "../components/MySelect";
import {useFilteredAndSortedEpisodes} from "../hooks/useEpisodes";
import MyInput from "../components/MyInput";
import {options} from "../utils/consts";
import MySort from "../components/MySort";
import {$episodesGetStatus, updateListEpisodes} from "../effector/effector-episodes";
import {KeyOfEpisode} from "../types";

const HomePage = () => {

  const episodes = useStore($episodesGetStatus);
  const [season, setSeason] = useState<number>(0)
  const [sort, setSort] = useState<KeyOfEpisode>('id')
  const [filter, setFilter] = useState<string>('')
  const [showColOfTable, setShowColOfTable] = useState<{[key in KeyOfEpisode]: boolean}>({
    id: true,
    name: true,
    air_date: true,
    episode: true,
    characters: true,
    url: true,
    created: true
  })
  const filteredAndSortedEpisodes = useFilteredAndSortedEpisodes(episodes.data, season, sort, filter)

  useEffect(() => {
    updateListEpisodes()
  },[])


  return (
    <Container>
      <h1 className='mt-4 mb-lg-5 text-black-80 display-3 text-lg-center'>List of episodes of the Rick and Morty</h1>

      <div className='d-flex mb-2 align-items-center'>
        <h5 className='me-3'>
          Search
        </h5>
        <MyInput filter={filter} setFilter={setFilter} />
      </div>

      <div className='d-flex'>
        <h5 className='me-3'>
          Table columns
        </h5>
        <MySort showColOfTable={showColOfTable} setShowColOfTable={setShowColOfTable} />
      </div>

      <div className='d-flex align-items-center justify-content-sm-between'>
        <div className='d-flex align-items-center'>
          <h5 className='me-3 mb-0'>
            Sorted by
          </h5>
          <MySelect
            value={sort}
            onChange={(value: KeyOfEpisode) => setSort(value)}
            options={options}
          />
        </div>
        <div className='d-flex align-items-center mb-3'>
          <h5 className='me-3'>Select Season</h5>
          <Pagination className='mb-0'>
            {episodes.data?.map((item, index) => (
              <Pagination.Item onClick={() => setSeason(index)} key={item[index].name} active={index === season}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
      {episodes.loading && !episodes.data.length ?
        <div className="d-block mx-auto spinner-border" role="status">
          <span className="sr-only" />
        </div>
        :
        <>
          {episodes.error ?
            <h4>Unexpected error</h4>
            :
            <>
              {!!episodes.data.length && filteredAndSortedEpisodes && <TableSeason columns={showColOfTable} episodes={filteredAndSortedEpisodes} />}
              {filter && episodes && !filteredAndSortedEpisodes.length && <h4>Series not found</h4>}
            </>
          }
        </>
      }
    </Container>
  );
};

export default HomePage;