import React, {FC} from 'react';
import {Table} from "react-bootstrap";
import {Episode, KeyOfEpisode} from "../effector/effector";

interface TableSeason {
  episodes: Episode[]
  columns: {
    [key in KeyOfEpisode]: boolean
  }
}

const TableSeason: FC<TableSeason> = ({episodes, columns}) => {
  return (
      <Table striped bordered hover>
        <thead>
        <tr>
          {columns?.id && <th>Id</th>}
          {columns.name && <th>Name</th>}
          {columns.air_date && <th>Air date</th>}
          {columns.episode && <th>Episode</th>}
          {columns.characters && <th>Number of characters</th>}
        </tr>
        </thead>
        <tbody>
        {episodes.map(item => (
          <tr key={item.id}>
            {columns?.id && <td>{item.id}</td>}
            {columns.name && <td>{item.name}</td>}
            {columns.air_date && <td>{item.air_date}</td>}
            {columns.episode && <td>{item.episode}</td>}
            {columns.characters && <td>{item.characters.length}</td>}
          </tr>
        ))}
        </tbody>
      </Table>
  );
};

export default TableSeason;