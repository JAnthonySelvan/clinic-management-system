import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addDoctor, clearDoctorError } from "../../features/doctor/doctorSlice";

const DEFAULT_AVATAR = "https://placehold.co/150x150?text=Doctor";

const AddDoctor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.doctor);
  const [preview, setPreview] = useState(DEFAULT_AVATAR);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearDoctorError());
    }
  }, [error, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("specialization", data.specialization);
      formData.append("experience", data.experience);
      formData.append("qualification", data.qualification);
      formData.append("password", data.password);
      formData.append("isActive", data.isActive === "true");
      formData.append("role", "doctor");

      // Only attach image if one was actually selected;
      // backend falls back to the static default image otherwise
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      await dispatch(addDoctor(formData)).unwrap();

      toast.success("Doctor added successfully");
      reset();
      setPreview(DEFAULT_AVATAR);
      setImageFile(null);
      navigate("/admin/doctors");
    } catch (err) {
      toast.error(err || "Failed to add doctor");
    }
  };

  return (
    <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#253237]">Add New Doctor</h1>
        <p className="mt-2 text-[#5C6B73]">
          Fill in the doctor's information below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Profile Image */}
        <div className="md:col-span-2 flex justify-center">
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Doctor"
              className="h-36 w-36 rounded-full border-4 border-[#C2DFE3] object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4 w-full rounded-xl border border-gray-300 p-2"
            />
            <p className="mt-1 text-xs text-[#5C6B73]">
              Optional — a default avatar will be used if none is uploaded.
            </p>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Dr. John Smith"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">Email</label>
          <input
            type="email"
            placeholder="doctor@example.com"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="+91 9876543210"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Specialization */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Specialization
          </label>
          <select
            {...register("specialization", {
              required: "Specialization is required",
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          >
            <option value="">Select Specialization</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="General Physician">General Physician</option>
          </select>
          {errors.specialization && (
            <p className="mt-1 text-sm text-red-500">
              {errors.specialization.message}
            </p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Experience (Years)
          </label>
          <input
            type="number"
            placeholder="10"
            {...register("experience", {
              required: "Experience is required",
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
          {errors.experience && (
            <p className="mt-1 text-sm text-red-500">
              {errors.experience.message}
            </p>
          )}
        </div>

        {/* Qualification */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Qualification
          </label>
          <input
            type="text"
            placeholder="MBBS, MD"
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

        {/* Password */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Password
          </label>
          <input
            type="password"
            placeholder="Temporary Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Status
          </label>
          <select
            {...register("isActive")}
            defaultValue="true"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/doctors")}
            className="rounded-xl border border-[#253237] px-8 py-3 font-semibold text-[#253237]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#253237] px-8 py-3 font-semibold text-white transition hover:bg-[#5C6B73] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Adding..." : "Add Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
