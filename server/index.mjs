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

// SCHEMA
const screenTimeNumber = {
  type: mongoose.Schema.Types.Mixed,
  default: {},
};

const urlSchema = new mongoose.Schema({
  url: { type: String, unique: true },
  screentime: screenTimeNumber,
});

const Url = mongoose.model("Url", urlSchema);

// ROUTES
app.get("/", (req, res) => res.json("Server is running"));

// POST: Save or update screen time for a URL
app.post("/api/save-url", async (req, res) => {
  const { url, screentime } = req.body;

  // Expecting: screentime = { "YYYY-MM-DD": Number }
  const date = Object.keys(screentime)[0];
  const newTime = screentime[date];

  try {
    const existing = await Url.findOne({ url });

    if (!existing) {
      // Create new document
      await Url.create({ url, screentime });
      return res.status(200).json({ success: true, message: "URL saved" });
    }

    // Update existing screen time
    const updatedTime = (existing.screentime?.[date] || 0) + newTime;

    await Url.updateOne(
      { url },
      { $set: { [`screentime.${date}`]: updatedTime } }
    );

    return res.status(200).json({ success: true, message: "URL Updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET: Return all URLs with screentime
app.get("/api/urls", async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/check-url", async (req, res) => {
  try {
    const { url } = req.body;

    const urlDoc = await Url.findOne({ url });
    if (!urlDoc) {
      res.json({ success: false, message: "Couldn't find the URL" });
      return;
    }
    res.json({ success: true, data: urlDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/update-screentime", async (req, res) => {
  try {
    const { url, screentime } = req.body;
    await Url.findOneAndUpdate(
      { url: url },
      { $set: { screentime: screentime } },
      { new: true }
    )
      .then((updatedDoc) => {
        console.log("Updated document:", updatedDoc);
      })
      .catch((err) => {
        console.error("Error updating:", err);
      });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});

app.post("/api/add-screentime", async (req, res) => {
  try {
    const { url, screentime } = req.body;
    await Url.findOneAndUpdate(
      { url: url },
      { $set: { screentime: screentime } },
      { new: true }
    )
      .then((updatedDoc) => {
        console.log("Updated document:", updatedDoc);
      })
      .catch((err) => {
        console.error("Error updating:", err);
      });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});
// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
