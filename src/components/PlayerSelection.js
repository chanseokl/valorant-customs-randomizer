import React, {useState} from 'react'
import PlayerName from './PlayerName'
import {DragOverlay, useDndMonitor} from '@dnd-kit/core';

const PlayerSelection = ({ 
  playerNames, 
  addPlayer,
  removePlayer, 
  addPlayerNameToTeam,
}) => {
  const [activeId, setActiveId] = useState(null);
  const [text, setText] = useState('')

  useDndMonitor({
    onDragStart: (event) => {setActiveId(event.active.id);},
    onDragEnd: (event) => {setActiveId(null);},
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if(!text) {
      alert('Please add a name!')
      return
    }
    addPlayer(text)
    setText('')
  }
  
  return (
    <div className='Player-Selection'>
      <div className='player-names'>
        {playerNames.map((playerName) => 
          <PlayerName 
            name={playerName}
            key={playerName}
            removePlayer={removePlayer}
            addPlayerNameToTeam={addPlayerNameToTeam}
          />
          )}
      </div>

      <DragOverlay>
        {activeId ? (
          <PlayerName name={activeId.name} noX={true} key={activeId.name}/>
        ) : null}
      </DragOverlay>

      <div className='player-input'>
        <label className='player-input-label'>Add Player</label>
        <form onSubmit={onSubmit}>
          <input 
          type='text' 
          placeholder='Player Name' 
          className='player-input-text'
          value={text} 
          onChange={(e) => setText(e.target.value)}/>
          <input type='submit' value='Add' className='player-input-btn'/>
        </form>
      </div>
    </div>
  )
}

export default PlayerSelection