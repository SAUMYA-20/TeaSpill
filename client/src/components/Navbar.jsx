import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(dark ? "light" : "dark");
    root.classList.add(dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="shadow-xl backdrop-blur-md bg-white/40 dark:bg-black/40 border-b-2 border-[var(--tea-yellow)] dark:border-[var(--tea-green)] transition-all duration-300 rounded-b-3xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-3xl font-extrabold text-[var(--tea-green)] dark:text-[var(--tea-yellow)] transform -rotate-2 hover:rotate-0 transition-transform duration-300" style={{ fontFamily: 'cursive, sans-serif' }}>
          🍵 TeaSpill
        </Link>

        <div className="flex gap-4 items-center">

          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 rounded-full bg-[var(--tea-yellow)] text-[var(--tea-brown)] font-bold hover:bg-[#e5b520] hover:scale-105 transition-all duration-200 shadow-md"
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>

          {!token ? (
            <>
              <Link to="/login" className="font-semibold text-[var(--tea-brown)] dark:text-[var(--tea-yellow)] hover:text-[var(--tea-green)] dark:hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-[var(--tea-yellow)]/20">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[var(--tea-green)] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[var(--tea-brown)] hover:scale-105 transition-all duration-200 shadow-md"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-[var(--tea-brown)] text-[var(--tea-yellow)] px-5 py-2.5 rounded-full font-semibold hover:bg-[#4a3024] hover:scale-105 transition-all duration-200 shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}