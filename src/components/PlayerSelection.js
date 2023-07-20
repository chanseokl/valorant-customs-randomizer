import React, { useState, useRef } from 'react'
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
  const textInput = useRef(null)

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
    if(text.length > 600) {
      alert('Too long!')
      return
    }
    var splitted = text.split(',')
    for(const each of splitted) {
      var toCheck = each.trim()
      if(toCheck.length === 0) {
        alert('Please add a name!')
        textInput.current.focus()
        return
      }
      if(toCheck.length > 16) {
        alert('Name is too long! (16 Characters)')
        textInput.current.focus()
        return
      }
    }
    
    addPlayer(text)
    setText('')
    textInput.current.focus()
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
          ref={textInput}
          placeholder='Player Name' 
          className='player-input-text'
          value={text} 
          onChange={(e) => setText(e.target.value)}/>
          <input type='submit' value='Enter' className='player-input-btn'/>
        </form>
        <i className='separate-text'>Can add multiple names using commas</i>
        <i className='separate-text'>e.g. player1, player2, etc</i>
      </div>
    </div>
  )
}

export default PlayerSelection