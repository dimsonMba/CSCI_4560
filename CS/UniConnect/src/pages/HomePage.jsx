import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <>
      <div className="grid w-screen h-screen grid-cols-[60%_40%]">
        <div className="bg-blue-400 flex flex-col items-center justify-center w-full">
           <div className="text-blue-900 text-[10rem] font-bold font-[inkut]">MTSU</div>
            <div className="leading-none relative inline-block left-[8.5rem] text-black text-4xl font-medium top-[-4rem]">UniConnect</div>
        </div>

        <div className="flex flex-col bg-gray-100 items-center">
          <section className="flex border-2 border-black px-4 py-5 rounded-[2rem] w-[90%] mx-auto mt-5 bg-[#D9D9D9] justify-between">
            <Link to="/sign_in">
              <Button className="bg-blue-400 text-black border-2 border-black px-6 py-5 rounded-[1rem] hover:bg-blue-100 cursor-pointer">Sign In</Button>
            </Link>
            <Link to="/log_in">
              <Button className="bg-blue-400 text-black border-2 border-black px-6 py-5 rounded-[1rem] hover:bg-blue-100 cursor-pointer">Log In</Button>
            </Link>
          </section>
          <div className="mt-[150px] items-center ml-[70px] mr-[70px] inline-block p-[70px]">
            <h1 className="text-black text-xl font-bold font-crimson ml-[0rem]">Classmate, your Friends, your Network</h1>
            <p className="text-gray-600 mt-2">
              Why wait until sophomore to build your team? Start now in your freshman year.
            </p>
          </div>

          <div className="mt-4">
            <Button className=" py-10 px-8 bg-blue-400 font-bold text-black rounded-[10rem] text-[2.5rem] hover:bg-blue-200 cursor-pointer border-5 border-blue">
              Sign Up Now
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage

