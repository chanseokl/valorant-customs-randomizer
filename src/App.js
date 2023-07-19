import './App.css';
import React, { useState } from 'react';
import MainSelection from './components/MainSelection';
import SubSelection from './components/SubSelection';
import { DndContext } from '@dnd-kit/core';

function App() {
  var mapDataList = require('./lists/map-list.json').list
  const agentDataObject = require('./lists/agent-list.json')
  var agentsRemovedData = {}
  var agentClassDict = {}
  //create empty array to keep track of removed agents and classes
  for (const aClass in agentDataObject) {
    agentsRemovedData[aClass] = []
    agentDataObject[aClass].forEach((aName) => agentClassDict[aName] = aClass)
  }

  const [dragObject, setDragObject] = useState(null)

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

  const[mapName, setMapName] = useState(null)
  const[mapLock, setMapLock] = useState(false);

  const[compOption, setCompOption] = useState("random")

  /* Sub Selection */
  const [playerNames, setPlayerNames] = useState([])

  const [agentList, setAgentList] = useState(agentDataObject)
  const [agentsRemoved, setAgentsRemoved] = useState(agentsRemovedData)

  const [mapList, setMapList] = useState(mapDataList)
  const [mapsRemoved, setMapsRemoved] = useState([])

  
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

  //removes the currently selected map, adds back to selection
  const removeCurrentMap = () => {
    if(mapName !== null) {
      setMapList([mapName, ...mapList])
      setMapName(null)
    }
  }
  //adds map to currently selected map
  const addMap = (mapN) => {
    if(mapLock) alert('Map is currently locked!')
    else {
      var newMapList = [...mapList]
      if(mapName !== null)
        newMapList = [mapName, ...newMapList]
      if(mapList.includes(mapN))
        setMapList(newMapList.filter((mapNa) => mapNa !== mapN))
      else if(mapsRemoved.includes(mapN))
        setMapsRemoved(newMapList.filter((mapNa) => mapNa !== mapN))
      setMapName(mapN)
    }
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

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  //Randomizes everything that is not locked
  const randomizeAll = () => {
    randomizePlayers()
    randomizeAgents()
    randomizeMap()
  }
  //Randomizes players that are not locked
    //TODO what if less than 10 players? allow for 4v4, 4v3, etc
    //How to play around which team gets which numbers, locked players, etc
    //what if teamlock, that entire team is locked
  const randomizePlayers = () => {
    //gets all available players to be randomized
    var available = playerNames.concat(
      attackPlayers.filter((x, i) => (!attackTeamLock && x!= null && !attackPlayersLocks[i])).concat(
      defensePlayers.filter((x, i) => (!defenseTeamLock && x!= null && !defensePlayersLocks[i]))))
    if(available.length === 0) {
      alert("There are no players!")
      return
    }
    //gets random player from available, removes player, and returns
    const getAndRemovePlayer = () => {
      let res = available[getRandomInt(available.length)]
      available = available.filter(x => x !== res)
      return res
    }

    var attackPlayerTotal = 0
    var defensePlayerTotal = 0
    var attackPClone = [...attackPlayers]
    var defensePClone = [...defensePlayers]

    for(let i = 0; i < 5; i++) {
      if(attackTeamLock) attackPlayerTotal++
      else {
        if(attackPlayersLocks[i]) attackPlayerTotal++
        else attackPClone[i] = null
      }

      if(defenseTeamLock) defensePlayerTotal++
      else {
        if(defensePlayersLocks[i]) defensePlayerTotal++
        else defensePClone[i] = null
      }
    }

    while(available.length > 0 && (attackPlayerTotal + defensePlayerTotal < 10)) {
      var isAttack = attackPlayerTotal === defensePlayerTotal ? 
        (getRandomInt(2) === 0) : (attackPlayerTotal < defensePlayerTotal)
      var curSide = isAttack ? attackPClone : defensePClone
      if(isAttack) attackPlayerTotal++
      else defensePlayerTotal++
      const addIndex = curSide.indexOf(null)
      curSide[addIndex] = getAndRemovePlayer()
    }

    setAttackPlayers(attackPClone)
    setDefensePlayers(defensePClone)
    setPlayerNames(available)
  }
  //Randomizes agents that are not locked
  const randomizeAgents = () => {
    var compAttackArray = []
    var compDefenseArray = []
    //Composition is completely random
    if(compOption === 'random') {
      compAttackArray = ['r', 'r', 'r', 'r', 'r']
      compDefenseArray = ['r', 'r', 'r', 'r', 'r']
    }
    //Completely random, except at least one smoke on each team
    else if(compOption === 'oneSmoke') {
      compAttackArray = ['controllers', 'r', 'r', 'r', 'r']
      compDefenseArray = ['controllers', 'r', 'r', 'r', 'r']
    }
    //1 of each role, except for 2 duelists
    else if(compOption === 'balanced') {
      compAttackArray = ['controllers', 'sentinels', 'initiators', 'duelists', 'duelists']
      compDefenseArray = ['controllers', 'sentinels', 'initiators', 'duelists', 'duelists']
    }
    //Allows user to pick what roles to pick for each thing
    else if(compOption === 'custom') {

    }
    else if(compOption === 'tdm') {} //Not sure how this is relevant, think about later
    else if(compOption === 'best') {} //TBD, look up map comps and see what is good

    //Object that shows which agents are available in which class
    var attackAvailable = JSON.parse(JSON.stringify(agentList))
    var defenseAvailable = JSON.parse(JSON.stringify(agentList))
    var attackAClone = [...attackAgents]
    var defenseAClone = [...defenseAgents]
    const ranAgents = (teamLock, compArray, agentsLocks, available, aClone) => {
      //goes through team and sees who is locked, to get rid of that from what is available
      for(let i = 0; i < 5; i++) {
        if(!teamLock && agentsLocks[i]) {
          const curAgentClass = agentClassDict[aClone[i]]
          const classIndex = compArray.indexOf(curAgentClass) 
          if(classIndex === -1) {
            const rIndex = compArray.indexOf('r') 
            if(rIndex !== -1) compArray = compArray.filter((c, i) => i !== rIndex)
          }
          else compArray = compArray.filter((c, i) => i !== classIndex)
          available[curAgentClass] = 
            available[curAgentClass].filter((aName) => aName !== aClone[i])
        }
      }
      //Counts total number of agents to be able to grab random one
      var totalAgents = Object.keys(available).reduce((a, c) => a + available[c].length, 0)

      //Loop through team again to place random agents
      for(let i = 0; i < 5; i++) {
        if(!teamLock && !agentsLocks[i]) {
          //Grabs and removes random class from compArray
          const ranClassIndex = getRandomInt(compArray.length)
          var ranClass = compArray[ranClassIndex]
          compArray = compArray.filter((c, i) => i !== ranClassIndex)
          //If no more available agents from class, changes to random agent
          if(available[ranClass] === 0) ranClass = 'r'
          //If random, chooses random agent from all of the list
          if(ranClass === 'r') {
            var ranTotalIndex = getRandomInt(totalAgents)
            //Looping through each class to find which index it lands on
            for(const key of Object.keys(available)) {
              if(ranTotalIndex >= available[key].length) ranTotalIndex -= available[key].length
              else {
                aClone[i] = available[key][ranTotalIndex]
                available[key] = available[key].filter((c, j) => j !== ranTotalIndex)
                break;
              }
            }
          }
          //Else, grabs random agent from the available agents from that class
          else {
            const ranAgentIndex = getRandomInt(available[ranClass].length)
            aClone[i] = available[ranClass][ranAgentIndex]
            available[ranClass] = available[ranClass].filter((c, j) => j !== ranAgentIndex)
          }
          totalAgents--;
        }
      }
    }

    ranAgents(attackTeamLock, compAttackArray, attackAgentsLocks, attackAvailable, attackAClone)
    ranAgents(defenseTeamLock, compDefenseArray, defenseAgentsLocks, defenseAvailable, defenseAClone)
    setAttackAgents(attackAClone)
    setDefenseAgents(defenseAClone)
  }
  //Randomizes the map if not locked
  const randomizeMap = () => {
    if(mapLock) {
      alert("Map is locked!")
      return
    }
    addMap(mapList[getRandomInt(mapList.length)])
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
  const addPlayerNameToTeam = (playerName, isAttack, num = undefined) => {
    var curTeam = isAttack ? [...attackPlayers] : [...defensePlayers]
    var curSetTeam = isAttack ? setAttackPlayers : setDefensePlayers
    var curTeamLock = isAttack ? attackTeamLock : defenseTeamLock
    var curPlayersLocks = isAttack ? attackPlayersLocks : defensePlayersLocks

    if(curTeamLock) {
      alert("Team is locked!")
      return
    }

    if(num !== undefined) {
      if(curPlayersLocks[num]) {
        alert("Player Slot is locked!")
        return
      }
      if(curTeam[num] !== null)
        setPlayerNames([curTeam[num], ...playerNames])
      curTeam[num] = playerName
      curSetTeam(curTeam)
      removePlayerSelection(playerName)
    }
    else {
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
  }

  //Adds agent to given slot
  const addAgentToTeam = (agentName, isAttack, num) => {
    var curTeam = isAttack ? [...attackAgents] : [...defenseAgents]
    var curSetTeam = isAttack ? setAttackAgents : setDefenseAgents
    var curTeamLock = isAttack ? attackTeamLock : defenseTeamLock
    var curAgentsLocks = isAttack ? attackAgentsLocks : defenseAgentsLocks
    
    if(curTeamLock) {
      alert("Team is locked!")
      return
    }
    if(curAgentsLocks[num]) {
      alert("Agent Slot is locked!")
      return
    }
    if(curTeam.includes(agentName)) {
      alert("Team already contains agent!")
      return
    }

    curTeam[num] = agentName
    curSetTeam(curTeam)
  }

  /*Agent Selection*/
  const removeAgentSelection = (isRemoved, name) => {
    //receives the class the agent belongs in
    var agentClass = ''
    Object.keys(agentDataObject).forEach((curAgentClass) => {
      if(agentDataObject[curAgentClass].includes(name))
        agentClass = curAgentClass
    })

    //adds/removes based on if agent is added/removed
    var clonedFull = JSON.parse(JSON.stringify(agentList))
    var clonedRemoved = JSON.parse(JSON.stringify(agentsRemoved))
    if(isRemoved) {
      clonedRemoved[agentClass] = clonedRemoved[agentClass].filter((agentN) => agentN !== name)
      setAgentsRemoved(clonedRemoved)
      clonedFull[agentClass] = [name, ...clonedFull[agentClass]]
      setAgentList(clonedFull)
    }
    else {
      clonedFull[agentClass] = clonedFull[agentClass].filter((agentN) => agentN !== name)
      setAgentList(clonedFull)
      clonedRemoved[agentClass] = [name, ...clonedRemoved[agentClass]]
      setAgentsRemoved(clonedRemoved)
    }
  }

  /*Map Selection*/
  const removeMapSelection = (isRemoved, name) => {
    if(isRemoved) {
      setMapsRemoved(mapsRemoved.filter((mapN) => mapN !== name))
      setMapList([name, ...mapList])
    }
    else {
      setMapList(mapList.filter((mapN) => mapN !== name))
      setMapsRemoved([name, ...mapsRemoved])
    }
  }

  //currently, all this does is get the drag object as a state
  const handleDragStart = (event) => {
    setDragObject(event.active)
  }
  //unsure if this will be used for anything
  const handleDragOver = (event) => {
  }
  //Meat of the program, when drag ends, changes states depending on drag state object, and over
  const handleDragEnd = (event) => {
    const {over} = event
    
    //checks if droppable accepts the drag type
    if(over && over.data.current.accepts.includes(dragObject.data.current.type)) {
      //drag type is map
      //Possible actions are to drop into map select, selection, or removed
      if(dragObject.data.current.type === 'map') {
        if(over.id === 'map-drop')
          addMap(dragObject.data.current.name)
        else if(!dragObject.data.current.isRemoved && over.id === 'removed-map')
          removeMapSelection(false, dragObject.data.current.name)
        else if(dragObject.data.current.isRemoved && over.id === 'map-selection')
          removeMapSelection(true, dragObject.data.current.name)
      }
      //drag type is agent
      //Possible actions are to drop into player slot, agent selection, agent removed
      else if(dragObject.data.current.type === 'agent') {
        if(dragObject.data.current.isRemoved && over.id === 'agent-selection') {
          removeAgentSelection(true, dragObject.data.current.name)
        }
        else if(!dragObject.data.current.isRemoved && over.id === 'removed-agent'){
          removeAgentSelection(false, dragObject.data.current.name)
        }
        //if nothing else, has to be over player slot
        else {
          addAgentToTeam(dragObject.data.current.name, over.data.current.isAttack, over.data.current.num)
        }
      }
      //drag type is player name
      //Possible actions are just to drop into player slot
      else if(dragObject.data.current.type === 'playerName') {
        addPlayerNameToTeam(dragObject.data.current.name, over.data.current.isAttack, over.data.current.num)
      }
    }
    setDragObject(null)
  }

  const handleDragCancel = (event) => {
    setDragObject(null)
  }

  return (
    <div 
    className='App'>
      <DndContext 
        onDragStart={handleDragStart} 
        onDragOver={handleDragOver} 
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
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
          removeCurrentMap={removeCurrentMap}
          toggleMapLock={toggleMapLock}
          mapLock={mapLock}

          compOption={compOption}
          changeComp={onCompOptionClick}
          
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

          agentList={agentList}
          agentsRemoved={agentsRemoved}
          removeAgentSelection={removeAgentSelection}

          mapList={mapList}
          mapsRemoved={mapsRemoved}
          removeMapSelection={removeMapSelection}
          addMap={addMap}
        />
      </DndContext>
    </div>
  );
}

export default App;
