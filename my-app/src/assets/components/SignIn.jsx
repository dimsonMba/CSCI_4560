import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <> 
      <div className="grid h-screen grid-cols-[60%_40%]">
        <div className="bg-blue-400 flex flex-col items-center justify-center w-full">

          <section className='flex items-center justify-center'>
            <Link to="/" className='cursor-pointer'>
              <img className="w-[8rem] h-[6rem] mb-[7rem]" src= "./chat_icon.jpg" alt="Home" />
            </Link>
            
            <h1 className='font-[inter] text-[2rem] font-normal text-black mt-2'>Keep your friends and network closer</h1>
          </section>

          <section className='absolute bottom-0 ml-[45rem]'>
            <h1 className='relative font-bold text-[32px]'>Mtsu</h1>
            <div className='flex'>
              <p className='text-blue-800 text-[13px] font-bold' style={{ fontFamily: "Caveat, cursive" }}>Stay true blue</p>
              <img src='./lightning.jpg' alt='MTSU Lightning'/>
            </div>
            
          </section>
        </div>

        <div className="flex flex-col bg-gray-100">
          <h1>Sign Up</h1>
          {/*to put form here*/}
        </div>

      </div>
    </>
    
  )
}

export default SignIn

