import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from '../ui/searchicon'
import api from '../../api'
import { Link } from 'react-router-dom'

export default function LeftSide() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    api.get('me/', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setCurrentUser(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!currentUser) return
    const token = localStorage.getItem('access_token')
    api.get('users/', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        const sameMajor = data.filter(
          u =>
            u.major === currentUser.major &&
            u.student_id !== currentUser.student_id
        )
        setContacts(sameMajor)
      })
      .catch(console.error)
  }, [currentUser])

  const filtered = contacts.filter(u =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-gray-200 bg-white flex items-center px-4 shadow-sm">
        <div className="flex items-center mr-4">
          <Link to="/homepage">
            <img
              src="Blue Minimalist Chat Bubble.jpg"
              alt="Uniconnect Logo"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </div>
        
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-10 text-gray-800 placeholder-gray-400 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Contacts */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Contacts ({filtered.length})
        </h3>
        {filtered.map(contact => (
          <div
            key={contact.student_id}
            className="px-4 py-3 flex items-center hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-xs font-medium text-blue-600">
                {contact.first_name.charAt(0)}{contact.last_name.charAt(0)}
              </span>
            </div>
            <p className="text-gray-800 font-medium">
              {contact.first_name} {contact.last_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}