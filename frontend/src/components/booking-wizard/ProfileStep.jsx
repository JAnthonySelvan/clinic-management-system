import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { saveProfile } from "../../features/patientProfile/patientProfileSlice";
import toast from "react-hot-toast";
import {
  FaUser,
  FaPhone,
  FaArrowRight,
  FaArrowLeft,
  FaEdit,
  FaCheckCircle,
  FaChild,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ProfileStep = ({ relationship, initialProfile, onNext, onBack }) => {
  const dispatch = useAppDispatch();
  const { saving } = useAppSelector((state) => state.patientProfile);

  const isExisting = Boolean(initialProfile && initialProfile._id);
  const [isEditable, setIsEditable] = useState(!isExisting);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      relationship: relationship || "self",
      childLabel: initialProfile?.childLabel || "",
      fullName: initialProfile?.fullName || "",
      age: initialProfile?.age || "",
      gender: initialProfile?.gender || "Male",
      phone: initialProfile?.phone || "",
      bloodGroup: initialProfile?.bloodGroup || "",
      dob: initialProfile?.dob ? new Date(initialProfile.dob).toISOString().split("T")[0] : "",
      address: initialProfile?.address || "",
      city: initialProfile?.city || "",
      state: initialProfile?.state || "",
      pincode: initialProfile?.pincode || "",
    },
  });

  useEffect(() => {
    if (initialProfile) {
      reset({
        relationship: relationship || initialProfile.relationship || "self",
        childLabel: initialProfile.childLabel || "",
        fullName: initialProfile.fullName || "",
        age: initialProfile.age || "",
        gender: initialProfile.gender || "Male",
        phone: initialProfile.phone || "",
        bloodGroup: initialProfile.bloodGroup || "",
        dob: initialProfile.dob ? new Date(initialProfile.dob).toISOString().split("T")[0] : "",
        address: initialProfile.address || "",
        city: initialProfile.city || "",
        state: initialProfile.state || "",
        pincode: initialProfile.pincode || "",
      });
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  }, [initialProfile, relationship, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      relationship: relationship || "self",
      age: Number(data.age),
    };

    const res = await dispatch(saveProfile(payload));
    if (saveProfile.fulfilled.match(res)) {
      toast.success("Patient profile saved!");
      onNext(res.payload);
    } else {
      toast.error(res.payload || "Failed to save patient profile");
    }
  };

  const handleUseExisting = () => {
    if (initialProfile) {
      onNext(initialProfile);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E0FBFC] mb-4 shadow-lg">
          <FaUser className="text-2xl text-[#C2DFE3]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E0FBFC] tracking-tight capitalize">
          {isExisting ? `${relationship} Profile Details` : `Enter ${relationship} Details`}
        </h2>
        <p className="mt-2 text-sm text-[#9DB4C0]">
          {isExisting
            ? "Verify existing details or click edit to make changes."
            : "Provide the required health profile details below."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-transparent p-0 border-0 shadow-none">
        {/* Toggle Edit for Existing Profile */}
        {isExisting && (
          <div className="flex items-center justify-between bg-[#16222a] p-4 rounded-2xl border border-[#253237] mb-6">
            <div className="flex items-center space-x-3 text-xs text-[#9DB4C0]">
              <FaCheckCircle className="text-emerald-400 text-base" />
              <span>Existing profile found for this family relationship.</span>
            </div>
            <button
              type="button"
              onClick={() => setIsEditable(!isEditable)}
              className="px-3.5 py-1.5 bg-[#253237] hover:bg-[#34454d] text-[#C2DFE3] text-xs font-semibold rounded-xl border border-[#5C6B73]/50 transition flex items-center space-x-1.5"
            >
              <FaEdit />
              <span>{isEditable ? "Lock Form" : "Edit Profile"}</span>
            </button>
          </div>
        )}

        {/* Child Label if Child */}
        {relationship === "child" && (
          <div>
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
              Child Disambiguation Label (e.g., "David Jr", "Eldest Son")
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5C6B73]">
                <FaChild />
              </div>
              <input
                type="text"
                disabled={!isEditable}
                {...register("childLabel")}
                placeholder="e.g. David Jr"
                className="w-full pl-11 pr-4 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60"
              />
            </div>
          </div>
        )}

        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5C6B73]">
                <FaUser />
              </div>
              <input
                type="text"
                disabled={!isEditable}
                {...register("fullName", { required: "Full name is required" })}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60"
              />
            </div>
            {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
              Phone Number <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5C6B73]">
                <FaPhone />
              </div>
              <input
                type="tel"
                disabled={!isEditable}
                {...register("phone", { required: "Phone number is required" })}
                placeholder="+1 234 567 8900"
                className="w-full pl-11 pr-4 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60"
              />
            </div>
            {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Age, Gender & Blood Group */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
              Age <span className="text-rose-400">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="120"
              disabled={!isEditable}
              {...register("age", { required: "Age is required" })}
              placeholder="32"
              className="w-full px-4 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60 text-center font-bold"
            />
            {errors.age && <p className="text-xs text-rose-400 mt-1">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
              Gender <span className="text-rose-400">*</span>
            </label>
            <select
              disabled={!isEditable}
              {...register("gender", { required: true })}
              className="w-full px-3 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60 font-medium"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
              Blood Group
            </label>
            <select
              disabled={!isEditable}
              {...register("bloodGroup")}
              className="w-full px-3 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60 font-medium"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        {/* Address, City, State, Pincode */}
        <div>
          <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
            Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5C6B73]">
              <FaMapMarkerAlt />
            </div>
            <input
              type="text"
              disabled={!isEditable}
              {...register("address")}
              placeholder="123 Health Ave, Suite 100"
              className="w-full pl-11 pr-4 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">City</label>
            <input
              type="text"
              disabled={!isEditable}
              {...register("city")}
              placeholder="New York"
              className="w-full px-3 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">State</label>
            <input
              type="text"
              disabled={!isEditable}
              {...register("state")}
              placeholder="NY"
              className="w-full px-3 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">Pincode</label>
            <input
              type="text"
              disabled={!isEditable}
              {...register("pincode")}
              placeholder="10001"
              className="w-full px-3 py-3 bg-[#16222a] border border-[#253237] focus:border-[#C2DFE3] text-[#E0FBFC] rounded-xl text-sm outline-none disabled:opacity-60"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#253237]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 text-xs text-[#C2DFE3] hover:underline"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {isExisting && !isEditable && (
              <button
                type="button"
                onClick={handleUseExisting}
                className="w-full sm:w-auto py-3.5 px-6 bg-[#253237] hover:bg-[#34454d] text-[#E0FBFC] font-semibold rounded-xl border border-[#C2DFE3]/30 transition flex items-center justify-center space-x-2 text-sm"
              >
                <span>Use Existing Details</span>
                <FaArrowRight />
              </button>
            )}

            {isEditable && (
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto py-3.5 px-6 bg-gradient-to-r from-[#253237] via-[#5C6B73] to-[#253237] hover:from-[#2c3d44] hover:to-[#2c3d44] text-[#E0FBFC] font-semibold rounded-xl shadow-lg border border-[#C2DFE3]/30 transition flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-[#E0FBFC] border-t-transparent rounded-full animate-spin"></span>
                    <span>Saving...</span>
                  </span>
                ) : (
                  <>
                    <span>Save & Continue</span>
                    <FaArrowRight />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileStep;
