import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import API from "../services/api";
import { alertConfirm, alertSuccess, alertError } from "../utils/alert";

/* ================= DND ================= */
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ================= SORTABLE CARD ================= */
const SortableImageCard = ({ img, onDelete, onPreview }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: img._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        relative group rounded-lg overflow-hidden border
        bg-white cursor-grab active:cursor-grabbing
      "
    >
      <img
        src={img.image}
        alt={img.title}
        className="h-48 w-full object-cover"
        onClick={() => onPreview(img)}
      />

      <button
        onClick={() => onDelete(img._id)}
        className="
          absolute top-2 right-2
          p-2 rounded-full
          bg-red-500 text-white
          opacity-0 group-hover:opacity-100
          transition
        "
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
const Gallery = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [preview, setPreview] = useState(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await API.get("/gallery/all");
      setImages(data);
    } catch {
      alertError("Failed to load gallery");
    }
  };

  /* ================= ADD ================= */
  const handleAdd = async () => {
    if (!image || !title) {
      alertError("Image path and title are required");
      return;
    }

    const normalizedImage =
      image.startsWith("/") ? image : `/${image}`;

    try {
      await API.post("/gallery", {
        title,
        image: normalizedImage,
        category,
      });

      alertSuccess("Added", "Image added to gallery");
      setImage("");
      setTitle("");
      setCategory("General");
      fetchImages();
    } catch {
      alertError("Upload failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const result = await alertConfirm("Delete this image?");
    if (!result.isConfirmed) return;

    try {
      await API.delete(`/gallery/${id}`);
      alertSuccess("Deleted", "Image removed");
      fetchImages();
    } catch {
      alertError("Delete failed");
    }
  };

  /* ================= DRAG END ================= */
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex(i => i._id === active.id);
    const newIndex = images.findIndex(i => i._id === over.id);

    const newOrder = arrayMove(images, oldIndex, newIndex);
    setImages(newOrder);

    // persist order
    try {
      await Promise.all(
        newOrder.map((img, index) =>
          API.put(`/gallery/${img._id}`, { order: index })
        )
      );
    } catch {
      alertError("Failed to save order");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Gallery</h2>

      {/* ADD IMAGE */}
      <div className="grid md:grid-cols-4 gap-2">
        <input
          type="text"
          placeholder="Image path (e.g. images/gallery/img1.jpg)"
          className="border rounded-lg px-4 py-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Title"
          className="border rounded-lg px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category (OT / ICU / Events)"
          className="border rounded-lg px-4 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* GALLERY GRID */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images.map(i => i._id)}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <SortableImageCard
                key={img._id}
                img={img}
                onDelete={handleDelete}
                onPreview={setPreview}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* LIGHTBOX */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview.image}
            alt={preview.title}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;