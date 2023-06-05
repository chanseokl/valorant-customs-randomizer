import React from 'react'
import AttackTeam from './AttackTeam';
import DefendTeam from './DefendTeam';
import MapSelect from './MapSelect';

const MainSelection = () => {
  return (
    <div className='main'>
      <AttackTeam />
      <MapSelect />
      <DefendTeam />
    </div>
  )
}

export default MainSelection