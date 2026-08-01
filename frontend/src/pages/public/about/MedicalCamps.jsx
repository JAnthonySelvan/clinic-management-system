import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaHandsHelping,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronRight,
  FaImages,
  FaListUl,
  FaChartLine,
  FaCheckCircle,
  FaEnvelope,
  FaUser,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";
import { X } from "lucide-react";

import AnimatedSection from "../../../components/AnimatedSection";
import { submitContactMessage } from "../../../features/contact/contactService";
import { ABOUT_DETAIL_IMAGES, CTA_IMAGES } from "../../../constants/images";

const HEALTH_CAMPS = [
  {
    title: "Rural Cardiac & ECG Screening Drive",
    location: "Kanchipuram District Health Center",
    date: "August 15, 2026",
    status: "Upcoming",
    patientsScreened: "500+ Expected",
    description:
      "Free 12-lead digital ECGs, echocardiography screenings, lipid profile testing, and consultations by senior cardiologists.",
  },
  {
    title: "Pediatric Wellness & Immunization Camp",
    location: "Community Center, Avadi",
    date: "July 10, 2026",
    status: "Completed",
    patientsScreened: "850 Children Treated",
    description:
      "WHO-standard pediatric vaccinations, growth percentile tracking, child nutrition counseling, and free vitamin distribution.",
  },
  {
    title: "Free Cataract & Optical Health Drive",
    location: "T. Nagar Public School Grounds",
    date: "June 22, 2026",
    status: "Completed",
    patientsScreened: "1,200 Screened",
    description:
      "Computerized eye testing, intraocular pressure measurement for glaucoma, free corrective spectacles, and cataract surgery referrals.",
  },
];

const IMPACT_STATS = [
  { label: "Free Health Camps Held", value: "50+" },
  { label: "Patients Screened & Treated", value: "25,000+" },
  { label: "Rural Villages Covered", value: "18" },
  { label: "Free Medicines Delivered", value: "₹15 Lakhs+" },
];

