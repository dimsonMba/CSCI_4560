import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from '../ui/searchicon'
import api from '../../api'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function LeftSide() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  const selectedId = location.pathname.split('/chat/')[1]

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
        const filtered = data.filter(
          u => u.major === currentUser.major && u.student_id !== currentUser.student_id
        )
        setContacts(filtered)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [currentUser])

  const filteredContacts = contacts.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  )

  const handleContactClick = (id) => {
    navigate(`/chat/${id}`)
  }

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="h-16 border-b border-gray-200 bg-white flex items-center px-4 shadow-sm">
        <Link to="/homepage" className="mr-4">
          <img
            src="Blue Minimalist Chat Bubble.jpg"
            alt="Uniconnect Logo"
            className="w-10 h-10 rounded-full"
          />
        </Link>
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

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Contacts ({filteredContacts.length})
        </h3>

        {isLoading ? (
          <div className="px-4 py-6 text-gray-400 text-sm">Loading contacts...</div>
        ) : filteredContacts.length === 0 ? (
          <div className="px-4 py-6 text-gray-400 text-sm">No contacts found</div>
        ) : (
          filteredContacts.map(contact => {
            const isSelected = selectedId === contact.student_id.toString()
            return (
              <div
                key={contact.student_id}
                className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-all border-b border-gray-100 hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleContactClick(contact.student_id)}
              >
                {contact.profile_picture ? (
                  <img
                    src={contact.profile_picture}
                    alt={`${contact.first_name} ${contact.last_name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                    {contact.first_name[0]}{contact.last_name[0]}
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-gray-800 font-medium">
                    {contact.first_name} {contact.last_name}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span
                      className={`inline-block w-2 h-2 mr-1 rounded-full ${
                        contact.is_online ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                    {contact.is_online ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
