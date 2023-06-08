import React from 'react'

const Map = ({ name, color }) => {
  return (
    <div
      className='Map'
      style={{ backgroundColor: color}}>
      <img src={require(`../assets/agents/${name}-icon.png`)}/>
      {name}
    </div>
  )
}

Map.defaultProps = {
  name: 'default',
  color: 'black'
}

export default Map