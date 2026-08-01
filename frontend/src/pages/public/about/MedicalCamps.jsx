import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import CountUpPkg from "react-countup";
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
  FaEye,
  FaTooth,
  FaFemale,
  FaTint,
  FaQuoteLeft,
  FaUserMd,
  FaChevronDown,
  FaHandshake,
} from "react-icons/fa";
import { X } from "lucide-react";

import AnimatedSection from "../../../components/AnimatedSection";
import { submitContactMessage } from "../../../features/contact/contactService";
import { ABOUT_DETAIL_IMAGES, CTA_IMAGES } from "../../../constants/images";

const CountUp = CountUpPkg.default || CountUpPkg;

const HEALTH_CAMPS = [
  {
    id: 1,
    title: "Rural Cardiac & ECG Screening Drive",
    location: "Kanchipuram District Health Center",
    date: "August 15, 2026",
    day: "15",
    monthYear: "AUG 2026",
    status: "Registration Open",
    statusType: "open",
    patientsScreened: "500+ Expected",
    description:
      "Free 12-lead digital ECGs, echocardiography screenings, lipid profile testing, and consultations by senior cardiologists.",
  },
  {
    id: 2,
    title: "Pediatric Wellness & Immunization Camp",
    location: "Community Center, Avadi",
    date: "September 02, 2026",
    day: "02",
    monthYear: "SEP 2026",
    status: "Filling Fast",
    statusType: "fast",
    patientsScreened: "600+ Expected",
    description:
      "WHO-standard pediatric vaccinations, growth percentile tracking, child nutrition counseling, and free vitamin distribution.",
  },
  {
    id: 3,
    title: "Free Cataract & Optical Health Drive",
    location: "T. Nagar Public School Grounds",
    date: "September 20, 2026",
    day: "20",
    monthYear: "SEP 2026",
    status: "Registration Open",
    statusType: "open",
    patientsScreened: "1,000+ Expected",
    description:
      "Computerized eye testing, intraocular pressure measurement for glaucoma, free corrective spectacles, and cataract surgery referrals.",
  },
];

const GALLERY_ITEMS = [
  {
    url: ABOUT_DETAIL_IMAGES.medicalCamps.gallery[0],
    title: "Rural Cardiac Screening Camp",
    location: "Kanchipuram District",
    date: "June 2026",
    patients: "450 Patients Screened",
    description:
      "Over 450 rural residents received free digital ECGs, echocardiograms, and specialist consultations.",
    height: "h-64",
  },
  {
    url: ABOUT_DETAIL_IMAGES.medicalCamps.gallery[1],
    title: "Child Health & Immunization Drive",
    location: "Avadi Community Center",
    date: "May 2026",
    patients: "850 Children Immunized",
    description:
      "Comprehensive pediatric health checkups, nutritional supplements, and WHO immunizations for 850 children.",
    height: "h-80",
  },
  {
    url: ABOUT_DETAIL_IMAGES.medicalCamps.gallery[2],
    title: "Optical & Eye Care Camp",
    location: "T. Nagar Grounds",
    date: "April 2026",
    patients: "1,200 Vision Tests",
    description:
      "Distributed 600+ free corrective spectacles and referred 45 senior citizens for complimentary cataract surgery.",
    height: "h-72",
  },
  {
    url: ABOUT_DETAIL_IMAGES.medicalCamps.gallery[3],
    title: "Women's Wellness Screening",
    location: "Tambaram Center",
    date: "March 2026",
    patients: "380 Women Screened",
    description:
      "Dedicated gynecological health screenings, bone density scans, and preventative hygiene workshops.",
    height: "h-72",
  },
  {
    url: ABOUT_DETAIL_IMAGES.medicalCamps.gallery[4],
    title: "Voluntary Blood Donation Drive",
    location: "Saviours Campus",
    date: "February 2026",
    patients: "250 Units Donated",
    description:
      "Collected 250+ units of lifesaving blood in collaboration with accredited regional blood bank partners.",
    height: "h-80",
  },
  {
    url: ABOUT_DETAIL_IMAGES.medicalCamps.gallery[5],
    title: "Senior Citizen Health Camp",
    location: "Velachery Center",
    date: "January 2026",
    patients: "520 Elderly Screened",
    description:
      "Comprehensive geriatric health evaluations, joint care consultation, and free chronic disease medications.",
    height: "h-64",
  },
];

