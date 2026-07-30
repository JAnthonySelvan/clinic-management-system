import { NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

const DoctorLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/doctor/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-[#F8FBFC]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#253237] text-white">
        <div className="border-b border-[#5C6B73] p-6">
          <h1 className="text-3xl font-bold">Saviours</h1>
          <p className="mt-1 text-sm text-[#C2DFE3]">Doctor Panel</p>
        </div>

        <nav className="flex flex-col gap-2 p-5">
          <NavLink
            to="/doctor/dashboard"
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 ${
                isActive ? "bg-[#5C6B73]" : "hover:bg-[#5C6B73]"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/doctor/appointments"
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 ${
                isActive ? "bg-[#5C6B73]" : "hover:bg-[#5C6B73]"
              }`
            }
          >
            My Appointments
          </NavLink>

          <NavLink
            to="/doctor/profile"
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 ${
                isActive ? "bg-[#5C6B73]" : "hover:bg-[#5C6B73]"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/doctor/settings"
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 ${
                isActive ? "bg-[#5C6B73]" : "hover:bg-[#5C6B73]"
              }`
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">
          <h2 className="text-2xl font-bold text-[#253237]">
            Doctor Dashboard
          </h2>

          <div className="flex items-center gap-4">
            <span className="font-medium text-[#253237]">
              {user?.fullName || "Doctor"}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
