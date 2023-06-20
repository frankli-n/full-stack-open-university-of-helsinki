import React from 'react';

const Input = ({handleInput}) => {
  return (
    <form onSubmit={handleInput}>
        <div>
        find countries: <input onChange={handleInput}
        />
        </div>
    </form>
  );
};

export default Input;