const CAMP_TYPES = [
  {
    title: "General Health Checkups",
    icon: FaHeartbeat,
    description:
      "Comprehensive BP, blood sugar, BMI, and general physician consultations.",
  },
  {
    title: "Eye Care & Optical",
    icon: FaEye,
    description:
      "Computerized vision tests, glaucoma screenings, and free spectacle distribution.",
  },
  {
    title: "Dental Screening",
    icon: FaTooth,
    description:
      "Oral hygiene checkups, cleaning guidance, and preventative dental care.",
  },
  {
    title: "Maternal & Child Health",
    icon: FaFemale,
    description:
      "Pediatric immunization tracking, prenatal checkups, and nutrition counseling.",
  },
  {
    title: "Blood Donation Drives",
    icon: FaTint,
    description:
      "Safe, certified voluntary blood donation drives with blood bank partners.",
  },
];

const IMPACT_STATS = [
  { value: 50, suffix: "+", label: "Free Health Camps Conducted" },
  { value: 20000, suffix: "+", label: "Patients Screened & Treated" },
  { value: 18, suffix: "", label: "Villages & Communities Reached" },
  { value: 500, suffix: "+", label: "Specialist Volunteer Hours" },
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
    } finally {
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
                  <h2 className="text-xl font-bold text-white font-poppins leading-snug">
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
                    <span>{submitting ? "Sending..." : "Send Inquiry"}</span>
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

/* ================= GALLERY LIGHTBOX MODAL COMPONENT ================= */
const GalleryLightboxModal = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl my-8 overflow-hidden rounded-4xl bg-white shadow-2xl z-10 border border-gray-100 flex flex-col md:flex-row"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md transition hover:bg-slate-900"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Expanded Photo */}
          <div className="md:w-3/5 bg-slate-900 relative min-h-[300px] md:min-h-[420px]">
            <img
              src={item.url}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details Narrative */}
          <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              <span className="inline-block rounded-full bg-[#E0FBFC] px-3 py-1 text-xs font-bold text-[#253237] mb-2">
                Outreach Showcase
              </span>
              <h3 className="text-2xl font-bold text-[#253237] font-poppins">
                {item.title}
              </h3>

              <div className="mt-3 space-y-1.5 text-xs text-[#5C6B73]">
                <p className="flex items-center gap-2 font-semibold">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{item.location}</span>
                </p>
                <p className="flex items-center gap-2 font-semibold">
                  <FaCalendarAlt className="text-teal-600" />
                  <span>{item.date}</span>
                </p>
                <p className="flex items-center gap-2 font-bold text-[#253237]">
                  <FaCheckCircle className="text-emerald-600" />
                  <span>{item.patients}</span>
                </p>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#5C6B73]">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-[#9DB4C0] font-semibold uppercase tracking-wider">
                Saviours Outreach
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-[#253237] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#5C6B73]"
              >
                Close View
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MedicalCamps = () => {
  const [selectedCampForInquiry, setSelectedCampForInquiry] = useState(null);
  const [activeGalleryItem, setActiveGalleryItem] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleOpenInquiry = (camp = null) => {
    if (camp) {
      setSelectedCampForInquiry(camp);
    } else {
      setSelectedCampForInquiry({
        title: "Saviours Community Health Camp Outreach",
      });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success("🎉 Subscribed! You will receive early notifications for upcoming health drives.", { duration: 4000 });
    setNewsletterEmail("");
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <img
          src={ABOUT_DETAIL_IMAGES.medicalCamps.hero}
          alt="Medical Camps Hero"
          loading="lazy"
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

            <h1 className="text-4xl font-bold text-white font-poppins sm:text-5xl lg:text-6xl leading-tight">
              Medical Camps & Health Drives
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

        {/* Animated Scroll Cue */}
        <a
          href="#outreach-intro"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 text-white/80 transition hover:text-white"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E0FBFC]">
            Scroll to Explore
          </span>
          <FaChevronDown className="animate-bounce text-xs text-[#C2DFE3]" />
        </a>
      </section>

      {/* ================= MAIN CONTENT GRID ================= */}
      <div className="relative bg-[#F8FBFC] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Desktop Sticky Navigation Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 space-y-3 rounded-3xl bg-white p-6 shadow-lg border border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#253237] border-b pb-3 mb-2">
                  Page Outline
                </h3>
                <nav className="space-y-1 text-sm font-semibold">
                  <a
                    href="#outreach-intro"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaListUl className="text-xs text-[#253237]" />
                    <span>Outreach Vision</span>
                  </a>
                  <a
                    href="#upcoming-drives"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaCalendarAlt className="text-xs text-[#253237]" />
                    <span>Upcoming Drives</span>
                  </a>
                  <a
                    href="#camp-gallery"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaImages className="text-xs text-[#253237]" />
                    <span>Photo Showcase</span>
                  </a>
                  <a
                    href="#camp-types"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaHeartbeat className="text-xs text-[#253237]" />
                    <span>Outreach Types</span>
                  </a>
                  <a
                    href="#impact-stats"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaChartLine className="text-xs text-[#253237]" />
                    <span>Social Impact</span>
                  </a>
                  <a
                    href="#testimonial"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaQuoteLeft className="text-xs text-[#253237]" />
                    <span>Volunteer Story</span>
                  </a>
                  <a
                    href="#get-involved"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaHandshake className="text-xs text-[#253237]" />
                    <span>Get Involved</span>
                  </a>
                </nav>

                <div className="mt-6 rounded-2xl bg-[#253237] p-4 text-white">
                  <p className="text-xs font-bold">Camp Helpline</p>
                  <p className="mt-1 text-sm font-semibold text-[#C2DFE3]">
                    +91 98765 43210
                  </p>
                  <button
                    type="button"
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
              {/* ================= SECTION 1: OUTREACH FRAMING INTRO ================= */}
              <section id="outreach-intro" className="scroll-mt-28">
                <AnimatedSection direction="up" className="max-w-3xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Community Outreach
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins sm:text-4xl">
                    Bringing Healthcare to Every Doorstep
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#5C6B73]">
                    Healthcare is a fundamental human right, not a privilege. Through Saviours Community Health Drives, our dedicated specialists, nurses, and volunteers bring free medical care, diagnostic screenings, and life-saving treatments directly to underserved villages and urban communities.
                  </p>
                </AnimatedSection>
              </section>

              {/* ================= SECTION 2: UPCOMING CAMPS (EVENT TICKET CARDS) ================= */}
              <section id="upcoming-drives" className="scroll-mt-28">
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Upcoming Events
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins">
                    Scheduled Health Drives
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Reserve your spot or inquire about upcoming medical screening drives in your area.
                  </p>
                </div>

                {HEALTH_CAMPS.length === 0 ? (
                  /* Polished Empty State */
                  <div className="rounded-3xl bg-white p-10 text-center shadow-lg border border-gray-100 max-w-xl mx-auto">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E0FBFC] text-[#253237] mb-4">
                      <FaCalendarAlt className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#253237] font-poppins">
                      New Camps Announced Monthly
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                      Check back soon or subscribe below to receive early notifications for upcoming health drives in your district.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="mt-6 flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#253237]"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-[#253237] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#5C6B73]"
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {HEALTH_CAMPS.map((camp, idx) => (
                      <AnimatedSection
                        key={camp.id}
                        delay={idx * 100}
                        direction="up"
                        className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col md:flex-row"
                      >
                        {/* Date Stub (Left Third) */}
                        <div className="md:w-1/3 p-6 flex flex-col justify-center items-center text-center text-white shrink-0 relative bg-[#253237]">
                          <span className="text-xs font-semibold uppercase tracking-widest text-[#C2DFE3]">
                            {camp.monthYear}
                          </span>
                          <span className="text-4xl font-bold font-poppins text-white my-1">
                            {camp.day}
                          </span>
                          <span className="text-[11px] text-[#9DB4C0] font-medium">
                            {camp.patientsScreened}
                          </span>
                        </div>

                        {/* Dashed Seam Divider */}
                        <div className="hidden md:block absolute left-1/3 top-0 bottom-0 border-l-2 border-dashed border-gray-200/40 z-10 -ml-[1px]" />

                        {/* Content Area (Right Two-Thirds) */}
                        <div className="md:w-2/3 p-6 sm:p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold border ${
                                  camp.statusType === "open"
                                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                    : "bg-amber-100 text-amber-800 border-amber-200"
                                }`}
                              >
                                {camp.status}
                              </span>
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#5C6B73]">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span>{camp.location}</span>
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-[#253237] font-poppins group-hover:text-[#5C6B73] transition-colors">
                              {camp.title}
                            </h3>

                            <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                              {camp.description}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-[#5C6B73]">
                              Free Consultation & Testing
                            </span>

                            <button
                              type="button"
                              onClick={() => handleOpenInquiry(camp)}
                              className="rounded-xl bg-[#253237] px-5 py-2.5 text-xs font-bold text-white shadow-md transition duration-300 hover:bg-[#5C6B73] hover:shadow-lg"
                            >
                              Register Interest
                            </button>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                )}
              </section>

              {/* ================= SECTION 3: PAST CAMPS PHOTO GALLERY (MASONRY) ================= */}
              <section id="camp-gallery" className="scroll-mt-28">
                <div className="rounded-4xl bg-white p-8 sm:p-12 shadow-xl border border-gray-100">
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                      Visual Evidence
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins">
                      Outreach Photo Showcase
                    </h2>
                    <p className="mt-2 text-sm text-[#5C6B73]">
                      Click any photograph to view the full image and detailed camp impact recap.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GALLERY_ITEMS.map((item, idx) => (
                      <AnimatedSection
                        key={idx}
                        delay={idx * 100}
                        className="w-full"
                      >
                        <div
                          tabIndex={0}
                          onClick={() => setActiveGalleryItem(item)}
                          className={`group relative overflow-hidden rounded-3xl bg-[#F8FBFC] shadow-lg border border-gray-100/80 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${item.height}`}
                        >
                          {/* Photo */}
                          <img
                            src={item.url}
                            alt={item.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />

                          {/* Frosted Glass Location & Patient Overlay (Top-Right) */}
                          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-xs font-semibold text-white shadow-md">
                            <span>📍 {item.location}</span>
                            <span>•</span>
                            <span>{item.patients}</span>
                          </div>

                          {/* Gradient Scrim & Caption (Bottom Reveal) */}
                          <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/50 to-transparent transition-all duration-500 flex flex-col justify-end p-6 sm:translate-y-4 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 translate-y-0 opacity-100">
                            <span className="text-[11px] font-bold text-[#E0FBFC] uppercase tracking-wider">
                              {item.date}
                            </span>
                            <h3 className="text-lg font-bold text-white font-poppins mt-1">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-xs text-[#E0FBFC]/90 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </section>

              {/* ================= SECTION 4: CAMP TYPES CATEGORIZATION ================= */}
              <section id="camp-types" className="scroll-mt-28">
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Outreach Services
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins">
                    Camp Types We Conduct
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Broad multi-specialty healthcare services tailored for community health drives.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                  {CAMP_TYPES.map((type, idx) => {
                    const IconComp = type.icon;
                    return (
                      <AnimatedSection
                        key={idx}
                        delay={idx * 100}
                        className="group rounded-3xl bg-white p-6 shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#253237] text-[#E0FBFC] text-xl shadow-md transition-transform duration-300 group-hover:scale-110 mb-4">
                            <IconComp />
                          </div>

                          <h3 className="text-base font-bold text-[#253237] font-poppins">
                            {type.title}
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                            {type.description}
                          </p>
                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </section>

              {/* ================= SECTION 5: ANIMATED IMPACT STATS BANNER ================= */}
              <section id="impact-stats" className="scroll-mt-28">
                <AnimatedSection
                  direction="up"
                  className="rounded-4xl bg-[#253237] p-10 sm:p-14 text-white shadow-2xl text-center"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C2DFE3]">
                    Measurable Social Impact
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-white font-poppins sm:text-4xl">
                    Our Outreach in Numbers
                  </h2>
                  <p className="mx-auto mt-2 max-w-xl text-sm text-[#E0FBFC]/90">
                    Empirical results from continuous community screening and healthcare delivery.
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
                    {IMPACT_STATS.map((stat, idx) => (
                      <div
                        key={idx}
                        className="rounded-3xl bg-[#5C6B73]/40 p-6 border border-white/10 text-center"
                      >
                        <p className="text-4xl font-bold text-white font-poppins">
                          <CountUp end={stat.value} duration={2.5} separator="," />
                          {stat.suffix}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-[#E0FBFC]">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </section>

              {/* ================= SECTION 6: VOLUNTEER TESTIMONIAL ================= */}
              <section id="testimonial" className="scroll-mt-28">
                <AnimatedSection
                  direction="up"
                  className="relative overflow-hidden rounded-4xl bg-white p-8 sm:p-12 text-[#253237] shadow-xl border border-gray-100"
                >
                  <FaQuoteLeft className="absolute -top-4 -left-4 text-9xl text-gray-100 select-none pointer-events-none z-0" />

                  <div className="relative z-10 grid gap-8 lg:grid-cols-3 items-center">
                    <div className="lg:col-span-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                        Volunteer Perspective
                      </span>
                      <blockquote className="mt-3 text-xl sm:text-2xl font-semibold leading-relaxed text-[#253237] font-poppins italic">
                        "Organizing health drives with Saviours Clinic has allowed us to deliver life-saving early diagnoses to families who otherwise had no access to specialists. Seeing a patient get timely cataract surgery or cardiac care is deeply rewarding."
                      </blockquote>
                    </div>

                    <div className="flex flex-col items-center text-center lg:border-l lg:border-gray-200 lg:pl-8">
                      <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80"
                        alt="Dr. Kavitha Sundaram"
                        loading="lazy"
                        className="h-28 w-28 rounded-full object-cover shadow-lg border-4 border-white ring-2 ring-[#253237]/10"
                      />
                      <h4 className="mt-4 text-lg font-bold text-[#253237] font-poppins">
                        Dr. Kavitha Sundaram
                      </h4>
                      <p className="text-xs font-semibold text-[#5C6B73]">
                        Chief Outreach Coordinator
                      </p>
                      <p className="text-[11px] text-[#9DB4C0]">
                        Saviours Community Outreach
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </section>

              {/* ================= SECTION 7: GET INVOLVED ACTION STRIP ================= */}
              <section id="get-involved" className="scroll-mt-28">
                <AnimatedSection
                  direction="up"
                  className="rounded-3xl bg-[#F8FBFC] p-8 sm:p-10 border border-gray-200 shadow-lg text-center"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Community Collaboration
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-[#253237] font-poppins sm:text-3xl">
                    Get Involved in Our Outreach
                  </h3>
                  <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#5C6B73]">
                    Whether you are a medical professional looking to volunteer, a corporate partner sponsoring a drive, or a village leader nominating a location, your support saves lives.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleOpenInquiry()}
                      className="rounded-xl bg-[#253237] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#5C6B73] shadow-md hover:shadow-lg"
                    >
                      Volunteer With Us
                    </button>
                    <RouterLink
                      to="/contact?subject=Nominate%20a%20Camp%20Location#contact-form"
                      className="rounded-xl border-2 border-[#253237] px-6 py-3 text-xs font-bold text-[#253237] transition hover:bg-[#253237] hover:text-white"
                    >
                      Suggest a Location
                    </RouterLink>
                  </div>
                </AnimatedSection>
              </section>

              {/* ================= SECTION 8: MAIN BOTTOM CTA ================= */}
              <section className="pt-4">
                <div className="relative overflow-hidden rounded-4xl px-8 py-16 text-center shadow-2xl md:px-20">
                  <img
                    src={CTA_IMAGES.background}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#5C6B73]/90 to-[#9DB4C0]/95" />

                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white font-poppins md:text-4xl">
                      Host a Health Camp with Saviours
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-[#E0FBFC]">
                      We partner with corporate CSR initiatives, educational institutions, and NGOs to organize free health screening camps.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <button
                        type="button"
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

      {/* Gallery Photo Lightbox Modal */}
      <GalleryLightboxModal
        item={activeGalleryItem}
        isOpen={!!activeGalleryItem}
        onClose={() => setActiveGalleryItem(null)}
      />
    </>
  );
};

export default MedicalCamps;
