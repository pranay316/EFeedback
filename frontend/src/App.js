
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Dashboard from './Components/Dashboard';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import AdminHome from './Pages/AdminHome';
import StudentHome from './Pages/StudentHome';
import FeedbackPage from './Pages/FeedbackPage';
import TeacherHome from './Pages/TeacherHome';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path="/" element={<SignupPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path="/admin" element={<AdminHome/>}/>
      <Route path="/student" element={<StudentHome/>}/>
      <Route path='/course/:id' element={<FeedbackPage/>}/>
      <Route path='/teacher' element={<TeacherHome/>}/>
      
    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
