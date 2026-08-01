import { NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from "../features/auth/authSlice";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "👨‍⚕️",
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: "📅",
    },
    {
      name: "Doctor Leaves",
      path: "/admin/leaves",
      icon: "🏖️",
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: "💬",
    },
  ];

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-[#F8FBFC]">
      {/* Sidebar */}
      <aside className="flex w-72 flex-col bg-[#253237] text-white shadow-xl">
        <div className="border-b border-[#5C6B73] p-6">
          <h1 className="text-2xl font-bold">Saviours Clinic</h1>
          <p className="mt-1 text-sm text-[#C2DFE3]">Admin Dashboard</p>
        </div>

        <nav className="mt-6 flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-[#9DB4C0] text-[#253237] font-semibold"
                    : "hover:bg-[#5C6B73]"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#E0FBFC] transition hover:bg-red-600 hover:text-white"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex h-20 items-center justify-between bg-white px-8 shadow">
          <h2 className="text-2xl font-bold text-[#253237]">Admin Panel</h2>

          <div className="flex items-center gap-4">
            <span className="text-[#5C6B73]">
              Welcome, {user?.fullName || "Admin"}
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#253237] font-bold text-white">
              {user?.fullName?.charAt(0).toUpperCase() || "A"}
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-[#253237] px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
