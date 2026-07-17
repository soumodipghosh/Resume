// src/components/ProfessionalSummaryForm.jsx

import React, { useState } from 'react'
import { Loader2, Sparkles } from "lucide-react"
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange }) => {

  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      if (!data || data.trim() === "") {
        return toast.error("Please enter summary first");
      }

      setIsGenerating(true);

      const response = await api.post("/api/ai/enhance-pro-sum", {
        userContent: data
      });

      onChange(response.data.enhancedContent);

    } catch (error) {
      console.log("ERROR:", error.response?.data);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 bg-[#0f0f17] p-6 md:p-8 rounded-3xl border border-gray-700">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            Professional Summary
          </h3>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            Add a powerful summary for your resume
          </p>
        </div>

        <button 
          disabled={isGenerating} 
          onClick={generateSummary} 
          className="flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-2xl transition-all disabled:opacity-70 w-full sm:w-auto shadow-lg shadow-violet-500/30 cursor-pointer"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          <span>{isGenerating ? "Enhancing with AI..." : "AI Enhance"}</span>
        </button>
      </div>

      <div className="space-y-3">
        <textarea
          placeholder="Write a compelling professional summary that highlights your key strengths, experience, and career objectives..."
          className="w-full p-5 bg-gray-900 border border-gray-700 rounded-3xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none min-h-45 md:min-h-55"
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
        />

        <p className="text-xs text-gray-500 text-center px-2">
          Tip: Keep it concise (3-4 sentences). Focus on your most relevant achievements and skills.
        </p>
      </div>
    
    </div>
  )
}

export default ProfessionalSummaryForm