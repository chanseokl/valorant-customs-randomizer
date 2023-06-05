import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const SubSelection = () => {
  return (
    <div className="container">
      <Tabs>
        <TabList>
          <Tab>Players</Tab>
          <Tab>Agents</Tab>
          <Tab>Maps</Tab>
        </TabList>

        <TabPanel>
          Players
        </TabPanel>
        <TabPanel>
          Agents
        </TabPanel>
        <TabPanel>
          Maps
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default SubSelection