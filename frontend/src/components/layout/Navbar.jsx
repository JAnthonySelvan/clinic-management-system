import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Doctors", path: "/doctors" },
    { name: "Appointment", path: "/appointment" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#253237] text-lg font-bold text-white">
            S
          </div>

          <div className="flex flex-col leading-tight">
            <h1
              className="text-2xl font-bold text-[#253237]"
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
                `relative text-sm font-medium transition duration-300 ${
                  isActive
                    ? "text-[#253237]"
                    : "text-[#5c6b73] hover:text-[#253237]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/admin/login"
            className="flex items-center gap-2 rounded-full bg-[#253237] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5c6b73]"
          >
            <FaUserCircle />
            Login
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-[#253237] lg:hidden"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="space-y-2 border-t bg-white px-6 py-4 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#253237] text-white"
                    : "text-[#5c6b73] hover:bg-[#c2dfe3] hover:text-[#253237]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/admin/login"
            onClick={() => setIsOpen(false)}
            className="mt-3 block rounded-2xl bg-[#253237] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#5c6b73]"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
