import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaLock, FaBell, FaShieldAlt, FaKey } from "react-icons/fa";

import { changePassword } from "../../features/auth/authService";
import { CTA_IMAGES } from "../../constants/images";

const DoctorSettings = () => {
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
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
    <div className="space-y-8">
      {/* Settings Security Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#253237] p-8 text-white shadow-xl border border-[#5C6B73]/30">
        <img
          src={CTA_IMAGES.background}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237] via-[#253237]/90 to-[#253237]/75" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md border border-white/20 mb-3">
              <FaShieldAlt className="text-xs text-[#C2DFE3]" />
              <span>Portal Security & Preferences</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Account Settings
            </h1>
            <p className="mt-2 text-sm text-[#E0FBFC]/90 max-w-xl leading-relaxed">
              Update your account password and review communication preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Card: Password Section (~65%) */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-lg">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[#253237]">
                <FaKey className="text-base" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#253237]">Change Password</h2>
                <p className="text-xs text-[#5C6B73]">Ensure your account uses a strong password.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253237]">
                  <FaLock className="text-[#5C6B73]" />
                  <span>Current Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
                />
                {errors.currentPassword && (
                  <p className="mt-1 text-xs text-rose-500 font-medium">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* New Password */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253237]">
                    <FaLock className="text-[#5C6B73]" />
                    <span>New Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
                  />
                  {errors.newPassword && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253237]">
                    <FaLock className="text-[#5C6B73]" />
                    <span>Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword", {
                      required: "Please confirm your new password",
                      validate: (value) =>
                        value === getValues("newPassword") || "Passwords do not match",
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#253237] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#5C6B73] hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {saving ? "Updating Password..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Card: Restyled Notification Switches (~35%) */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[#253237]">
                <FaBell className="text-base" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#253237]">Preferences</h2>
                <p className="text-xs text-[#5C6B73]">System notification options.</p>
              </div>
            </div>

            <p className="text-xs text-[#5C6B73] leading-relaxed">
              Notification preferences are currently displayed as visual placeholders until backend preference sync is enabled.
            </p>

            <div className="space-y-5 pt-2">
              {/* Email Notifications Pill Switch */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#253237]">Email Notifications</h4>
                  <p className="text-[11px] text-[#5C6B73]">Receive appointment updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked disabled className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#253237] opacity-80" />
                </label>
              </div>

              {/* Appointment Reminders Pill Switch */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <h4 className="text-xs font-bold text-[#253237]">Appointment Reminders</h4>
                  <p className="text-[11px] text-[#5C6B73]">Daily schedule alerts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked disabled className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#253237] opacity-80" />
                </label>
              </div>

              {/* Marketing Emails Pill Switch */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <h4 className="text-xs font-bold text-[#253237]">Marketing Emails</h4>
                  <p className="text-[11px] text-[#5C6B73]">Newsletters & medical updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" disabled className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#253237] opacity-80" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSettings;
