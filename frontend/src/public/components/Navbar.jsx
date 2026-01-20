import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-md font-medium transition-all duration-200
     ${isActive
       ? "bg-blue-600 text-white"
       : "text-slate-700 hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-md"
     }
     hover:animate-[wiggle_0.25s_ease-in-out]`;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.jpeg"
            alt="GCH Logo"
            className="h-10 w-auto"
          />
          <div>
            <h1 className="font-bold text-blue-700 leading-tight">
              Gaibandha Central Hospital
            </h1>
            <p className="text-xs text-slate-500">
              & Digital Pathology
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/specialists" className={linkClass}>Specialists</NavLink>
          <NavLink to="/messages" className={linkClass}>Messages</NavLink>
          <NavLink to="/services" className={linkClass}>Services</NavLink>
          <NavLink to="/notice" className={linkClass}>Notice</NavLink>
          <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-blue-50 transition"
          aria-label="Menu"
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/specialists" className={linkClass} onClick={() => setOpen(false)}>Specialists</NavLink>
            <NavLink to="/messages" className={linkClass} onClick={() => setOpen(false)}>Messages</NavLink>
            <NavLink to="/services" className={linkClass} onClick={() => setOpen(false)}>Services</NavLink>
            <NavLink to="/notice" className={linkClass} onClick={() => setOpen(false)}>Notice</NavLink>
            <NavLink to="/gallery" className={linkClass} onClick={() => setOpen(false)}>Gallery</NavLink>
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;