import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const DropTest = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}

export default DropTest