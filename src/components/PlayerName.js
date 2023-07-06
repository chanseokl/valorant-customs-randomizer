import React, {useState} from 'react'
import { MdCancel } from 'react-icons/md'
import { useDraggable, useDndMonitor }  from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const PlayerName = ({ 
  name, 
  id,
  removePlayer,
  addPlayerNameToTeam
}) => {
  const [isDragging, setIsDragging] = useState(false)

  const {attributes, listeners, setNodeRef, transform, setActivatorNodeRef} = 
  useDraggable({
    id: {id},
    data: {
      type: 'playerName',
      name: name,
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
      <div>
        <div className='add-team-btns'>
          <button 
          onClick={() => addPlayerNameToTeam(name, true)}
          style={{backgroundColor:'darkred'}} 
          className='team-btn'>
            Attackers
          </button>
          <button 
          onClick={() => addPlayerNameToTeam(name, false)}
          style={{backgroundColor:'darkblue'}} 
          className='team-btn'>
            Defenders
          </button>
        </div>
        <MdCancel className='top-right' onClick={() => removePlayer(name)}/>
      </div>
    </div>
  )
}

PlayerName.defaultProps = {
  name: "Default Name",
  noX: false,
}

export default PlayerName