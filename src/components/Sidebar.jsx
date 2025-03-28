import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { resetStatus } from '../features/auth/authSlice';
import toast from 'react-hot-toast';
import { logout } from '../features/auth/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(resetStatus());
    toast.success("Logged out successfully");
    dispatch(logout());
  };

  return (
    <aside className="w-64 bg-purple-100 p-5 min-h-screen">
    <h1 className="text-xl font-bold text-purple-800 mb-6">workflow</h1>
    <nav>
      <ul className="space-y-4 text-purple-700 font-medium">
        <li>
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-purple-500">
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/project" className="flex items-center gap-2 hover:text-purple-500">
            📁 Project
          </Link>
        </li>
        <li>
          <Link to="/task" className="flex items-center gap-2 hover:text-purple-500">
          📝 Task
          </Link>
        </li>
        <li>
          <Link to="/team" className="flex items-center gap-2 hover:text-purple-500">
            👥 Team
          </Link>
        </li>
        <li>
          <Link to="/reports" className="flex items-center gap-2 hover:text-purple-500">
            📑 Reports
          </Link>
        </li>
        {/* <li>
          <Link to="/settings" className="flex items-center gap-2 hover:text-purple-500">
            ⚙️ Settings
          </Link>
        </li> */}
        <li>
        <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </aside>
  )
}

export default Sidebar
