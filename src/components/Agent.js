import React from 'react'
import { MdCancel } from 'react-icons/md'
import { IoArrowUndoCircleSharp } from 'react-icons/io5'
import {useDraggable, useDndMonitor}  from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'

const Agent = ({
  name, 
  id, 
  isRemoved,
  agentClass,
  removeAgentSelection,
  /*color,*/
}) => {
  const {attributes, listeners, setNodeRef, transform, setActivatorNodeRef} = 
  useDraggable({
    id: {id},
    data: {
      type: 'agent',
      name: name,
      isRemoved: isRemoved,
      agentClass: agentClass
    }
  })
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined

  return (
    <div 
    ref={setNodeRef} style={style}
    className='Agent agent-outline'>
      <img 
        alt={name}
        ref={setActivatorNodeRef} {...attributes} {...listeners} 
        className='agent-image' 
        src={require(`../assets/agents/${name}-icon.png`)} 
      />
      {isRemoved ? 
        <IoArrowUndoCircleSharp className='top-right' 
          onClick={() => removeAgentSelection(isRemoved, name)}/> : 
        <MdCancel className='top-right' 
          onClick={() => removeAgentSelection(isRemoved, name)}/>}
    </div>
  )
}

Agent.defaultProps = {
  name: "empty",
  /*color: "#3c4348",*/
  isRemoved: false,
}


export default Agent