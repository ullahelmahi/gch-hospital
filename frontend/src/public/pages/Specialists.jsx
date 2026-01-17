import { useEffect, useState } from "react";
import API from "../../services/api";
import DoctorCard from "../components/DoctorCard";

const Specialists = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("All");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get("/doctors");
        setDoctors(data);
      } catch (error) {
        console.error("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  /* ===== DERIVE DEPARTMENTS ===== */
  const departments = [
    "All",
    ...new Set(
      doctors
        .map((d) => d.department)
        .filter(Boolean)
    ),
  ];

  /* ===== FILTER DOCTORS ===== */
  const filteredDoctors =
    department === "All"
      ? doctors
      : doctors.filter(
          (d) => d.department === department
        );

  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">
            Our Specialists
          </h1>
          <p className="mt-3 text-slate-600">
            Meet our experienced and dedicated medical specialists
          </p>
        </div>

        {/* Department Filter */}
        {!loading && departments.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {departments.map((dep) => (
              <button
                key={dep}
                onClick={() => setDepartment(dep)}
                className={`px-4 py-1.5 rounded-full text-sm border transition
                  ${
                    department === dep
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {dep}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center text-slate-500">
            Loading specialists...
          </p>
        )}

        {/* Grid */}
        {!loading && filteredDoctors.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredDoctors.length === 0 && (
          <p className="text-center text-slate-500">
            No specialists found for this department.
          </p>
        )}
      </div>
    </section>
  );
};

export default Specialists;