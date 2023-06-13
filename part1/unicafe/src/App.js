import { useState } from 'react'

const StatisticLine = ({text,value}) => {
  
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )}

const Button = (props) => {

  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = (newValue) => {
    setGood(newValue)
    setAverage((newValue-bad)/(newValue+bad+neutral))
    setPositive(newValue/(newValue+bad+neutral))
  }
  const handleNeutral = (newValue) => {
    setNeutral(newValue)
    setAverage((good-bad)/(good+bad+newValue))
    setPositive(good/(good+bad+newValue))
  }
  const handleBad = (newValue) => {
    setBad(newValue)
    setAverage((good-newValue)/(good+newValue+neutral))
    setPositive(good/(good+newValue+neutral))
  }
  const formattedValue = (positive * 100).toFixed(1);
  const percentage = `${formattedValue}%`;
  



  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => handleGood(good + 1)}/>
      <Button text='neutral' handleClick={() => handleNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => handleBad(bad + 1)}/>
      <h1>statistics</h1>
      {good + bad + neutral === 0 ? (
      <div>No feedback given</div>
      ) : (
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value ={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value ={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value ={bad} />
          </tr>
          <tr>
            <StatisticLine text="average" value={average} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={percentage} />
          </tr>
        </tbody>
      </table>
      )}
    </div>
  )
}

export default App
