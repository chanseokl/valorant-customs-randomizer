import React from 'react'

const PlayerSlot = ({ isAttack }) => {
  return (
    <div className='Player-Slot'
      style={{backgroundColor: isAttack ? '#be2f2d' : '#313073'}}>
        <img src={require('../assets/agents/neon-icon.png')}/>
        <div className='player-slot__info'>
          <label>name</label>
          <label>agent name</label>
        </div>
    </div>
  )
}

export default PlayerSlot