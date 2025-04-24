import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


const CenterSide = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey there!', sender: 'other', time: '10:30 AM' },
    { id: 2, text: 'Hi! How are you?', sender: 'me', time: '10:31 AM' },
    { id: 3, text: 'I was wondering if you wanted to study for the exam together?', sender: 'other', time: '10:32 AM' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() === '') return
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages([...messages, newMsg])
    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="text-black p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold">John Doe</h2>
        <p className="text-sm text-gray-500">Online</p>
      </div>
      
      {/* Messages area */}
      <div className="text-black flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'me' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200'}`}
            >
              <p>{message.text}</p>
              <p className={`text-black text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
        <div className="relative">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="text-black pl-4 pr-10 py-2 w-[80%] rounded-full border border-gray-300 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button 
            type="submit"
            //className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
            //className="absolute w-[5%]"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[18%] rounded-full bg-blue"
          >
          Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CenterSide