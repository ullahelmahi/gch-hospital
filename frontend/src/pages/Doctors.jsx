import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import API from "../services/api";
import {
  alertSuccess,
  alertError,
  alertConfirm,
} from "../utils/alert";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  /* ===== FORM STATE (MATCHES SCHEMA) ===== */
  const [form, setForm] = useState({
    name: "",
    department: "",
    qualifications: "",
    specialization: "",
    hospitalAffiliation: "",
    visitingDays: "",
    visitingTime: "",
    photo: "",
  });

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await API.get("/doctors");
      setDoctors(data);
    } catch {
      alertError("Failed to load doctors");
    }
  };

  /* ===== HANDLERS ===== */
  const handleAdd = () => {
    setSelectedDoctor(null);
    setForm({
      name: "",
      department: "",
      qualifications: "",
      specialization: "",
      hospitalAffiliation: "",
      visitingDays: "",
      visitingTime: "",
      photo: "",
    });
    setShowModal(true);
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setForm({
      name: doctor.name || "",
      department: doctor.department || "",
      qualifications: doctor.qualifications?.join(", ") || "",
      specialization: doctor.specialization?.join(", ") || "",
      hospitalAffiliation: doctor.hospitalAffiliation || "",
      visitingDays: doctor.visitingSchedule?.days || "",
      visitingTime: doctor.visitingSchedule?.time || "",
      photo: doctor.photo || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await alertConfirm(
      "This doctor will be permanently deleted"
    );
    if (!result.isConfirmed) return;

    try {
      await API.delete(`/doctors/${id}`);
      alertSuccess("Deleted", "Doctor removed successfully");
      fetchDoctors();
    } catch {
      alertError("Delete failed");
    }
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      department: form.department,
      qualifications: form.qualifications
        .split(",")
        .map((q) => q.trim())
        .filter(Boolean),
      specialization: form.specialization
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      hospitalAffiliation: form.hospitalAffiliation,
      visitingSchedule: {
        days: form.visitingDays,
        time: form.visitingTime,
      },
      photo: form.photo,
    };

    try {
      if (selectedDoctor) {
        await API.put(`/doctors/${selectedDoctor._id}`, payload);
        alertSuccess("Updated", "Doctor updated successfully");
      } else {
        await API.post("/doctors", payload);
        alertSuccess("Added", "Doctor added successfully");
      }

      setShowModal(false);
      fetchDoctors();
    } catch {
      alertError("Save failed");
    }
  };

  /* ===== UI ===== */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800">
          Doctors
        </h2>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 transition"
        >
          <Plus size={18} />
          Add Doctor
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-600 text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">Affiliation</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doc) => (
              <tr
                key={doc._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {doc.name}
                </td>
                <td className="px-6 py-4">
                  {doc.department}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {doc.hospitalAffiliation || "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(doc)}
                      className="p-2 rounded-lg border hover:bg-primary/10 text-primary"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="p-2 rounded-lg border hover:bg-red-50 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {doctors.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-slate-500"
                >
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {selectedDoctor ? "Edit Doctor" : "Add Doctor"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Doctor Name"
                className="w-full rounded-lg border px-4 py-2"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Department"
                className="w-full rounded-lg border px-4 py-2"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Qualifications (comma separated)"
                className="w-full rounded-lg border px-4 py-2"
                value={form.qualifications}
                onChange={(e) =>
                  setForm({ ...form, qualifications: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Specialization (comma separated)"
                className="w-full rounded-lg border px-4 py-2"
                value={form.specialization}
                onChange={(e) =>
                  setForm({ ...form, specialization: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Hospital Affiliation"
                className="w-full rounded-lg border px-4 py-2"
                value={form.hospitalAffiliation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    hospitalAffiliation: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Visiting Days (e.g. Sun, Tue)"
                className="w-full rounded-lg border px-4 py-2"
                value={form.visitingDays}
                onChange={(e) =>
                  setForm({ ...form, visitingDays: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Visiting Time (e.g. 3 PM – 8 PM)"
                className="w-full rounded-lg border px-4 py-2"
                value={form.visitingTime}
                onChange={(e) =>
                  setForm({ ...form, visitingTime: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Photo URL (optional)"
                className="w-full rounded-lg border px-4 py-2"
                value={form.photo}
                onChange={(e) =>
                  setForm({ ...form, photo: e.target.value })
                }
              />

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;