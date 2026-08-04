import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, logout, clearError } from "../../features/auth/authSlice";
import { SITE_LOGO } from "../../constants/images";

const DoctorLogin = () => {
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
      if (user.role === "doctor") {
        toast.success("Login Successful");
        navigate("/doctor/dashboard");
      } else {
        toast.error("Only doctors can login here.");
        dispatch(logout());
        navigate("/doctor/login");
      }
    }
  }, [error, isAuthenticated, user, dispatch, navigate]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F8FBFC] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center flex flex-col items-center">
          <img
            src={SITE_LOGO}
            alt="SavioursClinic Logo"
            className="h-16 w-16 rounded-2xl object-cover shadow-md mb-4 border border-gray-100"
          />
          <h1 className="text-3xl font-bold text-[#253237]">Saviours<span className="text-[#5c6b73]">Clinic</span></h1>
          <p className="mt-2 text-sm text-[#5C6B73]">
            Access your appointments and patient dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-2 block font-medium text-[#253237]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="doctor@example.com"
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
            className="w-full rounded-xl bg-[#253237] py-3 font-semibold text-white transition hover:bg-[#5C6B73] disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
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
