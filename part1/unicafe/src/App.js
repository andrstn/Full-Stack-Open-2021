import React, { useState } from "react";
import './minimal-table.css';

const Button = ({handleClick, text}) => 
    <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  if (text === 'positive') {
    return (
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}%</td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({value, good, neutral, bad, setValue, setGood, setNeutral, setBad}) => {
  
  const setToGood = () => {
    setValue(value + 1)
    setGood(good + 1)
  }

  const setToNeutral = () => {
    setValue(value + 1)
    setNeutral(neutral + 1)
  }

  const setToBad = () => {
    setValue(value + 1)
    setBad(bad + 1)
  }

  if (value === 0) {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={setToGood} text='Good' />
        <Button handleClick={setToNeutral} text='Neutral' />
        <Button handleClick={setToBad} text='Bad' />
        <h1>Statistics</h1>
        <p>No Feedback Given</p>
      </div>
    )
  }
  
  return (
    <div> 
      <h1>Give Feedback</h1>
      <Button handleClick={setToGood} text='Good' />
      <Button handleClick={setToNeutral} text='Neutral' />
      <Button handleClick={setToBad} text='Bad' />
      <h1>Statistics</h1>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='average' value={good - bad / value} />
      <StatisticLine text='positive' value={good / value * 100} />
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <Statistics 
    value={value}
    good={good}
    neutral={neutral}
    bad={bad}
    setValue={setValue}
    setGood={setGood}
    setNeutral={setNeutral}
    setBad={setBad}
    />
  );
}

export default App;
