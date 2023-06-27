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
  removeAgent,
  removeMap
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
          <AgentSelection />
        </TabPanel>
        <TabPanel>
          <MapSelection />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default SubSelection