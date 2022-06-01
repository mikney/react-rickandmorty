import React, {useEffect, useState} from 'react';
import {Container, Pagination} from "react-bootstrap";
import TableSeason from "../components/TableSeason";
import {useStore} from "effector-react";
import {$episodes, updateListEpisodes} from "../effector/effector";

const HomePage = () => {

  const episodes = useStore($episodes);
  const [season, setSeason] = useState<number>(0)


  useEffect(() => {
    updateListEpisodes()
  },[])
  return (
    <Container>
      <h1 className='mt-5 text-black-80'>List of episodes of the Rick and Morty</h1>
      <div className='d-flex align-items-center justify-content-end'>
        <h5 className='me-3 mb-3'>Select Season</h5>
        <Pagination>
          {episodes?.map((item, index) => (
            <Pagination.Item onClick={() => setSeason(index)} key={item[index].name} active={index === season}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      {episodes.length && <TableSeason episodes={episodes[season]} />}
    </Container>
  );
};

export default HomePage;