import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaChevronDown,
  FaUserShield,
  FaUserMd,
  FaArrowRight,
  FaBullseye,
  FaFlask,
  FaHandsHelping,
  FaStethoscope,
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaTooth,
  FaEye,
  FaLungs,
} from "react-icons/fa";
import {
  SERVICE_DETAIL_IMAGES,
  ABOUT_DETAIL_IMAGES,
  SPECIALTY_IMAGES,
  SITE_LOGO,
} from "../../constants/images";

const SPECIALTY_ITEMS = [
  {
    slug: "cardiology",
    name: "Cardiology",
    description: "Heart & vascular health care",
    icon: FaHeartbeat,
    emoji: "🫀",
  },
  {
    slug: "neurology",
    name: "Neurology",
    description: "Brain, spine & nervous system",
    icon: FaBrain,
    emoji: "🧠",
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    description: "Joints, bones & spine surgery",
    icon: FaBone,
    emoji: "🦴",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    description: "Child health & wellness care",
    icon: FaBaby,
    emoji: "👶",
  },
  {
    slug: "dental",
    name: "Dental Care",
    description: "Complete oral care & surgery",
    icon: FaTooth,
    emoji: "🦷",
  },
  {
    slug: "eye-care",
    name: "Eye Care",
    description: "Vision testing & ophthalmology",
    icon: FaEye,
    emoji: "👁️",
  },
  {
    slug: "pulmonology",
    name: "Pulmonology",
    description: "Lungs & respiratory medicine",
    icon: FaLungs,
    emoji: "🫁",
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    description: "Primary care & routine checkups",
    icon: FaStethoscope,
    emoji: "🩺",
  },
];

