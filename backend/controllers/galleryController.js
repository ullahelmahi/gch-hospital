import Gallery from "../models/Gallery.js";

// CREATE
export const createGallery = async (req, res) => {
  try {
    const payload = {
      title: req.body.title || "Hospital Gallery",
      image: req.body.image,
      category: req.body.category || "General",
      isActive: req.body.isActive ?? true,
    };

    if (!payload.image) {
      return res.status(400).json({
        message: "Image path is required",
      });
    }

    const item = await Gallery.create(payload);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ (public)
export const getGallery = async (req, res) => {
  try {
    const items = await Gallery.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to load gallery" });
  }
};

// READ (admin)
export const getAllGallery = async (req, res) => {
  try {
    const items = await Gallery.find()
      .sort({ order: 1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to load gallery" });
  }
};

// UPDATE
export const updateGallery = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.json(item);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
};

// DELETE
export const deleteGallery = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Gallery item removed" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};