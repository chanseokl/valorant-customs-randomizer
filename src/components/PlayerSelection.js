import React, {useState} from 'react'
import PlayerName from './PlayerName'
import {DragOverlay, useDndMonitor} from '@dnd-kit/core';

const PlayerSelection = ({ 
  playerNames, 
  addPlayer,
  removePlayer, 
  addPlayerNameToTeam,
}) => {
  const [activeDrag, setActiveDrag] = useState(null);
  const [text, setText] = useState('')

  useDndMonitor({
    onDragStart: (event) => {
      if(event.active.data.current.type === 'playerName')
        setActiveDrag(event.active)
    },
    onDragEnd: () => {setActiveDrag(null);},
    onDragCancel: () => {setActiveDrag(null);},
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if(!text) {
      alert('Please add a name!')
      return
    }
    if(text.length > 16) {
      alert('Please type a name with 16 characters or less!')
      setText('') //necessary?
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
            key={'player_name:' + playerName}
            id={'player_name:' + playerName}
            removePlayer={removePlayer}
            addPlayerNameToTeam={addPlayerNameToTeam}
          />
          )}
      </div>

      <DragOverlay>
        {activeDrag ? (
          <div className='Player-Name player-name-text'>{activeDrag.data.current.name}</div>
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