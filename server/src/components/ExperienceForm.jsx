// src/components/ExperienceForm.jsx

import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({ data, onChange }) => {

  const { token: reduxToken } = useSelector(state => state.auth)
  const token = reduxToken || localStorage.getItem("token")

  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false
    }
    onChange([...data, newExperience])
  }

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const experience = data[index]
    const prompt = `Enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`

    try {
      const { data: response } = await api.post("/api/ai/enhance-job-desc", { 
        userContent: prompt 
      })

      updateExperience(index, "description", response.enhancedContent)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-6 bg-[#0f0f17] p-8 rounded-3xl border border-gray-700">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
            Professional Experience
          </h3>
          <p className="text-gray-400 mt-1">Add your work experience</p>
        </div>

        <button 
          onClick={addExperience} 
          className="flex items-center gap-2 px-3 py-3 text-sm font-medium bg-linear-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black rounded-2xl transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="size-5" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-lg text-gray-400">No work experience added yet.</p>
          <p className="text-sm mt-2">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((experience, index) => (
            <div 
              key={index} 
              className="p-6 bg-gray-900 border border-gray-700 rounded-3xl space-y-5 relative"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-medium text-white">
                  Experience #{index + 1}
                </h4>
                <button 
                  onClick={() => removeExperience(index)} 
                  className="text-red-400 hover:text-red-500 transition-colors p-2 hover:bg-red-950/50 rounded-xl"
                >
                  <Trash2 className="size-5 cursor-pointer" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    value={experience.company || ""} 
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Job Title / Position</label>
                  <input 
                    type="text" 
                    placeholder="Job Title" 
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    value={experience.position || ""} 
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Start Date</label>
                  <input 
                    type="month" 
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    value={experience.start_date || ""} 
                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">End Date</label>
                  <input 
                    type="month" 
                    disabled={experience.is_current}
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all disabled:opacity-50"
                    value={experience.end_date || ""} 
                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={experience.is_current || false} 
                  onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 bg-gray-900 border-gray-700 rounded"
                />
                <span className="text-sm text-gray-400">I currently work here</span>
              </label>

              {/* Job Description */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-400">Job Description</label>
                  <button 
                    onClick={() => generateDescription(index)} 
                    disabled={generatingIndex === index || !experience.position || !experience.company}
                    className="flex items-center gap-2 px-5 py-2 text-sm bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-2xl transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Sparkles className="size-4" />
                    )}
                    Enhance with AI
                  </button>
                </div>

                <textarea 
                  placeholder="Describe your key responsibilities, achievements, and impact in this role..."
                  className="w-full p-5 bg-gray-950 border border-gray-700 rounded-3xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
                  rows={5}
                  value={experience.description || ""} 
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm