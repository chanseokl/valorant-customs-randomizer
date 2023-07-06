import React, {useState} from 'react'
import Agent from './Agent'
import {useDroppable, DragOverlay, useDndMonitor} from '@dnd-kit/core';

const AgentSelection = ({
  agentList,
  agentsRemoved,
  removeAgentSelection,
}) => {
  const [activeDragData, setActiveDragData] = useState(null);
  const {setNodeRef: setFirstDroppableRef, isOver: isOverSelection} = useDroppable({
    id: 'agent-selection',
    data: {
      accepts: ['agent'],
    },
  })  
  const {setNodeRef: setSecondDroppableRef, isOver: isOverRemoved} = useDroppable({
    id: 'removed-agent',
    data: {
      accepts: ['agent'],
    },
  })
  
  useDndMonitor({
    onDragStart: (event) => {
      if(event.active.data.current.type === 'agent')
        setActiveDragData(event.active.data.current)
    },
    onDragEnd: () => {setActiveDragData(null);},
    onDragCancel: () => {setActiveDragData(null);},
  })

  const preview = (name, cName) => {
    return (<div className='Agent'>
      <img className={cName}
        src={require(`../assets/agents/${name}-icon.png`)}/>
    </div>)
  }

  var agentsRemovedCombined = []
  for(const aClass in agentsRemoved) {
    agentsRemoved[aClass].forEach((aName) => 
      agentsRemovedCombined.push(<Agent
        name={aName} 
        id={'agent:' + aName} 
        key={'agent:' + aName}
        agentClass={aClass}
        removeAgentSelection={removeAgentSelection}
        isRemoved={true}/>)
     )
  }
  return (
    <div className='Agent-Selection'>
      <div ref={setFirstDroppableRef} className='agent-collection'>
        {Object.keys(agentList).map((agentClass) =>
          <div className='agent-category' key={'agentclass:' + agentClass}>
            <div>{agentClass}</div>
            <div className='agent-class-list'>
              {(activeDragData && 
              activeDragData.isRemoved && 
              isOverSelection && 
              activeDragData.agentClass === agentClass) ?
                preview(activeDragData.name, 'agent-image half-visible') :
                null}
              {agentList[agentClass].map((agentName) =>
                <Agent 
                  name={agentName} 
                  id={'agent:' + agentName} 
                  key={'agent:' + agentName}
                  agentClass={agentClass}
                  removeAgentSelection={removeAgentSelection}/>
              )}
            </div>
          </div>
        )}
      </div>

      <DragOverlay>
        {activeDragData ? 
          preview(activeDragData.name, 'agent-image' ) : 
          null}
      </DragOverlay>

      <div ref={setSecondDroppableRef} className='remove'>
        <label>Remove Agents</label>
        <div className='removed'>
          {(activeDragData && 
            isOverRemoved && 
            !activeDragData.isRemoved) ? 
              preview(activeDragData.name, 'agent-image half-visible' ) : 
              null}
          {agentsRemovedCombined.map((agentObject) => agentObject)}

        </div>
      </div>
    </div>
  )

}

export default AgentSelection