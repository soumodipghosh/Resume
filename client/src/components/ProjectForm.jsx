// src/components/ProjectForm.jsx

import { Plus, Trash2 } from 'lucide-react'
import React from 'react'

const ProjectForm = ({ data, onChange }) => {

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    }
    onChange([...(data || []), newProject])
  }

  const removeProject = (index) => {
    const updated = (data || []).filter((_, i) => i !== index)
    onChange(updated)
  }

  const updateProject = (index, field, value) => {
    const updated = [...(data || [])]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-6 bg-[#0f0f17] p-8 rounded-3xl border border-gray-700">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
            Projects
          </h3>
          <p className="text-gray-400 mt-1">Add your notable projects</p>
        </div>

        <button 
          onClick={addProject} 
          className="flex items-center gap-2 px-3 py-3 text-sm font-medium bg-linear-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black rounded-2xl transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="size-5" />
          Add Project
        </button>
      </div>

      {(!data || data.length === 0) ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">💼</div>
          <p className="text-lg text-gray-400">No projects added yet.</p>
          <p className="text-sm mt-2">Click "Add Project" to showcase your work.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((project, index) => (
            <div 
              key={index} 
              className="p-6 bg-gray-900 border border-gray-700 rounded-3xl space-y-5 relative"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-medium text-white">
                  Project #{index + 1}
                </h4>
                <button 
                  onClick={() => removeProject(index)} 
                  className="text-red-400 hover:text-red-500 transition-colors p-2 hover:bg-red-950/50 rounded-xl"
                >
                  <Trash2 className="size-5 cursor-pointer" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Project Name</label>
                  <input 
                    type="text" 
                    placeholder="Project Name" 
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    value={project.name || ""} 
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Project Type</label>
                  <input 
                    type="text" 
                    placeholder="Project Type (e.g., Web App, Mobile App, Research)" 
                    className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    value={project.type || ""} 
                    onChange={(e) => updateProject(index, "type", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Project Description</label>
                <textarea 
                  placeholder="Describe your project, technologies used, your role, and key achievements..."
                  className="w-full p-5 bg-gray-950 border border-gray-700 rounded-3xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
                  rows={5}
                  value={project.description || ""} 
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectForm