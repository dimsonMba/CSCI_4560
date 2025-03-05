import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthForm from '@/components/Auth/AuthForm';

const LogIn = () => {
  return (
    <div>
      <div className="bg-white grid h-screen w-screen grid-cols-[50%_50%]">
        {/* Sign Up Section */}
        <div className="h-full flex flex-col justify-center items-center">
          <section>
            <AuthForm type={"sign-in"}/>
          </section>
        </div>

        <div className="bg-[#38B6FF] flex flex-col items-center justify-center relative rounded-l-[45px]">

          {/* Clickable Image (Back to Home) */}

          {/* MTSU Section */}
          <section className="absolut justify-center">
            <img className="w-[428px] h-[420px] aspect-auto" src="Blue Minimalist Chat Bubble.jpg"/>
          </section>
        </div>

      </div>
    </div>
  )
}

export default LogIn
