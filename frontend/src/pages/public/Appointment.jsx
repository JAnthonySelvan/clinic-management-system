import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaClipboardCheck } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";

import {
  createAppointment,
  clearAppointmentError,
  resetAppointmentSuccess,
} from "../../features/appointment/appointmentSlice";
import { Calendar, User, Mail, Phone, Users, Stethoscope, UserCheck, FileText, CheckCircle2, Sparkles, CalendarDays } from "lucide-react";
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
    console.log("Form Data:", payload);
    await dispatch(createAppointment(payload));
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
      {/* ================= HERO (INCREASED DARKNESS & ELEGANT TYPOGRAPHY) ================= */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center py-24 lg:py-32 bg-[#080e12]">
        <img
          src={HERO_IMAGES.appointment}
          alt="Book Appointment"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-75 contrast-105"
        />

        {/* Increased Darkness & Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060c0f]/92 via-[#0a1216]/88 to-[#060c0f]/94 backdrop-blur-[2px]" />
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
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Book Appointment
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Schedule Your Visit
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Fill out the form below and our team will contact you to confirm
              your appointment.
            </p>
          </div>

          {/* Modal / Pop-up Styled Floating Card Container (Increased Width to max-w-5xl) */}
          <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl bg-[#060c0f] text-white shadow-2xl ring-1 ring-white/10 border border-teal-500/30 font-outfit my-4">
            {/* Pop-up Styled Header Banner */}
            <div className="relative overflow-hidden p-6 sm:p-7 text-white bg-gradient-to-r from-[#060c0f] via-[#0f1d24] to-[#060c0f] border-b border-teal-500/20 shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 font-outfit">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-normal text-teal-200 border border-white/15 backdrop-blur-md font-jakarta">
                    <FaClipboardCheck className="text-teal-300" />
                    <span className="font-medium tracking-wide">Direct Online Booking</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-teal-300/80 font-jakarta">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Instant Confirmation</span>
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-white leading-snug">
                  Schedule Your Clinical Consultation
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-300 font-light font-jakarta leading-relaxed">
                  Fill out your details below. Choose a specialist or department, pick your date, and select an available time slot.
                </p>
              </div>
            </div>

            {/* Pop-up Scrollable Form Body with FORMS_IMAGE.Appointment Background & Scrim */}
            <div className="relative p-6 sm:p-8 text-white bg-[#060c0f]">
              <img
                src={FORMS_IMAGE.Appointment}
                alt="Schedule Appointment Form Banner"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center brightness-75 contrast-105"
              />
              <div className="absolute inset-0 bg-[#060c0f]/90 backdrop-blur-[2px]" />

              <div className="relative z-10 space-y-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-6 md:grid-cols-2"
                >
                  {/* Step 1: Patient Information */}
                  <div className="md:col-span-2 flex items-center space-x-2.5 border-b border-white/10 pb-3 mb-1">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-400/30">1</span>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-300 font-jakarta flex items-center space-x-2">
                      <User className="h-4 w-4 text-teal-400" />
                      <span>Patient Details</span>
                    </h4>
                  </div>

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
                        className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta"
                      />
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400" />
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
                        className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta"
                      />
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400" />
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
                        className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta"
                      />
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-teal-400" />
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
                      <input
                        type="number"
                        placeholder="28"
                        {...register("patientAge", {
                          required: "Age is required",
                          valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta"
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
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                        className="w-full rounded-xl border border-white/20 bg-[#13222a] px-3 py-3.5 text-sm text-white outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta cursor-pointer"
                      >
                        <option value="" className="bg-[#0d181d] text-white">Select Gender</option>
                        <option value="Male" className="bg-[#0d181d] text-white">Male</option>
                        <option value="Female" className="bg-[#0d181d] text-white">Female</option>
                        <option value="Other" className="bg-[#0d181d] text-white">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="mt-1 text-xs text-red-400 font-medium">{errors.gender.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Step 2: Specialization & Doctor */}
                  <div className="md:col-span-2 flex items-center space-x-2.5 border-b border-white/10 pb-3 mb-1 mt-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-400/30">2</span>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-300 font-jakarta flex items-center space-x-2">
                      <Stethoscope className="h-4 w-4 text-teal-400" />
                      <span>Medical Specialization & Doctor Selection</span>
                    </h4>
                  </div>

                  {/* Specialization / Medical Department */}
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-300 font-jakarta">
                      Medical Specialization / Department *
                    </label>
                    <select
                      {...register("specialization", {
                        required: "Specialization is required",
                      })}
                      className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta cursor-pointer"
                    >
                      <option value="" className="bg-[#0d181d] text-white">Select Medical Department</option>
                      {SPECIALIZATIONS.map((spec) => (
                        <option key={spec} value={spec} className="bg-[#0d181d] text-white">
                          {spec}
                        </option>
                      ))}
                    </select>
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
                    <select
                      {...register("doctor")}
                      className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta cursor-pointer"
                    >
                      <option value="" className="bg-[#0d181d] text-white">Any Available Specialist</option>
                      {filteredDoctors.map((doc) => (
                        <option key={doc._id} value={doc._id} className="bg-[#0d181d] text-white">
                          Dr. {doc.fullName} ({doc.specialization})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 3: Date & Available Time Slot */}
                  <div className="md:col-span-2 flex items-center space-x-2.5 border-b border-white/10 pb-3 mb-1 mt-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-400/30">3</span>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-300 font-jakarta flex items-center space-x-2">
                      <CalendarDays className="h-4 w-4 text-teal-400" />
                      <span>Select Date & Time Slot</span>
                    </h4>
                  </div>

                  {/* Appointment Date */}
                  <div className="md:col-span-2">
                    <label className="block mb-1.5 text-xs font-medium text-gray-300 font-jakarta">
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      {...register("appointmentDate", {
                        required: "Appointment date is required",
                      })}
                      className="w-full rounded-xl border border-white/20 bg-[#13222a] px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta"
                    />
                    {errors.appointmentDate && (
                      <p className="mt-1 text-xs text-red-400 font-medium">
                        {errors.appointmentDate.message}
                      </p>
                    )}
                  </div>

                  {/* Interactive Time Slot Picker */}
                  <div className="md:col-span-2">
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
                  </div>

                  {/* Step 4: Health Concern / Reason */}
                  <div className="md:col-span-2 flex items-center space-x-2.5 border-b border-white/10 pb-3 mb-1 mt-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-400/30">4</span>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-300 font-jakarta flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-teal-400" />
                      <span>Reason for Visit / Health Concern</span>
                    </h4>
                  </div>

                  {/* Reason */}
                  <div className="md:col-span-2">
                    <div className="relative">
                      <textarea
                        rows={4}
                        placeholder="Describe your health concern or symptoms *"
                        {...register("reason", {
                          required: "Reason is required",
                        })}
                        className="w-full rounded-xl border border-white/20 bg-[#13222a] p-4 pl-11 text-sm text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta"
                      />
                      <FileText className="absolute left-3.5 top-4 h-4 w-4 text-teal-400" />
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
                    className="md:col-span-2 flex items-center justify-center space-x-2.5 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 px-8 py-4 text-base font-medium text-white shadow-xl shadow-teal-950/50 hover:from-teal-400 hover:to-emerald-400 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 transition-all duration-200 cursor-pointer font-outfit"
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Booking Appointment...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-white" />
                        <span>Confirm Clinical Appointment</span>
                      </>
                    )}
                  </button>
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
                  <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-[#253237] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-white/20">
                      {guidelines[0].badge}
                    </div>
                    <div className="h-36 w-full overflow-hidden bg-[#F8FBFC] relative">
                      <img
                        src={guidelines[0].image}
                        alt={guidelines[0].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
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
                  <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-[#253237] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-white/20">
                      {guidelines[1].badge}
                    </div>
                    <div className="h-36 w-full overflow-hidden bg-[#F8FBFC] relative">
                      <img
                        src={guidelines[1].image}
                        alt={guidelines[1].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
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
                  <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-[#253237] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-white/20">
                      {guidelines[2].badge}
                    </div>
                    <div className="h-36 w-full overflow-hidden bg-[#F8FBFC] relative">
                      <img
                        src={guidelines[2].image}
                        alt={guidelines[2].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
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
                  <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-[#253237] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-white/20">
                      {guidelines[3].badge}
                    </div>
                    <div className="h-36 w-full overflow-hidden bg-[#F8FBFC] relative">
                      <img
                        src={guidelines[3].image}
                        alt={guidelines[3].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
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
                    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
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

      {/* ================= FAQ ================= */}

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

          <div className="mx-auto max-w-4xl space-y-6">
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
            ].map((faq, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-[#253237] font-poppins">
                  {faq.question}
                </h3>

                <p className="mt-3 leading-7 text-[#5C6B73]">{faq.answer}</p>
              </AnimatedSection>
            ))}
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
            <div className="absolute inset-0 bg-linear-to-r from-[#253237]/90 via-[#5C6B73]/85 to-[#9DB4C0]/90" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white md:text-5xl font-poppins">
                Your Health Is Our Priority
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
                Our experienced doctors are here to provide trusted medical care
                for you and your family. Book your appointment today and take
                the first step toward better health.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
