import { useEffect, useState } from "react";
import API from "../../services/api";
import DoctorCard from "../components/DoctorCard";
import { PhoneCall, CalendarCheck } from "lucide-react";

const slides = [
  "/images/slider/banner.jpg",
  "/images/slider/banner2.jpg",
  "/images/slider/img3.jpg",
];

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  /* ===== DOCTORS PREVIEW ===== */
  useEffect(() => {
    API.get("/doctors")
      .then((res) => setDoctors(res.data.slice(0, 4)))
      .catch(() => {});
  }, []);

  /* ===== SLIDER AUTO PLAY ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white">

      {/* ================= SLIDER ================= */}
      <div className="relative h-[70vh] overflow-hidden">
        {slides.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt="Hospital"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">
              Gaibandha Central Hospital
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Trusted Healthcare & Digital Pathology Services
            </p>
          </div>
        </div>
      </div>

      {/* ================= WELCOME ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Welcome to Gaibandha Central Hospital
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-slate-600 leading-relaxed">
          We are committed to delivering modern, ethical, and affordable
          healthcare services with experienced doctors, advanced diagnostics,
          and patient-focused care.
        </p>
      </div>

      {/* ================= FACILITIES ================= */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Experienced Doctors",
              desc: "Highly qualified specialists across multiple disciplines.",
            },
            {
              title: "Modern Facilities",
              desc: "ICU, OT, Digital Pathology, and advanced diagnostics.",
            },
            {
              title: "24/7 Emergency",
              desc: "Round-the-clock emergency and patient support services.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-blue-700 text-lg">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SPECIALIST DOCTORS ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-10">
          Our Specialist Doctors
        </h2>

        {doctors.length === 0 ? (
          <p className="text-center text-slate-500">
            Loading specialists...
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="/specialists"
            className="inline-block px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition"
          >
            View All Specialists
          </a>
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            We Provide the Highest Level of Satisfaction Care & Services
          </h2>

          <p className="mt-4 text-xl font-semibold flex justify-center items-center gap-2">
            <PhoneCall /> +8801339-873132
          </p>

          <a
            href="/contact"
            className="
              inline-flex items-center gap-2
              mt-8 px-8 py-3 rounded-lg
              bg-white text-blue-700 font-semibold
              hover:bg-slate-100
              hover:-translate-y-1
              transition-all
            "
          >
            <CalendarCheck />
            Make an Appointment
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
