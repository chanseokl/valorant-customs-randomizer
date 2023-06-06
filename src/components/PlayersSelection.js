import React from 'react'

const PlayersSelection = () => {
  return (
    <div className='player-selection'>
      <div className='player-names'>Player names</div>
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

export default PlayersSelection