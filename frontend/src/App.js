import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Dashboard from './Components/Dashboard';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import AdminHome from './Pages/AdminHome';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path="/admin" element={<AdminHome/>}/>
      
    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
