import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaClipboardCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";
import {
  createAppointment,
  clearAppointmentError,
  resetAppointmentSuccess,
} from "../../features/appointment/appointmentSlice";

import {
  Calendar,
  User,
  Mail,
  Phone,
  Users,
  Stethoscope,
  UserCheck,
  FileText,
  CheckCircle2,
  Check,
  Clock,
} from "lucide-react";
import AnimatedSection from "../../components/AnimatedSection";
import SlotPicker from "../../components/SlotPicker";
import { FORMS_IMAGE } from "../../constants/images";

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

const BookAppointmentForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { doctors } = useAppSelector((state) => state.doctor);
  const { loading, success, error } = useAppSelector(
    (state) => state.appointment
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      patientAge: "",
      gender: "",
      specialization: "Cardiology",
      doctor: "",
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: "",
      reason: "",
    },
  });

  const selectedSpecialization = watch("specialization");
  const selectedDoctorId = watch("doctor");
  const selectedDate = watch("appointmentDate");
  const selectedTime = watch("appointmentTime");

  const patientNameVal = watch("patientName");
  const patientEmailVal = watch("patientEmail");
  const patientPhoneVal = watch("patientPhone");
  const patientAgeVal = watch("patientAge");
  const genderVal = watch("gender");
  const reasonVal = watch("reason");

  const filteredDoctors = doctors.filter((doc) =>
    isSpecializationMatch(selectedSpecialization, doc.specialization)
  );

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Appointment booked successfully");
      reset();
      dispatch(resetAppointmentSuccess());
      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearAppointmentError());
    }
  }, [success, error, dispatch, navigate, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      doctor: data.doctor && data.doctor.trim() !== "" ? data.doctor : undefined,
    };
    await dispatch(createAppointment(payload));
  };

  return (
    <section className="relative overflow-hidden min-h-screen w-full flex items-center justify-center py-16 sm:py-24 lg:py-28 bg-[#080e12]">
      {/* Full-width Cover Background Image */}
      <img
        src={FORMS_IMAGE.Appointment}
        alt="Schedule Appointment Background"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center brightness-65 contrast-105"
      />

      {/* Dark Luxury Overlay Scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060c0f]/92 via-[#060c0f]/82 to-[#060c0f]/92" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Fully Transparent Form Container */}
        <div className="relative overflow-hidden text-white font-outfit bg-transparent border-0 shadow-none p-4 sm:p-8 font-outfit">
          {/* Header Info */}
          <div className="border-b border-white/20 pb-6 mb-8 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-normal text-[#E0FBFC] border border-white/20 backdrop-blur-md font-jakarta">
                <FaClipboardCheck className="text-[#C2DFE3]" />
                <span className="font-medium tracking-wide">
                  Direct Online Booking
                </span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 text-xs text-[#E0FBFC] font-jakarta bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Instant Confirmation</span>
              </span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-snug">
              Schedule Your Clinical Consultation
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 font-light font-jakarta leading-relaxed max-w-3xl">
              Fill out your details below. Choose a specialist or department, pick your date, and select an available time slot.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatedSection delay={100} className="w-full">
              <div className="space-y-6">
                {/* Patient Details Row 1 */}
                <div className="grid gap-5 md:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-200 mb-1.5 font-jakarta">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        {...register("patientName", {
                          required: "Patient name is required",
                        })}
                        className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                      />
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
                      {patientNameVal && !errors.patientName && (
                        <span className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2DFE3]/20 text-[#E0FBFC] border border-[#C2DFE3]/30 text-xs pointer-events-none">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    {errors.patientName && (
                      <p className="mt-1 text-xs text-red-400 font-medium">
                        {errors.patientName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5 font-jakarta">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="name@example.com"
                        {...register("patientEmail", {
                          required: "Email is required",
                        })}
                        className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                      />
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
                      {patientEmailVal && !errors.patientEmail && (
                        <span className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2DFE3]/20 text-[#E0FBFC] border border-[#C2DFE3]/30 text-xs pointer-events-none">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    {errors.patientEmail && (
                      <p className="mt-1 text-xs text-red-400 font-medium">
                        {errors.patientEmail.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Patient Details Row 2 */}
                <div className="grid gap-5 md:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5 font-jakarta">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+1 555-0192"
                        {...register("patientPhone", {
                          required: "Phone number is required",
                        })}
                        className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                      />
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
                      {patientPhoneVal && !errors.patientPhone && (
                        <span className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2DFE3]/20 text-[#E0FBFC] border border-[#C2DFE3]/30 text-xs pointer-events-none">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    {errors.patientPhone && (
                      <p className="mt-1 text-xs text-red-400 font-medium">
                        {errors.patientPhone.message}
                      </p>
                    )}
                  </div>

                  {/* Age & Gender Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5 font-jakarta">
                        Age *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="28"
                          {...register("patientAge", {
                            required: "Age is required",
                            valueAsNumber: true,
                          })}
                          className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                        />
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
                        {patientAgeVal && !errors.patientAge && (
                          <span className="absolute right-3 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2DFE3]/20 text-[#E0FBFC] border border-[#C2DFE3]/30 text-xs pointer-events-none">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      {errors.patientAge && (
                        <p className="mt-1 text-xs text-red-400 font-medium">
                          {errors.patientAge.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5 font-jakarta">
                        Gender *
                      </label>
                      <div className="relative">
                        <select
                          {...register("gender", {
                            required: "Gender is required",
                          })}
                          className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta cursor-pointer"
                        >
                          <option value="" className="bg-[#0d181d] text-white">Select</option>
                          <option value="Male" className="bg-[#0d181d] text-white">Male</option>
                          <option value="Female" className="bg-[#0d181d] text-white">Female</option>
                          <option value="Other" className="bg-[#0d181d] text-white">Other</option>
                        </select>
                        <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
                        {genderVal && !errors.gender && (
                          <span className="absolute right-7 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2DFE3]/20 text-[#E0FBFC] border border-[#C2DFE3]/30 text-xs pointer-events-none">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      {errors.gender && (
                        <p className="mt-1 text-xs text-red-400 font-medium">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specialization & Doctor Selection */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-300 font-jakarta">
                      Medical Department *
                    </label>
                    <div className="relative">
                      <select
                        {...register("specialization", {
                          required: "Specialization is required",
                        })}
                        className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta cursor-pointer"
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
                    <label className="block mb-1.5 text-xs font-medium text-gray-300 font-jakarta">
                      Preferred Specialist / Doctor (Optional)
                    </label>
                    <div className="relative">
                      <select
                        {...register("doctor")}
                        className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta cursor-pointer"
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
                  <label className="block mb-1.5 text-xs font-medium text-gray-300 font-jakarta">
                    Appointment Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      {...register("appointmentDate", {
                        required: "Appointment date is required",
                      })}
                      className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
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

                {/* Slot Picker */}
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
                    <p className="mt-2 text-xs font-semibold text-red-400 font-jakarta">
                      {errors.appointmentTime.message}
                    </p>
                  )}

                  <AnimatePresence>
                    {selectedTime && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-3.5 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs text-[#E0FBFC] border border-white/20 font-jakarta backdrop-blur-md"
                      >
                        <Clock className="h-4 w-4 text-[#C2DFE3] animate-pulse" />
                        <span>
                          Selected Time Slot:{" "}
                          <strong className="text-white font-semibold">
                            {selectedTime}
                          </strong>
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Reason for Visit */}
                <div>
                  <label className="block mb-1.5 text-xs font-medium text-gray-300 font-jakarta">
                    Reason for Visit / Health Concern *
                  </label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      placeholder="Describe your health concern or symptoms *"
                      {...register("reason", {
                        required: "Reason is required",
                      })}
                      className="w-full border-0 border-b-2 border-white/40 bg-transparent p-4 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                    />
                    <FileText className="absolute left-3.5 top-4 h-4 w-4 text-[#C2DFE3] pointer-events-none" />
                    {reasonVal && !errors.reason && (
                      <span className="absolute right-3.5 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2DFE3]/20 text-[#E0FBFC] border border-[#C2DFE3]/30 text-xs pointer-events-none">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                  {errors.reason && (
                    <p className="mt-1 text-xs text-red-400 font-medium">
                      {errors.reason.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-[#253237] via-[#3a4b52] to-[#253237] border border-[#5C6B73]/40 px-8 py-4 text-base font-semibold tracking-wide text-white shadow-xl hover:from-[#3a4b52] hover:to-[#5C6B73] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 transition-all duration-300 cursor-pointer font-outfit focus:outline-none focus:ring-2 focus:ring-[#C2DFE3]/40 min-h-[48px]"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Booking Appointment...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      <span>Confirm Clinical Appointment</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </button>
              </div>
            </AnimatedSection>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentForm;
