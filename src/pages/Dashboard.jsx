import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { authUserAsync, logout, resetStatus } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Dashboard = () => {
   const dispatch = useDispatch();
   const {user, token } = useSelector((state) => state.auth);



   useEffect(() => {
    dispatch(authUserAsync(token))
   },[dispatch])

   const handleLogout = () => {
    dispatch(resetStatus())
    toast.success('logout successfully')
    dispatch(logout())
   }


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email} </p>
      <button onClick={handleLogout} className="my-5 border mx-2 py-1 px-2 bg-black text-white">Logout</button>
    </div>
  )
}

export default Dashboard
