import React, {FC} from 'react';
import {CharacterModel} from "../types";

const Character: FC<CharacterModel> = (
  {id, name, status, species, type, gender, origin, location, image}
) => {
  return (
    <div className='d-flex w-50 mb-2'>
      <img style={{width: '200px', height: '200px'}} src={image} alt={name}/>
      <div className='p-lg-2'>
        <p className='display-6'>{name}</p>
        <p className='mb-1'>{status} - {species}</p>
        <p className='mb-1'>Gender: {gender}</p>
        <p className='mb-1'>Origin: {origin.name}</p>
        Last known location: {location.name}
      </div>
    </div>
  );
};

export default Character;