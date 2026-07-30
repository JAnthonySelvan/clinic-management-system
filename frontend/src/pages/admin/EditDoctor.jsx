import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  editDoctor,
  clearDoctorError,
} from "../../features/doctor/doctorSlice";

const EditDoctor = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { doctors, loading, error } = useAppSelector((state) => state.doctor);

  const doctor = doctors.find((d) => d._id === id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!doctor) return;

    setValue("fullName", doctor.fullName);
    setValue("email", doctor.email);
    setValue("phone", doctor.phone);
    setValue("specialization", doctor.specialization);
    setValue("qualification", doctor.qualification);
    setValue("experience", doctor.experience);
    setValue("isActive", doctor.isActive ? "true" : "false");
  }, [doctor, setValue]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearDoctorError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data) => {
    try {
      data.role = "doctor";
      data.isActive = data.isActive === "true";

      await dispatch(
        editDoctor({
          id,
          doctorData: data,
        }),
      ).unwrap();

      toast.success("Doctor updated successfully");
      navigate("/admin/doctors");
    } catch (err) {
      toast.error(err || "Failed to update doctor");
    }
  };

  if (!doctor) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-xl font-semibold">Doctor not found.</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#253237]">Edit Doctor</h1>

        <p className="mt-2 text-[#5C6B73]">Update doctor information below.</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Full Name */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Full Name
          </label>

          <input
            type="text"
            {...register("fullName", {
              required: "Full name is required",
            })}
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
            {...register("email", {
              required: "Email is required",
            })}
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
            {...register("phone", {
              required: "Phone number is required",
            })}
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

        {/* Status */}
        <div>
          <label className="mb-2 block font-medium text-[#253237]">
            Status
          </label>

          <select
            {...register("isActive")}
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
            {loading ? "Updating..." : "Update Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoctor;
