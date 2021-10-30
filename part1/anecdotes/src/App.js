import React, {useState} from 'react';

const Button = ({handleClick, text}) => 
      <button onClick={handleClick}>{text}</button>

const Content = ({anecdotes, selected, points, setSelected, setPoints}) => {

  const MaxVote = () => {
    const maxPoint = Math.max(...points)
    const maxAnecdote = points.indexOf(maxPoint)
    if(maxPoint === 0) {
      return (
        <div>
          <h1>Please vote in order to display the anecdote with highest votes</h1>
        </div>
      )
    }
    return(
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[maxAnecdote]}</p>
        <p>Votes: {points[maxAnecdote]}</p>
      </div>
    )
  }


  const random = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const setPoint = selected
    const copy = [...points]
    copy[setPoint] += 1
    setPoints(copy)
  }
  


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {points[selected]}</p>
      <Button handleClick={random} text='next anecdote' />
      <Button handleClick={vote} text='vote' />
      <MaxVote />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
    'Do not stop'
  ]

  const [selected, setSelected] = useState(0)
  const [points = new Uint8Array(anecdotes.length), setPoints] = useState()

  return (
    <Content
    anecdotes={anecdotes}
    selected={selected}
    points={points}
    setSelected={setSelected}
    setPoints={setPoints}
    />
  )
}

export default App;
