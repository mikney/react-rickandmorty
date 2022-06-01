import React, {FC} from 'react';
import {Table} from "react-bootstrap";
import {Episode} from "../effector/effector";

interface TableSeason {
  episodes: Episode[]
}

const TableSeason: FC<TableSeason> = ({episodes}) => {
  return (
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Id</th>
          <th>Air date</th>
          <th>Episode</th>
          <th>Number of characters</th>
        </tr>
        </thead>
        <tbody>
        {episodes.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.air_date}</td>
            <td>{item.episode}</td>
            <td>{item.characters.length}</td>
          </tr>
        ))}
        </tbody>
      </Table>
  );
};

export default TableSeason;