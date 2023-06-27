import React, {useState} from 'react'
import Map from './Map'
import {useDroppable, DragOverlay, useDndMonitor} from '@dnd-kit/core';

const MapSelection = () => {
  const [activeId, setActiveId] = useState(null);
  const {setNodeRef} = useDroppable({
    id: 'removed-map',
    data: {
      accepts: ['map'],
    },
  })

  var data = require('../lists/map-list.json')
  var mapList = data.list
  
  useDndMonitor({
    onDragStart: (event) => {setActiveId(event.active.id);},
    onDragEnd: (event) => {setActiveId(null);},
  })

  return (
    <div className='Map-Selection'>
      <div className='map-collection'>
        {mapList.map((mapName) => 
          <Map 
          id={mapName}
          key={mapName} 
          name={mapName}/>)}
      </div>

      <DragOverlay>
        {activeId ? (
          <Map name={activeId.name} noX={true}/>
        ) : null}
      </DragOverlay>
      
      <div className='remove'>
        <label>Remove Maps</label>
        <div ref={setNodeRef} className='removed'>
        </div>
      </div>
    </div>
  )
}

export default MapSelection