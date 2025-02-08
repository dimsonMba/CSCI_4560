import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import WelcomePage from './assets/components/WelcomePage';
import SignIn from './assets/components/SignIn';
import LogIn from './assets/components/LogIn';

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
