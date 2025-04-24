import React from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from '../ui/searchicon'

function LeftSide() {
  const contacts = [
    { id: 1, name: 'John Doe', lastMessage: 'See you tomorrow!', unread: 2, time: '10:30 AM' },
    { id: 2, name: 'Jane Smith', lastMessage: 'Did you finish the assignment?', unread: 0, time: '9:15 AM' },
    { id: 3, name: 'Mike Johnson', lastMessage: 'Thanks for the notes!', unread: 0, time: 'Yesterday' },
    { id: 4, name: 'Sarah Williams', lastMessage: 'Let me know when you\'re free', unread: 1, time: 'Yesterday' },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* App header */}
      <div className='flex items-center justify-center relative p-4 border-b border-gray-200'>
        <img className="w-12 h-12 mr-2" src="Blue Minimalist Chat Bubble.jpg" alt="Logo"/>
        
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black pointer-events-none" />
          <Input
            type="search"
            placeholder="Search..."
            className="text-black pl-10 w-full rounded-full border border-gray-300 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

      </div>

      {/* Search */}

      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="text-black font-medium">{contact.name}</p>
              <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">{contact.time}</p>
              {contact.unread > 0 && (
                <span className="inline-block mt-1 bg-blue-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {contact.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftSide
