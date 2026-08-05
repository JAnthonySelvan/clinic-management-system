import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  FileText,
  CheckCircle2,
  Stethoscope,
  Users,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createAppointment,
  clearAppointmentError,
  resetAppointmentSuccess,
} from "../features/appointment/appointmentSlice";
import { logoutOtp } from "../features/otp/otpSlice";

import EmailStep from "./booking-wizard/EmailStep";
import OtpStep from "./booking-wizard/OtpStep";
import WhoIsThisForStep from "./booking-wizard/WhoIsThisForStep";
import ChildSelectorStep from "./booking-wizard/ChildSelectorStep";
import ProfileStep from "./booking-wizard/ProfileStep";
import SlotPicker from "./SlotPicker";
import { FORMS_IMAGE } from "../constants/images";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80&auto=format&fit=crop";

/**
 * Refactored BookingModal Component
 * Reuses EmailStep, OtpStep, WhoIsThisForStep, ChildSelectorStep, and ProfileStep directly
 * inside the doctor modal frame without duplicating OTP or profile logic.
 */
const BookingModal = ({
  doctor: initialDoctor,
  doctorId,
  availableDoctors = [],
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { loading: bookingLoading, success: bookingSuccess, error: bookingError } =
    useAppSelector((state) => state.appointment);
  const { otpToken, email: verifiedEmail } = useAppSelector((state) => state.otp);

  const [activeDoctor, setActiveDoctor] = useState(initialDoctor);

  // Stepper state machine: "email" | "otp" | "who" | "child-select" | "profile" | "booking"
  const [modalStep, setModalStep] = useState("email");
  const [userEmail, setUserEmail] = useState(verifiedEmail || "");
  const [patientChoice, setPatientChoice] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);

  // Sync activeDoctor when modal opens or doctor props change
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
  }, [isOpen, initialDoctor, doctorId, availableDoctors]);

  // Check for valid OTP session ONLY when modal opens
  useEffect(() => {
    if (isOpen) {
      const token = sessionStorage.getItem("otpToken");
      const email = sessionStorage.getItem("verifiedEmail");

      if (token && email) {
        setUserEmail(email);
        setModalStep(activeProfile ? "booking" : "who");
      } else {
        setModalStep("email");
      }
    }
  }, [isOpen]);

  // Form for booking step
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
    if (bookingSuccess) {
      toast.success(
        `Appointment booked successfully with ${
          activeDoctor?.fullName ? `Dr. ${activeDoctor.fullName}` : "Doctor"
        }!`,
        { duration: 4000 }
      );
      reset({
        appointmentDate: new Date().toISOString().split("T")[0],
        appointmentTime: "",
        reason: "",
      });
      dispatch(resetAppointmentSuccess());
      onClose();
    }

    if (bookingError) {
      toast.error(bookingError);
      dispatch(clearAppointmentError());
    }
  }, [bookingSuccess, bookingError, dispatch, activeDoctor, onClose, reset]);

  if (!isOpen) return null;

  // Step transition handlers
  const handleEmailNext = (emailVal) => {
    setUserEmail(emailVal);
    setModalStep("otp");
  };

  const handleOtpVerified = () => {
    setModalStep("who");
  };

  const handleWhoNext = (choiceData) => {
    setPatientChoice(choiceData);
    if (choiceData.relationship === "child" && choiceData.hasChildren) {
      setModalStep("child-select");
    } else {
      setActiveProfile(choiceData.profile);
      setModalStep("profile");
    }
  };

  const handleChildSelect = (childObj) => {
    setSelectedChild(childObj);
    setActiveProfile(childObj);
    setModalStep("profile");
  };

  const handleProfileNext = (savedProfileDoc) => {
    setActiveProfile(savedProfileDoc);
    setModalStep("booking");
  };

  const handleResetSession = () => {
    dispatch(logoutOtp());
    setUserEmail("");
    setPatientChoice(null);
    setSelectedChild(null);
    setActiveProfile(null);
    setModalStep("email");
  };

  // Submit final appointment booking
  const onSubmitBooking = async (data) => {
    if (!activeProfile || !activeProfile._id) {
      toast.error("Patient profile is required. Please select or complete profile.");
      setModalStep("who");
      return;
    }

    const payload = {
      patientProfileId: activeProfile._id,
      patientName: activeProfile.fullName,
      patientEmail: activeProfile.email || userEmail,
      patientPhone: activeProfile.phone,
      patientAge: Number(activeProfile.age),
      gender: activeProfile.gender || "Male",
      specialization: activeDoctor?.specialization || "General Medicine",
      doctor: activeDoctor?._id || activeDoctor?.id || doctorId || undefined,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      reason: data.reason,
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
            className="relative w-full max-w-4xl my-6 overflow-hidden rounded-3xl bg-[#060c0f] text-white shadow-2xl z-10 max-h-[90vh] flex flex-col border border-white/20 font-outfit"
          >
            {/* Background Image */}
            <img
              src={FORMS_IMAGE.BookingModal}
              alt="Booking Modal Background"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center brightness-40 contrast-105"
            />
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />

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
                    <span className="tracking-wide">
                      {activeDoctor?.specialization || "General Healthcare"}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                    {activeDoctor?.fullName
                      ? activeDoctor.fullName.trim().toLowerCase().startsWith("dr.")
                        ? activeDoctor.fullName
                        : `Dr. ${activeDoctor.fullName}`
                      : "Saviours Clinic Specialist"}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-200 font-light mt-1">
                    {activeDoctor?.qualification || "Expert Physician"}{" "}
                    {activeDoctor?.experience ? `• ${activeDoctor.experience}` : ""}
                  </p>
                </div>
              </div>

              {/* Session / Switch Email Header Bar */}
              {userEmail && (
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#9DB4C0]">Verified Patient Email:</span>
                    <strong className="text-[#E0FBFC] font-semibold">{userEmail}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetSession}
                    className="text-rose-400 hover:text-rose-300 hover:underline flex items-center space-x-1 transition text-xs cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Switch Email</span>
                  </button>
                </div>
              )}
            </div>

            {/* Scrollable Body Rendering Embedded Wizard Steps */}
            <div className="relative z-10 p-6 sm:p-8 overflow-y-auto text-white">
              <AnimatePresence mode="wait">
                {modalStep === "email" && (
                  <div key="modal-step-email">
                    <EmailStep onNext={handleEmailNext} />
                  </div>
                )}

                {modalStep === "otp" && (
                  <div key="modal-step-otp">
                    <OtpStep
                      email={userEmail}
                      onNext={handleOtpVerified}
                      onBack={() => setModalStep("email")}
                    />
                  </div>
                )}

                {modalStep === "who" && (
                  <div key="modal-step-who">
                    <WhoIsThisForStep onNext={handleWhoNext} />
                  </div>
                )}

                {modalStep === "child-select" && (
                  <div key="modal-step-child-select">
                    <ChildSelectorStep
                      childrenList={patientChoice?.childrenList || []}
                      onSelectChild={handleChildSelect}
                      onBack={() => setModalStep("who")}
                    />
                  </div>
                )}

                {modalStep === "profile" && (
                  <div key="modal-step-profile">
                    <ProfileStep
                      relationship={patientChoice?.relationship || "self"}
                      initialProfile={activeProfile}
                      onNext={handleProfileNext}
                      onBack={() => {
                        if (patientChoice?.relationship === "child" && patientChoice?.hasChildren) {
                          setModalStep("child-select");
                        } else {
                          setModalStep("who");
                        }
                      }}
                    />
                  </div>
                )}

                {modalStep === "booking" && (
                  <div key="modal-step-booking" className="space-y-6">
                    {/* Active Patient Summary Banner */}
                    {activeProfile && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/5 p-4 rounded-2xl border border-white/20 backdrop-blur-md">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-xl bg-[#253237] text-[#C2DFE3] flex items-center justify-center font-bold text-sm border border-white/10 shrink-0">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-white text-sm">
                                {activeProfile.fullName}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C2DFE3] text-[#253237] px-2 py-0.5 rounded-full">
                                {activeProfile.relationship === "self"
                                  ? "Self"
                                  : activeProfile.relationship}
                                {activeProfile.childLabel ? ` (${activeProfile.childLabel})` : ""}
                              </span>
                            </div>
                            <p className="text-xs text-gray-300 font-light mt-0.5">
                              Age: {activeProfile.age} • Gender: {activeProfile.gender} • Phone: {activeProfile.phone}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setModalStep("who")}
                          className="text-xs text-[#C2DFE3] hover:text-white hover:underline flex items-center space-x-1 shrink-0 cursor-pointer"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>Change Patient</span>
                        </button>
                      </div>
                    )}

                    {/* Doctor Selector Dropdown if multiple doctors available */}
                    {availableDoctors && availableDoctors.length > 0 && (
                      <div className="rounded-2xl bg-white/5 p-4 border border-white/15 backdrop-blur-md">
                        <label className="block text-xs font-semibold text-teal-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                          <Stethoscope className="h-4 w-4 text-teal-400" />
                          <span>Choose Specialist ({availableDoctors.length} Available)</span>
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
                            <option
                              key={doc._id || doc.id}
                              value={doc._id || doc.id}
                              className="bg-[#0d181d] text-white"
                            >
                              Dr. {doc.fullName} — {doc.specialization}{" "}
                              ({doc.experience ? `${doc.experience} yrs exp` : "Specialist"})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Doctor-scoped Booking Form */}
                    <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-6">
                      {/* Appointment Date */}
                      <div>
                        <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
                          Appointment Date <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            min={todayStr}
                            {...register("appointmentDate", {
                              required: "Appointment date is required",
                            })}
                            className="w-full border-0 border-b-2 border-white/40 bg-transparent px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] rounded-t-xl font-medium cursor-pointer"
                          />
                        </div>
                        {errors.appointmentDate && (
                          <p className="mt-1 text-xs text-red-400 font-medium">
                            {errors.appointmentDate.message}
                          </p>
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
                          <p className="mt-2 text-xs font-semibold text-red-400">
                            {errors.appointmentTime.message}
                          </p>
                        )}
                      </div>

                      {/* Reason for Visit */}
                      <div>
                        <label className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
                          Reason for Visit / Health Concerns <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            rows={3}
                            placeholder="Describe your symptoms or reason for appointment..."
                            {...register("reason", { required: "Reason is required" })}
                            className="w-full border border-white/20 bg-black/30 p-4 pl-10 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] rounded-2xl font-medium"
                          />
                          <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3]" />
                        </div>
                        {errors.reason && (
                          <p className="mt-1 text-xs text-red-400 font-medium">
                            {errors.reason.message}
                          </p>
                        )}
                      </div>

                      {/* Footer Submit Actions */}
                      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-white/10 pt-5">
                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={bookingLoading}
                          className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#253237] via-[#3a4b52] to-[#253237] border border-[#5C6B73]/40 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:from-[#3a4b52] hover:to-[#5C6B73] disabled:opacity-70 transition cursor-pointer"
                        >
                          {bookingLoading ? (
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
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
