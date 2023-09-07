import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Block = (props) => {
  return (
  <div>
    <h2>{props.header}</h2>
    <p>{props.text}</p>
    <p>has {props.votes} vote(s)</p>
  </div>
)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Uint8Array(8))
  const [most, setMost] = useState(0)

  const handleSelected = () => {
    let index = Math.floor(Math.random() * 8)// generate a random number from 0 to 7
    let newSelected = index
    //console.log(newSelected)
    setSelected(newSelected)
  }

  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
    //console.log(copy)

    let index = copy.indexOf(Math.max(...copy))
    // console.log(index)
    setMost(index)

  }


  return (
    <div>
      <Block header='Anecdote of the day' text={anecdotes[selected]} votes={vote[selected]} />
      <Button handleClick={handleVote} text='vote'/>
      <Button handleClick={handleSelected} text={'next anecdote'} />
      <Block header='Anecdote with most votes' text={anecdotes[most]} votes={vote[most]} />
    </div>
  )
}

export default App
