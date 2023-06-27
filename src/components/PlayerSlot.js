import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { BsLockFill, BsUnlockFill } from 'react-icons/bs'
import { FaRandom } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

const PlayerSlot = ({ 
  isAttack, 
  num, 
  removeChoice,
  playerName, 
  agentName, 
  id,
  teamLock,
  toggleChoiceLock, //isAttack, num, isPlayer
  playerLock,
  agentLock,
}) => {
  const {setNodeRef} = useDroppable({
    id: {id},
    data: {
      accepts: ['agent', 'playerName'],
    },
  })
  
  var realPlayerName = playerName
  var playerClassName = ''
  var realAgentName = agentName
  var agentClassName = ''
  var playerOptions = null
  var agentOptions = null;

  //if the overall team is locked, all players slots are locked, can't unlock unless team is
  if(teamLock) {
    playerClassName = 'locked-slot'
    playerOptions = <BsLockFill title='Team is Locked' className='unlock-unavailable'/>
    agentOptions = <BsLockFill title='Team is Locked' className='unlock-unavailable'/>
  }
  else {
    //if no playername, sets to empty settings
    if(playerName === null) {
      realPlayerName = 'empty'
      playerClassName = 'empty-slot'
    }
    //if playername exists, and is unlocked, gives options
    else if(!playerLock) {
      playerClassName = 'unlocked-slot'
      playerOptions = 
        <div>
          <FaRandom 
            className='lock-available'
          /> 
          <BsUnlockFill 
            className='lock-available' 
            onClick={() => toggleChoiceLock(isAttack, num, true)}
          />
          <MdCancel
            className='lock-available'
            onClick={() => removeChoice(isAttack, num, true)}
          />
        </div>
    }
    //if playername exists, and is locked, only shows locked symbol
    else if(playerLock) {
      playerClassName = 'locked-slot'
      playerOptions = 
        <BsLockFill 
          className='lock-available' 
          onClick={() => toggleChoiceLock(isAttack, num, true)}
        />
    }
  
    if(agentName === null) {
      realAgentName = 'empty'
      agentClassName = 'empty-slot'
    }
    else if(!agentLock) {
      agentClassName = 'unlocked-slot'
      agentOptions = 
      <div>
        <FaRandom 
          className='lock-available'
        /> 
        <BsUnlockFill 
          className='lock-available' 
          onClick={() => toggleChoiceLock(isAttack, num, false)}
        /> 
        <MdCancel 
          className='lock-available'
          onClick={() => removeChoice(isAttack, num, false)}
        />
      </div>
    }
    else if(agentLock) {
      agentClassName = 'locked-slot'
      agentOptions = 
        <BsLockFill 
          className='lock-available' 
          onClick={() => toggleChoiceLock(isAttack, num, false)}
        />
    }
  }

  return (
    <div ref={setNodeRef}
      className='Player-Slot'
      style={{backgroundColor: isAttack ? '#be2f2d' : '#313073'}}>
        <img alt={playerName} src={require(`../assets/agents/${realAgentName.toLowerCase()}-icon.png`)}/>
        <div className='player-slot__info'>
          <div>
            <label className={playerClassName}>{realPlayerName}</label>
            {playerOptions}
          </div>
          <div>
            <label className={agentClassName}>{realAgentName}</label>
            {agentOptions}
          </div>
          
        </div>
    </div>
  )
}

PlayerSlot.defaultProps = {
  playerName: "empty",
  agentName: "empty",
}

export default PlayerSlot