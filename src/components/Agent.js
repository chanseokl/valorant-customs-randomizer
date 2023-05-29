import React from 'react'

const Agent = ({ name, color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        color: 'white',
        width: '100%',
        height: '100%'
      }}>
      <img src={require(`../assets/agents/${name}-icon.png`)}/>
      name
    </div>
  )
}

Agent.defaultProps = {
  name: 'default',
  color: 'black'
}

export default Agent