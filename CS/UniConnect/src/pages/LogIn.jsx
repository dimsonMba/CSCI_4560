import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthForm from '@/components/Auth/AuthForm';

const LogIn = () => {
  return (
    <div>
      <div className="grid h-screen w-screen grid-cols-[60%_40%]">
        <div className="bg-blue-400 flex flex-col items-center justify-center w-full relative">

          {/* Clickable Image (Back to Home) */}
          <section className="flex items-center justify-center">
            <Link to="/" className="cursor-pointer">
              <img className="w-[8rem] h-[6rem] mb-[7rem]" src="/chat_icon.jpg" alt="Home" />
            </Link>
            <h1 className="font-[inter] text-[2rem] font-normal text-black mt-2">
              Keep your friends and network closer
            </h1>
          </section>

          {/* MTSU Section */}
          <section className="absolute bottom-3 right-3 justify-end">
            <h1 className="relative font-bold text-[32px] text-black right-7">MTSU</h1>
            <div className="flex items-center gap-2">
              <p className="text-blue-800 text-[14px] font-bold mt-[-3.5rem]" style={{ fontFamily: "Caveat, cursive" }}>
                Stay true blue
              </p>
              <img src="/lightning.jpg" alt="MTSU Lightning" />
            </div>
          </section>
        </div>

        {/* Sign Up Section */}
        <div className="flex flex-col bg-gray-100 justify-center items-center">
          <section>
            <AuthForm type={"sign-in"}/>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LogIn
