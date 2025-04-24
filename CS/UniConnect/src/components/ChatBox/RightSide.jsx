import React, { useEffect, useState } from 'react';
import api from 'axios';

const RightSide = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      setIsLoading(true);
      api.get('http://127.0.0.1:8000/api/me/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        setError("Failed to load profile");
        setIsLoading(false);
      });
    } else {
      setError("No authentication token found");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-full p-4 bg-white border-l shadow-lg text-sm">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile picture skeleton */}
          <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
          
          {/* Name skeleton */}
          <div className="text-center space-y-2">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Details skeleton */}
          <div className="mt-6 space-y-3 w-full">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full p-4 bg-white border-l shadow-lg text-sm flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4 bg-white border-l shadow-lg text-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          {user.first_name && user.last_name && (
            <span className="text-2xl font-semibold text-gray-600">
              {user.first_name.charAt(0)}{user.last_name.charAt(0)}
            </span>
          )}
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">{user.first_name} {user.last_name}</p>
          <p className="text-gray-500">{user.mtsu_email}</p>
        </div>

        <div className="mt-6 space-y-2 text-gray-700 w-full">
          <p><strong>Major:</strong> {user.major || 'Not specified'}</p>
          <p><strong>Graduation:</strong> {user.graduation_year || 'Not specified'}</p>
          <p><strong>Status:</strong> Online</p>
        </div>

        <div className="w-full pt-4 mt-4 border-t border-gray-200">
          <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
            Edit Profile
          </button>
          <button className="w-full py-2 mt-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSide;