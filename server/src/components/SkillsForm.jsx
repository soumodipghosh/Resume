// src/components/SkillsForm.jsx

import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {

  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6 bg-[#0f0f17] p-8 rounded-3xl border border-gray-700">
      
      <div>
        <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
          Skills
        </h3>
        <p className="text-gray-400 mt-1">Add your technical and soft skills</p>
      </div>

      {/* Add Skill Input */}
      <div className="flex gap-3">
        <input 
          type="text" 
          placeholder="Enter a skill (e.g., React, Leadership, Python)" 
          className="flex-1 px-5 py-3.5 bg-gray-900 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          value={newSkill} 
          onChange={(e) => setNewSkill(e.target.value)} 
          onKeyDown={handleKeyPress}
        />

        <button 
          onClick={addSkill} 
          disabled={!newSkill.trim()} 
          className="flex items-center gap-2 px-6 py-3.5 text-sm font-medium bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="size-5" />
          Add
        </button>
      </div>

      {/* Skills Tags */}
      {data && data.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {data.map((skill, index) => (
            <span 
              key={index} 
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 border border-gray-700 text-white rounded-2xl text-sm group"
            >
              {skill}
              <button 
                onClick={() => removeSkill(index)}
                className="ml-1 text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-lg text-gray-400">No skills added yet</p>
          <p className="text-sm mt-2">Add your technical and soft skills above.</p>
        </div>
      )}

      {/* Tip Box */}
      <div className="bg-gray-900/70 border border-gray-700 p-5 rounded-2xl">
        <p className="text-sm text-gray-400">
          <strong className="text-cyan-400">Tip:</strong> Add 10-12 relevant skills. 
          Include both technical skills (programming languages, tools, frameworks) 
          and soft skills (leadership, communication, problem-solving).
        </p>
      </div>

    </div>
  )
}

export default SkillsForm