import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.clear();

  console.log(`
════════════════════════════════════════════════════
🏥  Gaibandha Central Hospital System
════════════════════════════════════════════════════
🚀  Server Status   : RUNNING
🌐  Environment     : ${process.env.NODE_ENV || "development"}
🔌  Port            : ${PORT}
🕒  Started At      : ${new Date().toLocaleString()}
════════════════════════════════════════════════════
`);
});