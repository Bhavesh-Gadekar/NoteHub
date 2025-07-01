import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import Account from './pages/account.jsx';
import Forgotpassword from './pages/forgotPassword.jsx';
import ResetPassword from "./pages/resetPassword.jsx";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/forgotpassword' element={<Forgotpassword/>}/>
      <Route path='/resetpassword/:id/:token' element={<ResetPassword/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;