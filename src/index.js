import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Footer from './Footer'
import './index.css'

const App = ({anecdotes}) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
      0:0,
      1:0,
      2:0,
      3:0,
      4:0,
      5:0
    }
  )

  const copyVotes = {...votes}

  const [mostVoted, setMostVoted] = useState({
    position: 0,
    votes: 0
  })

  const copyMostVoted = {...mostVoted};


  const randomAnecdote = () => {
    const lengthAnecdote = anecdotes.length - 1;
    const random = Math.round(Math.random() * lengthAnecdote)
    return setSelected(random)
  }

  const handleVote = () => {
    copyVotes[selected] = copyVotes[selected] + 1
    return setVotes({...copyVotes})
  }

  const mostPopular = () => {
    Object.entries(votes).forEach(([key,value]) => {
      if (value > copyMostVoted.votes) {
        setMostVoted({...copyMostVoted, position: key, votes: value});
      }
    })
  }

  useEffect(() => mostPopular())

  return (
    <div className='flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-pink-500 h-screen px-6'>
      <div className='container mx-4 md:mx-20 bg-white p-4 rounded-md md:max-w-xl'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='font-black text-2xl uppercase'>Anecdote of the day</h2>
          <div className='py-4 flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center h-28'>
              <p className='text-lg'>"{anecdotes[selected]}"</p>
            </div>
            <p className='font-black py-2'>{anecdotes[selected] === 0 ? <p>whitout votes </p> : `has ${copyVotes[selected]} votes`}</p>
          </div>
          <div className='py- flex justify-center gap-4'>
            <button className='rounded-full px-8 py-1 bg-indigo-700 hover:bg-indigo-600 transition-all text-white' onClick={handleVote}>Vote</button>
            <button className='rounded-full px-8 bg-green-700 hover:bg-green-600 transition-all text-white' onClick={randomAnecdote}>Next</button>
          </div>
          <div className='flex flex-col items-center justify-center mt-4'>
            <h2 className='font-black text-xl uppercase py-4'>Anecdote with most votes</h2>
            {
              mostVoted.votes !== 0 ?
              <div className='py-4 px-4 flex flex-col justify-center items-center w-full rounded-md bg-gradient-to-r from-blue-700 to-indigo-700'>
                <div className='flex flex-col justify-center items-center h-28'>
                  <p className='text-lg italic h-auto text-white'>"{anecdotes[mostVoted.position]}"</p>
                </div>
                <p className='font-black py-2 text-white'>has {mostVoted.votes} votes</p>
              </div>
              :
                <p className='py-4 flex flex-col justify-center items-center'>The most voted will appear here</p>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)