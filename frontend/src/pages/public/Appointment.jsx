import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Calendar, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Stethoscope, Sparkles, Clock, ArrowRight } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";
import {
  createAppointment,
  clearAppointmentError,
  resetAppointmentSuccess,
} from "../../features/appointment/appointmentSlice";
import AnimatedSection from "../../components/AnimatedSection";
import SlotPicker from "../../components/SlotPicker";
import { HERO_IMAGES, GUIDELINE_IMAGES, CTA_IMAGES } from "../../constants/images";

const SPECIALIZATIONS = [
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "General Physician",
  "Dentist",
];

const Appointment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      gender: "Male",
      specialization: "Cardiology",
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: "",
      reason: "",
    },
  });

  const selectedSpecialization = watch("specialization");
  const selectedDate = watch("appointmentDate");
  const selectedTime = watch("appointmentTime");

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Appointment request submitted successfully!", {
        icon: "🎉",
      });
      reset();
      dispatch(resetAppointmentSuccess());
      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearAppointmentError());
    }
  }, [success, error, dispatch, navigate, reset]);

  const onSubmit = (data) => {
    dispatch(createAppointment(data));
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-32 sm:py-40">
        <img
          src={HERO_IMAGES.appointment}
          alt="Schedule Appointment"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-900/85 to-[#5C6B73]/75" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        >
          <span className="inline-flex items-center space-x-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-300 border border-teal-400/30 backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Online Appointment Booking</span>
          </span>

          <h1 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight">
            Book Your Consultation
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Select your medical department, date, and preferred time slot for instant doctor appointment booking.
          </p>
        </AnimatedSection>
      </section>

      {/* ================= APPOINTMENT FORM ================= */}
      <AnimatedSection as="section" className="py-24 bg-slate-50/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Instant Scheduling
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Patient Registration & Slot Selection
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
              Please complete patient details and pick an available time slot below.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-2xl ring-1 ring-slate-900/5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Patient Info Header */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-1.5">
                  <User className="h-4 w-4 text-teal-600" />
                  <span>1. Patient Information</span>
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register("patientName", {
                          required: "Patient name is required",
                        })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                      <User className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                    </div>
                    {errors.patientName && (
                      <p className="mt-1 text-xs text-red-500">{errors.patientName.message}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
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
                        className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                      <Mail className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                    </div>
                    {errors.patientEmail && (
                      <p className="mt-1 text-xs text-red-500">{errors.patientEmail.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("patientPhone", {
                          required: "Phone number is required",
                        })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                      <Phone className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                    </div>
                    {errors.patientPhone && (
                      <p className="mt-1 text-xs text-red-500">{errors.patientPhone.message}</p>
                    )}
                  </div>

                  {/* Age & Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        placeholder="30"
                        {...register("patientAge", {
                          required: "Age is required",
                          valueAsNumber: true,
                          min: { value: 1, message: "Age must be >= 1" },
                        })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                      {errors.patientAge && (
                        <p className="mt-1 text-xs text-red-500">{errors.patientAge.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Gender *
                      </label>
                      <select
                        {...register("gender", { required: "Gender is required" })}
                        className="w-full rounded-xl border border-slate-300 px-3 py-3.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department & Date Selection */}
              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-1.5">
                  <Stethoscope className="h-4 w-4 text-teal-600" />
                  <span>2. Department & Date Selection</span>
                </h3>

                <div className="grid gap-6 md:grid-cols-2 mb-6">
                  {/* Department */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Medical Specialization / Department *
                    </label>
                    <select
                      {...register("specialization", {
                        required: "Specialization is required",
                      })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    >
                      {SPECIALIZATIONS.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      {...register("appointmentDate", {
                        required: "Appointment date is required",
                      })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    />
                    {errors.appointmentDate && (
                      <p className="mt-1 text-xs text-red-500">{errors.appointmentDate.message}</p>
                    )}
                  </div>
                </div>

                {/* Slot Picker */}
                <div>
                  <input
                    type="hidden"
                    {...register("appointmentTime", {
                      required: "Please pick an available time slot",
                    })}
                  />
                  <SlotPicker
                    specialization={selectedSpecialization}
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

              {/* Health Concern / Reason */}
              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-1.5">
                  <FileText className="h-4 w-4 text-teal-600" />
                  <span>3. Clinical Reason for Visit</span>
                </h3>

                <div>
                  <textarea
                    rows={4}
                    placeholder="Describe your health concern or symptoms..."
                    {...register("reason", {
                      required: "Reason is required",
                    })}
                    className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                  {errors.reason && (
                    <p className="mt-1 text-xs text-red-500">{errors.reason.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-teal-600 py-4 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition duration-300 hover:bg-teal-700 disabled:opacity-70"
                >
                  {loading ? (
                    <span>Submitting Appointment...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Confirm & Book Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= APPOINTMENT GUIDELINES ================= */}
      <AnimatedSection as="section" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Important Information
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Appointment Guidelines
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Please follow these steps for a smooth consultation experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                image: GUIDELINE_IMAGES.arriveEarly,
                title: "Arrive 15 Mins Early",
                description: "Allows time for reception check-in and vital signs evaluation.",
              },
              {
                image: GUIDELINE_IMAGES.identification,
                title: "Bring Government ID",
                description: "Carry valid photo identification for registration verification.",
              },
              {
                image: GUIDELINE_IMAGES.medicalHistory,
                title: "Medical Records",
                description: "Bring past prescriptions, lab reports, and current medication details.",
              },
              {
                image: GUIDELINE_IMAGES.schedule,
                title: "Rescheduling Policy",
                description: "Notify us at least 4 hours in advance if you need to reschedule.",
              },
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-b from-slate-50/50 to-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default Appointment;
