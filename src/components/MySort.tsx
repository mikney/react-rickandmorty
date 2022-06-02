import React, {FC} from 'react';
import {options} from "../utils/consts";
import {KeyOfEpisode} from "../types";

interface IMySort {
  showColOfTable: {[key in KeyOfEpisode]: boolean};
  setShowColOfTable: React.Dispatch<React.SetStateAction<{[key in KeyOfEpisode]: boolean}>>
}

const MySort: FC<IMySort> = ({showColOfTable, setShowColOfTable}) => {

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>, item: KeyOfEpisode) {
    showColOfTable[item] = e.target.checked
    const newState = {...showColOfTable}
    setShowColOfTable({...newState})
  }

  return (
    <>
      {options.map(item => (
          <div key={item.name}  className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" onChange={(e) => changeHandler(e, item.value)} id={item.value} checked={showColOfTable[item.value]}/>
            <label className="form-check-label" htmlFor={item.value}>{item.name}</label>
          </div>
        ))}
    </>
  );
};

export default MySort;