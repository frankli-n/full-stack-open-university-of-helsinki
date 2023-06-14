import React from 'react';

const Persons = (props) => {
  return (
    <>
      {props.persons.map((i) => (
        <div key={i.name}>
          {i.filterMatch || i.filterMatch === undefined ? `${i.name} ${i.number}` : ''}
        </div>
      ))}
    </>
  );
};

export default Persons;
