import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'

const RightSide = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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
      <div className="h-full p-6 bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gray-200"></div>
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="space-y-2 mt-6 w-full">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full p-6 bg-white flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Error</h3>
        <p className="text-gray-500 mb-6">{error}</p>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-colors"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="h-full p-6 bg-white overflow-y-auto">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center shadow-inner">
          <span className="text-2xl font-semibold text-blue-600">
            {user.first_name.charAt(0)}
            {user.last_name.charAt(0)}
          </span>
        </div>
        <div className="text-center">
          <p className="font-semibold text-xl text-gray-800">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-gray-500 mt-1">{user.mtsu_email}</p>
        </div>
        <div className="w-full mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500 mb-1">Major</p>
            <p className="text-gray-800">{user.major || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500 mb-1">Graduation Year</p>
            <p className="text-gray-800">{user.graduation_year || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
            <p className="text-green-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Online
            </p>
          </div>
        </div>
        <div className="w-full pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightSide