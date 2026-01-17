import express from "express";
import {
  createGallery,
  getGallery,
  getAllGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

const router = express.Router();

// PUBLIC
router.get("/", getGallery);

// ADMIN
router.get("/all", getAllGallery);
router.post("/", createGallery);
router.put("/:id", updateGallery);
router.delete("/:id", deleteGallery);

export default router;