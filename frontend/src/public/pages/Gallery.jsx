import { useEffect, useState } from "react";
import API from "../../services/api";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await API.get("/gallery");
        setImages(data);
      } catch (error) {
        console.error("Failed to load gallery");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-10">
          Gallery
        </h1>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-slate-500">
            Loading gallery...
          </p>
        )}

        {/* EMPTY */}
        {!loading && images.length === 0 && (
          <p className="text-center text-slate-500">
            No images available.
          </p>
        )}

        {/* MASONRY GRID */}
        {!loading && images.length > 0 && (
          <div className="
            columns-1
            sm:columns-2
            md:columns-3
            lg:columns-4
            gap-6
          ">
            {images.map((img) => (
              <div
                key={img._id}
                className="
                  mb-6 break-inside-avoid
                  cursor-pointer
                  group
                "
                onClick={() => setPreview(img)}
              >
                <div className="
                  bg-white rounded-xl overflow-hidden
                  shadow hover:shadow-xl
                  transition-all duration-300
                ">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="
                      w-full object-cover
                      group-hover:scale-105
                      transition-transform duration-300
                    "
                  />

                  <div className="p-3 text-center">
                    <p className="text-sm font-medium text-slate-700">
                      {img.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {img.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {preview && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/80
            flex items-center justify-center
          "
          onClick={() => setPreview(null)}
        >
          <img
            src={preview.image}
            alt={preview.title}
            className="
              max-h-[90vh]
              max-w-[90vw]
              rounded-xl
              shadow-2xl
            "
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;