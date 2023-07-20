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
        <option value="balanced">Balanced (1 Each Role + 1 Random)</option>
        <option value="custom" disabled="disabled">Custom Composition</option>
        <option value="tdm" disabled="disabled">Team Deathmatch (TBA)</option>
        <option value="best" disabled="disabled">Best for Map (TBA)</option>
      </select>
    </div>
  )
}

CompositionSelect.defaultProps = {
  compOption: "Random"
}

export default CompositionSelect