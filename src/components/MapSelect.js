import React, { useState } from 'react'
import RandomizeButtons from './RandomizeButtons'
import CompositionSelect from './CompositionSelect'
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import { BsLockFill, BsUnlockFill } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'

const MapSelect = ({ 
  mapName,
  removeCurrentMap,
  toggleMapLock,
  mapLock,

  compOption,

  randomizeAll,
  randomizePlayers,
  randomizeAgents,
  randomizeMap
 }) => {
  const [dragMapName, setDragMapName] = useState(null)
  const {setNodeRef, isOver} = useDroppable({
    id: 'map-drop',
    data: {
      accepts: ['map'],
    }
  })

  useDndMonitor({
    onDragStart: (event) => {
      if(event.active.data.current.type === 'map') 
        setDragMapName(event.active.data.current.name)
    },
    onDragEnd: () => {setDragMapName(null)},
    onDragCancel: () => {setDragMapName(null)},
  })

  //changes name and classname depending on if empty name and locked
  var realMapName = mapName
  var realMapClassName = ''
  var mapOptions = ''
  if(realMapName === null) {
    realMapName = "map not selected"
    realMapClassName = 'empty-slot'
  }
  else if(!mapLock) {
    mapOptions = 
      <div>
        <BsUnlockFill className='lock-available' onClick={toggleMapLock}/>
        <MdCancel className='lock-available' onClick={removeCurrentMap}/>
      </div>
    realMapClassName = 'unlocked-slot'
  }
  else if(mapLock) {
    mapOptions = <BsLockFill className='lock-available' onClick={toggleMapLock}/>
    realMapClassName = 'locked-slot'
  }

  //changes background depending on mapName, preview, and lock
  var backgroundStyle = {}
  var canPreview = (!mapLock && dragMapName && isOver)
  if(mapName !== null || canPreview) {
    var backgroundImage = require(`../assets/maps/${canPreview ? dragMapName : mapName}.webp`)
    backgroundStyle = {
      position: 'absolute',
      top: '0px',
      bottom: '0px',
      right: '0px',
      left: '0px',
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      opacity: canPreview ? '.6' : '1'
    }
  }

  return (
    <div ref={setNodeRef} className='Map-Select'>
      <div style={backgroundStyle}/>

      <div style={{position: 'relative'}}>
        <RandomizeButtons 
          randomizeAll={randomizeAll}
          randomizePlayers={randomizePlayers}
          randomizeAgents={randomizeAgents}
          randomizeMap={randomizeMap}
        />
      </div>
      
      <div style={{position: 'relative'}} className='map-name-box'>
        <h3 className={realMapClassName}>{canPreview ? dragMapName : realMapName}</h3>
        <div style={{marginLeft: '2px'}}>{mapOptions}</div>
      </div> 

      <div style={{position: 'relative'}}>
        <CompositionSelect
          style={{position: 'relative'}} 
          compOption={compOption}
        />
      </div>
    </div>
  )
}

MapSelect.defaultProps = {
  mapName: "map not selected"
}

export default MapSelect