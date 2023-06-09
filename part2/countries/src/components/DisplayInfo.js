import React from 'react';

const DisplayInfo = ({headerFlag, city, weatherIcon, temp, cuntry, countries, languages, flag}) => {
    let disp
    let l
    let w
    

    if (countries.length === 1) {
        disp = countries
        l = 'languages'
        w = `weather in ${city}`
    }

    if (cuntry) {
        disp = headerFlag ? <p>{cuntry}</p> : ''
        l = headerFlag ? 'languages' : ''
        w = headerFlag ? `weather in ${city}` : ''
    }

    
    const wIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`

      return (
        <>
            <h1>
                {disp}
            </h1>
            <h2>{l}</h2>
            <ul>
                {Object.values(languages).map((i)=> (
                    <li key={i}>{i}</li>
                ))}
            </ul>
            <div>
                <img src={flag} width='200'></img>
            </div>
            <h2>{w}</h2>
            <div>{temp}</div>
            {weatherIcon ? <img src={wIconUrl} width='200'></img> : <></>}
        </>
      )
    
    };

export default DisplayInfo;
