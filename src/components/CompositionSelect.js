import React from 'react'

const CompositionSelect = ({ 
  compOption,
  changeComp,
}) => {

  return (
    <div className='Composition-Select'>
      <select onChange={(op) => changeComp(op.target.value)}>
        <option value="random">Random</option>
        <option value="oneSmoke">1 Smoke + Random</option>
        <option value="balanced">Balanced (1 each role, 2 duelists)</option>
        <option value="tdm">Team Deathmatch</option>
        <option value="custom">Custom Composition</option>
        <option value="best" disabled="disabled">Best for Map (TBA)</option>
      </select>
    </div>
  )
}

CompositionSelect.defaultProps = {
  compOption: "Random"
}

export default CompositionSelect