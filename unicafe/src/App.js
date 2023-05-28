import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text='good' value={props.good} />
          <StatisticsLine text='neutral' value={props.neutral} />
          <StatisticsLine text='bad' value={props.bad} />
          <StatisticsLine text='all' value={props.all} />
          <StatisticsLine text='average' value={props.average} />
          <StatisticsLine text='positive' value={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = updatedGood + neutral + bad
    setGood(updatedGood)
    setAll(updatedAll)
    setAverage((updatedGood - bad) / updatedAll)
    setPositive(((updatedGood / updatedAll) * 100) + ' %')
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = good + updatedNeutral + bad
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    setAverage((good - bad) / updatedAll)
    setPositive(((good / updatedAll) * 100) + ' %')
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = good + neutral + updatedBad
    setBad(updatedBad)
    setAll(updatedAll)
    setAverage((good - updatedBad) / updatedAll)
    setPositive(((good / updatedAll) * 100) + ' %')
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} 
        all={all} average={average} positive={positive} />
    </div>
  )
}

export default App