import React, {FC} from 'react';
import {KeyOfEpisode} from "../types";

interface MySelect {
  options: {value: string, name: string}[];
  value: KeyOfEpisode;
  onChange: (value: KeyOfEpisode) => void;
}

const MySelect: FC<MySelect> = ({options, value, onChange}) => {
  return (
    <select
      className="form-select w-50"
      value={value}
      onChange={event => onChange(event.target.value as KeyOfEpisode)}
    >
      {options.map(option =>
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      )}
    </select>
  );
};

export default MySelect;