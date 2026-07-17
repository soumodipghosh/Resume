// src/components/PersonalInfoForm.jsx

import React from 'react'
import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'

const PersonalInfoForm = ({ data = {}, onChange, removeBackground, setRemoveBackground }) => {

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel", required: true },
    { key: "location", label: "Location", icon: MapPin, type: "text", required: true },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text", required: true },
    { key: "linkedin", label: "LinkedIn profile", icon: Linkedin, type: "url", required: true },
    { key: "website", label: "Professional website", icon: Globe, type: "url", required: false }
  ]

  return (
    <div className="space-y-8 p-5 sm:p-8 bg-[#0f0f17] border border-gray-700 rounded-3xl min-h-screen sm:min-h-0">
      
      <div>
        <h3 className="text-2xl font-semibold text-white">Personal Information</h3>
        <p className="text-gray-400 mt-1">Get started with the basic details</p>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <label className="cursor-pointer group mx-auto sm:mx-0">
          {data?.image ? (
            <img
              src={typeof data.image === "string" ? data.image : URL.createObjectURL(data.image)}
              alt="profile"
              className="w-28 h-28 rounded-2xl object-cover ring-2 ring-gray-700 group-hover:ring-cyan-500 transition-all"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-2xl group-hover:border-cyan-500 transition-all">
              <User className="size-12 text-gray-500" />
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {typeof data?.image === "object" && (
          <div className="mt-4 sm:mt-8 text-center sm:text-left">
            <p className="text-sm text-gray-400 mb-2">Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() => setRemoveBackground(prev => !prev)}
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-cyan-500 transition"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></span>
            </label>
          </div>
        )}
      </div>

      {/* Input Fields - Better Mobile Responsive */}
      <div className="grid grid-cols-1 gap-7">
        {fields.map((field) => {
          const Icon = field.icon
          return (
            <div key={field.key} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <Icon className="size-4" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-5 py-4 bg-gray-900 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-base"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PersonalInfoForm