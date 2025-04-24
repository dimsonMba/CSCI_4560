import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from '../ui/searchicon'
import api from '../../api'

export default function LeftSide() {
  const [contacts, setContacts]       = useState([])
  const [search, setSearch]           = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  // 1️⃣ Get current user (to know their major & student_id)
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    api.get('me/', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setCurrentUser(data))
      .catch(console.error)
  }, [])

  // 2️⃣ Fetch all users, then filter to same major (excluding self)
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
      {/* Logo & Search */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <img
            src="Blue Minimalist Chat Bubble.jpg"
            alt="Logo"
            className="w-10 h-10"
          />
          
        </div>
        <div className="relative w-1/2">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black pointer-events-none" />
          <Input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="text-black placeholder-black pl-10 w-full rounded-full border border-gray-300 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contacts */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filtered.map(contact => (
          <div
            key={contact.student_id}
            className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
          >
            <p className="text-black font-medium">
              {contact.first_name} {contact.last_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}


