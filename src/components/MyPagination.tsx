import React, {FC} from 'react';
import {Pagination} from "react-bootstrap";
import {Episode} from "../types";
import {Event} from "effector"

interface IMyPagination {
  episodes: Episode[][];
  setSeason: Event<number>
  season: number
}

const MyPagination: FC<IMyPagination> = ({episodes, setSeason, season}) => {
  return (
    <Pagination className='mb-0'>
      {episodes.map((item, index) => (
        <Pagination.Item onClick={() => setSeason(index)} key={item[index].name} active={index === season}>
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default MyPagination;