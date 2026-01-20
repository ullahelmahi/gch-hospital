import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";
import API from "../services/api";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  /* Fetch notices */
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/notices");
      setNotices(data);
    } catch (err) {
      Swal.fire("Error", "Failed to load notices", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  /* Add / Edit */
  const handleAddEdit = async (notice = null) => {
    const { value: formData } = await Swal.fire({
      title: notice ? "Edit Notice" : "Add Notice",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${notice?.title || ""}">
        <textarea id="desc" class="swal2-textarea" placeholder="Description">${notice?.description || ""}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => ({
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
      }),
      showCancelButton: true,
      confirmButtonText: "Save",
    });

    if (!formData) return;

    try {
      if (notice) {
        await API.put(`/notices/${notice._id}`, formData);
        Swal.fire("Updated", "Notice updated successfully", "success");
      } else {
        await API.post("/notices", formData);
        Swal.fire("Created", "Notice added successfully", "success");
      }
      fetchNotices();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Action failed", "error");
    }
  };

  /* Delete */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Notice?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/notices/${id}`);
      Swal.fire("Deleted", "Notice removed", "success");
      fetchNotices();
    } catch {
      Swal.fire("Error", "Failed to delete notice", "error");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Notices</h1>
        <button
          onClick={() => handleAddEdit()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          Add Notice
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 text-slate-600 text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Created</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-8">
                  Loading...
                </td>
              </tr>
            ) : notices.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-slate-500">
                  No notices found
                </td>
              </tr>
            ) : (
              notices.map((n) => (
                <tr
                  key={n._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{n.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleAddEdit(n)}
                        className="p-2 rounded-lg border text-slate-600 hover:text-primary hover:bg-primary/10"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(n._id)}
                        className="p-2 rounded-lg border text-slate-600 hover:text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notices;