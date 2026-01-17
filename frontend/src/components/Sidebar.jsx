import { NavLink } from "react-router-dom";
import { Image } from "lucide-react";
import {
  LayoutDashboard,
  User,
  Stethoscope,
  Bell,
} from "lucide-react";

const Sidebar = ({ open, onClose }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition ${
      isActive
        ? "bg-sky-600 text-white"
        : "text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
    }`;

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64
        bg-white dark:bg-slate-900
        border-r border-slate-200 dark:border-slate-700
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:block
      `}
    >
      {/* Close (mobile) */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 text-xl text-slate-600 dark:text-slate-300"
      >
        ×
      </button>

      {/* Brand */}
      <div className="p-4 font-bold text-lg text-sky-600 border-b border-slate-200 dark:border-slate-700">
        GCH Admin
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-1 px-2">
        <NavLink
          to="/admin/dashboard"
          className={linkClass}
          onClick={onClose}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/doctors"
          className={linkClass}
          onClick={onClose}
        >
          <User size={18} />
          Doctors
        </NavLink>

        <NavLink
          to="/admin/services"
          className={linkClass}
          onClick={onClose}
        >
          <Stethoscope size={18} />
          Services
        </NavLink>

        <NavLink
          to="/admin/notices"
          className={linkClass}
          onClick={onClose}
        >
          <Bell size={18} />
          Notices
        </NavLink>

        <NavLink to="/admin/gallery" className={linkClass}>
            <Image size={18} />
            Gallery
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;