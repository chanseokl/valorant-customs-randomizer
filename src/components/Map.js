import React from 'react'
import { MdCancel } from 'react-icons/md'
import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'

const Map = ({ name, noX }) => {
  const {attributes, listeners, setNodeRef, transform, setActivatorNodeRef} = 
  useDraggable({
    id: {name},
    data: {
      type: 'map',
    }
  })
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined

  return (
    <div
    ref={setNodeRef} style={style}
    className='Map'>
      <img 
      alt={name} 
      ref={setActivatorNodeRef} {...attributes} {...listeners} 
      src={require(`../assets/maps/${name}.webp`)}/>
      <div className='centered'>{name}</div>
      {noX ? null : <MdCancel className='top-right'/>}
    </div>
  )
}

Map.defaultProps = {
  name: "default",
  noX: false,
}

export default Map