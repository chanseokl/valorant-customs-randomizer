import React from 'react'

const PlayerName = ({ name }) => {
  return (
    <div className='Player-Name'>
      {name}
      <div className='add-team-btns'>
        <button style={{backgroundColor:'red', color:'white'}}>Attackers</button>
        <button style={{backgroundColor:'blue', color:'white'}}>Defenders</button>
      </div>
    </div>
  )
}

PlayerName.defaultProps = {
  name: 'Default Name'
}

export default PlayerName