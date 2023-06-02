import React from 'react'
import { FaRandom } from 'react-icons/fa'

const RandomizeButtons = () => {
  return (
    <div className='randomize-buttons'>
      <div>
        <button className='btn btn-randomize'>RANDOMIZE <FaRandom /> </button>
      </div>
      <div className='smaller-randomize-buttons'>
        <button className='btn'>PLAYERS <FaRandom /> </button>
        <button className='btn'>MAP <FaRandom /> </button>
        <button className='btn'>AGENTS <FaRandom /> </button>
      </div>
    </div>
  )
}

export default RandomizeButtons