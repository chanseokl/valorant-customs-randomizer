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
  toggleMapLock,
  mapLock,

  compOption,

  randomizeAll,
  randomizePlayers,
  randomizeAgents,
  randomizeMap,
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
      />

      <MapSelect 
        mapName={mapName}
        toggleMapLock={toggleMapLock}
        mapLock={mapLock}
        compOption={compOption}
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
      />
    </div>
  )
}

export default MainSelection