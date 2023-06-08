import React from 'react'

const Agent = ({ name, color }) => {
  return (
    <div
      className='Agent'
      style={{ backgroundColor: color}}>
      <img src={require(`../assets/agents/${name}-icon.png`)}/>
      {name}
    </div>
  )
}

Agent.defaultProps = {
  name: 'default',
  color: 'black'
}

export default Agent