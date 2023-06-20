import React from 'react';

const DisplayInfoShow = ({countries, languages, flag, buttonShow, cuntry}) => {
    let disp
    

    if (countries.length === 1) {
        disp = countries
    }
    
      return (
        <>
            <div>
                {disp}
            </div>
            <ul>
                {Object.values(languages).map((i)=> (
                    <li key={i}>{i}</li>
                ))}
            </ul>
            <div>
                <img src={flag} width='200'></img>
            </div>
        </>
      )
    
    };

export default DisplayInfoShow;
