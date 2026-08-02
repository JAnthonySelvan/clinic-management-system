import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Stethoscope } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createAppointment, clearAppointmentError, resetAppointmentSuccess } from "../features/appointment/appointmentSlice";
import SlotPicker from "./SlotPicker";

const DEFAULT_AVATAR = "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

/**
 * BookingModal Component
 *
 * @param {object|null} doctor - Selected doctor object or null if closed
 * @param {string|null} doctorId - Optional selected doctor ID
 * @param {boolean} isOpen - Modal visibility state
 * @param {function} onClose - Callback to close modal
 */
const BookingModal = ({ doctor: initialDoctor, doctorId, availableDoctors = [], isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.appointment);

  const [activeDoctor, setActiveDoctor] = useState(initialDoctor);

  // Sync activeDoctor when initialDoctor prop changes or availableDoctors loads
  useEffect(() => {
    if (initialDoctor && (initialDoctor._id || initialDoctor.id)) {
      setActiveDoctor(initialDoctor);
    } else if (doctorId && availableDoctors && availableDoctors.length > 0) {
      const found = availableDoctors.find((d) => d._id === doctorId || d.id === doctorId);
      if (found) setActiveDoctor(found);
    } else if (availableDoctors && availableDoctors.length > 0) {
      setActiveDoctor(availableDoctors[0]);
    } else {
      setActiveDoctor(initialDoctor);
    }
  }, [initialDoctor, doctorId, availableDoctors]);

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
      gender: "Male",
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: "",
      reason: "",
    },
  });

  const selectedDate = watch("appointmentDate");
  const selectedTime = watch("appointmentTime");

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle appointment creation success/error
  useEffect(() => {
    if (success) {
      toast.success(`Appointment booked successfully with ${activeDoctor?.fullName ? `Dr. ${activeDoctor.fullName}` : "Doctor"}!`, {
        duration: 4000,
        icon: "🎉",
      });
      reset();
      dispatch(resetAppointmentSuccess());
      onClose();
    }

    if (error) {
      toast.error(error);
      dispatch(clearAppointmentError());
    }
  }, [success, error, dispatch, activeDoctor, onClose, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      specialization: activeDoctor?.specialization || "General Medicine",
      doctor: activeDoctor?._id || activeDoctor?.id || doctorId || undefined,
    };
    await dispatch(createAppointment(payload));
  };


  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-3xl my-8 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10 z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header Banner */}
            <div className="relative bg-linear-to-r from-[#253237] via-[#3a4a50] to-[#5C6B73] p-6 text-white shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-xs transition hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
                <img
                  src={activeDoctor?.profileImage || DEFAULT_AVATAR}
                  alt={activeDoctor?.fullName || "Doctor"}
                  onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                  className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-md shrink-0"
                />

                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center space-x-1.5 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-200 border border-teal-400/30 mb-1.5">
                    <Stethoscope className="h-3.5 w-3.5" />
                    <span>{activeDoctor?.specialization || "General Healthcare"}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {activeDoctor?.fullName ? `Dr. ${activeDoctor.fullName}` : "Saviours Clinic Specialist"}
                  </h2>
                  <p className="text-sm text-slate-300 font-medium mt-0.5">
                    {activeDoctor?.qualification || "Expert Clinical Physician"} {activeDoctor?.experience ? `• ${activeDoctor.experience}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Doctor Selector Dropdown if multiple doctors available */}
              {availableDoctors && availableDoctors.length > 0 && (
                <div className="rounded-2xl bg-teal-50/80 p-4 border border-teal-100">
                  <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Stethoscope className="h-4 w-4 text-teal-600" />
                    <span>Choose Specialist / Doctor ({availableDoctors.length} Available)</span>
                  </label>
                  <select
                    value={activeDoctor?._id || ""}
                    onChange={(e) => {
                      const found = availableDoctors.find((d) => d._id === e.target.value);
                      if (found) setActiveDoctor(found);
                    }}
                    className="w-full rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none shadow-xs transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  >
                    {availableDoctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        Dr. {doc.fullName} — {doc.specialization} ({doc.experience || "Specialist"})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Section 1: Patient Information */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-1.5">
                    <User className="h-4 w-4 text-teal-600" />
                    <span>Patient Details</span>
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          {...register("patientName", {
                            required: "Patient name is required",
                          })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                        />
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                      {errors.patientName && (
                        <p className="mt-1 text-xs text-red-500">{errors.patientName.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="name@example.com"
                          {...register("patientEmail", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                        />
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                      {errors.patientEmail && (
                        <p className="mt-1 text-xs text-red-500">{errors.patientEmail.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+1 555-0192"
                          {...register("patientPhone", {
                            required: "Phone number is required",
                          })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                        />
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                      {errors.patientPhone && (
                        <p className="mt-1 text-xs text-red-500">{errors.patientPhone.message}</p>
                      )}
                    </div>

                    {/* Age & Gender */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Age *
                        </label>
                        <input
                          type="number"
                          placeholder="28"
                          {...register("patientAge", {
                            required: "Age is required",
                            valueAsNumber: true,
                            min: { value: 1, message: "Age must be >= 1" },
                          })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                        />
                        {errors.patientAge && (
                          <p className="mt-1 text-xs text-red-500">{errors.patientAge.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Gender *
                        </label>
                        <select
                          {...register("gender", { required: "Gender is required" })}
                          className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Date & Live Time-Slot Availability */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-1.5">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <span>Select Date & Time Slot</span>
                  </h3>

                  <div className="space-y-4">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Appointment Date *
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        {...register("appointmentDate", {
                          required: "Appointment date is required",
                        })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                      {errors.appointmentDate && (
                        <p className="mt-1 text-xs text-red-500">{errors.appointmentDate.message}</p>
                      )}
                    </div>

                    {/* Interactive SlotPicker Component */}
                    <div>
                      <input
                        type="hidden"
                        {...register("appointmentTime", {
                          required: "Please select an available time slot",
                        })}
                      />
                      <SlotPicker
                        doctorId={activeDoctor?._id}
                        specialization={activeDoctor?.specialization}
                        selectedDate={selectedDate}
                        selectedSlot={selectedTime || ""}
                        onSelectSlot={(slot) =>
                          setValue("appointmentTime", slot, { shouldValidate: true })
                        }
                      />

                      {errors.appointmentTime && (
                        <p className="mt-2 text-xs font-semibold text-red-500">
                          {errors.appointmentTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3: Reason / Medical Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Reason for Visit / Health Concern *
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder="Please describe your symptoms or reason for appointment..."
                      {...register("reason", { required: "Reason is required" })}
                      className="w-full rounded-xl border border-slate-300 p-4 pl-10 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    />
                    <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  </div>
                  {errors.reason && (
                    <p className="mt-1 text-xs text-red-500">{errors.reason.message}</p>
                  )}
                </div>

                {/* Footer Submit Actions */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 disabled:opacity-70 transition"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Booking Appointment...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Confirm Appointment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
