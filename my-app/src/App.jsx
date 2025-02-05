import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='split left'>
        <div className='school_name centered'>MTSU</div>
        <div className='app_name'>UniConnect</div>
      </div>

      <div className='split right'>
        <section className='welcome_Navbar'>
          <button className='sign_in'>Sign in</button>
          <button className='log_in'>Log in</button>
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

export default App
