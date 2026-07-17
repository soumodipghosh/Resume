import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import ai from "./config/ai.js";



//app
const app = express();


//port
const PORT = process.env.PORT || 3000


//database connection 
await connectDB()


//middlewere
app.use(express.json())
app.use(cors())


//route
app.get("/", (req, res) => {
    res.send("Server is live")
})


app.get("/test-ai", async (req, res) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Say hello in one line",
    });

    res.send(result.text);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json(err);
  }
});



app.use("/api/users", userRouter)
app.use("/api/resumes", resumeRouter)
app.use("/api/ai", aiRouter)



//listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})