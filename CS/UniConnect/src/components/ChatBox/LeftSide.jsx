import React from 'react'
import { Input } from '../ui/input'

function LeftSide () {
  return (
    <div>
      <div className='flex'>
        <img className="w-[15%] h-[15%] aspect-auto" src="Blue Minimalist Chat Bubble.jpg"/>
        <p>Uniconnect</p>
      </div>

      <div>
        <Input></Input>
      </div>
    </div>
  )
}

export default LeftSide
