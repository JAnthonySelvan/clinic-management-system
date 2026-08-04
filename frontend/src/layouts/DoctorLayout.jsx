import { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaThLarge,
  FaCalendarCheck,
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaStethoscope,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { SITE_LOGO } from "../constants/images";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80&auto=format&fit=crop";

const DoctorLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/doctor/login", { replace: true });
  };

  const getBreadcrumbTitle = () => {
    const path = location.pathname;
    if (path.includes("/doctor/dashboard")) return "Dashboard Overview";
    if (path.includes("/doctor/appointments")) return "Appointments Management";
    if (path.includes("/doctor/schedule")) return "Schedule Settings";
    if (path.includes("/doctor/profile")) return "Doctor Profile";
    if (path.includes("/doctor/settings")) return "Account Settings";
    return "Portal Dashboard";
  };

  const navItems = [
    {
      to: "/doctor/dashboard",
      label: "Dashboard",
      icon: FaThLarge,
    },
    {
      to: "/doctor/appointments",
      label: "My Appointments",
      icon: FaCalendarCheck,
    },
    {
      to: "/doctor/schedule",
      label: "Schedule",
      icon: FaCalendarAlt,
    },
    {
      to: "/doctor/profile",
      label: "Profile",
      icon: FaUser,
    },
    {
      to: "/doctor/settings",
      label: "Settings",
      icon: FaCog,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FBFC]">
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[#253237]/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-linear-to-b from-[#253237] via-[#1f292d] to-[#162024] text-white shadow-2xl transition-transform duration-300 md:static md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-[#5C6B73]/30 px-6 py-6">
          <div className="flex items-center gap-3">
            <img
              src={SITE_LOGO}
              alt="SavioursClinic Logo"
              className="h-10 w-10 rounded-xl object-cover border border-white/20 shadow-xs"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Saviours<span className="text-[#C2DFE3]">Clinic</span></h1>
              <p className="text-[11px] font-medium tracking-wider text-[#C2DFE3] uppercase">
                Doctor Portal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white md:hidden"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Doctor Identity Card */}
        <div className="border-b border-[#5C6B73]/30 px-6 py-5">
          <div className="flex items-center gap-3.5 rounded-xl bg-white/5 p-3.5 border border-white/10">
            <div className="relative shrink-0">
              <img
                src={user?.profileImage || DEFAULT_AVATAR}
                alt={user?.fullName || "Doctor Profile"}
                onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-[#9DB4C0]/40"
              />
              <span
                className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#253237]"
                title="Online Status"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-bold text-white">
                {user?.fullName ? `Dr. ${user.fullName.replace(/^Dr\.\s*/i, "")}` : "Dr. Medical Specialist"}
              </h3>
              <p className="truncate text-xs font-medium text-[#C2DFE3]/80 mt-0.5">
                {user?.specialization || "Clinical Faculty"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 p-5 overflow-y-auto">
          {navItems.map((item) => {
            const IconComp = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-white/10 text-white font-semibold shadow-inner before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#9DB4C0] before:rounded-r-full before:scale-y-100"
                      : "text-[#C2DFE3]/90 hover:bg-white/5 hover:text-white before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#9DB4C0] before:rounded-r-full before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-300"
                  }`
                }
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white transition-colors group-hover:bg-[#9DB4C0]/20">
                  <IconComp className="text-base text-[#E0FBFC]" />
                </div>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info inside sidebar */}
        <div className="border-t border-[#5C6B73]/30 p-5 text-center text-xs text-[#5C6B73]">
          <p>© 2026 Saviours Health Care</p>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200/80 bg-white/95 px-6 md:px-8 py-4 backdrop-blur-md shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open sidebar"
              className="rounded-xl border border-gray-200 p-2 text-[#253237] hover:bg-gray-100 md:hidden"
            >
              <FaBars className="text-lg" />
            </button>

            {/* Breadcrumb Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5C6B73]">
                <span>Doctor Portal</span>
                <span>/</span>
                <span className="text-[#253237]">{getBreadcrumbTitle()}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#253237] mt-0.5">
                {getBreadcrumbTitle()}
              </h2>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Notification Bell */}
            <button
              type="button"
              title="Notifications"
              aria-label="View notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#253237] shadow-2xs hover:bg-gray-50 transition"
            >
              <FaBell className="text-sm text-[#5C6B73]" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {/* Doctor Avatar / Name Badge */}
            <div className="hidden sm:flex items-center gap-2.5 border-l border-gray-200 pl-4">
              <span className="text-sm font-bold text-[#253237]">
                {user?.fullName ? `Dr. ${user.fullName.replace(/^Dr\.\s*/i, "")}` : "Doctor"}
              </span>
            </div>

            {/* Icon-Only Circular Logout Button with Tooltip */}
            <button
              type="button"
              onClick={handleLogout}
              title="Logout from portal"
              aria-label="Logout"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#5C6B73] shadow-2xs transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 cursor-pointer"
            >
              <FaSignOutAlt className="text-sm" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
