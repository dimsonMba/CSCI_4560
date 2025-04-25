import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <>
      <div className="grid w-screen h-screen grid-cols-[60%_40%]">

        <div className="bg-[#38B6FF] flex flex-col items-center justify-center relative">

          {/* Clickable Image (Back to Home) */}

          {/* MTSU Section */}
          <section className="absolut justify-center">
            <img className="w-[428px] h-[420px] aspect-auto" src="Blue Minimalist Chat Bubble.jpg"/>
          </section>
        </div>

        <div className="flex flex-col bg-gray-100 items-center ">
          <section className="flex border-2 border-black px-4 py-5 rounded-[2rem] w-[90%] mx-auto mt-5 bg-[#D9D9D9] justify-between">
            <Link to="/sign_up">
              <Button className="bg-[#38B6FF] text-black border-2 border-black px-6 py-5 rounded-[1rem] hover:bg-blue-100 cursor-pointer">Sign Up</Button>
            </Link>
            <Link to="/log_in">
              <Button className="bg-[#38B6FF] text-black border-2 border-black px-6 py-5 rounded-[1rem] hover:bg-blue-100 cursor-pointer">Log In</Button>
            </Link>
          </section>
          <div className="mt-[150px] items-center ml-[70px] mr-[70px] inline-block p-[70px]">
            <h1 className="text-black text-xl font-bold font-crimson ml-[0rem]">Classmates, your Friends, your Network</h1>
            <p className="text-gray-600 mt-2">
<<<<<<< HEAD
            Why wait until sophomore year to start building your network? Begin connecting from day one with Uniconnect.
=======
              Why wait until sophomore year to start building your network? Begin connecting from day one with Uniconnect.
>>>>>>> main
            </p>
          </div>

          <div className="mt-4">
            <Link to= "/sign_up">
              <Button className=" py-10 px-8 bg-[#38B6FF] font-bold text-black rounded-[10rem] text-[2.5rem] hover:bg-blue-200 cursor-pointer border-5 border-blue">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default HomePage

