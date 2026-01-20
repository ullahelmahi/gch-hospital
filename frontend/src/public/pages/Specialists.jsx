import { useEffect, useState } from "react";
import API from "../../services/api";
import DoctorCard from "../components/DoctorCard";
import DoctorModal from "../components/DoctorModal";

const Specialists = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  /* ================= FETCH DOCTORS ================= */
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get("/doctors");
        setDoctors(data);
      } catch (error) {
        console.error("Failed to load doctors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  /* ================= DEPARTMENTS ================= */
  const departments = [
    "All",
    ...new Set(
      doctors
        .map((d) => d.department)
        .filter(Boolean)
    ),
  ];

  /* ================= FILTER ================= */
  const filteredDoctors =
    department === "All"
      ? doctors
      : doctors.filter(
          (d) => d.department === department
        );

  /* ================= UI ================= */
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">
            Our Specialist Doctors
          </h1>
          <p className="mt-3 text-slate-600">
            Meet our experienced and dedicated medical professionals
          </p>
        </div>

        {/* DEPARTMENT FILTER */}
        {!loading && departments.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {departments.map((dep) => (
              <button
                key={dep}
                onClick={() => setDepartment(dep)}
                className={`
                  px-4 py-1.5 rounded-full text-sm border transition
                  ${
                    department === dep
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                {dep}
              </button>
            ))}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <p className="text-center text-slate-500">
            Loading specialists...
          </p>
        )}

        {/* DOCTOR GRID */}
        {!loading && filteredDoctors.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                onClick={() => setSelectedDoctor(doctor)}
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredDoctors.length === 0 && (
          <p className="text-center text-slate-500">
            No specialists found for this department.
          </p>
        )}
      </div>

      {/* MODAL */}
      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </section>
  );
};

export default Specialists;