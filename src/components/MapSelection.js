import React from 'react'
import Map from './Map'

const MapSelection = () => {
  return (
    <div className='Map-Selection'>
      <div className='map-collection'>
        <Map />
        <Map />
      </div>
      <div className='remove-maps'>
        <label>Remove Maps</label>
      </div>
    </div>
  )
}

export default MapSelection