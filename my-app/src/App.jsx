import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import WelcomePage from './assets/components/welcome_page/WelcomePage';
import SignIn from './assets/components/Sign_in/SignIn';
import LogIn from './assets/components/Log_in/LogIn';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/log_in" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
