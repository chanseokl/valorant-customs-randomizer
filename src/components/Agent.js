import React from 'react'
import { MdCancel } from 'react-icons/md'
import {useDraggable, useDndMonitor}  from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'

const Agent = ({ name, /*color,*/ noX }) => {
  const {attributes, listeners, setNodeRef, transform, setActivatorNodeRef} = 
  useDraggable({
    id: {name},
    data: {
      type: 'agent',
      name: name
    }
  })
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined

  return (
    <div 
    ref={setNodeRef} style={style}
    className='Agent'>
      <img 
      alt={name}
      ref={setActivatorNodeRef} {...attributes} {...listeners} 
      className='agent-image' 
      src={require(`../assets/agents/${name}-icon.png`)} />
      {noX ? null : <MdCancel className='top-right-agent' />}
    </div>
  )
}

Agent.defaultProps = {
  name: "default",
  /*color: "#3c4348",*/
  noX: false,
}


export default Agent