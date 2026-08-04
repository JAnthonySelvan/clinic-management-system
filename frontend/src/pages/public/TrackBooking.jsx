import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaStethoscope,
  FaNotesMedical,
  FaPhoneAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaFileAlt,
  FaClipboardList,
  FaExclamationCircle,
} from "react-icons/fa";

import { Sparkles } from "lucide-react";
import { trackAppointmentByPhone } from "../../features/appointment/appointmentService";
import AnimatedSection from "../../components/AnimatedSection";
import { HERO_IMAGES, CTA_IMAGES } from "../../constants/images";

const statusClasses = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Approved: "bg-green-100 text-green-800 border-green-300",
  Completed: "bg-blue-100 text-blue-800 border-blue-300",
  Rejected: "bg-red-100 text-red-800 border-red-300",
};

const statusBorderClasses = {
  Pending: "border-l-yellow-500",
  Approved: "border-l-green-500",
  Completed: "border-l-blue-500",
  Rejected: "border-l-red-500",
};

const statusIcons = {
  Pending: <FaHourglassHalf className="text-yellow-600" />,
  Approved: <FaCheckCircle className="text-green-600" />,
  Completed: <FaCheckCircle className="text-blue-600" />,
  Rejected: <FaTimesCircle className="text-red-600" />,
};

const TrackBooking = () => {
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [searchedPhone, setSearchedPhone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSearch = async (data) => {
    try {
      setLoading(true);
      setHasSearched(false);
      const phoneInput = data.phone.trim();

      const response = await trackAppointmentByPhone(phoneInput);

      setAppointments(response.data || []);
      setSearchedPhone(phoneInput);
      setHasSearched(true);

      if (response.data && response.data.length > 0) {
        toast.success(`Found ${response.data.length} appointment(s)`);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch appointment details";
      toast.error(errorMsg);
      setAppointments([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return { date: "N/A", time: "" };
    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) return { date: "N/A", time: "" };

    const formatted = dateObj.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    });

    return formatted;
  };

  return (
    <>
      {/* ================= HERO (INCREASED DARKNESS & ELEGANT TYPOGRAPHY) ================= */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center py-24 lg:py-32 bg-[#080e12]">
        <img
          src={HERO_IMAGES.track}
          alt="Track Appointment"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-75 contrast-105"
        />

        {/* Increased Darkness & Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060c0f]/80 to-[#060c0f]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-5xl px-6 text-center lg:px-8 z-10 space-y-6 flex flex-col items-center font-outfit"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs sm:text-sm font-normal tracking-wide text-teal-200 backdrop-blur-md shadow-2xl">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span className="font-jakarta font-medium tracking-wide">Real-Time Appointment Status</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-normal text-white leading-[1.15]">
            Track Your{" "}
            <span className="font-serif-display italic font-normal bg-gradient-to-r from-teal-200 via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              Appointment
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl font-light text-gray-300 leading-relaxed font-jakarta">
            Easily check the status and details of your booked appointment with Saviours Clinic by entering your registered phone number.
          </p>
        </AnimatedSection>
      </section>

      {/* ================= SEARCH FORM CARD ================= */}
      <AnimatedSection as="section" className="py-24 bg-[#F8FBFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
                Appointment Lookup
              </span>
              <h2 className="mt-2 text-3xl font-bold text-[#253237]">
                Enter Your Phone Number
              </h2>
              <p className="mt-2 text-base text-[#5C6B73]">
                Provide the mobile number used when placing your appointment booking.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#091115] via-[#122027] to-[#091115] text-white shadow-2xl border border-teal-500/20 font-outfit p-8 sm:p-10">
              <form onSubmit={handleSubmit(onSearch)} className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2 font-jakarta">
                    Registered Phone Number *
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-teal-400">
                      <FaPhoneAlt />
                    </div>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210 or 9876543210"
                      {...register("phone", {
                        required: "Phone number is required",
                        minLength: {
                          value: 5,
                          message: "Phone number must be at least 5 digits",
                        },
                      })}
                      className="w-full rounded-xl border border-white/20 bg-[#13222a] py-4 pl-11 pr-5 text-white placeholder-gray-400 outline-none transition duration-200 focus:border-teal-400 focus:bg-[#182a34] focus:ring-2 focus:ring-teal-400/20 font-jakarta text-sm"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-400 font-medium">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-4 text-base font-medium text-white shadow-lg shadow-teal-950/40 hover:from-teal-500 hover:to-emerald-500 hover:scale-[1.01] transition duration-300 disabled:opacity-70 cursor-pointer font-outfit"
                >
                  <FaSearch className="text-base" />
                  {loading ? "Searching..." : "Track Appointment"}
                </button>
              </form>
            </div>
          </div>

          {/* ================= RESULTS SECTION ================= */}
          {hasSearched && (
            <div className="mt-16">
              {appointments.length > 0 ? (
                <div>
                  <div className="mb-10 text-center">
                    <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
                      Search Results
                    </span>
                    <h3 className="mt-2 text-3xl font-bold text-[#253237]">
                      Appointments for {searchedPhone}
                    </h3>
                  </div>

                  <div className="grid gap-8 max-w-4xl mx-auto">
                    {appointments.map((app, index) => (
                      <AnimatedSection
                        key={app._id || index}
                        delay={index * 100}
                        direction="up"
                        className={`overflow-hidden rounded-3xl bg-white p-8 shadow-xl border-l-8 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                          statusBorderClasses[app.status] || "border-l-gray-400"
                        }`}
                      >
                        {/* Header: Ticket Title + Status Pill */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0FBFC] text-[#253237]">
                              <FaClipboardList className="text-xl" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-[#253237]">
                                {app.specialization || "General Consultation"}
                              </h4>
                              <p className="text-xs uppercase tracking-wider font-semibold text-[#5C6B73]">
                                Appointment Ticket
                              </p>
                            </div>
                          </div>

                          <div
                            className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                              statusClasses[app.status] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {statusIcons[app.status]}
                            <span>{app.status}</span>
                          </div>
                        </div>

                        {/* Card Details Grid */}
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                          {/* Doctor / Specialist Info */}
                          <div className="flex items-start gap-4 rounded-2xl bg-[#F8FBFC] p-4">
                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#253237] text-white">
                              <FaUserMd className="text-lg" />
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wider text-[#5C6B73]">
                                Assigned Doctor
                              </p>
                              <p className="text-base font-bold text-[#253237]">
                                {app.doctor?.fullName
                                  ? `Dr. ${app.doctor.fullName}`
                                  : "Doctor Unassigned / Pending"}
                              </p>
                              {app.doctor?.specialization && (
                                <p className="text-xs text-[#5C6B73] flex items-center gap-1 mt-0.5">
                                  <FaStethoscope className="text-xs" />
                                  {app.doctor.specialization}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Date & Time Info */}
                          <div className="flex items-start gap-4 rounded-2xl bg-[#F8FBFC] p-4">
                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5C6B73] text-white">
                              <FaCalendarAlt className="text-lg" />
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wider text-[#5C6B73]">
                                Date & Time
                              </p>
                              <p className="text-base font-bold text-[#253237]">
                                {formatDateTime(app.appointmentDateTime)}
                              </p>
                              <p className="text-xs text-[#5C6B73] flex items-center gap-1 mt-0.5">
                                <FaClock className="text-xs" />
                                Scheduled Consultation
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Reason / Notes */}
                        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5C6B73]">
                            <FaNotesMedical className="text-[#253237]" />
                            <span>Reason for Visit</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            {app.reason}
                          </p>

                          {app.status === "Rejected" && app.rejectionReason && (
                            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 text-xs text-rose-800 font-jakarta flex items-start gap-2.5">
                              <FaExclamationCircle className="text-rose-600 shrink-0 text-sm mt-0.5" />
                              <div>
                                <span className="font-semibold">Rejection Reason:</span> {app.rejectionReason}
                              </div>
                            </div>
                          )}
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              ) : (
                /* Empty State */
                <AnimatedSection direction="up" className="mx-auto max-w-xl">
                  <div className="rounded-3xl bg-white p-10 text-center shadow-xl border border-gray-100">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                      <FaExclamationCircle className="text-4xl" />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-[#253237]">
                      No Appointments Found
                    </h3>

                    <p className="mt-3 text-base text-[#5C6B73] leading-relaxed">
                      No appointments found for{" "}
                      <span className="font-semibold text-[#253237]">
                        "{searchedPhone}"
                      </span>
                      . Please double check the number and try again, or book a
                      new appointment.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link
                        to="/appointment"
                        className="rounded-xl bg-[#253237] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#5C6B73]"
                      >
                        Book New Appointment
                      </Link>

                      <button
                        onClick={() => {
                          setHasSearched(false);
                          setAppointments([]);
                        }}
                        className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition duration-300 hover:bg-gray-50"
                      >
                        Clear Search
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          )}
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
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Need Medical Assistance?
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
                Our dedicated doctors are ready to help you with expert care and
                personalized treatment.
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

export default TrackBooking;
