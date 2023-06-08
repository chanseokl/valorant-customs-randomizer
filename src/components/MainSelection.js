import React from 'react'
import MapSelect from './MapSelect';
import Team from './Team';

const MainSelection = () => {
  return (
    <div className='Main-Selection'>
      <Team isAttack={true} />
      <MapSelect />
      <Team isAttack={false} />
    </div>
  )
}

export default MainSelection