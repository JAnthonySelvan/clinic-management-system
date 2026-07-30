import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { changePassword } from "../../features/auth/authService";

const DoctorSettings = () => {
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSaving(true);

      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password changed successfully");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#253237]">Settings</h1>

        <p className="mt-2 text-[#5C6B73]">
          Manage your account settings and security.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Password Section */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-[#253237]">
            Change Password
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium text-[#253237]">
                Current Password
              </label>

              <input
                type="password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
              />

              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-[#253237]">
                New Password
              </label>

              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
              />

              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-[#253237]">
                Confirm Password
              </label>

              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
              />

              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-[#253237]">
            Notifications
          </h2>

          <p className="mb-4 text-sm text-[#5C6B73]">
            Notification preferences aren't saved yet — this needs backend
            support first (a preferences field on the user, plus an endpoint to
            update it). These toggles are visual only for now.
          </p>

          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked disabled />
              <span className="text-[#5C6B73]">Email Notifications</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked disabled />
              <span className="text-[#5C6B73]">Appointment Reminders</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" disabled />
              <span className="text-[#5C6B73]">Marketing Emails</span>
            </label>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#253237] px-8 py-3 font-semibold text-white transition hover:bg-[#5C6B73] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorSettings;
