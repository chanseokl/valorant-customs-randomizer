import React from 'react'
import PlayerName from './PlayerName'

const PlayerSelection = () => {
  return (
    <div className='Player-Selection'>
      <div className='player-names'>
        <PlayerName />
        <PlayerName />
      </div>
      <div className='player-input'>
        <label className='player-input-label'>Add Player</label>
        <form /*onSubmit={onSubmit} */>
          <input type='text' placeholder='Player Name' className='player-input-text'/>
          <input type='submit' value='Add' className='player-input-btn'/>
        </form>
      </div>
    </div>
  )
}

export default PlayerSelection