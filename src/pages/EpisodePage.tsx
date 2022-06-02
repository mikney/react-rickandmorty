import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useStore} from "effector-react";
import Character from "../components/Character";
import {Container} from "react-bootstrap";
import {$charactersInEpisode} from "../effector/effector-characters";
import {$episodeGetStatus, getEpisode} from "../effector/effector-episodes";

const EpisodePage = () => {

  const {id} = useParams()
  const episode = useStore($episodeGetStatus)
  const characters = useStore($charactersInEpisode)

  useEffect(() => {
    if (id) getEpisode(+id)
  }, [])

  return (
    <Container>
      {
        episode.data.name && <div>
          <h6 className='display-2 text-lg-center'>{episode.data.name}</h6>
          <h6 className='display-6 text-lg-center'>Air date: {episode.data.air_date} {episode.data.episode}</h6>
          <h2 className='display-4 text-lg-center'>Characters</h2>
          <div className='d-flex flex-wrap'>
            {!!characters.length && characters.map((item) => (
              <Character key={item.id} {...item}/>
            ))}
          </div>

        </div>
      }
    </Container>
  );
};

export default EpisodePage;