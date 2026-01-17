import { useEffect, useState } from "react";
import { Users, Stethoscope, Bell } from "lucide-react";
import Swal from "sweetalert2";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    services: 0,
    notices: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [doctorsRes, servicesRes, noticesRes] = await Promise.all([
        API.get("/doctors"),
        API.get("/services"),
        API.get("/notices"),
      ]);

      setStats({
        doctors: doctorsRes.data.length,
        services: servicesRes.data.length,
        notices: noticesRes.data.length,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to load dashboard stats", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

    const StatCard = ({ title, value, icon: Icon, color, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white rounded-xl shadow-sm border p-6 cursor-pointer
                hover:shadow-md hover:-translate-y-0.5 transition"
    >
        <div className="flex items-center justify-between">
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <h2 className="text-3xl font-bold mt-1">{value}</h2>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon size={28} className="text-white" />
        </div>
        </div>
    </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
            title="Doctors"
            value={stats.doctors}
            icon={Users}
            color="bg-blue-500"
            onClick={() => navigate("/admin/doctors")}
        />

        <StatCard
            title="Services"
            value={stats.services}
            icon={Stethoscope}
            color="bg-green-500"
            onClick={() => navigate("/admin/services")}
        />

        <StatCard
            title="Notices"
            value={stats.notices}
            icon={Bell}
            color="bg-purple-500"
            onClick={() => navigate("/admin/notices")}
        />
      </div>
    </div>
  );
};

export default Dashboard;