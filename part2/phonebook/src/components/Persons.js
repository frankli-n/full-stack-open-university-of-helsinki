import React from 'react';

const Persons = ({persons, handleDelete}) => {
  return (
    <>
      {persons.map((i) => (
        <div key={i.name}>
          {i.filterMatch || i.filterMatch === undefined ? `${i.name} ${i.number}` : ''} 
          {i.filterMatch || i.filterMatch === undefined ? <button onClick={() => handleDelete(i.id, i.name)}>delete</button> : ''}
        </div>
      ))}
    </>
  );
};

export default Persons;
