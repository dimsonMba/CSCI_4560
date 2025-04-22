import AuthRegister from '@/components/Auth/AuthRegister'
import React from 'react'
const RegisterPage = () => {
  return (
  <>
    <div>
      <div className="bg-white grid w-screen grid-cols-[50%_50%] h-screen">
        {/* Sign Up Section */}
        <div className="justify-center items-center relative ">
          <section >
            <AuthRegister/>
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
  </>
);
}

export default RegisterPage
