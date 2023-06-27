import React from 'react'
import RandomizeButtons from './RandomizeButtons'
import CompositionSelect from './CompositionSelect'
import {useDroppable} from '@dnd-kit/core';
import { BsLockFill, BsUnlockFill } from 'react-icons/bs'

const MapSelect = ({ 
  mapName,
  toggleMapLock,
  mapLock,

  compOption,

  randomizeAll,
  randomizePlayers,
  randomizeAgents,
  randomizeMap
 }) => {
  const {setNodeRef} = useDroppable({
    id: 'map-drop',
    data: {
      accepts: ['map'],
    }
  })
  
  var lockComponent = <BsUnlockFill title='Fill map to lock' className='unlock-unavailable'/>
  if(mapLock) 
    lockComponent = <BsLockFill className='lock-available' onClick={toggleMapLock}/>
  else if(mapName === undefined)
    lockComponent = <BsUnlockFill className='lock-available' onClick={toggleMapLock}/>

  return (
    <div ref={setNodeRef} className='Map-Select'>
      <RandomizeButtons 
        randomizeAll={randomizeAll}
        randomizePlayers={randomizePlayers}
        randomizeAgents={randomizeAgents}
        randomizeMap={randomizeMap}
      />
      <h3 className='map-name'>{mapName} {lockComponent}</h3>
      <CompositionSelect 
        compOption={compOption}
      />
    </div>
  )
}

MapSelect.defaultProps = {
  mapName: "map not selected"
}

export default MapSelect