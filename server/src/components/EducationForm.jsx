// src/components/EducationForm.jsx

import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const EducationForm = ({ data, onChange }) => {

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    }
    onChange([...data, newEducation])
  }

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
  }

  const updateEducation = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-6 bg-[#0f0f17] p-8 rounded-3xl border border-gray-700">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
            Education
          </h3>
          <p className="text-gray-400 mt-1">Add your education details</p>
        </div>

        <button 
          onClick={addEducation} 
          className="flex items-center gap-2 px-3 py-3 text-sm font-medium bg-linear-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black rounded-2xl transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="size-5" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-lg text-gray-400">No education added yet.</p>
          <p className="text-sm mt-2">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((education, index) => (
            <div 
              key={index} 
              className="p-6 bg-gray-900 border border-gray-700 rounded-3xl space-y-5 relative"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-medium text-white">
                  Education #{index + 1}
                </h4>
                <button 
                  onClick={() => removeEducation(index)} 
                  className="text-red-400 hover:text-red-500 transition-colors p-2 hover:bg-red-950/50 rounded-xl"
                >
                  <Trash2 className="size-5 cursor-pointer" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Institute Name</label>
                  <input 
                    type="text" 
                    placeholder="Institute Name" 
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    value={education.institution || ""} 
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Degree</label>
                  <input 
                    type="text" 
                    placeholder="Degree" 
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    value={education.degree || ""} 
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Field of Study</label>
                  <input 
                    type="text" 
                    placeholder="Field of Study" 
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    value={education.field || ""} 
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Graduation Date</label>
                  <input 
                    type="month" 
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    value={education.graduation_date || ""} 
                    onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">GPA (Optional)</label>
                <input 
                  type="text" 
                  placeholder="GPA (Optional)" 
                  className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  value={education.gpa || ""} 
                  onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm