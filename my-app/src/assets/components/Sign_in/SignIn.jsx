import React from 'react'
import './SignIn.css'

const SignIn = () => {
  return (
    <> 
      <div className='split_Sign left_Sign'>
        <div >
          <img src= "./chat_icon.jpg" alt="Chat Icon" />
          <h1 className='slogan'>Keep your friends and network closer</h1></div>
        <div className='app_name centered'>UniConnect</div>
      </div>

      <div className='split_Sign right_Sign'>
        <h1>food</h1>
      </div>
    </>
    
  )
}

export default SignIn

