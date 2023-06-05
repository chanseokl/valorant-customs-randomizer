import React from 'react'
import { FaRandom } from 'react-icons/fa'

const RandomizeButtons = () => {
  return (
    <div className='randomizers'>
      <div>
        <button className='btn btn-randomize'>RANDOMIZE <FaRandom /> </button>
      </div>
      <div className='randomizers__buttons'>
        <button className='btn'>PLAYERS <FaRandom /> </button>
        <button className='btn'>MAP <FaRandom /> </button>
        <button className='btn'>AGENTS <FaRandom /> </button>
      </div>
    </div>
  )
}

export default RandomizeButtons