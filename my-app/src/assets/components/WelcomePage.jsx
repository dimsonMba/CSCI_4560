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
          <button className="bg-blue-400 text-black border-2 border-black px-5 py-2 rounded-[1rem] hover:bg-blue-100 cursor-pointer">Sign in</button>
        </Link>
        <Link to="/log_in">
          <button className="bg-blue-400 text-black border-2 border-black px-5 py-2 rounded-[1rem] hover:bg-blue-100 cursor-pointer">Log in</button>
        </Link>
      
      </section>

      <div className="mt-[150px] items-center ml-[70px] mr-[70px] inline-block p-[70px]">
        <h1 className="text-xl font-bold font-crimson ml-[0rem]">Classmate, your friends, your Network</h1>
        <p className="text-gray-600 mt-2">
          Why wait until sophomore to build your team? Start now in your freshman year.
        </p>

        <div className="mt-4">
          <button className="bg-blue-400 text-black font-bold px-6 py-3 rounded font-[inter] text-[2rem] border-2 border-black px-5 py-2 rounded-[2rem] hover:bg-blue-200 cursor-pointer">
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
