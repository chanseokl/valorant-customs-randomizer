import React, { useState, useEffect } from 'react'
import { MdCancel } from 'react-icons/md'
import { IoArrowUndoCircleSharp } from 'react-icons/io5'
import { useDraggable, useDndMonitor } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const Map = ({ 
  name, 
  id, 
  isRemoved, 
  removeMapSelection,
  addMap,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const {attributes, listeners, setNodeRef, transform, setActivatorNodeRef} = 
  useDraggable({
    id: {id},
    data: {
      type: 'map',
      name: name,
      isRemoved: isRemoved,
    }
  })
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined

  useDndMonitor({
    onDragStart: (event) => {if(event.active.id.id === id) setIsDragging(true)},
    onDragEnd: (event) => {if(event.active.id.id === id) setIsDragging(false)},
    onDragCancel: (event) => {if(event.active.id.id === id) setIsDragging(false)},
  })

  var mapClassName = ''
  if(isDragging) {
    mapClassName='Map invisible'
  }
  else if(!isDragging){
    mapClassName='Map'
  }
  return (
    <div
      ref={setNodeRef} style={style}
      className={mapClassName}>
      <div 
        ref={setActivatorNodeRef}
        className='Map-relative'>
        <img 
          {...attributes} {...listeners} 
          alt={name} 
          src={require(`../assets/maps/${name}.webp`)}
        />
        <div className='centered'>
          <div {...attributes} {...listeners} >
            {name}
          </div> 
          <button 
            className='team-btn' 
            style={{backgroundColor:'darkgray'}}
            onClick={() => addMap(name)}>
              Select
          </button>
        </div>
      </div>
      {isRemoved ? 
        <IoArrowUndoCircleSharp className='top-right' onClick={() => removeMapSelection(isRemoved, name)}/> : 
        <MdCancel className='top-right' onClick={() => removeMapSelection(isRemoved, name)}/>}
    </div>
  )
}

Map.defaultProps = {
  name: "default",
  isRemoved: false,
}

export default Map