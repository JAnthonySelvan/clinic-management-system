import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateProfile } from "../../features/auth/authSlice";

const DoctorProfile = () => {
  const dispatch = useAppDispatch();

  const { user, loading } = useAppSelector((state) => state.auth);

  const [preview, setPreview] = useState(
    user?.profileImage || "https://placehold.co/150x150",
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
    <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#253237]">My Profile</h1>

        <p className="mt-2 text-[#5C6B73]">
          Update your personal and professional information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 md:grid-cols-2"
      >
        <div className="md:col-span-2 flex justify-center">
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Doctor"
              className="h-36 w-36 rounded-full border-4 border-[#C2DFE3] object-cover"
            />

            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4 w-full rounded-xl border border-gray-300 p-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Full Name
          </label>

          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">Email</label>

          <input
            type="email"
            disabled
            title="Email cannot be changed here"
            {...register("email")}
            className="w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-[#5C6B73] outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">Phone</label>

          <input
            type="text"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Specialization
          </label>

          <input
            type="text"
            {...register("specialization", {
              required: "Specialization is required",
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />

          {errors.specialization && (
            <p className="mt-1 text-sm text-red-500">
              {errors.specialization.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Qualification
          </label>

          <input
            type="text"
            {...register("qualification", {
              required: "Qualification is required",
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />

          {errors.qualification && (
            <p className="mt-1 text-sm text-red-500">
              {errors.qualification.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Experience (years)
          </label>

          <input
            type="number"
            min="0"
            {...register("experience", {
              required: "Experience is required",
              valueAsNumber: true,
              min: { value: 0, message: "Experience can't be negative" },
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />

          {errors.experience && (
            <p className="mt-1 text-sm text-red-500">
              {errors.experience.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#253237] px-8 py-3 font-semibold text-white transition hover:bg-[#5C6B73] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
