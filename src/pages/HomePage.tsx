import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import TableSeason from "../components/TableSeason";
import {useStore} from "effector-react";
import MySelect from "../components/MySelect";
import {useFilteredAndSortedEpisodes} from "../hooks/useEpisodes";
import MyInput from "../components/MyInput";
import {options} from "../utils/consts";
import MySort from "../components/MySort";
import {$episodesGetStatus, updateListEpisodes} from "../effector/effector-episodes";
import {KeyOfEpisode} from "../types";
import {$tableTools, setColumn, setFilter, setSeason, setSort} from "../effector/effector-control-table";
import MyPagination from "../components/MyPagination";

const HomePage = () => {

  const episodes = useStore($episodesGetStatus);
  const {sort, columns, season, filter} = useStore($tableTools);
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
        <MySort showColOfTable={columns} setShowColOfTable={setColumn} />
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
          <MyPagination episodes={episodes?.data} setSeason={setSeason} season={season}/>
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
              {!!episodes.data.length && filteredAndSortedEpisodes && <TableSeason columns={columns} episodes={filteredAndSortedEpisodes} />}
              {filter && episodes && !filteredAndSortedEpisodes.length && <h4>Series not found</h4>}
            </>
          }
        </>
      }
    </Container>
  );
};

export default HomePage;