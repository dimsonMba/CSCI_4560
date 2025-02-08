import { Link } from 'react-router-dom'
import React from 'react'

function WelcomePage() {

  return (
    <>
      <div className='split left'>
        <div className='school_name centered'>MTSU</div>
        <div className='app_name centered'>UniConnect</div>
      </div>

      <div className='split right'>
        <section className='welcome_Navbar'>
          <Link to="/sign_in">
          <button className='sign_in'>Sign in</button>
          </Link>
          <Link to= "/log_in">
          <button className='log_in'>Log in</button>
          </Link>
        </section>

        <div className='information_sign'>
          <h1 className='classmate_h1'>Classmate, your friends, your Network</h1>
          <p className='classmate_p'>Why wait until sophomore to build your team. Start now in your freshman year.</p>

          <div className='div_but'>
            <button className='sign_up_now'>Sign up now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomePage
