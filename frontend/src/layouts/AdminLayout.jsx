import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
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
      name: "Messages",
      path: "/admin/messages",
      icon: "💬",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FBFC]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#253237] text-white shadow-xl">
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
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex h-20 items-center justify-between bg-white px-8 shadow">
          <h2 className="text-2xl font-bold text-[#253237]">Admin Panel</h2>

          <div className="flex items-center gap-4">
            <span className="text-[#5C6B73]">Welcome, Admin</span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#253237] font-bold text-white">
              A
            </div>
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
