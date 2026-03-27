import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      window.history.replaceState({}, document.title, "/");
      navigate("/");
    }
  }, [login, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--tea-yellow)]/10 dark:bg-[#1a2f1f]">
      <div className="p-8 rounded-3xl shadow-2xl backdrop-blur-md bg-white/60 dark:bg-black/60 border-2 border-[var(--tea-yellow)] dark:border-[var(--tea-green)] w-full max-w-md transition-all duration-300">

        <h2 className="text-3xl font-bold text-center text-[var(--tea-green)] dark:text-[var(--tea-yellow)] mb-2" style={{ fontFamily: 'cursive, sans-serif' }}>
          ☕ Welcome Back
        </h2>

        <p className="text-center text-[var(--tea-brown)] dark:text-gray-300 mb-6 italic">
          Ready to spill some tea?
        </p>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-3 rounded-2xl mb-4 text-sm border-l-4 border-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border-2 border-[var(--tea-yellow)] dark:border-[var(--tea-green)] bg-white dark:bg-[#1f2f24] p-4 rounded-2xl mb-4 focus:outline-none focus:ring-4 focus:ring-[var(--tea-green)]/30 dark:focus:ring-[var(--tea-yellow)]/30 transition-all text-gray-800 dark:text-gray-100"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border-2 border-[var(--tea-yellow)] dark:border-[var(--tea-green)] bg-white dark:bg-[#1f2f24] p-4 rounded-2xl mb-6 focus:outline-none focus:ring-4 focus:ring-[var(--tea-green)]/30 dark:focus:ring-[var(--tea-yellow)]/30 transition-all text-gray-800 dark:text-gray-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--tea-green)] text-white py-3.5 rounded-full font-bold hover:bg-[var(--tea-brown)] hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? "Brewing..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        {/* Google Login Button */}
        <a
          href="/api/auth/google"
          className="w-full block text-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all duration-200"
        >
          🔐 Sign in with Google
        </a>

        <p className="text-center text-sm mt-6 text-[var(--tea-brown)] dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-[var(--tea-green)] dark:text-[var(--tea-yellow)] font-bold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}