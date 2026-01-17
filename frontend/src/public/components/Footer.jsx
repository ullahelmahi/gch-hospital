import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
      {/* ===== TOP ACCENT STRIP ===== */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-sky-400 to-primary" />

      {/* ===== MAIN FOOTER ===== */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        
        {/* ===== BRAND ===== */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.jpeg"
              alt="GCH Logo"
              className="h-12 w-auto"
            />
            <h3 className="text-lg font-semibold text-white">
              Gaibandha Central Hospital
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            Gaibandha Central Hospital & Digital Pathology delivers trusted,
            affordable, and modern healthcare services with experienced doctors
            and advanced facilities.
          </p>

          <div className="flex items-center gap-2 text-primary font-semibold">
            <Phone size={16} />
            <span>Emergency: 880 1339-873031</span>
          </div>
        </div>

        {/* ===== QUICK LINKS ===== */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-5">
            Quick Links
          </h4>

          <ul className="space-y-3 text-sm">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Specialists", "/specialists"],
              ["Services", "/services"],
              ["Gallery", "/gallery"],
              ["Contact", "/contact"],
            ].map(([label, path]) => (
              <li key={path}>
                <Link
                  to={path}
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== CONTACT ===== */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-5">
            Contact Information
          </h4>

          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <MapPin size={16} className="text-primary mt-0.5" />
              <span>
                Bus Terminal–Khanakh Sharif Road, <br />
                Uttara, Gaibandha
              </span>
            </div>

            <div className="flex gap-3">
              <Phone size={16} className="text-primary" />
              <span>+880 1712-228740</span>
            </div>

            <div className="flex gap-3">
              <Mail size={16} className="text-primary" />
              <span>info@gchhospital.com</span>
            </div>

            <div className="flex gap-3">
              <Clock size={16} className="text-primary" />
              <span>24/7 Emergency & Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <span>
            © {new Date().getFullYear()} Gaibandha Central Hospital & Digital Pathology.
          </span>
          <span>
            Designed with care for better healthcare.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;