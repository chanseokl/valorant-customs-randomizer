import React from 'react'
import { BsLockFill } from 'react-icons/bs'
import { BsUnlockFill } from 'react-icons/bs'
import PlayerSlot from './PlayerSlot'

/*
ATTACKERS COLOR: #ef5250
ATTACKERS PLAYER COLOR: #be2f2d

DEFENDERS COLOR: #669fdb 
DEFENDERS PLAYER COLOR: #313073
*/

const Team = ({ isAttack }) => {
  return (
    <div className='Team'>
      <div>{isAttack ? 'ATTACKERS' : 'DEFENDERS'} <BsUnlockFill /> </div>
      <div className='team__side' 
        style={{backgroundColor: isAttack ? '#ef5250' : '#669fdb'}}>
        <PlayerSlot isAttack={isAttack} />
        <PlayerSlot isAttack={isAttack} />
        <PlayerSlot isAttack={isAttack} />
        <PlayerSlot isAttack={isAttack} />
        <PlayerSlot isAttack={isAttack} />
      </div>
    </div>
  )
}

Team.defaultProps = {
  isAttack: true
}

export default Team