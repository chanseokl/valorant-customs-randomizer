import './App.css';
import React, {useState} from 'react';
import MainSelection from './components/MainSelection';
import SubSelection from './components/SubSelection';
import {DndContext} from '@dnd-kit/core';

function App() {
  /* Main Selection */
  const [attackPlayers, setAttackPlayers] = useState([null, null, null, null, null])
  const [defensePlayers, setDefensePlayers] = useState([null, null, null, null, null])

  const [attackAgents, setAttackAgents] = useState([null, null, null, null, null])
  const [defenseAgents, setDefenseAgents] = useState([null, null, null, null, null])

  const [attackTeamLock, setAttackTeamLock] = useState(false)
  const [defenseTeamLock, setDefenseTeamLock] = useState(false)
  const [attackPlayersLocks, setAttackPlayersLocks] = useState([false, false, false, false, false])
  const [defensePlayersLocks, setDefensePlayersLocks] = useState([false, false, false, false, false])
  const [attackAgentsLocks, setAttackAgentsLocks] = useState([false, false, false, false, false])
  const [defenseAgentsLocks, setDefenseAgentsLocks] = useState([false, false, false, false, false])

  const[mapName, setMapName] = useState(undefined)
  const[mapLock, setMapLock] = useState(false);

  const[compOption, setCompOption] = useState("Random")

  /* Sub Selection */
  const [playerNames, setPlayerNames] = useState([])

  const [agentSelection, setAgentSelection] = useState([])
  const [agentRemoved, setAgentRemoved] = useState([])

  const [mapSelection, setMapSelection] = useState([])
  const [mapRemoved, setMapRemoved] = useState([])

  
  /*===============
   Main Selection
  ===============*/

  //Removes either player or agent from player slot, if player adds back to selection
  const removeChoice = (isAttack, num, isPlayer) => {
    if(isAttack && isPlayer) {
      setPlayerNames([...playerNames, attackPlayers[num]])
      setAttackPlayers(attackPlayers.map((item, i) => i === num ? null : item))
    }
    else if(isAttack && !isPlayer) 
      setAttackAgents(attackAgents.map((item, i) => i === num ? null : item))
    else if(!isAttack && isPlayer) {
      setPlayerNames([...playerNames, defensePlayers[num]])
      setDefensePlayers(defensePlayers.map((item, i) => i === num ? null : item))
    }
    else if(!isAttack && !isPlayer) 
      setDefenseAgents(defenseAgents.map((item, i) => i === num ? null : item))
  }

  /*Locks*/
  const toggleTeamLock = (isAttack) => {
    if(isAttack)
      setAttackTeamLock(!attackTeamLock)
    else
      setDefenseTeamLock(!defenseTeamLock)
  }
  //Toggles either player or agent lock in player slot
  const toggleChoiceLock = (isAttack, num, isPlayer) => {
    if(isAttack && isPlayer) 
      setAttackPlayersLocks(attackPlayersLocks.map((item, i) => i === num ? !item : item))
    else if(isAttack && !isPlayer) 
      setAttackAgentsLocks(attackAgentsLocks.map((item, i) => i === num ? !item : item))
    else if(!isAttack && isPlayer) 
      setDefensePlayersLocks(defensePlayersLocks.map((item, i) => i === num ? !item : item))
    else if(!isAttack && !isPlayer) 
      setDefenseAgentsLocks(defenseAgentsLocks.map((item, i) => i === num ? !item : item))
  }
  const toggleMapLock = () => {
    setMapLock(!mapLock)
  }

  /* Buttons */
  //Randomizes everything that is not locked
  const randomizeAll = () => {

  }
  //Randomizes players that are not locked
  const randomizePlayers = () => {

  }
  //Randomizes agents that are not locked
  const randomizeAgents = () => {

  }
  //Randomizes the map if not locked
  const randomizeMap = () => {
  }

  /* Team Composition */
  //Sets the composition option when clicked
  //TODO: Need to implement different dropdown to allow for state change
  const onCompOptionClick = (newCompOption) => {
    setCompOption(newCompOption)
  }
  
  /*============
  Sub Selection 
  ============*/
  
  /*Player Selection*/
  //Adds new player to the Player Selection
  const addPlayerSelection = (playerName) => {
    if(!attackPlayers.includes(playerName) &&
      !defensePlayers.includes(playerName) &&
      !playerNames.includes(playerName)) {
        setPlayerNames([...playerNames, playerName])
    }
    else {
      alert('No duplicate names!')
    }
  }
  //Removes a player from the player Selection
  const removePlayerSelection = (playerName) => {
    setPlayerNames(playerNames.filter((playerN) => playerN !== playerName))
  }
  //Adds a player to the respective team(if able), then removes player from selection
  const addPlayerNameToTeam = (playerName, team) => {
    var curTeam = [...defensePlayers]
    var curSetTeam = setDefensePlayers

    if(team === 'attackers') {
      var curTeam = [...attackPlayers]
      var curSetTeam = setAttackPlayers
    }

    for(let i = 0; i < curTeam.length; i++) {
      if(curTeam[i] === null) {
        curTeam[i] = playerName;
        curSetTeam(curTeam)
        removePlayerSelection(playerName)
        return
      }
    }
    alert("No empty spots!")
  }

  /*Agent Selection*/
  const removeAgentSelection = () => {
  }

  /*Map Selection*/
  const removeMapSelection = () => {
  }

  return (
    <div 
    className='App'>
      <DndContext>
        <MainSelection 
          removeChoice={removeChoice}
          attackPlayers={attackPlayers}
          defensePlayers={defensePlayers}
          attackAgents={attackAgents}
          defenseAgents={defenseAgents}

          toggleTeamLock={toggleTeamLock}
          attackTeamLock={attackTeamLock}
          defenseTeamLock={defenseTeamLock}
          toggleChoiceLock={toggleChoiceLock}
          attackPlayersLocks={attackPlayersLocks}
          defensePlayersLocks={defensePlayersLocks}
          attackAgentsLocks={attackAgentsLocks}
          defenseAgentsLocks={defenseAgentsLocks}

          mapName={mapName}
          toggleMapLock={toggleMapLock}
          mapLock={mapLock}

          compOption={compOption}
          onCompOptionClick={onCompOptionClick}
          
          randomizeAll={randomizeAll}
          randomizePlayers={randomizePlayers}
          randomizeAgents={randomizeAgents}
          randomizeMap={randomizeMap}
        />

        <SubSelection 
          playerNames={playerNames}
          addPlayer={addPlayerSelection}
          removePlayer={removePlayerSelection}
          addPlayerNameToTeam={addPlayerNameToTeam}

          removeAgent={removeAgentSelection}
          removeMap={removeMapSelection}
        />
      </DndContext>
    </div>
  );
}

export default App;
