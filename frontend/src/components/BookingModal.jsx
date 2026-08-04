import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Stethoscope } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createAppointment, clearAppointmentError, resetAppointmentSuccess } from "../features/appointment/appointmentSlice";
import SlotPicker from "./SlotPicker";

import { FORMS_IMAGE } from "../constants/images";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80&auto=format&fit=crop";

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

  // Sync activeDoctor when modal opens or initialDoctor/doctorId props change
  useEffect(() => {
    if (isOpen) {
      if (initialDoctor && (initialDoctor._id || initialDoctor.id)) {
        setActiveDoctor(initialDoctor);
      } else if (doctorId && availableDoctors && availableDoctors.length > 0) {
        const found = availableDoctors.find((d) => (d._id || d.id) === doctorId);
        if (found) setActiveDoctor(found);
      } else if (availableDoctors && availableDoctors.length > 0) {
        setActiveDoctor(availableDoctors[0]);
      } else {
        setActiveDoctor(initialDoctor);
      }
    }
  }, [isOpen, initialDoctor?._id || initialDoctor?.id, doctorId]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-outfit">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#060c0f]/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-5xl my-6 overflow-hidden rounded-3xl bg-[#060c0f] text-white shadow-2xl z-10 max-h-[90vh] flex flex-col border border-white/20 font-outfit"
          >
            {/* Full Modal Cover Background Image */}
            <img
              src={FORMS_IMAGE.BookingModal}
              alt="Booking Modal Background"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center brightness-65 contrast-105"
            />
            {/* Dark Luxury Overlay Scrims */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060c0f]/92 via-[#060c0f]/82 to-[#060c0f]/92" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Header Banner */}
            <div className="relative z-10 overflow-hidden p-6 sm:p-7 text-white shrink-0 border-b border-white/20">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-md border border-white/20 transition duration-200 hover:bg-white hover:text-[#253237] hover:scale-105 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
                <img
                  src={activeDoctor?.profileImage || DEFAULT_AVATAR}
                  alt={activeDoctor?.fullName || "Doctor"}
                  onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                  className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-xl shrink-0"
                />

                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#E0FBFC] border border-white/20 backdrop-blur-md shadow-md mb-2">
                    <Stethoscope className="h-3.5 w-3.5 text-[#C2DFE3]" />
                    <span className="font-jakarta tracking-wide">{activeDoctor?.specialization || "General Healthcare"}</span>
                  </div>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-white leading-snug">
                    {activeDoctor?.fullName
                      ? activeDoctor.fullName.trim().toLowerCase().startsWith("dr.")
                        ? activeDoctor.fullName
                        : `Dr. ${activeDoctor.fullName}`
                      : "Saviours Clinic Specialist"}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-200 font-light font-jakarta mt-1">
                    {activeDoctor?.qualification || "Expert Clinical Physician"} {activeDoctor?.experience ? `• ${activeDoctor.experience}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="relative z-10 p-6 sm:p-8 overflow-y-auto text-white">
              <div className="space-y-6">
                {/* Doctor Selector Dropdown if multiple doctors available */}
                {availableDoctors && availableDoctors.length > 0 && (
                  <div className="rounded-2xl bg-white/5 p-4 border border-white/15 backdrop-blur-md">
                    <label className="block text-xs font-medium text-teal-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5 font-jakarta">
                      <Stethoscope className="h-4 w-4 text-teal-400" />
                      <span>Choose Specialist / Doctor ({availableDoctors.length} Available)</span>
                    </label>
                    <select
                      value={activeDoctor?._id || activeDoctor?.id || ""}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const found = availableDoctors.find(
                          (d) => (d._id || d.id)?.toString() === selectedId
                        );
                        if (found) {
                          setActiveDoctor(found);
                          setValue("appointmentTime", "", { shouldValidate: false });
                        }
                      }}
                      className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 text-sm font-medium text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl cursor-pointer"
                    >
                      {availableDoctors.map((doc) => (
                        <option key={doc._id || doc.id} value={doc._id || doc.id} className="bg-[#0d181d] text-white">
                          Dr. {doc.fullName} — {doc.specialization} ({doc.experience ? `${doc.experience} yrs exp` : "Specialist"})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Patient Information Grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5 font-jakarta">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          {...register("patientName", {
                            required: "Patient name is required",
                          })}
                          className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                        />
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3]" />
                      </div>
                      {errors.patientName && (
                        <p className="mt-1 text-xs text-red-400 font-medium">{errors.patientName.message}</p>
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
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                        />
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3]" />
                      </div>
                      {errors.patientEmail && (
                        <p className="mt-1 text-xs text-red-400 font-medium">{errors.patientEmail.message}</p>
                      )}
                    </div>

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
                          className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                        />
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3]" />
                      </div>
                      {errors.patientPhone && (
                        <p className="mt-1 text-xs text-red-400 font-medium">{errors.patientPhone.message}</p>
                      )}
                    </div>

                    {/* Age & Gender */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5 font-jakarta">
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
                          className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                        />
                        {errors.patientAge && (
                          <p className="mt-1 text-xs text-red-400 font-medium">{errors.patientAge.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5 font-jakarta">
                          Gender *
                        </label>
                        <select
                          {...register("gender", { required: "Gender is required" })}
                          className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta cursor-pointer"
                        >
                          <option value="Male" className="bg-[#0d181d] text-white">Male</option>
                          <option value="Female" className="bg-[#0d181d] text-white">Female</option>
                          <option value="Other" className="bg-[#0d181d] text-white">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Date */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5 font-jakarta">
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      {...register("appointmentDate", {
                        required: "Appointment date is required",
                      })}
                      className="w-full border-0 border-b-2 border-white/40 bg-transparent px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                    />
                    {errors.appointmentDate && (
                      <p className="mt-1 text-xs text-red-400 font-medium">{errors.appointmentDate.message}</p>
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
                      doctorId={activeDoctor?._id || activeDoctor?.id}
                      specialization={activeDoctor?.specialization}
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
                  </div>

                  {/* Section 3: Reason / Medical Concerns */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5 font-jakarta">
                      Reason for Visit / Health Concern *
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        placeholder="Please describe your symptoms or reason for appointment..."
                        {...register("reason", { required: "Reason is required" })}
                        className="w-full border-0 border-b-2 border-white/40 bg-transparent p-4 pl-10 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] focus:bg-transparent focus:ring-0 rounded-t-xl font-jakarta"
                      />
                      <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3]" />
                    </div>
                    {errors.reason && (
                      <p className="mt-1 text-xs text-red-400 font-medium">{errors.reason.message}</p>
                    )}
                  </div>

                  {/* Footer Submit Actions */}
                  <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-white/10 pt-5 font-outfit">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#253237] via-[#3a4b52] to-[#253237] border border-[#5C6B73]/40 px-8 py-3.5 text-sm font-medium text-white shadow-lg hover:from-[#3a4b52] hover:to-[#5C6B73] hover:scale-[1.02] disabled:opacity-70 transition cursor-pointer"
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
