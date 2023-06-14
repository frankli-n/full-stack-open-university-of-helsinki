import React from 'react';

const Filter = ({handle}) => {
  return (
    <div>
        filter: <input 
        onChange={handle}
        />
    </div>
  );
};

export default Filter;
