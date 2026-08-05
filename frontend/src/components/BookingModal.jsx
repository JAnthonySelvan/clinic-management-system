import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Stethoscope,
  Lock,
  ArrowRight,
  ArrowLeft,
  Users,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createAppointment,
  clearAppointmentError,
  resetAppointmentSuccess,
} from "../features/appointment/appointmentSlice";
import { requestOtp, confirmOtp } from "../features/otp/otpSlice";
import {
  fetchFamilyProfiles,
  saveProfile,
} from "../features/patientProfile/patientProfileSlice";
import SlotPicker from "./SlotPicker";
import { FORMS_IMAGE } from "../constants/images";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80&auto=format&fit=crop";

/**
 * Enhanced BookingModal Component with full OTP verification & Family Profile integration
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
  const { otpToken, email: verifiedEmail, sending: sendingOtp, verifying: verifyingOtp } =
    useAppSelector((state) => state.otp);
  const { familyProfiles, loading: profilesLoading } = useAppSelector(
    (state) => state.patientProfile
  );

  const [activeDoctor, setActiveDoctor] = useState(initialDoctor);
  const [modalStep, setModalStep] = useState("check"); // "check" | "email" | "otp" | "profile" | "booking"

  // OTP form state
  const [emailInput, setEmailInput] = useState(verifiedEmail || "");
  const [otpCode, setOtpCode] = useState("");
  const [cooldown, setCooldown] = useState(30);

  // Profile choice state
  const [selectedRelationship, setSelectedRelationship] = useState("self");
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  // Sync doctor choice when modal opens
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

      // Check OTP token session
      const token = sessionStorage.getItem("otpToken") || otpToken;
      const email = sessionStorage.getItem("verifiedEmail") || verifiedEmail;

      if (token && email) {
        setEmailInput(email);
        setModalStep("booking");
        dispatch(fetchFamilyProfiles());
      } else {
        setModalStep("email");
      }
    }
  }, [isOpen, initialDoctor, doctorId, availableDoctors, otpToken, verifiedEmail, dispatch]);

  // Resend cooldown timer
  useEffect(() => {
    let timer;
    if (cooldown > 0 && modalStep === "otp") {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown, modalStep]);

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

  // Auto-fill profile details when familyProfiles or selectedRelationship changes
  useEffect(() => {
    if (familyProfiles && modalStep === "booking") {
      let targetProfile = null;
      if (selectedRelationship === "self") targetProfile = familyProfiles.self;
      else if (selectedRelationship === "father") targetProfile = familyProfiles.father;
      else if (selectedRelationship === "mother") targetProfile = familyProfiles.mother;
      else if (selectedRelationship === "wife") targetProfile = familyProfiles.wife;
      else if (selectedRelationship === "child" && Array.isArray(familyProfiles.children) && familyProfiles.children.length > 0) {
        targetProfile = familyProfiles.children[0];
      }

      if (targetProfile) {
        setSelectedProfileId(targetProfile._id);
        setValue("patientName", targetProfile.fullName || "");
        setValue("patientEmail", targetProfile.email || emailInput || "");
        setValue("patientPhone", targetProfile.phone || "");
        setValue("patientAge", targetProfile.age || "");
        setValue("gender", targetProfile.gender || "Male");
      } else {
        setSelectedProfileId(null);
        setValue("patientEmail", emailInput || "");
      }
    }
  }, [familyProfiles, selectedRelationship, modalStep, emailInput, setValue]);

  // Handle appointment creation success/error
  useEffect(() => {
    if (bookingSuccess) {
      toast.success(
        `Appointment booked successfully with ${
          activeDoctor?.fullName ? `Dr. ${activeDoctor.fullName}` : "Doctor"
        }!`,
        { duration: 4000 }
      );
      reset();
      dispatch(resetAppointmentSuccess());
      onClose();
    }

    if (bookingError) {
      toast.error(bookingError);
      dispatch(clearAppointmentError());
    }
  }, [bookingSuccess, bookingError, dispatch, activeDoctor, onClose, reset]);

  if (!isOpen) return null;

  // Handlers for OTP Flow inside Modal
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    const res = await dispatch(requestOtp(emailInput.trim()));
    if (requestOtp.fulfilled.match(res)) {
      toast.success("Verification code sent to your email!");
      setModalStep("otp");
      setCooldown(30);
    } else {
      toast.error(res.payload || "Failed to send code");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim().length !== 6) {
      toast.error("Please enter 6-digit OTP code");
      return;
    }

    const res = await dispatch(confirmOtp({ email: emailInput.trim(), otp: otpCode.trim() }));
    if (confirmOtp.fulfilled.match(res)) {
      toast.success("Identity verified successfully!");
      setModalStep("booking");
      dispatch(fetchFamilyProfiles());
    } else {
      toast.error(res.payload || "OTP verification failed");
    }
  };

  // Submit appointment booking
  const onSubmitBooking = async (data) => {
    // If no existing profile for selected relationship, save it first
    let profileIdToUse = selectedProfileId;

    if (!profileIdToUse && data.patientName && data.patientAge) {
      try {
        const saveRes = await dispatch(
          saveProfile({
            relationship: selectedRelationship,
            fullName: data.patientName,
            age: Number(data.patientAge),
            gender: data.gender,
            phone: data.patientPhone,
          })
        );
        if (saveProfile.fulfilled.match(saveRes)) {
          profileIdToUse = saveRes.payload?._id;
        }
      } catch (err) {
        console.warn("Auto profile save note:", err);
      }
    }

    const payload = {
      patientProfileId: profileIdToUse || undefined,
      patientName: data.patientName,
      patientEmail: emailInput || data.patientEmail,
      patientPhone: data.patientPhone,
      patientAge: Number(data.patientAge),
      gender: data.gender,
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
            </div>

            {/* Scrollable Form Body */}
            <div className="relative z-10 p-6 sm:p-8 overflow-y-auto text-white">
              {/* Step 1: Email Request inside Modal */}
              {modalStep === "email" && (
                <div className="space-y-6 max-w-md mx-auto py-4">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-[#E0FBFC] flex items-center justify-center mx-auto mb-3">
                      <ShieldCheck className="w-6 h-6 text-[#C2DFE3]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Verify Patient Email</h3>
                    <p className="text-xs text-gray-300">
                      Enter your email to receive a 6-digit OTP code before proceeding with booking.
                    </p>
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3]" />
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="patient@example.com"
                          className="w-full border border-white/20 bg-black/40 px-3.5 py-3 pl-10 text-sm text-white placeholder-gray-400 rounded-xl outline-none focus:border-[#C2DFE3]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={sendingOtp}
                      className="w-full py-3.5 px-6 bg-gradient-to-r from-[#253237] via-[#5C6B73] to-[#253237] hover:from-[#3a4b52] text-white font-semibold rounded-xl border border-white/20 transition flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
                    >
                      {sendingOtp ? (
                        <span className="flex items-center space-x-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Sending OTP...</span>
                        </span>
                      ) : (
                        <>
                          <span>Send Verification Code</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Step 2: OTP Verification inside Modal */}
              {modalStep === "otp" && (
                <div className="space-y-6 max-w-md mx-auto py-4">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-[#E0FBFC] flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-6 h-6 text-[#C2DFE3]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Enter 6-Digit OTP</h3>
                    <p className="text-xs text-gray-300">
                      Code sent to <span className="font-semibold text-white">{emailInput}</span>
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="123456"
                        className="w-full border border-white/20 bg-black/40 px-4 py-3.5 text-center text-2xl font-bold tracking-widest text-white rounded-xl outline-none focus:border-[#C2DFE3]"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <button
                        type="button"
                        onClick={() => setModalStep("email")}
                        className="text-[#C2DFE3] hover:underline flex items-center space-x-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Change Email</span>
                      </button>

                      <span>{cooldown > 0 ? `Resend in ${cooldown}s` : ""}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={verifyingOtp || otpCode.length !== 6}
                      className="w-full py-3.5 px-6 bg-gradient-to-r from-[#253237] via-[#5C6B73] to-[#253237] hover:from-[#3a4b52] text-white font-semibold rounded-xl border border-white/20 transition flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
                    >
                      {verifyingOtp ? (
                        <span className="flex items-center space-x-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Verifying...</span>
                        </span>
                      ) : (
                        <>
                          <span>Verify & Proceed to Booking</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Step 3: Verified Booking Form */}
              {modalStep === "booking" && (
                <div className="space-y-6">
                  {/* Family Profile Relationship Selector */}
                  <div className="rounded-2xl bg-white/5 p-4 border border-white/15 backdrop-blur-md">
                    <label className="block text-xs font-semibold text-teal-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <Users className="h-4 w-4 text-teal-400" />
                      <span>Who is this appointment for?</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["self", "father", "mother", "wife", "child"].map((rel) => {
                        const isSelected = selectedRelationship === rel;
                        return (
                          <button
                            key={rel}
                            type="button"
                            onClick={() => setSelectedRelationship(rel)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                              isSelected
                                ? "bg-[#C2DFE3] text-[#253237] shadow"
                                : "bg-black/30 text-gray-300 hover:bg-white/10"
                            }`}
                          >
                            {rel === "self" ? "Myself" : rel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Doctor Selector Dropdown if multiple doctors available */}
                  {availableDoctors && availableDoctors.length > 0 && (
                    <div className="rounded-2xl bg-white/5 p-4 border border-white/15 backdrop-blur-md">
                      <label className="block text-xs font-medium text-teal-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
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
                          <option key={doc._id || doc.id} value={doc._id || doc.id} className="bg-[#0d181d] text-white">
                            Dr. {doc.fullName} — {doc.specialization} ({doc.experience ? `${doc.experience} yrs exp` : "Specialist"})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-6">
                    {/* Patient Information Grid */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Patient Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. John Doe"
                            {...register("patientName", {
                              required: "Patient name is required",
                            })}
                            className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] rounded-t-xl font-medium"
                          />
                          <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3]" />
                        </div>
                        {errors.patientName && (
                          <p className="mt-1 text-xs text-red-400 font-medium">
                            {errors.patientName.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+1 555-0192"
                            {...register("patientPhone", {
                              required: "Phone number is required",
                            })}
                            className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] rounded-t-xl font-medium"
                          />
                          <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3]" />
                        </div>
                        {errors.patientPhone && (
                          <p className="mt-1 text-xs text-red-400 font-medium">
                            {errors.patientPhone.message}
                          </p>
                        )}
                      </div>

                      {/* Age & Gender */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1.5">
                            Age *
                          </label>
                          <input
                            type="number"
                            placeholder="28"
                            {...register("patientAge", {
                              required: "Age is required",
                              valueAsNumber: true,
                              min: { value: 0, message: "Age must be >= 0" },
                            })}
                            className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] rounded-t-xl font-medium"
                          />
                          {errors.patientAge && (
                            <p className="mt-1 text-xs text-red-400 font-medium">
                              {errors.patientAge.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1.5">
                            Gender *
                          </label>
                          <select
                            {...register("gender", { required: "Gender is required" })}
                            className="w-full border-0 border-b-2 border-white/40 bg-transparent px-3 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] rounded-t-xl font-medium cursor-pointer"
                          >
                            <option value="Male" className="bg-[#0d181d] text-white">
                              Male
                            </option>
                            <option value="Female" className="bg-[#0d181d] text-white">
                              Female
                            </option>
                            <option value="Other" className="bg-[#0d181d] text-white">
                              Other
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Verified Email Display */}
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Verified Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            disabled
                            value={emailInput}
                            className="w-full border-0 border-b-2 border-white/20 bg-transparent px-3 py-3 pl-10 text-sm text-gray-300 opacity-80 cursor-not-allowed rounded-t-xl"
                          />
                          <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C2DFE3]" />
                        </div>
                      </div>
                    </div>

                    {/* Appointment Date */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Appointment Date *
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        {...register("appointmentDate", {
                          required: "Appointment date is required",
                        })}
                        className="w-full border-0 border-b-2 border-white/40 bg-transparent px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#C2DFE3] rounded-t-xl font-medium"
                      />
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
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Reason for Visit / Symptoms *
                      </label>
                      <div className="relative">
                        <textarea
                          rows={3}
                          placeholder="Describe symptoms or reason for appointment..."
                          {...register("reason", { required: "Reason is required" })}
                          className="w-full border-0 border-b-2 border-white/40 bg-transparent p-4 pl-10 text-sm text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#C2DFE3] rounded-t-xl font-medium"
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