/* ================= CAMP INQUIRY MODAL COMPONENT ================= */
const CampInquiryModal = ({ camp, isOpen, onClose }) => {
  const [submitting, setSubmitting] = useState(false);
  const campTitle = camp?.title || "Community Health Camp Outreach";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: `Inquiry: ${campTitle}`,
      message: `Hello Saviours Outreach Team,\n\nI would like to inquire about details, schedules, or participation for "${campTitle}". Please send me more information.\n\nThank you!`,
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await submitContactMessage(data);
      toast.success(
        `🎉 Inquiry for "${campTitle}" sent successfully! Our outreach coordinator will contact you.`,
        { duration: 5000 },
      );
      reset();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to submit inquiry. Please try again or call our helpline.",
      );
    } fontFinally: {
      setSubmitting(false);
    }
  };

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl my-8 overflow-hidden rounded-3xl bg-white shadow-2xl z-10 max-h-[90vh] flex flex-col border border-gray-100"
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

              <div className="flex items-center space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md shrink-0 border border-white/20">
                  <FaHandsHelping className="text-2xl text-[#E0FBFC]" />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-teal-500/20 px-3 py-0.5 text-xs font-semibold text-teal-200 border border-teal-400/30 mb-1">
                    Outreach Inquiry Message
                  </span>
                  <h2 className="text-xl font-bold text-white leading-snug">
                    {campTitle}
                  </h2>
                </div>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        {...register("name", { required: "Full Name is required" })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                      <FaUser className="absolute left-3.5 top-3.5 text-xs text-slate-400" />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
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
                        placeholder="rahul@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                      <FaEnvelope className="absolute left-3.5 top-3.5 text-xs text-slate-400" />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-10 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                      />
                      <FaPhone className="absolute left-3.5 top-3.5 text-xs text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Inquiry Subject *
                    </label>
                    <input
                      type="text"
                      {...register("subject", { required: "Subject is required" })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Message / Inquiry Details *
                  </label>
                  <textarea
                    rows="4"
                    {...register("message", { required: "Message is required" })}
                    className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <RouterLink
                    to={`/contact?subject=${encodeURIComponent(`Inquiry: ${campTitle}`)}`}
                    onClick={onClose}
                    className="text-xs font-bold text-[#5C6B73] hover:text-[#253237] underline"
                  >
                    Go to Full Contact Form →
                  </RouterLink>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#253237] px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#5C6B73] disabled:opacity-60"
                  >
                    <FaPaperPlane className="text-xs" />
                    <span>{submitting ? "Sending..." : "Send Message to Admin"}</span>
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

const MedicalCamps = () => {
  const [selectedCampForInquiry, setSelectedCampForInquiry] = useState(null);

  const handleOpenInquiry = (camp = null) => {
    if (camp) {
      setSelectedCampForInquiry(camp);
    } else {
      setSelectedCampForInquiry({
        title: "Saviours Community Health Camp Outreach",
      });
    }
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <img
          src={ABOUT_DETAIL_IMAGES.medicalCamps.hero}
          alt="Medical Camps Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#253237]/85 to-[#5C6B73]/75" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C2DFE3]">
            <RouterLink to="/" className="hover:text-white transition-colors">
              Home
            </RouterLink>
            <FaChevronRight className="text-[10px]" />
            <RouterLink to="/about" className="hover:text-white transition-colors">
              About
            </RouterLink>
            <FaChevronRight className="text-[10px]" />
            <span className="text-white font-bold">Medical Camps</span>
          </div>

          <AnimatedSection direction="up" className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md mb-4 border border-white/20">
              <FaHandsHelping className="text-teal-300" />
              Community Outreach & Care
            </span>

            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight">
              Medical Camps & Drives
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#E0FBFC] sm:text-xl">
              Bringing free specialist consultations, diagnostic screenings, and essential treatments to underserved urban and rural communities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => handleOpenInquiry()}
                className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#253237] shadow-xl transition-all hover:scale-105 hover:bg-[#E0FBFC]"
              >
                Inquire About Camps
              </button>
              <RouterLink
                to="/contact?subject=Sponsor%20a%20Health%20Drive#contact-form"
                className="rounded-xl border-2 border-white/80 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#253237]"
              >
                Sponsor a Health Drive
              </RouterLink>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================= MAIN CONTENT GRID ================= */}
      <div className="relative bg-[#F8FBFC] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Desktop Sticky Navigation Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 space-y-3 rounded-3xl bg-white p-6 shadow-lg border border-gray-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#253237] border-b pb-3 mb-2">
                  Page Outline
                </h3>
                <nav className="space-y-1 text-sm font-semibold">
                  <a
                    href="#outreach-intro"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaListUl className="text-xs" />
                    <span>Outreach Vision</span>
                  </a>
                  <a
                    href="#camp-gallery"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaImages className="text-xs" />
                    <span>Event Gallery</span>
                  </a>
                  <a
                    href="#upcoming-drives"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaCalendarAlt className="text-xs" />
                    <span>Health Drives</span>
                  </a>
                  <a
                    href="#impact-stats"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaChartLine className="text-xs" />
                    <span>Social Impact</span>
                  </a>
                </nav>

                <div className="mt-6 rounded-2xl bg-[#253237] p-4 text-white">
                  <p className="text-xs font-bold">Camp Helpline</p>
                  <p className="mt-1 text-sm font-semibold text-[#C2DFE3]">
                    +91 98765 43210
                  </p>
                  <button
                    onClick={() => handleOpenInquiry()}
                    className="mt-3 w-full rounded-xl bg-[#5C6B73] py-2 text-xs font-bold text-white transition hover:bg-[#9DB4C0] hover:text-[#253237]"
                  >
                    Inquire Details
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="space-y-20 lg:col-span-3">
              {/* ================= OUTREACH INTRO SECTION ================= */}
              <section id="outreach-intro" className="scroll-mt-28">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  <AnimatedSection direction="left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                      Social Responsibility
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-[#253237] sm:text-4xl">
                      Healthcare Beyond Clinic Walls
                    </h2>
                    <p className="mt-6 text-base leading-8 text-[#5C6B73]">
                      Healthcare is a fundamental human right. Through Saviours Community Health Drives, our physicians, nurses, and volunteers travel to remote villages and urban settlements to provide diagnostic checkups, free medicines, and life-saving early referrals.
                    </p>

                    <div className="mt-6 space-y-3">
                      {[
                        "Free ECG, blood sugar & optical screenings",
                        "Free distribution of essential prescription medicines",
                        "Specialist referrals to Saviours Clinic tertiary care",
                        "Health awareness & preventive hygiene workshops",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <FaCheckCircle className="text-teal-600 shrink-0" />
                          <span className="text-sm font-semibold text-[#253237]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AnimatedSection>

                  <AnimatedSection direction="right" delay={150}>
                    <div className="group overflow-hidden rounded-4xl shadow-2xl ring-1 ring-black/5">
                      <img
                        src={ABOUT_DETAIL_IMAGES.medicalCamps.hero}
                        alt="Community Medical Camp"
                        className="h-80 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-96"
                      />
                    </div>
                  </AnimatedSection>
                </div>
              </section>

              {/* ================= PHOTO GALLERY STRIP ================= */}
              <section id="camp-gallery" className="scroll-mt-28">
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Visual Memories
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237]">
                    Outreach Photo Showcase
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Snapshots from recent rural screening camps and free health distribution drives.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {ABOUT_DETAIL_IMAGES.medicalCamps.gallery.map((imgUrl, idx) => (
                    <AnimatedSection
                      key={idx}
                      delay={idx * 100}
                      className={`group overflow-hidden rounded-none border border-[#253237]/10 shadow-xl transition duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                        idx % 3 === 0
                          ? "h-64"
                          : idx % 3 === 1
                          ? "h-80"
                          : "h-72"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Camp photo ${idx + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </AnimatedSection>
                  ))}
                </div>
              </section>

              {/* ================= UPCOMING & PAST CAMPS ================= */}
              <section id="upcoming-drives" className="scroll-mt-28">
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Schedule of Events
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237]">
                    Recent & Upcoming Health Drives
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Check our schedule for community health checkups near your area.
                  </p>
                </div>

                <div className="space-y-6">
                  {HEALTH_CAMPS.map((camp, idx) => (
                    <AnimatedSection
                      key={idx}
                      delay={idx * 100}
                      className="group rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col sm:flex-row justify-between gap-6"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              camp.status === "Upcoming"
                                ? "bg-teal-100 text-teal-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {camp.status}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6B73]">
                            <FaCalendarAlt className="text-teal-600" />
                            {camp.date}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6B73]">
                            <FaMapMarkerAlt className="text-red-500" />
                            {camp.location}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-[#253237]">
                          {camp.title}
                        </h3>

                        <p className="text-xs leading-relaxed text-[#5C6B73] max-w-xl">
                          {camp.description}
                        </p>
                      </div>

                      <div className="flex flex-col justify-between sm:items-end shrink-0">
                        <span className="text-xs font-bold text-[#253237] bg-[#E0FBFC] px-3 py-1.5 rounded-xl">
                          {camp.patientsScreened}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleOpenInquiry(camp)}
                          className="mt-4 sm:mt-0 rounded-xl bg-[#253237] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#5C6B73]"
                        >
                          Inquire Details
                        </button>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </section>

              {/* ================= IMPACT STATS STRIP ================= */}
              <section id="impact-stats" className="scroll-mt-[#253237]">
                <div className="rounded-4xl bg-[#253237] p-8 sm:p-12 text-white shadow-2xl">
                  <div className="mb-8 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#9DB4C0]">
                      Community Outreach
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-[#E0FBFC]">
                      Our Social Impact in Numbers
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {IMPACT_STATS.map((stat, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white/5 p-6 border border-white/10 text-center"
                      >
                        <p className="text-3xl font-bold text-[#E0FBFC] sm:text-4xl">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-[#9DB4C0]">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ================= BOTTOM CTA ================= */}
              <section className="pt-8">
                <div className="relative overflow-hidden rounded-4xl px-8 py-16 text-center shadow-2xl md:px-20">
                  <img
                    src={CTA_IMAGES.background}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#5C6B73]/90 to-[#9DB4C0]/95" />

                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                      Host a Health Camp with Saviours
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-[#E0FBFC]">
                      We partner with corporate CSR initiatives, educational institutions, and NGOs to organize free health screening camps.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <button
                        onClick={() => handleOpenInquiry()}
                        className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#253237] shadow-xl transition hover:scale-105 hover:bg-[#E0FBFC]"
                      >
                        Inquire About Camps
                      </button>
                      <RouterLink
                        to="/contact?subject=Medical%20Camp%20Outreach%20Inquiry#contact-form"
                        className="rounded-xl border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-[#253237]"
                      >
                        Contact Outreach Team
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* Camp Inquiry Modal */}
      <CampInquiryModal
        camp={selectedCampForInquiry}
        isOpen={!!selectedCampForInquiry}
        onClose={() => setSelectedCampForInquiry(null)}
      />
    </>
  );
};

export default MedicalCamps;
