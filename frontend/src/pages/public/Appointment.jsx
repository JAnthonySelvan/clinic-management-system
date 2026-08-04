import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaClipboardCheck, FaPlus, FaMinus } from "react-icons/fa";
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
  CalendarDays,
  Check,
  Clock,
} from "lucide-react";
import AnimatedSection from "../../components/AnimatedSection";
import SlotPicker from "../../components/SlotPicker";
import { HERO_IMAGES, GUIDELINE_IMAGES, CTA_IMAGES, FORMS_IMAGE } from "../../constants/images";

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

const Appointment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const { doctors } = useAppSelector((state) => state.doctor);

  const { loading, success, error } = useAppSelector(
    (state) => state.appointment,
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

  // Step completion logic for visual indicators
  const isStep1Complete = Boolean(
    patientNameVal &&
      patientEmailVal &&
      patientPhoneVal &&
      patientAgeVal &&
      genderVal &&
      !errors.patientName &&
      !errors.patientEmail &&
      !errors.patientPhone &&
      !errors.patientAge &&
      !errors.gender
  );

  const isStep2Complete = Boolean(selectedSpecialization && !errors.specialization);

  const isStep3Complete = Boolean(
    selectedDate && selectedTime && !errors.appointmentDate && !errors.appointmentTime
  );

  const isStep4Complete = Boolean(reasonVal && !errors.reason);

  const completedStepsCount = [isStep1Complete, isStep2Complete, isStep3Complete, isStep4Complete].filter(Boolean).length;

  let currentStep = 1;
  if (isStep1Complete && isStep2Complete && isStep3Complete && isStep4Complete) {
    currentStep = 4;
  } else if (isStep1Complete && isStep2Complete && isStep3Complete) {
    currentStep = 4;
  } else if (isStep1Complete && isStep2Complete) {
    currentStep = 3;
  } else if (isStep1Complete) {
    currentStep = 2;
  } else {
    currentStep = 1;
  }

  const progressPercent = Math.max(25, (completedStepsCount / 4) * 100);

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
    console.log("Form Data:", payload);
    await dispatch(createAppointment(payload));
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const guidelines = [
    {
      badge: "Step 1",
      image: GUIDELINE_IMAGES.schedule,
      title: "Schedule in Advance",
      description:
        "Book your appointment early to get your preferred doctor and time slot.",
    },
    {
      badge: "Step 2",
      image: GUIDELINE_IMAGES.identification,
      title: "Bring Identification",
      description:
        "Carry a valid ID and any previous medical reports during your visit.",
    },
    {
      badge: "Step 3",
      image: GUIDELINE_IMAGES.arriveEarly,
      title: "Arrive Early",
      description:
        "Reach the clinic at least 15 minutes before your scheduled appointment.",
    },
    {
      badge: "Step 4",
      image: GUIDELINE_IMAGES.medicalHistory,
      title: "Medical History",
      description:
        "Inform your doctor about your medications, allergies, and medical history.",
    },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center py-24 lg:py-32 bg-[#080e12]">
        <img
          src={HERO_IMAGES.appointment}
          alt="Book Appointment"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-75 contrast-105"
        />

        {/* Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060c0f]/92 via-[#0a161c]/88 to-[#060c0f]/94 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-5xl px-6 text-center lg:px-8 z-10 space-y-6 flex flex-col items-center font-outfit"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs sm:text-sm font-normal tracking-wide text-teal-200 backdrop-blur-md shadow-2xl">
            <Calendar className="w-4 h-4 text-teal-300" />
            <span className="font-jakarta font-medium tracking-wide">Instant Online Scheduling</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-normal text-white leading-[1.15]">
            Book Your{" "}
            <span className="font-serif-display italic font-normal bg-gradient-to-r from-teal-200 via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              Appointment
            </span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg lg:text-xl font-light text-gray-300 leading-relaxed font-jakarta">
            Select your preferred specialist and time slot. Receive instant confirmation and priority consultation.
          </p>
        </AnimatedSection>
      </section>

      {/* ================= APPOINTMENT FORM ================= */}

      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5C6B73]">
              Book Appointment
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#253237] font-poppins">
              Schedule Your Visit
            </h2>

            <p className="mx-auto max-w-3xl text-base sm:text-lg text-[#5C6B73] font-jakarta">
              Fill out the form below and our team will contact you to confirm
              your appointment.
            </p>
          </div>

          {/* Modal / Pop-up Styled Floating Card Container */}
          <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl bg-[#060c0f] text-white shadow-2xl ring-1 ring-white/10 border border-teal-500/30 font-outfit my-4">
            {/* Pop-up Header Banner */}
            <div className="relative overflow-hidden p-6 sm:p-8 text-white bg-gradient-to-r from-[#060c0f] via-[#0f1d24] to-[#060c0f] border-b border-teal-500/20 shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 font-outfit space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-normal text-teal-200 border border-white/15 backdrop-blur-md font-jakarta">
                    <FaClipboardCheck className="text-teal-300" />
                    <span className="font-medium tracking-wide">Direct Online Booking</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-2 text-xs text-teal-300/90 font-jakarta bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Instant Confirmation</span>
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-white leading-snug">
                  Schedule Your Clinical Consultation
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light font-jakarta leading-relaxed max-w-3xl">
                  Fill out your details below. Choose a specialist or department, pick your date, and select an available time slot.
                </p>
              </div>
            </div>

            {/* Horizontal Step Progress Indicator */}
            <div className="px-6 pt-6 pb-4 sm:px-8 border-b border-teal-500/20 bg-[#060c0f]/90 font-outfit">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-300 font-jakarta">
                    Booking Progress
                  </span>
                  <span className="inline-flex items-center rounded-full bg-teal-500/20 px-2.5 py-0.5 text-xs font-medium text-teal-200 border border-teal-400/30">
                    Step {currentStep} of 4 ({Math.round(progressPercent)}% Complete)
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-jakarta">
                  {completedStepsCount === 4 ? "Ready to confirm appointment!" : `${4 - completedStepsCount} step(s) remaining`}
                </span>
              </div>

              {/* Thin Gradient Progress Bar Track */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Connected Stepper Sequence */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center pb-2">
                {[
                  { step: 1, label: "Patient Details", isComplete: isStep1Complete },
                  { step: 2, label: "Department & Doctor", isComplete: isStep2Complete },
                  { step: 3, label: "Date & Time", isComplete: isStep3Complete },
                  { step: 4, label: "Reason for Visit", isComplete: isStep4Complete },
                ].map((item, idx) => {
                  const isActive = currentStep === item.step;
                  return (
                    <div key={item.step} className="flex flex-col items-center cursor-default">
                      <div className="flex items-center w-full justify-center relative mb-2">
                        {idx > 0 && (
                          <div
                            className={`absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-0.5 transition-colors duration-300 ${
                              item.isComplete || isActive ? "bg-teal-400/60" : "bg-white/10"
                            }`}
                          />
                        )}
                        {idx < 3 && (
                          <div
                            className={`absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-0.5 transition-colors duration-300 ${
                              item.isComplete ? "bg-teal-400/60" : "bg-white/10"
                            }`}
                          />
                        )}

                        <div
                          className={`relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 border ${
                            item.isComplete
                              ? "bg-teal-500 text-white border-teal-300 shadow-md shadow-teal-500/30 scale-105"
                              : isActive
                              ? "bg-teal-500/20 text-teal-300 border-teal-400 ring-2 ring-teal-400/30 scale-105"
                              : "bg-white/5 text-gray-400 border-white/10"
                          }`}
                        >
                          {item.isComplete ? <Check className="h-4 w-4 text-white" /> : item.step}
                        </div>
                      </div>
                      <span
                        className={`hidden sm:block text-[11px] font-medium font-jakarta leading-tight transition-colors duration-200 ${
                          item.isComplete || isActive ? "text-teal-200 font-semibold" : "text-gray-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Body with FORMS_IMAGE.Appointment Background */}
            <div className="relative p-6 sm:p-8 text-white bg-[#060c0f]">
              <img
                src={FORMS_IMAGE.Appointment}
                alt="Schedule Appointment Form Banner"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center brightness-75 contrast-105"
              />
              <div className="absolute inset-0 bg-[#060c0f]/92 backdrop-blur-[2px]" />

              <div className="relative z-10 space-y-8">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* ================= STEP 1: PATIENT DETAILS ================= */}
                  <AnimatedSection delay={100} className="w-full">
                    <div className="rounded-2xl border border-white/10 bg-[#0a161c]/80 backdrop-blur-md p-5 sm:p-6 shadow-xl ring-1 ring-white/5 space-y-5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                        <div className="flex items-center space-x-3">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs border transition-all duration-300 ${
                            isStep1Complete
                              ? "bg-teal-500 text-white border-teal-400 shadow-md shadow-teal-500/30"
                              : "bg-teal-500/20 text-teal-300 border-teal-400/30"
                          }`}>
                            {isStep1Complete ? <Check className="h-4 w-4 text-white" /> : "1"}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-300 font-jakarta flex items-center space-x-2">
                            <User className="h-4 w-4 text-teal-400" />
                            <span>Patient Details</span>
                          </h4>
                        </div>
                        {isStep1Complete && (
                          <span className="inline-flex items-center gap-1 text-xs text-teal-300 font-medium font-jakarta bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                            <Check className="h-3.5 w-3.5 text-teal-400" />
                            <span>Completed</span>
                          </span>
                        )}
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
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
                              className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 focus:shadow-lg focus:shadow-teal-950/40 font-jakarta"
                            />
                            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400 pointer-events-none" />
                            {patientNameVal && !errors.patientName && (
                              <span className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-400/30 text-xs pointer-events-none">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
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
                              })}
                              className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 focus:shadow-lg focus:shadow-teal-950/40 font-jakarta"
                            />
                            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400 pointer-events-none" />
                            {patientEmailVal && !errors.patientEmail && (
                              <span className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-400/30 text-xs pointer-events-none">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
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
                              className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 focus:shadow-lg focus:shadow-teal-950/40 font-jakarta"
                            />
                            <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400 pointer-events-none" />
                            {patientPhoneVal && !errors.patientPhone && (
                              <span className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-400/30 text-xs pointer-events-none">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          {errors.patientPhone && (
                            <p className="mt-1 text-xs text-red-400 font-medium">{errors.patientPhone.message}</p>
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
                                className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 focus:shadow-lg focus:shadow-teal-950/40 font-jakarta"
                              />
                              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400 pointer-events-none" />
                              {patientAgeVal && !errors.patientAge && (
                                <span className="absolute right-3 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-400/30 text-xs pointer-events-none">
                                  <Check className="h-3 w-3" />
                                </span>
                              )}
                            </div>
                            {errors.patientAge && (
                              <p className="mt-1 text-xs text-red-400 font-medium">{errors.patientAge.message}</p>
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
                                className="w-full rounded-xl border border-white/20 bg-[#13222a] px-3 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 focus:shadow-lg focus:shadow-teal-950/40 font-jakarta cursor-pointer"
                              >
                                <option value="" className="bg-[#0d181d] text-white">Select</option>
                                <option value="Male" className="bg-[#0d181d] text-white">Male</option>
                                <option value="Female" className="bg-[#0d181d] text-white">Female</option>
                                <option value="Other" className="bg-[#0d181d] text-white">Other</option>
                              </select>
                              <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400 pointer-events-none" />
                              {genderVal && !errors.gender && (
                                <span className="absolute right-7 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-400/30 text-xs pointer-events-none">
                                  <Check className="h-3 w-3" />
                                </span>
                              )}
                            </div>
                            {errors.gender && (
                              <p className="mt-1 text-xs text-red-400 font-medium">{errors.gender.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* ================= STEP 2: SPECIALIZATION & DOCTOR ================= */}
                  <AnimatedSection delay={200} className="w-full">
                    <div className="rounded-2xl border border-white/10 bg-[#0a161c]/80 backdrop-blur-md p-5 sm:p-6 shadow-xl ring-1 ring-white/5 space-y-5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                        <div className="flex items-center space-x-3">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs border transition-all duration-300 ${
                            isStep2Complete
                              ? "bg-teal-500 text-white border-teal-400 shadow-md shadow-teal-500/30"
                              : "bg-teal-500/20 text-teal-300 border-teal-400/30"
                          }`}>
                            {isStep2Complete ? <Check className="h-4 w-4 text-white" /> : "2"}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-300 font-jakarta flex items-center space-x-2">
                            <Stethoscope className="h-4 w-4 text-teal-400" />
                            <span>Medical Department & Specialist Selection</span>
                          </h4>
                        </div>
                        {isStep2Complete && (
                          <span className="inline-flex items-center gap-1 text-xs text-teal-300 font-medium font-jakarta bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                            <Check className="h-3.5 w-3.5 text-teal-400" />
                            <span>Selected</span>
                          </span>
                        )}
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        {/* Specialization / Medical Department */}
                        <div>
                          <label className="block mb-1.5 text-xs font-medium text-gray-300 font-jakarta">
                            Medical Department *
                          </label>
                          <div className="relative">
                            <select
                              {...register("specialization", {
                                required: "Specialization is required",
                              })}
                              className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 focus:shadow-lg focus:shadow-teal-950/40 font-jakarta cursor-pointer"
                            >
                              <option value="" className="bg-[#0d181d] text-white">Select Department</option>
                              {SPECIALIZATIONS.map((spec) => (
                                <option key={spec} value={spec} className="bg-[#0d181d] text-white">
                                  {spec}
                                </option>
                              ))}
                            </select>
                            <Stethoscope className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400 pointer-events-none" />
                            {selectedSpecialization && !errors.specialization && (
                              <span className="absolute right-7 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-400/30 text-xs pointer-events-none">
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

                        {/* Preferred Doctor (Optional) */}
                        <div>
                          <label className="block mb-1.5 text-xs font-medium text-gray-300 font-jakarta">
                            Preferred Specialist / Doctor (Optional)
                          </label>
                          <div className="relative">
                            <select
                              {...register("doctor")}
                              className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 focus:shadow-lg focus:shadow-teal-950/40 font-jakarta cursor-pointer"
                            >
                              <option value="" className="bg-[#0d181d] text-white">Any Available Specialist</option>
                              {filteredDoctors.map((doc) => (
                                <option key={doc._id} value={doc._id} className="bg-[#0d181d] text-white">
                                  Dr. {doc.fullName} ({doc.specialization})
                                </option>
                              ))}
                            </select>
                            <UserCheck className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400 pointer-events-none" />
                            {selectedDoctorId && (
                              <span className="absolute right-7 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-400/30 text-xs pointer-events-none">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* ================= STEP 3: DATE & TIME SLOT ================= */}
                  <AnimatedSection delay={300} className="w-full">
                    <div className="rounded-2xl border border-white/10 bg-[#0a161c]/80 backdrop-blur-md p-5 sm:p-6 shadow-xl ring-1 ring-white/5 space-y-5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                        <div className="flex items-center space-x-3">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs border transition-all duration-300 ${
                            isStep3Complete
                              ? "bg-teal-500 text-white border-teal-400 shadow-md shadow-teal-500/30"
                              : "bg-teal-500/20 text-teal-300 border-teal-400/30"
                          }`}>
                            {isStep3Complete ? <Check className="h-4 w-4 text-white" /> : "3"}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-300 font-jakarta flex items-center space-x-2">
                            <CalendarDays className="h-4 w-4 text-teal-400" />
                            <span>Select Date & Time Slot</span>
                          </h4>
                        </div>
                        {isStep3Complete && (
                          <span className="inline-flex items-center gap-1 text-xs text-teal-300 font-medium font-jakarta bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                            <Check className="h-3.5 w-3.5 text-teal-400" />
                            <span>Slot Confirmed</span>
                          </span>
                        )}
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
                            className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 focus:shadow-lg focus:shadow-teal-950/40 font-jakarta"
                          />
                          <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400 pointer-events-none" />
                          {selectedDate && !errors.appointmentDate && (
                            <span className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-400/30 text-xs pointer-events-none">
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
                              className="mt-3.5 flex items-center gap-2 rounded-xl bg-teal-500/15 px-4 py-2.5 text-xs text-teal-200 border border-teal-500/30 font-jakarta"
                            >
                              <Clock className="h-4 w-4 text-teal-400 animate-pulse" />
                              <span>Selected Time Slot: <strong className="text-white font-semibold">{selectedTime}</strong></span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* ================= STEP 4: REASON FOR VISIT ================= */}
                  <AnimatedSection delay={400} className="w-full">
                    <div className="rounded-2xl border border-white/10 bg-[#0a161c]/80 backdrop-blur-md p-5 sm:p-6 shadow-xl ring-1 ring-white/5 space-y-5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                        <div className="flex items-center space-x-3">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs border transition-all duration-300 ${
                            isStep4Complete
                              ? "bg-teal-500 text-white border-teal-400 shadow-md shadow-teal-500/30"
                              : "bg-teal-500/20 text-teal-300 border-teal-400/30"
                          }`}>
                            {isStep4Complete ? <Check className="h-4 w-4 text-white" /> : "4"}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-300 font-jakarta flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-teal-400" />
                            <span>Reason for Visit / Health Concern</span>
                          </h4>
                        </div>
                        {isStep4Complete && (
                          <span className="inline-flex items-center gap-1 text-xs text-teal-300 font-medium font-jakarta bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                            <Check className="h-3.5 w-3.5 text-teal-400" />
                            <span>Ready</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="relative">
                          <textarea
                            rows={4}
                            placeholder="Describe your health concern or symptoms *"
                            {...register("reason", {
                              required: "Reason is required",
                            })}
                            className="w-full rounded-xl border border-white/20 bg-[#13222a] p-4 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 focus:shadow-lg focus:shadow-teal-950/40 font-jakarta"
                          />
                          <FileText className="absolute left-3.5 top-4 h-4 w-4 text-teal-400 pointer-events-none" />
                          {reasonVal && !errors.reason && (
                            <span className="absolute right-3.5 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-400/30 text-xs pointer-events-none">
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
                    </div>
                  </AnimatedSection>

                  {/* Submit Button */}
                  <AnimatedSection delay={450} className="w-full">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 px-8 py-4 text-base font-semibold tracking-wide text-white shadow-xl shadow-teal-950/50 hover:from-teal-400 hover:to-emerald-400 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 transition-all duration-300 cursor-pointer font-outfit focus:outline-none focus:ring-2 focus:ring-teal-400/40 min-h-[48px]"
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
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </>
                      )}
                    </button>
                  </AnimatedSection>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= APPOINTMENT GUIDELINES ("+" PLUS/CROSS SHAPED LAYOUT) ================= */}

      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Appointment Information
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Before You Book
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Please review these guidelines to ensure a smooth appointment
              experience.
            </p>
          </div>

          {/* Plus / Cross Layout Wrapper */}
          <div className="relative max-w-5xl mx-auto">
            {/* Soft Radial Glow Background */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-96 w-96 rounded-full bg-[#C2DFE3]/35 blur-3xl" />
            </div>

            {/* Desktop Plus / Cross Formation (xl breakpoint and up) */}
            <div className="hidden xl:grid grid-cols-3 grid-rows-3 gap-6 items-center justify-items-center relative min-h-[760px]">
              {/* Decorative Dashed Connector Lines */}
              <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-0.5 h-28 border-l-2 border-dashed border-[#9DB4C0]/60 z-0" />
              <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-0.5 h-28 border-l-2 border-dashed border-[#9DB4C0]/60 z-0" />
              <div className="absolute top-1/2 left-[22%] -translate-y-1/2 h-0.5 w-28 border-t-2 border-dashed border-[#9DB4C0]/60 z-0" />
              <div className="absolute top-1/2 right-[22%] -translate-y-1/2 h-0.5 w-28 border-t-2 border-dashed border-[#9DB4C0]/60 z-0" />

              {/* Cell 1: TOP (Row 1, Col 2) - Step 1: Schedule in Advance */}
              <div className="col-start-2 row-start-1 z-10 w-full max-w-xs">
                <AnimatedSection direction="up" delay={100}>
                  <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-500/30">
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-[#253237] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-white/20">
                      {guidelines[0].badge}
                    </div>
                    <div className="h-40 w-full overflow-hidden bg-[#F8FBFC] relative">
                      <img
                        src={guidelines[0].image}
                        alt={guidelines[0].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#253237] font-poppins">
                        {guidelines[0].title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                        {guidelines[0].description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Cell 2: LEFT (Row 2, Col 1) - Step 2: Bring Identification */}
              <div className="col-start-1 row-start-2 z-10 w-full max-w-xs">
                <AnimatedSection direction="left" delay={400}>
                  <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-500/30">
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-[#253237] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-white/20">
                      {guidelines[1].badge}
                    </div>
                    <div className="h-40 w-full overflow-hidden bg-[#F8FBFC] relative">
                      <img
                        src={guidelines[1].image}
                        alt={guidelines[1].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#253237] font-poppins">
                        {guidelines[1].title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                        {guidelines[1].description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Cell 3: CENTER HUB (Row 2, Col 2) */}
              <div className="col-start-2 row-start-2 z-20">
                <AnimatedSection direction="up" delay={0}>
                  <div className="relative flex flex-col items-center justify-center text-center rounded-full bg-[#253237] text-white p-6 shadow-2xl ring-4 ring-[#9DB4C0]/40 w-48 h-48 mx-auto transition-transform duration-500 hover:scale-105">
                    {/* Subtle Pulsing Ring */}
                    <div className="absolute inset-0 rounded-full ring-4 ring-[#9DB4C0]/50 animate-pulse" />
                    <FaClipboardCheck className="text-4xl text-[#E0FBFC] mb-2" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#E0FBFC]/80">
                      4 Simple Steps
                    </span>
                    <span className="text-sm font-bold font-poppins text-white mt-1 max-w-[120px] leading-tight">
                      Your Visit Checklist
                    </span>
                  </div>
                </AnimatedSection>
              </div>

              {/* Cell 4: RIGHT (Row 2, Col 3) - Step 3: Arrive Early */}
              <div className="col-start-3 row-start-2 z-10 w-full max-w-xs">
                <AnimatedSection direction="right" delay={200}>
                  <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-500/30">
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-[#253237] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-white/20">
                      {guidelines[2].badge}
                    </div>
                    <div className="h-40 w-full overflow-hidden bg-[#F8FBFC] relative">
                      <img
                        src={guidelines[2].image}
                        alt={guidelines[2].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#253237] font-poppins">
                        {guidelines[2].title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                        {guidelines[2].description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Cell 5: BOTTOM (Row 3, Col 2) - Step 4: Medical History */}
              <div className="col-start-2 row-start-3 z-10 w-full max-w-xs">
                <AnimatedSection direction="down" delay={300}>
                  <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-500/30">
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-[#253237] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-white/20">
                      {guidelines[3].badge}
                    </div>
                    <div className="h-40 w-full overflow-hidden bg-[#F8FBFC] relative">
                      <img
                        src={guidelines[3].image}
                        alt={guidelines[3].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#253237] font-poppins">
                        {guidelines[3].title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                        {guidelines[3].description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Mobile / Tablet Responsive Fallback (< xl breakpoint) */}
            <div className="xl:hidden space-y-8">
              {/* Central Hub Header for Mobile */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#253237] text-white shadow-xl ring-4 ring-[#9DB4C0]/40 mb-3 animate-pulse">
                  <FaClipboardCheck className="text-2xl text-[#E0FBFC]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                  4 Simple Steps
                </span>
                <h3 className="text-xl font-bold text-[#253237] font-poppins mt-1">
                  Your Visit Checklist
                </h3>
              </div>

              {/* Cards Grid for Mobile & Tablet */}
              <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
                {guidelines.map((item, index) => (
                  <AnimatedSection key={index} delay={index * 100}>
                    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-500/30">
                      <div className="absolute top-3 left-3 z-10 rounded-full bg-[#253237] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-white/20">
                        {item.badge}
                      </div>
                      <div className="h-40 w-full overflow-hidden bg-[#F8FBFC] relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#253237] font-poppins">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= FAQ ACCORDION ================= */}

      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Frequently Asked Questions
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Have Questions?
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Find answers to some of the most common questions about booking an
              appointment at our clinic.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-5">
            {[
              {
                question: "How do I book an appointment?",
                answer:
                  "Complete the appointment form with your details, choose your preferred department, doctor, and appointment date, then submit your request.",
              },
              {
                question: "Will I receive confirmation?",
                answer:
                  "Yes. After reviewing your request, our staff will confirm your appointment using your registered contact details.",
              },
              {
                question: "Can I reschedule my appointment?",
                answer:
                  "Yes. Please contact our clinic before your scheduled appointment to request a new date and time.",
              },
              {
                question: "What should I bring for my visit?",
                answer:
                  "Bring a valid ID, previous medical records (if any), prescriptions, and insurance details if applicable.",
              },
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className={`overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg ${
                    isOpen ? "border-l-4 border-teal-500" : "border border-gray-200/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-[#F8FBFC] cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                  >
                    <span className="text-lg font-semibold text-[#253237] font-poppins">
                      {faq.question}
                    </span>

                    <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F8FBFC] text-[#253237] transition-transform duration-300">
                      {isOpen ? (
                        <FaMinus className="text-sm text-teal-600" />
                      ) : (
                        <FaPlus className="text-sm text-[#5C6B73]" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-[#E0FBFC] px-6 py-5 leading-relaxed text-[#5C6B73] font-jakarta">
                      {faq.answer}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#5C6B73] font-medium font-jakarta">
              Still have questions?{" "}
              <Link
                to="/contact"
                className="font-bold text-[#253237] underline decoration-[#9DB4C0] underline-offset-4 transition hover:text-[#5C6B73]"
              >
                Contact our support team →
              </Link>
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= APPOINTMENT CTA ================= */}

      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-4xl px-8 py-16 text-center shadow-2xl md:px-20">
            {/* Background Image */}
            <img
              src={CTA_IMAGES.background}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#253237]/90 via-[#5C6B73]/85 to-[#9DB4C0]/90" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white md:text-5xl font-poppins">
                Your Health Is Our Priority
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC] font-jakarta">
                Our experienced doctors are here to provide trusted medical care
                for you and your family. Book your appointment today and take
                the first step toward better health.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row font-outfit">
                <Link
                  to="/appointment"
                  className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#253237] transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Book Appointment
                </Link>

                <Link
                  to="/doctors"
                  className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-white hover:text-[#253237]"
                >
                  Meet Our Doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default Appointment;
