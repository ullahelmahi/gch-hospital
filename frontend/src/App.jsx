import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= AUTH ================= */
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

/* ================= ADMIN ================= */
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import Notices from "./pages/Notices";
import Gallery from "./pages/Gallery";
import AdminLayout from "./layouts/AdminLayout";

/* ================= PUBLIC ================= */
import VisitorLayout from "./public/layouts/VisitorLayout";
import Home from "./public/pages/Home";
import Specialists from "./public/pages/Specialists";
import PublicServices from "./public/pages/Services";
import PublicNotices from "./public/pages/Notices";
import PublicGallery from "./public/pages/Gallery";
import About from "./public/pages/About";
import Contact from "./public/pages/Contact";
import Messages from "./public/pages/Messages";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route element={<VisitorLayout />}>
            <Route index element={<Home />} />
            <Route path="specialists" element={<Specialists />} />
            <Route path="messages" element={<Messages />} />
            <Route path="services" element={<PublicServices />} />
            <Route path="notice" element={<PublicNotices />} />
            <Route path="gallery" element={<PublicGallery />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* ================= ADMIN LOGIN ================= */}
          <Route path="/admin/login" element={<Login />} />

          {/* ================= ADMIN PROTECTED ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="services" element={<Services />} />
            <Route path="notices" element={<Notices />} />
            <Route path="gallery" element={<Gallery />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;