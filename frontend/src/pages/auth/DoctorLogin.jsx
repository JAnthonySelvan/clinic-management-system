import { Link } from "react-router-dom";

const DoctorLogin = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F8FBFC] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#253237]">Doctor Login</h1>

          <p className="mt-2 text-[#5C6B73]">
            Access your appointments and patient dashboard.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="mb-2 block font-medium text-[#253237]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="doctor@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-[#253237]">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#253237] py-3 font-semibold text-white transition hover:bg-[#5C6B73]"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-[#5C6B73] hover:text-[#253237]">
            ← Back to Website
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorLogin;
