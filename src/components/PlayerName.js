import React, {useState} from 'react'
import { MdCancel } from 'react-icons/md'
import {useDraggable, useDndMonitor}  from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'

const PlayerName = ({ 
  name, 
  removePlayer,
  addPlayerNameToTeam,
  noX 
}) => {
  const [isDragging, setIsDragging] = useState(false)

  const {attributes, listeners, setNodeRef, transform, setActivatorNodeRef} = 
  useDraggable({
    id: {name},
    data: {
      type: 'playerName',
      name: name,
    }
  })
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined

  useDndMonitor({
    onDragStart: (event) => {
      console.log(event)
      if(event.active.data.current.type === 'playerName' && 
      event.active.data.current.name === name && 
      !noX) {
        console.log('what the real')
        setIsDragging(true)
      }},
    onDragEnd: (event) => {
      console.log(event)
      if(event.active.data.current.type === 'playerName' && 
      event.active.data.current.name === name && 
      !noX) {
        setIsDragging(false)
      }},
  })

  var playerClassName = ''
  if(isDragging) {
    playerClassName='Player-Name invisible'
  }
  else if(!isDragging){
    playerClassName='Player-Name'
  }

  return (
    <div 
    ref={setNodeRef} style={style}
    className={playerClassName}>
      <div className='player-name-text'
      ref={setActivatorNodeRef} {...attributes} {...listeners}>
        {name}
      </div>
      {noX ? null :
      (<div>
        <div className='add-team-btns'>
          <button 
          onClick={() => addPlayerNameToTeam(name, "attackers")}
          style={{backgroundColor:'darkred'}} 
          className='team-btn'>
            Attackers
          </button>
          <button 
          onClick={() => addPlayerNameToTeam(name, "defenders")}
          style={{backgroundColor:'darkblue'}} 
          className='team-btn'>
            Defenders
          </button>
        </div>
        <MdCancel className='top-right' onClick={() => removePlayer(name)}/>
      </div>)
      }
    </div>
  )
}

PlayerName.defaultProps = {
  name: "Default Name",
  noX: false,
}

export default PlayerName