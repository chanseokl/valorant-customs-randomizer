import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PlayerSelection from './PlayerSelection';
import AgentSelection from './AgentSelection';
import MapSelection from './MapSelection';

const SubSelection = () => {
  return (
    <div className="Sub-Selection">
      <Tabs>
        <TabList>
          <Tab>Players</Tab>
          <Tab>Agents</Tab>
          <Tab>Maps</Tab>
        </TabList>

        <TabPanel>
          <PlayerSelection />
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