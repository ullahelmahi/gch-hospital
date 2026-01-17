import express from "express";
import {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} from "../controllers/noticeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getNotices);
router.get("/:id", getNoticeById);

// Admin
router.post("/", protect, createNotice);
router.put("/:id", protect, updateNotice);
router.delete("/:id", protect, deleteNotice);

export default router;