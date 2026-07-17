// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react'
import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from "react-pdftotext"

const Dashboard = () => {

  const { user, token: reduxToken } = useSelector(state => state.auth)
  const token = reduxToken || localStorage.getItem("token")

  const colors = ["#22d3ee", "#a855f7", "#ec4899", "#eab308", "#4ade80"]

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes")
      setAllResumes(data.resumes || [])
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post("/api/resumes/create", { title })
      setAllResumes([...allResumes, data.resume])
      setTitle("")
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      if (!resume) return toast.error("Please upload a file")

      const resumeText = await pdfToText(resume)
      const { data } = await api.post("/api/ai/upload-resume", { title, resumeText }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setTitle("")
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    event.preventDefault()
    try {
      const { data } = await api.put(`/api/resumes/update/`, { 
        resumeId: editResumeId, 
        resumeData: { title } 
      })
      setAllResumes(allResumes.map(r => r._id === editResumeId ? { ...r, title } : r))
      setTitle("")
      setEditResumeId("")
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return
    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`)
      setAllResumes(allResumes.filter(r => r._id !== resumeId))
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05050a]/95 backdrop-blur-lg border-b border-white/10 py-5 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">R</div>
            <span className="text-2xl font-semibold tracking-tight">resume.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-gray-300">Hi, {user?.name?.split(" ")[0] || "User"}</span>
            <button className="px-6 py-2 border border-gray-700 hover:border-gray-400 rounded-full text-sm transition">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Welcome back, {user?.name?.split(" ")[0] || "User"}</h1>
          <p className="text-gray-400 mt-1">Manage your resumes</p>
        </div>

        {/* Create & Upload Cards - Exact as your first picture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <button 
            onClick={() => setShowCreateResume(true)} 
            className="h-52 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-700 hover:border-cyan-500 group transition-all duration-300 bg-[#0f0f17]"
          >
            <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <PlusIcon className="size-9 text-cyan-400" />
            </div>
            <p className="text-lg font-medium group-hover:text-cyan-400 transition">Create New Resume</p>
          </button>

          <button 
            onClick={() => setShowUploadResume(true)} 
            className="h-52 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-700 hover:border-violet-500 group transition-all duration-300 bg-[#0f0f17]"
          >
            <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <UploadCloudIcon className="size-9 text-violet-400" />
            </div>
            <p className="text-lg font-medium group-hover:text-violet-400 transition">Upload Existing Resume</p>
          </button>
        </div>

        {/* Visible Line after the two cards */}
        <hr className="border-gray-700 my-12" />

        {/* Your Resumes Section */}
        <h2 className="text-2xl font-semibold mb-6">Your Resumes</h2>

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length]
            return (
              <button 
                onClick={() => navigate(`/app/builder/${resume._id}`)} 
                key={index} 
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer" 
                style={{ 
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}30)`, 
                  borderColor: baseColor + "40" 
                }}
              >
                <FilePenLineIcon className="size-7 group-hover:scale-105 transition-all" style={{ color: baseColor }} />
                <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }}>{resume.title}</p>
                <p className="absolute bottom-3 text-[11px] text-gray-500 px-2 text-center">
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div onClick={(e) => e.stopPropagation()} className="absolute top-2 right-2 group-hover:flex items-center hidden gap-1">
                  <TrashIcon onClick={() => deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-red-900/30 rounded text-gray-400 transition-colors" />
                  <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className="size-7 p-1.5 hover:bg-gray-800 rounded text-gray-400 transition-colors" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Create Resume Modal with Cross Button */}
      {showCreateResume && (
        <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center">
          <div onClick={e => e.stopPropagation()} className="bg-[#0f0f17] border border-gray-700 rounded-3xl p-8 w-full max-w-sm relative">
            <h2 className="text-xl font-bold mb-4 text-white">Create a Resume</h2>
            <input 
              onChange={(e) => setTitle(e.target.value)} 
              value={title} 
              type="text" 
              placeholder="Enter resume title" 
              className="w-full px-4 py-3 mb-4 bg-gray-900 border border-gray-700 rounded-2xl text-white focus:border-cyan-500" 
              required 
            />
            <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-medium rounded-2xl">Create Resume</button>
            
            <XIcon 
              className="absolute top-6 right-6 text-gray-400 hover:text-white cursor-pointer size-6" 
              onClick={() => { setShowCreateResume(false); setTitle("") }} 
            />
          </div>
        </form>
      )}

      {/* Upload Resume Modal with Cross Button */}
      {showUploadResume && (
        <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center">
          <div onClick={e => e.stopPropagation()} className="bg-[#0f0f17] border border-gray-700 rounded-3xl p-8 w-full max-w-sm relative">
            <h2 className="text-xl font-bold mb-4 text-white">Upload Resume</h2>
            <input 
              onChange={(e) => setTitle(e.target.value)} 
              value={title} 
              type="text" 
              placeholder="Enter resume title" 
              className="w-full px-4 py-3 mb-4 bg-gray-900 border border-gray-700 rounded-2xl text-white focus:border-cyan-500" 
              required 
            />
            <div className="mb-6">
              <label htmlFor="resume-input" className="block text-sm text-gray-400 mb-3">Select resume file</label>
              <div 
                className="border border-dashed border-gray-700 rounded-2xl p-10 text-center hover:border-cyan-500 transition cursor-pointer" 
                onClick={() => document.getElementById('resume-input').click()}
              >
                {resume ? (
                  <p className="text-cyan-400">{resume.name}</p>
                ) : (
                  <>
                    <UploadCloudIcon className="size-14 mx-auto text-gray-500 mb-3" />
                    <p className="text-gray-400">Upload resume (PDF)</p>
                  </>
                )}
              </div>
              <input type="file" id="resume-input" accept=".pdf" hidden onChange={(e) => setResume(e.target.files[0])} />
            </div>
            <button 
              disabled={isLoading} 
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 text-black font-medium rounded-2xl flex items-center justify-center gap-2"
            >
              {isLoading && <LoaderCircleIcon className="animate-spin" />}
              {isLoading ? "Uploading..." : "Upload Resume"}
            </button>

            <XIcon 
              className="absolute top-6 right-6 text-gray-400 hover:text-white cursor-pointer size-6" 
              onClick={() => { setShowUploadResume(false); setTitle("") }} 
            />
          </div>
        </form>
      )}

      {/* Edit Title Modal with Cross Button */}
      {editResumeId && (
        <form onSubmit={editTitle} onClick={() => setEditResumeId("")} className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center">
          <div onClick={e => e.stopPropagation()} className="bg-[#0f0f17] border border-gray-700 rounded-3xl p-8 w-full max-w-sm relative">
            <h2 className="text-xl font-bold mb-4 text-white">Edit Resume Title</h2>
            <input 
              onChange={(e) => setTitle(e.target.value)} 
              value={title} 
              type="text" 
              placeholder="Enter resume title" 
              className="w-full px-4 py-3 mb-4 bg-gray-900 border border-gray-700 rounded-2xl text-white focus:border-cyan-500" 
              required 
            />
            <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-medium rounded-2xl">Update</button>
            
            <XIcon 
              className="absolute top-6 right-6 text-gray-400 hover:text-white cursor-pointer size-6" 
              onClick={() => { setEditResumeId(""); setTitle("") }} 
            />
          </div>
        </form>
      )}

    </div>
  )
}

export default Dashboard