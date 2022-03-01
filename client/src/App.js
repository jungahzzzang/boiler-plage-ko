import './App.css';

import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LogingPage from './components/views/LogingPage/LogingPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path='/login' element={<LogingPage/>}/>
        <Route exact path='/register'element={<RegisterPage/>}/>
        </Routes>
  </BrowserRouter>
  );
}

export default App;
