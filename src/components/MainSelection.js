import React from 'react'
import MapSelect from './MapSelect';
import Team from './Team';

const MainSelection = ({
  removeChoice,
  attackPlayers,
  defensePlayers,
  attackAgents,
  defenseAgents,
  
  toggleTeamLock,
  attackTeamLock,
  defenseTeamLock,
  toggleChoiceLock,
  attackPlayersLocks,
  defensePlayersLocks,
  attackAgentsLocks,
  defenseAgentsLocks,

  mapName,
  removeCurrentMap,
  toggleMapLock,
  mapLock,

  compOption,
  changeComp,

  randomizeAll,
  randomizePlayers,
  randomizeAgents,
  randomizeMap,
  randomizePlayer,
  randomizeAgent,
}) => {
  return (
    <div className='Main-Selection'>
      <Team 
        isAttack={true}
        toggleTeamLock={toggleTeamLock}
        teamLock={attackTeamLock}
        removeChoice={removeChoice}
        players={attackPlayers}
        toggleChoiceLock={toggleChoiceLock}
        playersLocks={attackPlayersLocks}
        agents={attackAgents}
        agentsLocks={attackAgentsLocks}
        randomizePlayer={randomizePlayer}
        randomizeAgent={randomizeAgent}
      />

      <MapSelect 
        mapName={mapName}
        removeCurrentMap={removeCurrentMap}
        toggleMapLock={toggleMapLock}
        mapLock={mapLock}
        compOption={compOption}
        changeComp={changeComp}
        randomizeAll={randomizeAll}
        randomizePlayers={randomizePlayers}
        randomizeAgents={randomizeAgents}
        randomizeMap={randomizeMap}
      />

      <Team 
        isAttack={false} 
        toggleTeamLock={toggleTeamLock}
        teamLock={defenseTeamLock}
        removeChoice={removeChoice}
        players={defensePlayers}
        toggleChoiceLock={toggleChoiceLock}
        playersLocks={defensePlayersLocks}
        agents={defenseAgents}
        agentsLocks={defenseAgentsLocks}
        randomizePlayer={randomizePlayer}
        randomizeAgent={randomizeAgent}
      />
    </div>
  )
}

export default MainSelection