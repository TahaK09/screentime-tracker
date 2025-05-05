import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection
mongoose
  .connect(
    "mongodb+srv://taha_tt:ZATKOwaO52hYyi7S@screentime-tracker-app.denqajp.mongodb.net/?retryWrites=true&w=majority&appName=screentime-tracker-app"
  )
  .then(() => console.log("Connected to the DB"))
  .catch((err) => console.error("DB connection error:", err));

const screenTimeNumber = new mongoose.Schema({
  sunday: { type: Number, default: 0 },
  monday: { type: Number, default: 0 },
  tuesday: { type: Number, default: 0 },
  wednesday: { type: Number, default: 0 },
  thursday: { type: Number, default: 0 },
  friday: { type: Number, default: 0 },
  saturday: { type: Number, default: 0 },
});

const urlSchema = new mongoose.Schema({
  url: { type: String, unique: true },
  timeWeekly: screenTimeNumber,
});
const Url = mongoose.model("Url", urlSchema);

app.get("/", (req, res) => res.json("Server is running"));

// API to save a URL
app.post("/api/save-url", async (req, res) => {
  const { url, timeWeekly } = req.body;
  try {
    const existing = await Url.findOne({ url });
    if (!existing) {
      await Url.create({ url, timeWeekly });
      res.status(200).json({ success: true, message: "URL saved" });
    } else {
      await Url.updateOne({ url }, { $set: { timeWeekly } });
      res.status(200).json({ success: true, message: "URL Updated" });
    }
    res.status(500).json("Unknown error occured");
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// API to get all URLs
app.get("/api/urls", async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
