import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PlayerSelection from './PlayerSelection';
import AgentSelection from './AgentSelection';
import MapSelection from './MapSelection';

const SubSelection = ({ 
  playerNames,
  addPlayer,
  removePlayer,
  addPlayerNameToTeam,
  
  agentList,
  agentsRemoved,
  removeAgentSelection,

  mapList,
  mapsRemoved,
  removeMapSelection,
  addMap,
 }) => {
  return (
    <div className="Sub-Selection">
      <Tabs>
        <TabList>
          <Tab>Players</Tab>
          <Tab>Agents</Tab>
          <Tab>Maps</Tab>
        </TabList>

        <TabPanel>
          <PlayerSelection 
            playerNames={playerNames}
            addPlayer={addPlayer} 
            removePlayer={removePlayer}
            addPlayerNameToTeam={addPlayerNameToTeam}
          />
        </TabPanel>
        <TabPanel>
          <AgentSelection 
            agentList={agentList}
            agentsRemoved={agentsRemoved}
            removeAgentSelection={removeAgentSelection}
          />
        </TabPanel>
        <TabPanel>
          <MapSelection 
            mapList={mapList}
            mapsRemoved={mapsRemoved}
            removeMapSelection={removeMapSelection}
            addMap={addMap}
          />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default SubSelection