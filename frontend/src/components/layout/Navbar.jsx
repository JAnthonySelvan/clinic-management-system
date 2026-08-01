import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaChevronDown,
  FaUserShield,
  FaUserMd,
} from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loginMenuRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Doctors", path: "/doctors" },
    { name: "Appointment", path: "/appointment" },
    { name: "Track", path: "/track-appointment" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginMenuRef.current &&
        !loginMenuRef.current.contains(event.target)
      ) {
        setLoginMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Subtle shadow/backdrop intensifies on scroll for a more premium feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#253237] text-lg font-bold text-white transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#5c6b73] group-hover:shadow-lg">
            S
          </div>

          <div className="flex flex-col leading-tight">
            <h1
              className="text-2xl font-bold text-[#253237] transition-colors duration-300 group-hover:text-[#5c6b73]"
              style={{ fontFamily: "Poppins" }}
            >
              Saviours
            </h1>
            <p className="text-xs text-[#5c6b73]">Healthcare Clinic</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-end gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `group relative py-1 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#253237]"
                    : "text-[#5c6b73] hover:text-[#253237]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#253237] transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          {/* Login Dropdown */}
          <div className="relative" ref={loginMenuRef}>
            <button
              onClick={() => setLoginMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full bg-[#253237] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-[#5c6b73] hover:shadow-lg active:scale-95"
            >
              <FaUserCircle className="transition-transform duration-300" />
              Login
              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${
                  loginMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Always rendered so opacity/scale transitions animate both in and out */}
            <div
              className={`absolute right-0 mt-2 w-48 origin-top-right overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out ${
                loginMenuOpen
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
              }`}
            >
              <Link
                to="/admin/login"
                onClick={() => setLoginMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-[#253237] transition-all duration-200 hover:bg-[#F8FBFC] hover:pl-6"
              >
                <FaUserShield className="text-[#5c6b73]" />
                Login as Admin
              </Link>

              <Link
                to="/doctor/login"
                onClick={() => setLoginMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-[#253237] transition-all duration-200 hover:bg-[#F8FBFC] hover:pl-6"
              >
                <FaUserMd className="text-[#5c6b73]" />
                Login as Doctor
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-[#253237] transition-transform duration-300 active:scale-90 lg:hidden"
        >
          <span
            className={`inline-block transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-144 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 border-t bg-white px-6 py-4 shadow-lg">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: isOpen ? `${index * 40}ms` : "0ms" }}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#253237] text-white"
                    : "text-[#5c6b73] hover:translate-x-1 hover:bg-[#c2dfe3] hover:text-[#253237]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#253237] px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#5c6b73]"
            >
              <FaUserShield />
              Admin
            </Link>

            <Link
              to="/doctor/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#253237] px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#5c6b73]"
            >
              <FaUserMd />
              Doctor
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
