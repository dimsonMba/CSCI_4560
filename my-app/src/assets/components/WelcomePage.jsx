import { Link } from 'react-router-dom'
import React from 'react'

function WelcomePage() {

  return (
    <>
    <div className="grid h-screen grid-cols-[60%_40%]">
  {/* Left Section (60%) */}
  <div className="bg-blue-400 flex flex-col items-center justify-center w-full">
    <div className="text-blue-900 text-[10rem] font-bold font-[inkut]">MTSU</div>
    <div className="leading-none relative inline-block left-[8rem] text-black text-4xl font-medium top-[-4rem]">UniConnect</div>
  </div>

  {/* Right Section (40%) */}
  <div className="flex flex-col bg-gray-100">
    <section className="flex border-2 border-black px-4 py-3 rounded-[2rem] w-[80%] mx-auto mt-5 bg-[#D9D9D9] justify-between">
        <Link to="/sign_in">
          <button className="bg-blue-400 text-black border-2 border-black px-5 py-2 rounded-[1rem]">Sign in</button>
        </Link>
        <Link to="/log_in">
          <button className="bg-blue-400 text-black border-2 border-black px-5 py-2 rounded-[1rem]">Log in</button>
      </Link>
      
    </section>

    <div className="information_sign text-center p-4">
      <h1 className="classmate_h1 text-xl font-bold">Classmate, your friends, your Network</h1>
      <p className="classmate_p text-gray-600 mt-2">
        Why wait until sophomore to build your team? Start now in your freshman year.
      </p>

      <div className="div_but mt-4">
        <button className="sign_up_now bg-red-500 text-white px-6 py-3 rounded">
          Sign up now
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default WelcomePage
