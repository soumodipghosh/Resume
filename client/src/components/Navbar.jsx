// src/components/Navbar.jsx

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { logout } from '../app/features/authSlice'

const Navbar = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    navigate("/")
    dispatch(logout())
  }

  return (
    <div className="bg-[#05050a] border-b border-white/10">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-5 text-white">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
            R
          </div>
          <span className="text-2xl font-semibold tracking-tight">resume.</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm">
          <p className="text-gray-300">
            Hi, {user?.name?.split(" ")[0] || "User"}
          </p>
          <button 
            onClick={logoutUser}
            className="px-6 py-2 border border-gray-700 hover:border-gray-400 rounded-full text-sm transition-all hover:bg-gray-900"
          >
            Logout
          </button>
        </div>

      </nav>
    </div>
  )
}

export default Navbar