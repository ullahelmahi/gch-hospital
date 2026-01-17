import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { alertSuccess, alertError } from "../utils/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const { data } = await API.post("/admin/login", { email, password });

        login(data);

        alertSuccess(
            "Welcome!",
            `Hello ${data?.name || "Admin"}, login successful`
        );

        navigate("/admin/dashboard");
        } catch (error) {
        alertError(
            "Login Failed",
            error.response?.data?.message || "Invalid credentials"
        );
        }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md rounded-2xl bg-black/60 backdrop-blur-xl shadow-2xl border border-white/10 p-8">

        {/* LOGO (SAFE) */}
        <div className="flex justify-center mb-4">
          <img
            src="/images/logo.jpeg"
            alt="GCH Logo"
            className="h-14 w-auto"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-white">
          GCH Admin Panel
        </h1>
        <p className="text-center text-sm text-slate-400 mb-6">
          Secure hospital administration access
        </p>

        <form onSubmit={submitHandler} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-slate-100 text-black"
              placeholder="admin@gch.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full bg-slate-100 text-black pr-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON — FIXED */}
          <button
            type="submit"
            disabled={loading}
            className="
                w-full rounded-lg py-3
                bg-sky-500
                text-white text-base font-semibold
                hover:bg-sky-400
                active:bg-sky-600
                transition-colors duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
            "
            >
            {loading ? "Signing in..." : "Login"}
            </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          © {new Date().getFullYear()} Gaibandha Central Hospital
        </p>
      </div>
    </div>
  );
};

export default Login;