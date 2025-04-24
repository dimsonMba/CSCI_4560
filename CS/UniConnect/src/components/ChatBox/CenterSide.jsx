import React, { useState, useEffect } from 'react'
import { Input }   from '../ui/input'
import { Button }  from '../ui/button'
import api          from '../../api'

export default function CenterSide() {
  const [currentUser, setCurrentUser] = useState(null)
  const [messages,    setMessages]    = useState([])
  const [newMessage,  setNewMessage]  = useState('')

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    api.get('me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(({ data: me }) => {
      setCurrentUser(me)
      return api.get('posts/', {
        headers: { Authorization: `Bearer ${token}` }
      })
    })
    .then(({ data }) => {
      // map & sort on load
      const mapped = data.map(p => ({
        id:         p.id,
        text:       p.content,
        senderId:   p.user.student_id,
        senderName: `${p.user.first_name} ${p.user.last_name}`,
        time:       new Date(p.created_at)
                       .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp:  p.created_at,            // keep ISO for sorting
      }))
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

      setMessages(mapped)
    })
    .catch(console.error)
  }, [])

  const handleSendMessage = async e => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const token = localStorage.getItem('access_token')
    try {
      const { data } = await api.post(
        'posts/',
        { content: newMessage, privacy: 'Public' },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const newMsg = {
        id:         data.id,
        text:       data.content,
        senderId:   data.user.student_id,
        senderName: `${data.user.first_name} ${data.user.last_name}`,
        time:       new Date(data.created_at)
                       .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp:  data.created_at,
      }

      setMessages(prev =>
        // append then resort oldest→newest
        [...prev, newMsg].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        )
      )
      setNewMessage('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="text-black p-4 border-b bg-white">
        <h2 className="text-lg font-semibold">My Major Chat Room</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map(msg => {
          const isMe = currentUser && msg.senderId === currentUser.student_id
          return (
            <div
              key={msg.id}
              className={`mb-4 flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                  ${isMe
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200 text-black'
                  }`}
              >
                {!isMe && (
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    {msg.senderName}
                  </p>
                )}
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
        <div className="relative">
          <Input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="text-black placeholder-black pl-4 pr-10 py-2 w-[80%] rounded-full border border-gray-300 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[18%] rounded-full bg-blue-500 text-white"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}