import { useEffect, useState } from "react";

const SunIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 -2 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M21 12.79A9 9 0 0112.21 3c0 .34.02.67.05 1a7 7 0 009.74 9.74c.33.03.66.05 1 .05z" />
  </svg>
);

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle Dark Mode"
      className="relative inline-flex items-center h-8 w-16 rounded-full bg-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
    >
      {/* The sliding knob */}
      <span
        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
          dark ? "translate-x-8" : "translate-x-0"
        }`}
      />
      {/* Sun icon on left */}
      <span className="absolute left-2 top-1.5 text-gray-800 dark:text-gray-400 pointer-events-none">
        <SunIcon className="w-4 h-4" />
      </span>
      {/* Moon icon on right */}
      <span className="absolute right-2 top-1.5 text-gray-400 dark:text-gray-800 pointer-events-none">
        <MoonIcon className="w-6 h-6" />
      </span>
    </button>
  );
};

export default ThemeToggle;
