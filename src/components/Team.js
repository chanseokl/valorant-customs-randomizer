import React from 'react'
import { BsLockFill, BsUnlockFill } from 'react-icons/bs'
import PlayerSlot from './PlayerSlot'

/*
ATTACKERS COLOR: #ef5250
ATTACKERS PLAYER COLOR: #be2f2d

DEFENDERS COLOR: #669fdb 
DEFENDERS PLAYER COLOR: #313073
*/

const Team = ({ 
  isAttack,
  toggleTeamLock,
  teamLock,
  removeChoice,
  players,
  toggleChoiceLock,
  playersLocks,
  agents,
  agentsLocks
 }) => {

  var lockComponent = <BsUnlockFill title='Fill out options to lock'className='unlock-unavailable'/>
  if(teamLock) 
    lockComponent = <BsLockFill className='lock-available' onClick={()=>toggleTeamLock(isAttack)}/>
  else if(!players.includes(null) && !agents.includes(null))
    lockComponent = <BsUnlockFill className='lock-available' onClick={()=>toggleTeamLock(isAttack)}/>
  return (
    <div className='Team'>
      <div>{isAttack ? 'ATTACKERS' : 'DEFENDERS'} {lockComponent} </div>
      <div className='team__side' 
        style={{backgroundColor: isAttack ? '#ef5250' : '#669fdb'}}>
          {players.map((playerName, index) => (
            <PlayerSlot 
              isAttack={isAttack}

              removeChoice={removeChoice}
              playerName={playerName}
              agentName={agents[index]}

              teamLock={teamLock}
              toggleChoiceLock={toggleChoiceLock}
              playerLock={teamLock ? teamLock : playersLocks[index]}
              agentLock={teamLock ? teamLock : agentsLocks[index]}
              
              id={(isAttack ? "Attacker" : "Defender") + index} 
              key={(isAttack ? "Attacker" : "Defender") + index} 
              num={index}
            />
          ))}
      </div>
    </div>
  )
}

Team.defaultProps = {
  isAttack: true
}

export default Team