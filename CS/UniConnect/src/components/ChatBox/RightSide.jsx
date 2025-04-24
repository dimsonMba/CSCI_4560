import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'

const RightSide = () => {
  const [user, setUser]         = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError]       = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setError('No authentication token found')
      setLoading(false)
      return
    }

    api.get('me/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching user:', err)
        setError('Failed to load profile')
        setLoading(false)
      })
  }, [])

  const onLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/log_in')
  }

  if (isLoading) {
    return (
      <div className="h-full p-4 bg-white border-l shadow-lg text-sm">
        {/* … same skeleton … */}
      </div>
    )
  }
  if (error) {
    return (
      <div className="h-full p-4 bg-white border-l shadow-lg text-sm flex items-center justify-center">
        {/* … error UI … */}
      </div>
    )
  }

  return (
    <div className="h-full p-4 bg-white border-l shadow-lg text-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          {user.first_name && user.last_name && (
            <span className="text-2xl font-semibold text-gray-600">
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </span>
          )}
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg text-black">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-gray-500">{user.mtsu_email}</p>
        </div>
        <div className="mt-6 space-y-2 text-gray-700 w-full text-black">
          <p>
            <strong>Major:</strong> {user.major || 'Not specified'}
          </p>
          <p>
            <strong>Graduation:</strong> {user.graduation_year || 'Not specified'}
          </p>
          <p>
            <strong>Status:</strong> Online
          </p>
        </div>
        <div className="w-full pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightSide