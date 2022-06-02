import React, {FC} from 'react';
import {Event} from "effector"

interface IMyInput {
  filter: string;
  setFilter: Event<string>
}

const MyInput: FC<IMyInput> = ({filter, setFilter}) => {
  return (
    <input
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      type="text"
      className="form-control w-50"
      placeholder="Enter the series name"
      aria-describedby="basic-addon1"/>
  );
};

export default MyInput;