import ai from "../config/ai.js";
import Resume from "../models/Resume.models.js";

// ✅ Enhance Professional Summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert in resume writing.

Enhance this professional summary:
"${userContent}"

Rules:
- 1-2 sentences
- ATS friendly
- Highlight skills and experience
- Return ONLY the improved text
`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const enhancedContent = result.text;

    return res.status(200).json({ enhancedContent });

  } catch (error) {
    console.error("SUMMARY ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


// ✅ Enhance Job Description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
Improve this job description:
"${userContent}"

- Use action verbs
- Add impact
- Keep it concise
- ATS friendly
- Return ONLY the improved text
`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const enhancedContent = result.text;

    return res.status(200).json({ enhancedContent });

  } catch (error) {
    console.error("JOB DESC ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


// ✅ Upload Resume + AI Parsing
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
Extract structured data from this resume:

${resumeText}

Return ONLY raw JSON. Do NOT wrap in markdown. Do NOT explain anything.

Format:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "full_name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "projects": [],
  "education": []
}
`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    let text = result.text;

    // 🔥 Clean response
    text = text.replace(/```json|```/g, "").trim();

    // 🔥 Parse JSON safely
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (err) {
      console.error("JSON Parse Error:", text);
      return res.status(400).json({ message: "AI returned invalid JSON" });
    }

    // 🔥 Save to DB
    const newResume = await Resume.create({
      userId: req.userId,
      title: title || "Generated Resume",
      ...parsedData,
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};