const ABOUT_ITEMS = [
  {
    key: "vision-mission",
    name: "Vision & Mission",
    path: "/about/vision-mission",
    description: "Our purpose, core values & patient commitments",
    icon: FaBullseye,
    emoji: "🎯",
  },
  {
    key: "research-organization",
    name: "Research & Innovation",
    path: "/about/research-organization",
    description: "Clinical trials & medical advances",
    icon: FaFlask,
    emoji: "🧪",
  },
  {
    key: "medical-camps",
    name: "Community Medical Camps",
    path: "/about/medical-camps",
    description: "Free health outreach & wellness drives",
    icon: FaHandsHelping,
    emoji: "🏥",
  },
];

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [appointmentMenuOpen, setAppointmentMenuOpen] = useState(false);

  // Mobile accordion state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAppointmentOpen, setMobileAppointmentOpen] = useState(false);

  const [hoveredSpecialtySlug, setHoveredSpecialtySlug] = useState("cardiology");
  const [hoveredAboutKey, setHoveredAboutKey] = useState("vision-mission");
  const [scrolled, setScrolled] = useState(false);

  const loginMenuRef = useRef(null);
  const servicesMenuRef = useRef(null);
  const aboutMenuRef = useRef(null);
  const appointmentMenuRef = useRef(null);

  const servicesTimeoutRef = useRef(null);
  const aboutTimeoutRef = useRef(null);
  const appointmentTimeoutRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setLoginMenuOpen(false);
    setServicesMenuOpen(false);
    setAboutMenuOpen(false);
    setAppointmentMenuOpen(false);
  }, [location.pathname]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginMenuRef.current && !loginMenuRef.current.contains(event.target)) {
        setLoginMenuOpen(false);
      }
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target)) {
        setServicesMenuOpen(false);
      }
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(event.target)) {
        setAboutMenuOpen(false);
      }
      if (appointmentMenuRef.current && !appointmentMenuRef.current.contains(event.target)) {
        setAppointmentMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hover handlers with 150ms leave delay
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesMenuOpen(true);
    setAboutMenuOpen(false);
    setAppointmentMenuOpen(false);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
    }, 150);
  };

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setAboutMenuOpen(true);
    setServicesMenuOpen(false);
    setAppointmentMenuOpen(false);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutMenuOpen(false);
    }, 150);
  };

  const handleAppointmentMouseEnter = () => {
    if (appointmentTimeoutRef.current) clearTimeout(appointmentTimeoutRef.current);
    setAppointmentMenuOpen(true);
    setServicesMenuOpen(false);
    setAboutMenuOpen(false);
  };

  const handleAppointmentMouseLeave = () => {
    appointmentTimeoutRef.current = setTimeout(() => {
      setAppointmentMenuOpen(false);
    }, 150);
  };

  // Check route active states
  const isAboutActive = location.pathname.startsWith("/about");
  const isServicesActive = location.pathname.startsWith("/services");
  const isAppointmentActive =
    location.pathname.startsWith("/appointment") ||
    location.pathname.startsWith("/my-appointments");

  // Preview Image lookups
  const currentHoveredItem =
    SPECIALTY_ITEMS.find((item) => item.slug === hoveredSpecialtySlug) ||
    SPECIALTY_ITEMS[0];

  const currentPreviewImage =
    SERVICE_DETAIL_IMAGES[hoveredSpecialtySlug]?.hero ||
    SPECIALTY_IMAGES.cardiology;

  const currentHoveredAbout =
    ABOUT_ITEMS.find((item) => item.key === hoveredAboutKey) || ABOUT_ITEMS[0];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white border-b border-gray-100 py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={SITE_LOGO}
              alt="SavioursClinic Logo"
              className="h-11 w-11 rounded-2xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105 border border-gray-100"
            />
            <div>
              <span className="text-xl font-bold tracking-tight text-[#253237]">
                Saviours<span className="text-[#5c6b73]">Clinic</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#5c6b73]">
                Excellence in Healthcare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Right-aligned) */}
          <nav className="hidden lg:flex items-center space-x-7 ml-auto mr-6">
            {/* Home Link */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `group relative py-1 text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-[#253237]" : "text-[#5c6b73] hover:text-[#253237]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#253237] transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>

            {/* About Mega-Menu Trigger */}
            <div
              className="relative flex items-center"
              ref={aboutMenuRef}
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button
                onClick={() => setAboutMenuOpen((prev) => !prev)}
                className={`group relative flex items-center gap-1.5 py-1 text-sm font-medium transition-colors duration-300 ${
                  aboutMenuOpen || isAboutActive
                    ? "text-[#253237]"
                    : "text-[#5c6b73] hover:text-[#253237]"
                }`}
              >
                <span>About Us</span>
                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    aboutMenuOpen ? "rotate-180 text-[#253237]" : "text-[#5c6b73]"
                  }`}
                />
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#253237] transition-all duration-300 ease-out ${
                    aboutMenuOpen || isAboutActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>

              {/* About Mega-Menu Panel */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-3 top-full w-[600px] origin-top overflow-hidden rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out ${
                  aboutMenuOpen
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
              >
                <div className="flex gap-4">
                  <div className="w-[64%] space-y-1.5">
                    <div className="mb-2 px-3 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c6b73]">
                        About Saviours Clinic
                      </span>
                    </div>

                    {ABOUT_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.key}
                          to={item.path}
                          onMouseEnter={() => setHoveredAboutKey(item.key)}
                          onClick={() => setAboutMenuOpen(false)}
                          className={`group/item flex items-start gap-3 rounded-2xl p-3 transition-all duration-200 ${
                            hoveredAboutKey === item.key
                              ? "bg-[#F8FBFC] shadow-sm"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#253237] text-white shadow-sm transition-transform duration-200 group-hover/item:scale-105">
                            <Icon className="text-base" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#253237]">
                              <span>{item.name}</span>
                              <span className="text-sm">{item.emoji}</span>
                            </div>
                            <p className="mt-0.5 text-[11px] text-[#5c6b73] leading-snug">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                    <div className="pt-2">
                      <Link
                        to="/about"
                        onClick={() => setAboutMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl bg-[#253237] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#1c272a]"
                      >
                        <span>View Full Clinic Profile</span>
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>

                  <div className="w-[36%] overflow-hidden rounded-2xl bg-[#0d181d] p-3 text-white flex flex-col justify-between relative">
                    <img
                      src={
                        ABOUT_DETAIL_IMAGES[hoveredAboutKey] ||
                        ABOUT_DETAIL_IMAGES["vision-mission"]
                      }
                      alt={currentHoveredAbout.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-35 brightness-90"
                    />
                    <div className="relative z-10">
                      <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        Preview
                      </span>
                      <h4 className="mt-2 text-sm font-bold text-white leading-tight">
                        {currentHoveredAbout.name}
                      </h4>
                      <p className="mt-1 text-[11px] text-gray-200 leading-snug line-clamp-3">
                        {currentHoveredAbout.description}
                      </p>
                    </div>

                    <div className="relative z-10 pt-4">
                      <Link
                        to={currentHoveredAbout.path}
                        onClick={() => setAboutMenuOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C2DFE3] hover:underline"
                      >
                        <span>Explore details</span>
                        <FaArrowRight className="text-[9px]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Services Mega-Menu Trigger */}
            <div
              className="relative flex items-center"
              ref={servicesMenuRef}
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                onClick={() => setServicesMenuOpen((prev) => !prev)}
                className={`group relative flex items-center gap-1.5 py-1 text-sm font-medium transition-colors duration-300 ${
                  servicesMenuOpen || isServicesActive
                    ? "text-[#253237]"
                    : "text-[#5c6b73] hover:text-[#253237]"
                }`}
              >
                <span>Services</span>
                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    servicesMenuOpen ? "rotate-180 text-[#253237]" : "text-[#5c6b73]"
                  }`}
                />
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#253237] transition-all duration-300 ease-out ${
                    servicesMenuOpen || isServicesActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>

              {/* Services Mega-Menu Dropdown Panel */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-3 top-full w-[720px] origin-top overflow-hidden rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out ${
                  servicesMenuOpen
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
              >
                <div className="flex gap-5">
                  <div className="w-[65%]">
                    <div className="mb-3 px-1 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c6b73]">
                        Medical Departments & Specialties
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {SPECIALTY_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.slug}
                            to={`/services/${item.slug}`}
                            onMouseEnter={() => setHoveredSpecialtySlug(item.slug)}
                            onClick={() => setServicesMenuOpen(false)}
                            className={`group/item flex items-center gap-2.5 rounded-xl p-2 transition-all duration-200 ${
                              hoveredSpecialtySlug === item.slug
                                ? "bg-[#F8FBFC] shadow-sm"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#253237] text-white shadow-xs transition-transform duration-200 group-hover/item:scale-105">
                              <Icon className="text-xs" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1 text-xs font-bold text-[#253237] truncate">
                                <span>{item.name}</span>
                              </div>
                              <p className="text-[10px] text-[#5c6b73] truncate">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center px-1">
                      <span className="text-[11px] text-[#5c6b73]">
                        Need specialized care?
                      </span>
                      <Link
                        to="/services"
                        onClick={() => setServicesMenuOpen(false)}
                        className="flex items-center gap-2 text-xs font-bold text-[#253237] transition-all hover:text-[#5c6b73] hover:translate-x-0.5"
                      >
                        <span>View All Services</span>
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>

                  <div className="w-[35%] overflow-hidden rounded-2xl bg-[#0d181d] p-3 text-white flex flex-col justify-between relative">
                    <img
                      src={currentPreviewImage}
                      alt={currentHoveredItem.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-35 brightness-90"
                    />
                    <div className="relative z-10">
                      <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        {currentHoveredItem.emoji} Department
                      </span>
                      <h4 className="mt-2 text-sm font-bold text-white leading-tight">
                        {currentHoveredItem.name}
                      </h4>
                      <p className="mt-1 text-[11px] text-gray-200 leading-snug">
                        {currentHoveredItem.description}
                      </p>
                    </div>

                    <div className="relative z-10 pt-4">
                      <Link
                        to={`/services/${currentHoveredItem.slug}`}
                        onClick={() => setServicesMenuOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C2DFE3] hover:underline"
                      >
                        <span>View Department</span>
                        <FaArrowRight className="text-[9px]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctors Link */}
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `group relative py-1 text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-[#253237]" : "text-[#5c6b73] hover:text-[#253237]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Doctors
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#253237] transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>

            {/* Appointment Dropdown Trigger */}
            <div
              className="relative flex items-center"
              ref={appointmentMenuRef}
              onMouseEnter={handleAppointmentMouseEnter}
              onMouseLeave={handleAppointmentMouseLeave}
            >
              <button
                onClick={() => setAppointmentMenuOpen((prev) => !prev)}
                className={`group relative flex items-center gap-1.5 py-1 text-sm font-medium transition-colors duration-300 ${
                  appointmentMenuOpen || isAppointmentActive
                    ? "text-[#253237]"
                    : "text-[#5c6b73] hover:text-[#253237]"
                }`}
              >
                <span>Appointment</span>
                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    appointmentMenuOpen ? "rotate-180 text-[#253237]" : "text-[#5c6b73]"
                  }`}
                />
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#253237] transition-all duration-300 ease-out ${
                    appointmentMenuOpen || isAppointmentActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>

              {/* Dropdown Card */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-3 top-full w-64 origin-top overflow-hidden rounded-2xl bg-white p-2.5 shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out ${
                  appointmentMenuOpen
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
              >
                <div className="space-y-1">
                  <Link
                    to="/appointment/book"
                    onClick={() => setAppointmentMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-2.5 transition duration-200 hover:bg-[#F8FBFC]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#253237] text-white shrink-0">
                      <FaStethoscope className="text-sm" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#253237]">Book Appointment</div>
                      <div className="text-[10px] text-[#5c6b73]">Schedule doctor consultation</div>
                    </div>
                  </Link>

                  <Link
                    to="/my-appointments"
                    onClick={() => setAppointmentMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-2.5 transition duration-200 hover:bg-[#F8FBFC]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C2DFE3] text-[#253237] shrink-0">
                      <FaUserCircle className="text-sm" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#253237]">My Appointments</div>
                      <div className="text-[10px] text-[#5c6b73]">View & manage family profiles</div>
                    </div>
                  </Link>

                  <Link
                    to="/appointment"
                    onClick={() => setAppointmentMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-2.5 transition duration-200 hover:bg-[#F8FBFC]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-[#5c6b73] shrink-0">
                      <FaBullseye className="text-sm" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#253237]">Overview & Guidelines</div>
                      <div className="text-[10px] text-[#5c6b73]">Booking policies & details</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Link */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `group relative py-1 text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-[#253237]" : "text-[#5c6b73] hover:text-[#253237]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Contact
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#253237] transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </nav>

          {/* Header Portal Login Button */}
          <div className="hidden lg:flex items-center shrink-0">
            {/* Login Dropdown */}
            <div className="relative flex items-center" ref={loginMenuRef}>
              <button
                onClick={() => setLoginMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-[#F8FBFC] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#253237] shadow-xs transition-all duration-300 hover:bg-white hover:shadow-sm"
              >
                <FaUserCircle className="text-sm text-[#5c6b73]" />
                <span>Portal Login</span>
                <FaChevronDown
                  className={`text-[10px] transition-transform duration-300 ${
                    loginMenuOpen ? "rotate-180 text-[#253237]" : "text-[#5c6b73]"
                  }`}
                />
              </button>

              <div
                className={`absolute right-0 mt-3 top-full w-48 origin-top-right overflow-hidden rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 transition-all duration-200 ease-out ${
                  loginMenuOpen
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
              >
                <div className="space-y-1">
                  <Link
                    to="/admin/login"
                    onClick={() => setLoginMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl p-2 text-xs font-semibold text-[#253237] transition duration-200 hover:bg-[#F8FBFC]"
                  >
                    <FaUserShield className="text-sm text-[#5c6b73]" />
                    <span>Admin Portal</span>
                  </Link>

                  <Link
                    to="/doctor/login"
                    onClick={() => setLoginMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl p-2 text-xs font-semibold text-[#253237] transition duration-200 hover:bg-[#F8FBFC]"
                  >
                    <FaUserMd className="text-sm text-[#5c6b73]" />
                    <span>Doctor Portal</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F8FBFC] text-[#253237] shadow-xs border border-gray-200 focus:outline-none"
            >
              {isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[700px] opacity-100 border-b border-gray-200 bg-white" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-4 pt-3 pb-6">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#253237] text-white"
                  : "text-[#5c6b73] hover:bg-[#c2dfe3] hover:text-[#253237]"
              }`
            }
          >
            Home
          </NavLink>

          {/* Mobile About Accordion */}
          <div>
            <button
              onClick={() => setMobileAboutOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-medium text-[#5c6b73] hover:bg-[#c2dfe3] hover:text-[#253237]"
            >
              <span>About Us</span>
              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${
                  mobileAboutOpen ? "rotate-180 text-[#253237]" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileAboutOpen ? "max-h-60 bg-[#F8FBFC] p-2" : "max-h-0"
              }`}
            >
              <div className="space-y-1">
                {ABOUT_ITEMS.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-xl bg-white p-2.5 text-xs font-semibold text-[#253237] shadow-xs"
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Services Accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-medium text-[#5c6b73] hover:bg-[#c2dfe3] hover:text-[#253237]"
            >
              <span>Medical Services</span>
              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${
                  mobileServicesOpen ? "rotate-180 text-[#253237]" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileServicesOpen ? "max-h-96 bg-[#F8FBFC] p-2" : "max-h-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-1.5">
                {SPECIALTY_ITEMS.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/services/${item.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-xl bg-white p-2 text-xs font-semibold text-[#253237] shadow-xs"
                  >
                    <span>{item.emoji}</span>
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </div>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className="mt-2 block rounded-xl bg-[#253237] py-2 text-center text-xs font-bold text-white"
              >
                View All Services →
              </Link>
            </div>
          </div>

          <NavLink
            to="/doctors"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#253237] text-white"
                  : "text-[#5c6b73] hover:bg-[#c2dfe3] hover:text-[#253237]"
              }`
            }
          >
            Doctors
          </NavLink>

          {/* Mobile Appointment Accordion */}
          <div>
            <button
              onClick={() => setMobileAppointmentOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-medium text-[#5c6b73] hover:bg-[#c2dfe3] hover:text-[#253237]"
            >
              <span>Appointment</span>
              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${
                  mobileAppointmentOpen ? "rotate-180 text-[#253237]" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileAppointmentOpen ? "max-h-48 bg-[#F8FBFC] p-2" : "max-h-0"
              }`}
            >
              <div className="space-y-1.5">
                <Link
                  to="/appointment/book"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-white p-2.5 text-xs font-semibold text-[#253237] shadow-xs"
                >
                  <FaStethoscope className="text-[#C2DFE3]" />
                  <span>Book Appointment</span>
                </Link>

                <Link
                  to="/my-appointments"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-white p-2.5 text-xs font-semibold text-[#253237] shadow-xs"
                >
                  <FaUserCircle className="text-[#5C6B73]" />
                  <span>My Appointments</span>
                </Link>

                <Link
                  to="/appointment"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-white p-2.5 text-xs font-semibold text-[#253237] shadow-xs"
                >
                  <FaBullseye className="text-[#5C6B73]" />
                  <span>Overview & Guidelines</span>
                </Link>
              </div>
            </div>
          </div>

          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#253237] text-white"
                  : "text-[#5c6b73] hover:bg-[#c2dfe3] hover:text-[#253237]"
              }`
            }
          >
            Contact
          </NavLink>

          {/* Login Actions */}
          <div className="mt-3 grid grid-cols-2 gap-2.5 pt-3 border-t border-gray-100">
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#253237] px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-[#1b262b]"
            >
              <FaUserShield className="text-sm text-[#9DB4C0]" />
              <span>Admin Login</span>
            </Link>

            <Link
              to="/doctor/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#253237] px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-[#1b262b]"
            >
              <FaUserMd className="text-sm text-[#9DB4C0]" />
              <span>Doctor Login</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
