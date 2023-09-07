import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticsLine = ( {text, value}) => (
  <tr>
    <td>{text}: </td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, total, score}) => {
  let avgScore = (score / total)
  let posFB = (good / total * 100) + "%"
  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='all' value={total} />
          <StatisticsLine text='average score' value={avgScore} />
          <StatisticsLine text='positive' value={posFB} />
        </tbody>
      </table>
    )
  }
}



function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const handleGoodClick = () => {
    let updatedGood = good + 1
    let updatedScore = score + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setScore(updatedScore)
  }

  const handleNeutralClick = () => {
    let updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }

  const handleBadClick = () => {
    let updatedBad = bad + 1
    let updatedScore = score - 1
    setBad(bad + 1)
    setTotal(good + neutral + updatedBad)
    setScore(updatedScore)
  }

  return (
    <div>
      <h1>Please press the button to give feedback</h1>
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        score={score}
        total={total} />
    </div>
  )

}

export default App
