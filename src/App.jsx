import Header from "./components/Header"
import Login from "./features/auth/Login"
import Signup from "./features/auth/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import PrivateRoutes from "./components/PrivateRoutes"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <BrowserRouter>
    <Toaster/>
    <Header/>
     <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/dashboard" 
        element={
          <PrivateRoutes>
            <Dashboard/>
          </PrivateRoutes>
        }
       />
     </Routes>
    </BrowserRouter>
  )
}

export default App
