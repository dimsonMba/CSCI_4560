import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import api from '../../api'

export default function CenterSide() {
  const [currentUser, setCurrentUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

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
      const mapped = data.map(p => ({
        id: p.id,
        text: p.content,
        senderId: p.user.student_id,
        senderName: `${p.user.first_name} ${p.user.last_name}`,
        time: new Date(p.created_at)
                 .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: p.created_at,
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
        id: data.id,
        text: data.content,
        senderId: data.user.student_id,
        senderName: `${data.user.first_name} ${data.user.last_name}`,
        time: new Date(data.created_at)
                 .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: data.created_at,
      }

      setMessages(prev =>
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
      <div className="h-16 border-b border-gray-200 bg-white flex items-center px-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">My Major Chat Room</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map(msg => {
          const isMe = currentUser && msg.senderId === currentUser.student_id
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm
                  ${isMe
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                  }`}
              >
                {!isMe && (
                  <p className="text-xs font-semibold text-blue-600 mb-1">
                    {msg.senderName}
                  </p>
                )}
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 text-right ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 px-4 py-3 text-gray-800 placeholder-gray-500"
          />
          <Button
            type="submit"
            className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}