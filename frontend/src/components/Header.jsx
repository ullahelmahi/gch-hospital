import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { alertConfirm } from "../utils/alert";

const Header = ({ onMenuClick }) => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await alertConfirm("You will be logged out");

    if (result.isConfirmed) {
      logout();
      navigate("/admin/login");
    }
  };

  return (
    <header
      className="
        h-16 flex items-center justify-between px-4
        bg-white dark:bg-slate-900
        border-b border-slate-200 dark:border-slate-700
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          className="
            md:hidden
            p-2 rounded-lg
            text-slate-700 dark:text-slate-200
            hover:bg-slate-100 dark:hover:bg-slate-800
            focus:outline-none
            focus:ring-2 focus:ring-primary/40
            transition
          "
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <h2 className="font-semibold text-slate-700 dark:text-slate-200">
          Welcome, {admin?.name || "Admin"}
        </h2>
      </div>

      {/* RIGHT */}
      <button
        onClick={handleLogout}
        className="
          px-4 py-2 rounded-lg
          bg-red-500 hover:bg-red-400
          text-white transition
        "
      >
        Logout
      </button>
    </header>
  );
};

export default Header;