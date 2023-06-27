import React, {useState} from 'react'
import Agent from './Agent'
import {useDroppable, DragOverlay, useDndMonitor} from '@dnd-kit/core';

const AgentSelection = () => {
  const [activeId, setActiveId] = useState(null);
  const {setNodeRef} = useDroppable({
    id: 'removed-agent',
    data: {
      accepts: ['agent'],
    },
  })

  var data = require('../lists/agent-list.json')

  useDndMonitor({
    onDragStart: (event) => {setActiveId(event.active.id);},
    onDragEnd: (event) => {setActiveId(null);},
  })

  return (
    <div className='Agent-Selection'>
      <div className='agent-collection'>
        {Object.keys(data).map((agentClass) =>
          <div className='agent-category'>
            <div>{agentClass}</div>
            <div className='agent-class-list'>
              {Object.keys(data[agentClass]).map((agentObject) =>
                /*color={data[agentClass][agentObject]} */
                <Agent name={agentObject} id={agentObject} key={agentObject}/>
              )}
            </div>
          </div>
        )}
      </div>
      <DragOverlay>
        {activeId ? (
          <Agent name={activeId.name} noX={true} id={`${activeId.name}Drag`} key={`${activeId.name}Drag`} />
        ) : null}
      </DragOverlay>
      <div className='remove'>
        <label>Remove Agents</label>
        <div ref={setNodeRef} className='removed'>
        </div>
      </div>
    </div>
  )

}

export default AgentSelection