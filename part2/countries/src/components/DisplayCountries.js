import React from 'react';

const DisplayCountries = ({countries, handleShow}) => {
let disp


if (countries.length >= 10) {
    disp = "too many countries to display"
} 
if (countries.length < 10 && countries.length > 1) {
    disp = countries.map((i)=>(
        <>
            <div key={i}>
                {i}
                <button onClick={() => handleShow(i)}>show</button>
            </div>
        </>
))}



  return (
    <div>
        {disp}
    </div>
  )

};

export default DisplayCountries;
