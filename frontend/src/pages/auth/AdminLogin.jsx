import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, clearError } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth,
  );

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated && user) {
      if (user.role === "admin") {
        toast.success("Admin Login Successful");
        navigate("/admin/dashboard");
      } else {
        toast.error("Access denied. Only administrators can log in here.");
        dispatch(logout());
        navigate("/admin/login");
      }
    }
  }, [error, isAuthenticated, user, dispatch, navigate]);

  return (
    <section className="min-h-screen bg-[#F8FBFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#253237]">Admin Login</h1>

          <p className="mt-3 text-[#5C6B73]">
            Sign in to access the Saviours Clinic Admin Dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-2 block font-medium text-[#253237]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium text-[#253237]">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#253237] py-3 text-lg font-semibold text-white transition duration-300 hover:bg-[#5C6B73] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-[#5C6B73] transition hover:text-[#253237]"
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
