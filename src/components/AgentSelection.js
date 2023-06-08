import React from 'react'
import Agent from './Agent'

const AgentSelection = () => {
  return (
    <div className='Agent-Selection'>
      <div className='agent-collection'>
        <div>INITIATORS</div>
        <div className='agent-class-list'>
          <Agent />
          <Agent />
        </div>
        <div>SENTINELS</div>
      </div>
      <div className='remove-agents'>
        <label>Remove Agents</label>
      </div>
    </div>
  )
}

export default AgentSelection