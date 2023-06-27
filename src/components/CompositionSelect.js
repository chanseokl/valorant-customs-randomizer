import React from 'react'

const CompositionSelect = ({ compOption }) => {

  return (
    <div className='Composition-Select'>
      <select>
        <option value="Random">Random</option>
        <option value="OneSmoke">1 Smoke + Random</option>
        <option value="Balanced">Balanced (1 each role, 2 duelists)</option>
        <option value="Best">Best for Map (TBA)</option>
      </select>
    </div>
  )
}

CompositionSelect.defaultProps = {
  compOption: "Random"
}

export default CompositionSelect