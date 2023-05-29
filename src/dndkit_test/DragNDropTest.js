import React from 'react';
import {useState} from 'react'
import {DndContext} from '@dnd-kit/core';

import DragTest from './DragTest';
import DropTest from './DropTest';

const DragNDropTest = () => {
  const containers = ['A', 'B', 'C']
  const [parent, setParent] = useState(null)
  const draggableMarkup = (
    <DragTest id="draggable">Drag me</DragTest>
  )

  function handleDragEnd(event) {
    const {over} = event

    setParent(over ? over.id : null)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        <DropTest key={id} id={id}>
          {parent === id ? draggableMarkup : 'Drop here'}
        </DropTest>
      ))}
    </DndContext>
  )
}

export default DragNDropTest