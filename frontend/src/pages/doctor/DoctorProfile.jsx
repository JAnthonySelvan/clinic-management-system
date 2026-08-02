import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaBriefcase, FaStethoscope } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateProfile } from "../../features/auth/authSlice";
import { HERO_IMAGES } from "../../constants/images";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

const DoctorProfile = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const [preview, setPreview] = useState(
    user?.profileImage || DEFAULT_AVATAR,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      specialization: user?.specialization || "",
      qualification: user?.qualification || "",
      experience: user?.experience ?? "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("phone", data.phone);
    formData.append("specialization", data.specialization);
    formData.append("qualification", data.qualification);
    formData.append("experience", data.experience);

    const fileInput = document.getElementById("profileImageInput");
    if (fileInput?.files?.[0]) {
      formData.append("profileImage", fileInput.files[0]);
    }

    const result = await dispatch(updateProfile(formData));

    if (updateProfile.fulfilled.match(result)) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.payload || "Failed to update profile");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#253237]">
          My Profile
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#5C6B73]">
          Manage your personal credentials, contact info, and medical qualifications.
        </p>
      </div>

      {/* Two-Column Premium Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (~35%): Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg text-center relative">
            {/* Header Texture Banner */}
            <div className="relative h-28 bg-[#253237] -mx-6 -mt-6 mb-14 overflow-hidden">
              <img
                src={HERO_IMAGES.doctors}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#253237]/90" />
            </div>

            {/* Circular Frame with Hover Camera Overlay */}
            <div className="relative inline-block -mt-24 mb-4 group cursor-pointer">
              <img
                src={preview}
                alt={user?.fullName || "Doctor Profile"}
                onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl ring-4 ring-[#9DB4C0]/30"
              />

              {/* Hover Camera Overlay */}
              <label
                htmlFor="profileImageInput"
                className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-[#253237]/75 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer backdrop-blur-2xs"
              >
                <FaCamera className="text-xl mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Update
                </span>
              </label>

              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Doctor Info */}
            <h2 className="text-xl font-bold text-[#253237]">
              {user?.fullName ? `Dr. ${user.fullName.replace(/^Dr\.\s*/i, "")}` : "Dr. Medical Specialist"}
            </h2>

            <p className="mt-1 text-xs font-semibold text-[#5C6B73]">
              {user?.specialization || "Clinical Faculty"}
            </p>

            <div className="mt-6 border-t border-gray-100 pt-6 space-y-3 text-left">
              <div className="flex items-center justify-between rounded-xl bg-[#F8FBFC] p-3 text-xs border border-gray-200/70">
                <span className="font-semibold text-[#5C6B73]">Qualification</span>
                <span className="font-bold text-[#253237]">{user?.qualification || "M.D."}</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#F8FBFC] p-3 text-xs border border-gray-200/70">
                <span className="font-semibold text-[#5C6B73]">Experience</span>
                <span className="font-bold text-[#253237]">{user?.experience || 0}+ Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (~65%): Editable Profile Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-lg">
            <h2 className="text-xl font-bold text-[#253237] mb-6 border-b border-gray-100 pb-4">
              Edit Professional Credentials
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253237]">
                    <FaUser className="text-[#5C6B73]" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("fullName", { required: "Full name is required" })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email (Disabled) */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253237]">
                    <FaEnvelope className="text-[#5C6B73]" />
                    <span>Email Address (Read-only)</span>
                  </label>
                  <input
                    type="email"
                    disabled
                    title="Email cannot be changed here"
                    {...register("email")}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-[#5C6B73] cursor-not-allowed outline-none font-mono"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253237]">
                    <FaPhone className="text-[#5C6B73]" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="text"
                    {...register("phone", { required: "Phone number is required" })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Specialization */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253237]">
                    <FaStethoscope className="text-[#5C6B73]" />
                    <span>Specialization</span>
                  </label>
                  <input
                    type="text"
                    {...register("specialization", {
                      required: "Specialization is required",
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
                  />
                  {errors.specialization && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.specialization.message}
                    </p>
                  )}
                </div>

                {/* Qualification */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253237]">
                    <FaGraduationCap className="text-[#5C6B73]" />
                    <span>Qualification</span>
                  </label>
                  <input
                    type="text"
                    {...register("qualification", {
                      required: "Qualification is required",
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
                  />
                  {errors.qualification && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.qualification.message}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#253237]">
                    <FaBriefcase className="text-[#5C6B73]" />
                    <span>Experience (Years)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("experience", {
                      required: "Experience is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Experience can't be negative" },
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
                  />
                  {errors.experience && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">
                      {errors.experience.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[#253237] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#5C6B73] hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {loading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
