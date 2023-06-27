import React from 'react'
import { FaRandom } from 'react-icons/fa'

const RandomizeButtons = ({
  randomizeAll,
  randomizePlayers,
  randomizeAgents,
  randomizeMap
}) => {
  return (
    <div className='Randomize-Buttons'>
      <div>
        <button className='btn btn-randomize' onClick={randomizeAll}>RANDOMIZE <FaRandom /> </button>
      </div>
      <div className='randomizers__buttons'>
        <button className='btn' onClick={randomizePlayers}>PLAYERS <FaRandom /> </button>
        <button className='btn' onClick={randomizeMap}>MAP <FaRandom /> </button>
        <button className='btn' onClick={randomizeAgents}>AGENTS <FaRandom /> </button>
      </div>
    </div>
  )
}

export default RandomizeButtons