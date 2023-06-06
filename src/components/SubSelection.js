import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PlayersSelection from './PlayersSelection';
import AgentsSelection from './AgentsSelection';
import MapsSelection from './MapsSelection';

const SubSelection = () => {
  return (
    <div className="sub-selection">
      <Tabs>
        <TabList>
          <Tab>Players</Tab>
          <Tab>Agents</Tab>
          <Tab>Maps</Tab>
        </TabList>

        <TabPanel>
          <PlayersSelection />
        </TabPanel>
        <TabPanel>
          <AgentsSelection />
        </TabPanel>
        <TabPanel>
          <MapsSelection />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default SubSelection