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
  //Create empty array to keep track of removed agents and classes
  //Also creates dictionary to map each agent to their class
  for (const aClass in agentDataObject) {
    agentsRemovedData[aClass] = []
    agentDataObject[aClass].forEach((aName) => agentClassDict[aName] = aClass)
  }

  //State used to track the currently dragging object
  const [dragObject, setDragObject] = useState(null)

  /* Main Selection */
  //Keeps track of the players in each team
  const [attackPlayers, setAttackPlayers] = useState([null, null, null, null, null])
  const [defensePlayers, setDefensePlayers] = useState([null, null, null, null, null])

  //Keeps track of the agents in each team
  const [attackAgents, setAttackAgents] = useState([null, null, null, null, null])
  const [defenseAgents, setDefenseAgents] = useState([null, null, null, null, null])

  //Keeps track of the locks that can be on or off
  const [attackTeamLock, setAttackTeamLock] = useState(false)
  const [defenseTeamLock, setDefenseTeamLock] = useState(false)
  const [attackPlayersLocks, setAttackPlayersLocks] = useState([false, false, false, false, false])
  const [defensePlayersLocks, setDefensePlayersLocks] = useState([false, false, false, false, false])
  const [attackAgentsLocks, setAttackAgentsLocks] = useState([false, false, false, false, false])
  const [defenseAgentsLocks, setDefenseAgentsLocks] = useState([false, false, false, false, false])

  //Keeps track of map information
  const[mapName, setMapName] = useState(null)
  const[mapLock, setMapLock] = useState(false);

  //Keeps track of currently selected composition
  const[compOption, setCompOption] = useState("random")

  /* Sub Selection */
  //List of all player names added by user
  const [playerNames, setPlayerNames] = useState([])

  //List of all agents separated by classes, also ones removed by user
  const [agentList, setAgentList] = useState(agentDataObject)
  const [agentsRemoved, setAgentsRemoved] = useState(agentsRemovedData)

  //List of all maps, also ones removed by user
  const [mapList, setMapList] = useState(mapDataList)
  const [mapsRemoved, setMapsRemoved] = useState([])

  
  /*===============
   Main Selection
  ===============*/

  //Removes either player or agent from player slot. If player, adds back to selection
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
      compDefenseArray = [...compAttackArray]
    }
    //Completely random, except at least one smoke on each team
    else if(compOption === 'oneSmoke') {
      compAttackArray = ['controllers', 'r', 'r', 'r', 'r']
      compDefenseArray = [...compAttackArray]
    }
    //1 of each role + 1 random class
    else if(compOption === 'balanced') {
      compAttackArray = ['controllers', 'sentinels', 'initiators', 'duelists', 'r']
      compDefenseArray = [...compAttackArray]
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
    const ranAgents = (teamLock, compArray, agentsLocks, available, aClone, sideName) => {
      var numLocked = 0
      //goes through team and sees who is locked, to get rid of that from what is available
      for(let i = 0; i < 5; i++) {
        if(!teamLock && agentsLocks[i]) {
          numLocked++
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

      if(totalAgents + numLocked < 5) {
        alert('Not enough agents available for ' + sideName + ' side!')
        return
      }

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
                //Weird code to avoid warning with ranTotalIndex being outside local scope
                const curIndex = ranTotalIndex
                aClone[i] = available[key][curIndex]
                available[key] = available[key].filter((c, j) => j !== curIndex)
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

    ranAgents(attackTeamLock, compAttackArray, attackAgentsLocks, attackAvailable, attackAClone, 'Attack')
    ranAgents(defenseTeamLock, compDefenseArray, defenseAgentsLocks, defenseAvailable, defenseAClone, 'Defense')
    setAttackAgents(attackAClone)
    setDefenseAgents(defenseAClone)
  }
  //Randomizes the map if not locked
  const randomizeMap = () => {
    if(mapLock) {
      alert("Map is locked!")
      return
    }
    if(mapList.length === 0) {
      alert('No maps left!')
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
    var toAdd = [...playerNames]
    var splitted = playerName.split(',')
    var dupeAlert = false

    for(const each of splitted) {
      var trimmed = each.trim()
      if(toAdd.length > 25){
        alert('Too many names!')
        break
      }
      else if(!attackPlayers.includes(trimmed) &&
        !defensePlayers.includes(trimmed) &&
        !toAdd.includes(trimmed)) 
          toAdd = [...toAdd, trimmed]
      else dupeAlert = true
    }

    if(dupeAlert) alert('No duplicate names!')

    setPlayerNames(toAdd)
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
      //Weird setup with this bc doesn't set playerNames correctly when calling function and setting
      var toSetNames = [...playerNames]
      if(curTeam[num] !== null) toSetNames = [curTeam[num], ...toSetNames]
      curTeam[num] = playerName
      curSetTeam(curTeam)
      setPlayerNames(toSetNames.filter((playerN) => playerN !== playerName))
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
