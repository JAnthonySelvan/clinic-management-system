import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";
import {
  Calendar,
  Stethoscope,
  UserCheck,
  FileText,
  Check,
  Clock,
} from "lucide-react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import SlotPicker from "../SlotPicker";

const SPECIALIZATIONS = [
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "General Physician",
  "Dentist",
  "Eye Care",
  "Pulmonology",
];

const isSpecializationMatch = (selectedSpec, docSpec) => {
  if (!selectedSpec || !docSpec) return false;
  const s = selectedSpec.toLowerCase().trim();
  const d = docSpec.toLowerCase().trim();

  if (s.includes("cardio") && d.includes("cardio")) return true;
  if (s.includes("neuro") && d.includes("neuro")) return true;
  if ((s.includes("derma") || s.includes("skin")) && (d.includes("derma") || d.includes("skin"))) return true;
  if ((s.includes("pedia") || s.includes("child")) && (d.includes("pedia") || d.includes("child"))) return true;
  if ((s.includes("ortho") || s.includes("bone")) && (d.includes("ortho") || d.includes("bone"))) return true;
  if ((s.includes("physician") || s.includes("medicine") || s.includes("general")) && (d.includes("physician") || d.includes("medicine") || d.includes("general"))) return true;
  if (s.includes("dent") && d.includes("dent")) return true;
  if ((s.includes("eye") || s.includes("ophthalm")) && (d.includes("eye") || d.includes("ophthalm"))) return true;
  if ((s.includes("pulmo") || s.includes("chest") || s.includes("lung")) && (d.includes("pulmo") || d.includes("chest") || d.includes("lung"))) return true;

  return d.includes(s) || s.includes(d);
};

const DoctorScheduleStep = ({ initialData, onNext, onBack }) => {
  const dispatch = useAppDispatch();
  const { doctors } = useAppSelector((state) => state.doctor);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      specialization: initialData?.specialization || "Cardiology",
      doctor: initialData?.doctor || "",
      appointmentDate: initialData?.appointmentDate || new Date().toISOString().split("T")[0],
      appointmentTime: initialData?.appointmentTime || "",
      reason: initialData?.reason || "",
    },
  });

  const selectedSpecialization = watch("specialization");
  const selectedDoctorId = watch("doctor");
  const selectedDate = watch("appointmentDate");
  const selectedTime = watch("appointmentTime");

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  const filteredDoctors = doctors.filter((doc) =>
    isSpecializationMatch(selectedSpecialization, doc.specialization)
  );

  const onSubmit = (data) => {
    const selectedDoc = doctors.find((d) => d._id === data.doctor);
    onNext({
      ...data,
      selectedDoctorObj: selectedDoc || null,
    });
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
          <Stethoscope className="text-2xl text-[#C2DFE3]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E0FBFC] tracking-tight">
          Select Doctor & Time Slot
        </h2>
        <p className="mt-2 text-sm text-[#9DB4C0]">
          Choose your medical department, doctor preference, and preferred appointment time.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-transparent p-0 border-0 shadow-none">
        {/* Specialization & Doctor Selection */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block mb-1.5 text-xs font-medium text-gray-300">
              Medical Department <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <select
                {...register("specialization", {
                  required: "Specialization is required",
                })}
                className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl cursor-pointer"
              >
                <option value="" className="bg-[#0d181d] text-white">Select Department</option>
                {SPECIALIZATIONS.map((spec) => (
                  <option key={spec} value={spec} className="bg-[#0d181d] text-white">
                    {spec}
                  </option>
                ))}
              </select>
              <Stethoscope className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
              {selectedSpecialization && !errors.specialization && (
                <span className="absolute right-7 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2DFE3]/20 text-[#E0FBFC] border border-[#C2DFE3]/30 text-xs pointer-events-none">
                  <Check className="h-3 w-3" />
                </span>
              )}
            </div>
            {errors.specialization && (
              <p className="mt-1 text-xs text-red-400 font-medium">
                {errors.specialization.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-medium text-gray-300">
              Preferred Specialist / Doctor (Optional)
            </label>
            <div className="relative">
              <select
                {...register("doctor")}
                className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl cursor-pointer"
              >
                <option value="" className="bg-[#0d181d] text-white">Any Available Specialist</option>
                {filteredDoctors.map((doc) => (
                  <option key={doc._id} value={doc._id} className="bg-[#0d181d] text-white">
                    Dr. {doc.fullName} ({doc.specialization})
                  </option>
                ))}
              </select>
              <UserCheck className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
              {selectedDoctorId && (
                <span className="absolute right-7 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2DFE3]/20 text-[#E0FBFC] border border-[#C2DFE3]/30 text-xs pointer-events-none">
                  <Check className="h-3 w-3" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block mb-1.5 text-xs font-medium text-gray-300">
            Appointment Date <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("appointmentDate", {
                required: "Appointment date is required",
              })}
              className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl"
            />
            <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
            {selectedDate && !errors.appointmentDate && (
              <span className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2DFE3]/20 text-[#E0FBFC] border border-[#C2DFE3]/30 text-xs pointer-events-none">
                <Check className="h-3 w-3" />
              </span>
            )}
          </div>
          {errors.appointmentDate && (
            <p className="mt-1 text-xs text-red-400 font-medium">
              {errors.appointmentDate.message}
            </p>
          )}
        </div>

        {/* Slot Picker Component */}
        <div>
          <input
            type="hidden"
            {...register("appointmentTime", {
              required: "Please select an available time slot",
            })}
          />
          <SlotPicker
            doctorId={selectedDoctorId}
            specialization={selectedSpecialization}
            selectedDate={selectedDate}
            selectedSlot={selectedTime || ""}
            onSelectSlot={(slot) =>
              setValue("appointmentTime", slot, { shouldValidate: true })
            }
          />
          {errors.appointmentTime && (
            <p className="mt-2 text-xs font-semibold text-red-400">
              {errors.appointmentTime.message}
            </p>
          )}

          <AnimatePresence>
            {selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-3.5 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs text-[#E0FBFC] border border-white/20 backdrop-blur-md"
              >
                <Clock className="h-4 w-4 text-[#C2DFE3]" />
                <span>
                  Selected Slot: <strong>{selectedTime}</strong> on {selectedDate}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reason for Visit */}
        <div>
          <label className="block mb-1.5 text-xs font-medium text-gray-300">
            Reason for Visit / Symptoms <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <textarea
              rows={3}
              {...register("reason", {
                required: "Reason for visit is required",
                minLength: {
                  value: 10,
                  message: "Reason must be at least 10 characters long",
                },
              })}
              placeholder="Describe your health concerns or symptoms (min 10 chars)..."
              className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl resize-none"
            />
            <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
          </div>
          {errors.reason && (
            <p className="mt-1 text-xs text-red-400 font-medium">
              {errors.reason.message}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#253237]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 text-xs text-[#C2DFE3] hover:underline"
          >
            <FaArrowLeft />
            <span>Back to Profile</span>
          </button>

          <button
            type="submit"
            className="py-3.5 px-6 bg-gradient-to-r from-[#253237] via-[#5C6B73] to-[#253237] hover:from-[#2c3d44] hover:to-[#2c3d44] text-[#E0FBFC] font-semibold rounded-xl shadow-lg border border-[#C2DFE3]/30 transition flex items-center space-x-2 text-sm"
          >
            <span>Review Appointment</span>
            <FaArrowRight />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default DoctorScheduleStep;
