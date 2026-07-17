// src/App.jsx
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from "react-hot-toast"

const App = () => {
  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem("token")
    try {
      if (token) {
        const { data } = await api.get("/api/users/data")
        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-indigo-950/30 to-gray-950 text-gray-100 antialiased relative overflow-hidden transition-all duration-300">

      {/* 🌌 Background Effects (enhanced but same concept) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>

        {/* ➕ Added subtle grid overlay (premium feel) */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[32px_32px]"></div>
      </div>

      {/* 🔔 Toast UI (slightly improved, no logic touched) */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: 'rgba(15, 23, 42, 0.95)', // slightly deeper dark
            color: '#e2e8f0',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            borderRadius: '18px',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(99,102,241,0.15)',
            padding: '16px 24px',
            maxWidth: '90%', // ✅ responsive fix
          },
          success: {
            iconTheme: {
              primary: '#6366f1',
              secondary: '#0f172a',
            },
            style: {
              border: '1px solid rgba(99, 102, 241, 0.45)',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#0f172a',
            },
            style: {
              border: '1px solid rgba(239, 68, 68, 0.45)',
            },
          },
          loading: {
            style: {
              border: '1px solid rgba(234, 179, 8, 0.45)',
            },
          },
        }}
      />

      {/* 📱 Routes Wrapper (added z + padding safety for mobile) */}
      <div className="relative z-10 w-full">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          </Route>

          <Route path="view/:resumeId" element={<Preview />} />
        </Routes>
      </div>
    </div>
  )
}

export default App