import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities';

const DragTest = (props) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  })
  const style = transform ? {
    transform: CSS.Translate.toString(transform) //`translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  )
}

export default DragTest