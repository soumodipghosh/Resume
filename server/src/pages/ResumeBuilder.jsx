// src/pages/ResumeBuilder.jsx

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm"
import ExperiForm from "../components/ExperienceForm"
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {

  const { resumeId } = useParams()

  const { token: reduxToken } = useSelector(state => state.auth)
  const token = reduxToken || localStorage.getItem("token")

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3882F6",
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles }
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId)
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [])

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))

      const { data } = await api.put("/api/resumes/update", formData)
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) {
      console.error("Error saving resume :", error)
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0]
    const resumeUrl = frontendUrl + "/view/" + resumeId
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" })
    } else {
      alert("Share not supported on this browser !")
    }
  }

  const downloadResume = () => {
    window.print()
  }

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)
      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes")
      typeof resumeData.personal_info.image === "object" && formData.append("image", resumeData.personal_info.image)

      const { data } = await api.put("/api/resumes/update", formData, { headers: { Authorization: token } })
      setResumeData(data.resume)
      toast.success(data.message)
    } catch (error) {
      console.error("Error saving resume :", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      
      {/* Navbar */}
      <nav className="bg-[#05050a] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all">
            <ArrowLeftIcon className="size-5" />
            <span className='cursor-pointer'>Back to Dashboard</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT - Form Panel */}
          <div className="lg:col-span-5">
            <div className="bg-[#0f0f17] border border-gray-700 rounded-3xl p-8 sticky top-8">
              
              {/* Progress Bar */}
              <div className="h-1 bg-gray-800 rounded-full mb-8 overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-cyan-400 to-violet-500 transition-all"
                  style={{ width: `${(activeSectionIndex / (sections.length - 1)) * 100}%` }}
                />
              </div>

              {/* Template & Color + Navigation */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <TemplateSelector 
                    selectedTemplate={resumeData.template} 
                    onChange={(template) => setResumeData(prev => ({...prev, template}))}
                  />
                  <ColorPicker 
                    selectedColors={resumeData.accent_color} 
                    onChange={(color) => setResumeData(prev => ({...prev, accent_color: color}))}
                  />
                </div>

                <div className="flex items-center gap-2">
                  {activeSectionIndex > 0 && (
                    <button 
                      onClick={() => setActiveSectionIndex(p => p - 1)}
                      className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-2xl transition flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="size-4"/> Previous
                    </button>
                  )}
                  <button 
                    onClick={() => setActiveSectionIndex(p => Math.min(p + 1, sections.length - 1))}
                    disabled={activeSectionIndex === sections.length - 1}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-2xl transition flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                  >
                    Next <ChevronRight className="size-4"/>
                  </button>
                </div>
              </div>

              {/* Active Form */}
              <div className="min-h-150">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm 
                    data={resumeData.personal_info} 
                    onChange={(val) => setResumeData(p => ({...p, personal_info: val}))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm 
                    data={resumeData.professional_summary} 
                    onChange={(val) => setResumeData(p => ({...p, professional_summary: val}))}
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperiForm 
                    data={resumeData.experience} 
                    onChange={(val) => setResumeData(p => ({...p, experience: val}))}
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm 
                    data={resumeData.education} 
                    onChange={(val) => setResumeData(p => ({...p, education: val}))}
                  />
                )}
                {activeSection.id === "projects" && (
                  <ProjectForm 
                    data={resumeData.projects} 
                    onChange={(val) => setResumeData(p => ({...p, projects: val}))}
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm 
                    data={resumeData.skills} 
                    onChange={(val) => setResumeData(p => ({...p, skills: val}))}
                  />
                )}
              </div>

              <button 
                onClick={saveResume}
                className="w-full mt-10 py-4 bg-linear-to-r from-cyan-500 to-violet-500 hover:brightness-110 text-black font-semibold rounded-2xl transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* RIGHT - Preview */}
          <div className="lg:col-span-7">
            <div className="flex justify-end gap-3 mb-6">
              <button 
                onClick={changeResumeVisibility}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 border border-gray-700 hover:border-gray-500 rounded-2xl text-sm transition cursor-pointer"
              >
                {resumeData.public ? <EyeIcon className="size-4"/> : <EyeOffIcon className="size-4"/>}
                {resumeData.public ? "Public" : "Private"}
              </button>

              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 border border-gray-700 hover:border-gray-500 rounded-2xl text-sm transition cursor-pointer"
              >
                <Share2Icon className="size-4"/> Share
              </button>

              <button 
                onClick={downloadResume}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-2xl transition cursor-pointer"
              >
                <DownloadIcon className="size-4"/> Download
              </button>
            </div>

            <ResumePreview 
              data={resumeData} 
              template={resumeData.template} 
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder