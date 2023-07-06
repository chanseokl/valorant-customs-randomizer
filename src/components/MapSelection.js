import React, {useState} from 'react'
import Map from './Map'
import {useDroppable, DragOverlay, useDndMonitor} from '@dnd-kit/core';

const MapSelection = ({
  mapList,
  mapsRemoved,
  removeMapSelection,
  addMap,
}) => {
  const [activeDragData, setActiveDragData] = useState(null);
  const {setNodeRef: setFirstDroppableRef, isOver: isOverSelection} = useDroppable({
    id: 'map-selection',
    data: {
      accepts: ['map'],
    },
  })
  const {setNodeRef: setSecondDroppableRef, isOver: isOverRemoved} = useDroppable({
    id: 'removed-map',
    data: {
      accepts: ['map'],
    },
  })

  useDndMonitor({
    onDragStart: (event) => {
      if(event.active.data.current.type === 'map')
        setActiveDragData(event.active.data.current)
    },
    onDragEnd: () => {setActiveDragData(null);},
    onDragCancel: () => {setActiveDragData(null);},
  })

  const demo = (isPreview) => {
    return (
    <div className={'Map' + (isPreview ? ' half-visible' : '') }>
      <img src={require(`../assets/maps/${activeDragData.name}.webp`)}/>
      <div className='centered'>{activeDragData.name}</div>
    </div>)
  }

  return (
    <div className='Map-Selection'>
      <div ref={setFirstDroppableRef} className='map-collection'>
        {(activeDragData && activeDragData.isRemoved && isOverSelection) ? demo(true) : null}
        {mapList.map((mapName) => 
          <Map 
            id={'map:' + mapName}
            key={'map:' + mapName} 
            name={mapName}
            removeMapSelection={removeMapSelection}
            addMap={addMap}
          />
        )}
      </div>
      <DragOverlay>
        {activeDragData ? demo(false) : null}
      </DragOverlay>
      <div ref={setSecondDroppableRef} className='remove-map'>
        <label>Remove Maps</label>
        <div className='removed'>
          {(activeDragData && !activeDragData.isRemoved && isOverRemoved) ? demo(true) : null}
          {mapsRemoved.map((mapName) => 
            <Map 
              id={'mapremoved:' + mapName}
              key={'mapremoved:' + mapName} 
              name={mapName}
              isRemoved={true}
              removeMapSelection={removeMapSelection}
              addMap={addMap}/>)}
        </div>
      </div>
    </div>
  )
}

export default MapSelection