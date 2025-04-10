import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import SignIn from './pages/SignIn'
import LogIn from './pages/LogIn'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import ChatPage from './pages/ChatPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign_up" element={<SignIn />} />
        <Route path="/log_in" element={<LogIn />} />
        <Route path="/register_page" element={<RegisterPage/>}/>
        {/*Find a way to fetch*/}
        <Route path="/chatpage" element={<ChatPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
