import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import galleryRoutes from "./routes/galleryRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/gallery", galleryRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GCH Backend API is running",
  });
});

export default app;