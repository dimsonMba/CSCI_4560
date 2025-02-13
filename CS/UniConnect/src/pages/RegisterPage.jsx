import AuthRegister from '@/components/Auth/AuthRegister'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
  <>
    <div className="grid w-screen h-screen grid-cols">
    
            <div className="flex flex-col bg-gray-100 items-center">
              <section className="flex border-2 border-black px-4 py-5 rounded-[2rem] w-[90%] mx-auto mt-5 bg-[#7CB3E0] justify-between">
              <div className='flex items-center'>
                <Link to="/">
                  <img className="w-[6rem] h-[4rem]" src="/chat_icon.jpg" alt="Home" />
                </Link>
                <div>
                  <span className='text-black text-[1rem]'>Uniconnect</span>
                </div>
              </div>
              

              <div className='flex items-center gap-10'>
                <Link>
                  <Button className="bg-blue-400 text-black border-2 border-black px-6 py-5 rounded-[1rem] hover:bg-blue-100 cursor-pointer">Support</Button>
                </Link>
                
                <Link to="/log_in">
                  <Button className="bg-blue-400 text-black border-2 border-black px-6 py-5 rounded-[1rem] hover:bg-blue-100 cursor-pointer">Log In</Button>
                </Link>
              </div>
            
              </section>
              <section>
                <div className="items-center ml-[70px] mr-[70px] inline-block p-[10px]">
                  <AuthRegister/>
                </div>
              </section>
    
            </div>
          </div>
  </>
);
}

export default RegisterPage
