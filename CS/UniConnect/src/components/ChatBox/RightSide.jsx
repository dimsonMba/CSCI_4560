import React, { useEffect, useState } from 'react';
import api from 'axios';

const RightSide = () => {
  const [user, setUser] = useState(null);
  //Get a user, 
  //SAave the user
  //And collect information
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      api.get('http://127.0.0.1:8000/api/me/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setUser(res.data))
      .catch(err => console.error("Error fetching user:", err));
    }
  }, []);

  if (!user) return <div className="p-4">Loading profile...</div>;

  return (
    <div className="h-full p-4 bg-white border-l shadow-lg text-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-300" />
        <div className="text-center">
          <p className="font-semibold text-lg">{user.first_name} {user.last_name}</p>
          <p className="text-gray-500">{user.mtsu_email}</p>
        </div>

        <div className="mt-6 space-y-2 text-gray-700">
          <p><strong>Major:</strong> {user.major}</p>
          <p><strong>Graduation:</strong> {user.graduation_year}</p>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
