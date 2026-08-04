import { Link, NavLink } from "react-router-dom";
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
} from "react-icons/fa";
import {
  SERVICE_DETAIL_IMAGES,
  ABOUT_DETAIL_IMAGES,
  SPECIALTY_IMAGES,
} from "../../constants/images";

// Standard medical icons for specialty links
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaTooth,
  FaEye,
  FaLungs,
} from "react-icons/fa";

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
    heroImage: ABOUT_DETAIL_IMAGES.visionMission.hero,
  },
  {
    key: "research-organization",
    name: "Research & Governance",
    path: "/about/research-organization",
    description: "Clinical innovation & medical board leadership",
    icon: FaFlask,
    emoji: "🔬",
    heroImage: ABOUT_DETAIL_IMAGES.research.hero,
  },
  {
    key: "medical-camps",
    name: "Medical Camps",
    path: "/about/medical-camps",
    description: "Community health outreach & free screening drives",
    icon: FaHandsHelping,
    emoji: "🩺",
    heroImage: ABOUT_DETAIL_IMAGES.medicalCamps.hero,
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);

  // Mobile accordion state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const [hoveredSpecialtySlug, setHoveredSpecialtySlug] = useState("cardiology");
  const [hoveredAboutKey, setHoveredAboutKey] = useState("vision-mission");
  const [scrolled, setScrolled] = useState(false);

  const loginMenuRef = useRef(null);
  const servicesMenuRef = useRef(null);
  const aboutMenuRef = useRef(null);

  const servicesTimeoutRef = useRef(null);
  const aboutTimeoutRef = useRef(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginMenuRef.current &&
        !loginMenuRef.current.contains(event.target)
      ) {
        setLoginMenuOpen(false);
      }
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target)
      ) {
        setServicesMenuOpen(false);
      }
      if (
        aboutMenuRef.current &&
        !aboutMenuRef.current.contains(event.target)
      ) {
        setAboutMenuOpen(false);
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

  // Hover handlers with 150ms leave delay for user-friendly diagonal movements
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesMenuOpen(true);
    setAboutMenuOpen(false);
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
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutMenuOpen(false);
    }, 150);
  };

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
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#253237] text-white shadow-md transition-transform duration-300 group-hover:scale-105">
              <FaStethoscope className="text-xl text-[#E0FBFC]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#253237]">
                Saviours<span className="text-[#5c6b73]">Clinic</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#5c6b73]">
                Excellence in Healthcare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
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
              className="relative"
              ref={aboutMenuRef}
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button
                onClick={() => setAboutMenuOpen((prev) => !prev)}
                className={`group flex items-center gap-1.5 py-1 text-sm font-medium transition-colors duration-300 ${
                  aboutMenuOpen
                    ? "text-[#253237]"
                    : "text-[#5c6b73] hover:text-[#253237]"
                }`}
              >
                About Us
                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    aboutMenuOpen ? "rotate-180 text-[#253237]" : "text-[#5c6b73]"
                  }`}
                />
              </button>

              {/* About Mega-Menu Dropdown Panel (w-[600px]) */}
              <div
                className={`absolute -left-12 mt-3 w-[600px] origin-top-left overflow-hidden rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out ${
                  aboutMenuOpen
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
              >
                <div className="flex gap-4">
                  {/* Left: 3 About Sub-pages List (64% Width) */}
                  <div className="w-[64%] space-y-1.5">
                    <div className="mb-2 px-3 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c6b73]">
                        Clinic Purpose & Governance
                      </span>
                    </div>

                    {ABOUT_ITEMS.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.key}
                          to={item.path}
                          onMouseEnter={() => setHoveredAboutKey(item.key)}
                          onClick={() => setAboutMenuOpen(false)}
                          className={`group flex items-start gap-3 rounded-2xl p-3 transition-all duration-200 ${
                            hoveredAboutKey === item.key
                              ? "bg-[#F8FBFC] border-l-3 border-[#253237] pl-4"
                              : "hover:bg-[#F8FBFC] hover:pl-4"
                          }`}
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#253237]/10 text-[#253237] shrink-0 group-hover:bg-[#253237] group-hover:text-white transition-all">
                            <IconComp className="text-sm" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#253237] group-hover:text-[#5c6b73] transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-[#5c6b73] leading-tight mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Right: Live-Updating Featured Image Panel (36% Width) */}
                  <div className="w-[36%] relative flex flex-col overflow-hidden rounded-2xl bg-[#253237] shadow-inner min-h-[220px]">
                    <img
                      src={currentHoveredAbout.heroImage}
                      alt={currentHoveredAbout.name}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                    />
                    {/* Scrim Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/40 to-transparent" />

                    {/* Caption */}
                    <div className="relative mt-auto p-4 text-white z-10">
                      <div className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-md mb-1.5">
                        <span>{currentHoveredAbout.emoji}</span>
                        <span>Saviours Clinic</span>
                      </div>
                      <h3 className="text-sm font-bold leading-tight">
                        {currentHoveredAbout.name}
                      </h3>
                      <Link
                        to={currentHoveredAbout.path}
                        onClick={() => setAboutMenuOpen(false)}
                        className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9DB4C0] hover:text-white transition-colors"
                      >
                        <span>Learn More</span>
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mega-Menu Footer Bar */}
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 px-3">
                  <span className="text-xs text-[#5c6b73]">
                    Want an overview of Saviours Clinic?
                  </span>
                  <Link
                    to="/about"
                    onClick={() => setAboutMenuOpen(false)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#253237] transition-all hover:text-[#5c6b73] hover:translate-x-0.5"
                  >
                    <span>About Saviours Overview</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            </div>

          {/* Services Mega-Menu Trigger */}
          <div
            className="relative"
            ref={servicesMenuRef}
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button
              onClick={() => setServicesMenuOpen((prev) => !prev)}
              className={`group flex items-center gap-1.5 py-1 text-sm font-medium transition-colors duration-300 ${
                servicesMenuOpen ? "text-[#253237]" : "text-[#5c6b73] hover:text-[#253237]"
              }`}
            >
              Services
              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${
                  servicesMenuOpen ? "rotate-180 text-[#253237]" : "text-[#5c6b73]"
                }`}
              />
            </button>

            {/* Services Mega-Menu Editorial Dropdown Panel (w-[680px]) */}
            <div
              className={`absolute -left-36 mt-3 w-[680px] origin-top-left overflow-hidden rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out ${
                servicesMenuOpen
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
              }`}
            >
              <div className="flex gap-4">
                {/* Left: 2-Column Specialties List (62% Width) */}
                <div className="w-[62%]">
                  <div className="mb-2 px-3 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c6b73]">
                      Medical Departments & Specialties
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {SPECIALTY_ITEMS.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.slug}
                          to={`/services/${item.slug}`}
                          onMouseEnter={() => setHoveredSpecialtySlug(item.slug)}
                          onClick={() => setServicesMenuOpen(false)}
                          className={`group flex items-start gap-2.5 rounded-xl p-2 transition-all duration-200 ${
                            hoveredSpecialtySlug === item.slug
                              ? "bg-[#F8FBFC] border-l-2 border-[#253237] pl-3"
                              : "hover:bg-[#F8FBFC] hover:pl-3"
                          }`}
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#253237]/10 text-[#253237] shrink-0 group-hover:bg-[#253237] group-hover:text-white transition-all">
                            <IconComp className="text-xs" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#253237] group-hover:text-[#5c6b73] transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-[10px] text-[#5c6b73] leading-tight line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Dynamic Featured Live-Preview Image Panel (38% Width) */}
                <div className="w-[38%] relative flex flex-col overflow-hidden rounded-2xl bg-[#253237] shadow-inner min-h-[260px]">
                  <img
                    src={currentPreviewImage}
                    alt={currentHoveredItem.name}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                  />
                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/40 to-transparent" />

                  {/* Caption & Info */}
                  <div className="relative mt-auto p-4 text-white z-10">
                    <div className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-md mb-2">
                      <span>{currentHoveredItem.emoji}</span>
                      <span>Department Preview</span>
                    </div>
                    <h3 className="text-base font-bold leading-tight">
                      {currentHoveredItem.name}
                    </h3>
                    <p className="text-xs text-[#E0FBFC] mt-1 line-clamp-2">
                      {currentHoveredItem.description}
                    </p>

                    <Link
                      to={`/services/${currentHoveredItem.slug}`}
                      onClick={() => setServicesMenuOpen(false)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9DB4C0] hover:text-white transition-colors"
                    >
                      <span>Explore Department</span>
                      <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mega-Menu Footer Bar */}
              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 px-3">
                <span className="text-xs text-[#5c6b73]">
                  Need personalized medical consultation?
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
          </div>

          {/* Standard Navigation Links */}
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

          <NavLink
            to="/appointment"
            className={({ isActive }) =>
              `group relative py-1 text-sm font-medium transition-colors duration-300 ${
                isActive ? "text-[#253237]" : "text-[#5c6b73] hover:text-[#253237]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Appointment
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#253237] transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/track-appointment"
            className={({ isActive }) =>
              `group relative py-1 text-sm font-medium transition-colors duration-300 ${
                isActive ? "text-[#253237]" : "text-[#5c6b73] hover:text-[#253237]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Track
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#253237] transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

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

          {/* Login Dropdown */}
          <div className="relative" ref={loginMenuRef}>
            <button
              onClick={() => setLoginMenuOpen((prev) => !prev)}
              className="group relative flex items-center gap-2.5 rounded-lg bg-[#253237] px-4.5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#1b262b] hover:shadow-lg hover:shadow-[#253237]/20 border border-[#3b4c54]/40 active:translate-y-0.5"
            >
              <FaUserCircle className="text-sm text-[#9DB4C0] group-hover:text-white transition-colors" />
              <span>Login</span>
              <FaChevronDown
                className={`text-[10px] text-[#9DB4C0] transition-transform duration-300 ${
                  loginMenuOpen ? "rotate-180 text-white" : "group-hover:text-white"
                }`}
              />
            </button>

            <div
              className={`absolute right-0 mt-2.5 w-60 origin-top-right overflow-hidden rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black/10 border border-gray-100 transition-all duration-200 ease-out ${
                loginMenuOpen
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
              }`}
            >
              <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c6b73]">
                  Portal Authentication
                </p>
              </div>

              <Link
                to="/admin/login"
                onClick={() => setLoginMenuOpen(false)}
                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-[#253237] transition-all duration-200 hover:bg-[#253237] hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#253237]/10 text-[#253237] group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
                  <FaUserShield className="text-xs" />
                </div>
                <div>
                  <div className="font-bold">Admin Portal</div>
                  <div className="text-[10px] font-normal text-[#5c6b73] group-hover:text-[#E0FBFC] leading-tight">Management & Control</div>
                </div>
              </Link>

              <Link
                to="/doctor/login"
                onClick={() => setLoginMenuOpen(false)}
                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-[#253237] transition-all duration-200 hover:bg-[#253237] hover:text-white mt-1"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#253237]/10 text-[#253237] group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
                  <FaUserMd className="text-xs" />
                </div>
                <div>
                  <div className="font-bold">Doctor Portal</div>
                  <div className="text-[10px] font-normal text-[#5c6b73] group-hover:text-[#E0FBFC] leading-tight">Practitioner Dashboard</div>
                </div>
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
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
      </div>
    </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-200 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1.5 border-t bg-white px-6 py-4 shadow-lg max-h-[85vh] overflow-y-auto">
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

          {/* Mobile Accordion: About Us */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setMobileAboutOpen((prev) => !prev)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-[#5c6b73]"
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
                mobileAboutOpen ? "max-h-48 bg-[#F8FBFC] p-2" : "max-h-0"
              }`}
            >
              {ABOUT_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#253237] hover:bg-white"
                >
                  <span>{item.emoji}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="mt-1 block rounded-xl bg-[#253237] py-2 text-center text-xs font-bold text-white"
              >
                About Clinic Overview →
              </Link>
            </div>
          </div>

          {/* Mobile Accordion: Services */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-[#5c6b73]"
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

          <NavLink
            to="/appointment"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#253237] text-white"
                  : "text-[#5c6b73] hover:bg-[#c2dfe3] hover:text-[#253237]"
              }`
            }
          >
            Appointment
          </NavLink>

          <NavLink
            to="/track-appointment"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#253237] text-white"
                  : "text-[#5c6b73] hover:bg-[#c2dfe3] hover:text-[#253237]"
              }`
            }
          >
            Track Appointment
          </NavLink>

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
