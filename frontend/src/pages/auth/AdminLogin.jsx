function AdminLogin() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-16 bg-[#e0fbfc]">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-3xl font-bold text-[#253237]">
          Admin Login
        </h1>
        <p className="mt-3 text-[#5c6b73]">
          Sign in to manage appointments, doctors, and dashboard reports.
        </p>
        <div className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-[#5c6b73]">
            Email address
            <input
              type="email"
              placeholder="admin@example.com"
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#253237] focus:ring-2 focus:ring-[#9db4c0]"
            />
          </label>
          <label className="block text-sm font-medium text-[#5c6b73]">
            Password
            <input
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#253237] focus:ring-2 focus:ring-[#9db4c0]"
            />
          </label>
          <button className="w-full rounded-2xl bg-[#253237] px-4 py-3 text-white transition hover:bg-[#5c6b73]">
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
