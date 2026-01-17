import { useEffect, useState } from "react";
import API from "../../services/api";
import { Bell, AlertCircle } from "lucide-react";

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    API.get("/notices").then((res) => setNotices(res.data));
  }, []);

  const importantNotices = notices.filter(n => n.isImportant);
  const regularNotices = notices.filter(n => !n.isImportant);

  return (
    <section className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">

        {/* PAGE HEADER */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-2 text-blue-600">
            <Bell size={36} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Hospital Notices
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Please read the notices carefully for important updates
          </p>
        </div>

        {/* IMPORTANT NOTICES */}
        {importantNotices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
              <AlertCircle size={20} />
              Important Notice
            </h2>

            <div className="space-y-4">
              {importantNotices.map((notice) => (
                <div
                  key={notice._id}
                  className="bg-red-50 border-l-4 border-red-500
                             p-4 rounded shadow-sm"
                >
                  <h3 className="font-semibold text-slate-800">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-slate-700 mt-1">
                    {notice.description}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    📅 {new Date(notice.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALL NOTICES */}
        <div>
          <h2 className="text-lg font-semibold text-slate-700 mb-3">
            All Notices
          </h2>

          <div className="space-y-3">
            {regularNotices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white p-4 rounded border
                           hover:bg-slate-50 transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-slate-800">
                    {notice.title}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mt-1">
                  {notice.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOT NOTE */}
        <div className="mt-10 text-center text-sm text-slate-500">
          🔔 Please check this page regularly for updated information.
        </div>

      </div>
    </section>
  );
};

export default Notices;