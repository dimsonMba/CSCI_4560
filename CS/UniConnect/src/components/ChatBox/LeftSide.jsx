import React from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from '../ui/searchicon'

function LeftSide () {
  return (
    <div>
      <div className='flex'>
        <img className="w-[15%] h-[15%] aspect-auto" src="Blue Minimalist Chat Bubble.jpg"/>
        <p>Uniconnect</p>
      </div>

      <div className="relative w-64">
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8 rounded-full border border-gray-300 shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
        />
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 pointer-events-none opacity-50" />
      </div>
    </div>
  )
}

export default LeftSide
