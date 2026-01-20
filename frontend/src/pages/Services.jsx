import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import API from "../services/api";
import {
  alertSuccess,
  alertError,
  alertConfirm,
} from "../utils/alert";

const Services = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    price: "",
    icon: "Stethoscope",
    });

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await API.get("/services");
      setServices(data);
    } catch {
      alertError("Failed to load services");
    }
  };

  /* ================= HANDLERS ================= */
  const handleAdd = () => {
    setSelectedService(null);
    setForm({ title: "", description: "", price: "" });
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setForm({
        title: service.title,
        description: service.description,
        department: service.department,
        price: service.price,
        icon: service.icon || "Stethoscope",
    });
    setShowModal(true);
    };

  const handleDelete = async (id) => {
    const result = await alertConfirm(
      "This service will be permanently deleted"
    );

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/services/${id}`);
      alertSuccess("Deleted", "Service removed successfully");
      fetchServices();
    } catch {
      alertError("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedService) {
        await API.put(`/services/${selectedService._id}`, form);
        alertSuccess("Updated", "Service updated successfully");
      } else {
        await API.post("/services", form);
        alertSuccess("Added", "Service added successfully");
      }

      setShowModal(false);
      fetchServices();
    } catch {
      alertError("Save failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-slate-800">
          Services
        </h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-600 text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr
                key={service._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {service.title}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {service.description}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {service.price}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 rounded-lg border hover:bg-primary/10 text-primary"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(service._id)}
                      className="p-2 rounded-lg border hover:bg-red-50 text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {services.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-slate-500"
                >
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {selectedService ? "Edit Service" : "Add Service"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Service Title"
                className="w-full rounded-lg border px-4 py-2"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="w-full rounded-lg border px-4 py-2"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Department (e.g. Pathology)"
                className="w-full rounded-lg border px-4 py-2"
                value={form.department}
                onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                }
                required
              />

              <select
                className="w-full rounded-lg border px-4 py-2"
                value={form.icon}
                onChange={(e) =>
                    setForm({ ...form, icon: e.target.value })
                }
                >
                <option value="Stethoscope">Stethoscope</option>
                <option value="Microscope">Microscope</option>
                <option value="HeartPulse">Heart</option>
                <option value="Activity">Emergency</option>
                <option value="ShieldPlus">Protection</option>
              </select>

              <input
                type="text"
                placeholder="Price"
                className="w-full rounded-lg border px-4 py-2"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                required
              />

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
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

export default Services;