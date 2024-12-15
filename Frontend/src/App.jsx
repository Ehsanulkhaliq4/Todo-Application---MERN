import React from 'react'
import { Navigate,Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import SignUp from './components/SignUp'
import { Navbar , Button} from "flowbite-react";
import PageNotFound from './components/PageNotFound'
import { Toaster } from "react-hot-toast";

function App() {
  const token = localStorage.getItem("jwt");

  return (
    <div>
    <div>
    <Navbar fluid rounded className='bg-gray-300'>
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Todo Application</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>SignUp</Button>
      </div>
    </Navbar>
    </div>
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App