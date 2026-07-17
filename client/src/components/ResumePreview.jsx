// src/components/ResumePreview.jsx

import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ClassicTemplate from './templates/ClassicTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className="w-full bg-[#05050a] flex justify-center py-8 min-h-screen">
      
      <div
        id="resume-preview"
        className={`bg-white border border-gray-200 shadow-2xl ${classes}`}
        style={{ 
          width: "210mm", 
          minHeight: "297mm",
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.4)'
        }}
      >
        {renderTemplate()}
      </div>

      <style jsx>{`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: white;
          }

          body * {
            visibility: hidden;
          }

          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 210mm;
            min-height: 297mm;
            transform: scale(1);
            transform-origin: top left;
            page-break-inside: avoid;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

    </div>
  )
}

export default ResumePreview