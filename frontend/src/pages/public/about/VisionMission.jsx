import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaBullseye,
  FaEye,
  FaHeart,
  FaShieldAlt,
  FaAward,
  FaLightbulb,
  FaChevronRight,
  FaChevronDown,
  FaQuoteLeft,
  FaCheckCircle,
  FaListUl,
  FaUserMd,
  FaHistory,
  FaHandshake,
} from "react-icons/fa";

import AnimatedSection from "../../../components/AnimatedSection";
import BookingModal from "../../../components/BookingModal";
import { ABOUT_DETAIL_IMAGES, CTA_IMAGES, DOCTOR_PORTRAITS } from "../../../constants/images";

const CORE_VALUES = [
  {
    title: "Compassionate Care",
    description:
      "We listen with empathy and treat every patient with warmth, dignity, and personalized attention.",
    icon: FaHeart,
    image: ABOUT_DETAIL_IMAGES.visionMission.values[0],
  },
  {
    title: "Uncompromising Integrity",
    description:
      "Honesty, ethical medical governance, and complete transparency in diagnosis and billing.",
    icon: FaShieldAlt,
    image: ABOUT_DETAIL_IMAGES.visionMission.values[1],
  },
  {
    title: "Clinical Excellence",
    description:
      "Continuous medical education, board-certified specialists, and evidence-based clinical protocols.",
    icon: FaAward,
    image: ABOUT_DETAIL_IMAGES.visionMission.values[2],
  },
  {
    title: "Healthcare Innovation",
    description:
      "Pioneering medical technology, digital health diagnostics, and cutting-edge surgical techniques.",
    icon: FaLightbulb,
    image: ABOUT_DETAIL_IMAGES.visionMission.values[3],
  },
];

const MILESTONES = [
  {
    year: "2010",
    title: "Clinic Founded",
    description:
      "Established with a single facility and a clear mandate for ethical, patient-first medicine.",
  },
  {
    year: "2015",
    title: "Specialty Wings",
    description:
      "Expanded to dedicated Cardiology and Neurology wings with advanced digital diagnostic suites.",
  },
  {
    year: "2020",
    title: "10,000+ Patients",
    description:
      "Achieved a major clinical milestone and launched free community health screening camps.",
  },
  {
    year: "2024",
    title: "Regional Excellence",
    description:
      "Recognized as a premier healthcare institution for clinical governance and patient outcomes.",
  },
];

const PATIENT_PROMISES = [
  {
    title: "Transparent Communication",
    description:
      "You will never wait without updates. Diagnosis and treatment plans are explained in plain, jargon-free language.",
  },
  {
    title: "Complete Price Clarity",
    description:
      "Upfront cost breakdowns for consultations, lab tests, and procedures before any care begins.",
  },
  {
    title: "Proactive Follow-Ups",
    description:
      "Post-consultation recovery checks and lab results are proactively delivered by our care team.",
  },
  {
    title: "Tailored Care Plans",
    description:
      "Every treatment protocol is customized to your health profile, lifestyle, and individual goals.",
  },
];

const VisionMission = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <img
          src={ABOUT_DETAIL_IMAGES.visionMission.hero}
          alt="Vision & Mission Hero"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#253237]/60 via-[#253237]/45 to-[#5C6B73]/35 backdrop-blur-[1px]" />

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
            <span className="text-white font-bold">Vision & Mission</span>
          </div>

          <AnimatedSection direction="up" className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md mb-4 border border-white/20">
              <FaBullseye className="text-teal-300" />
              Saviours Core Identity
            </span>

            <h1 className="text-4xl font-bold text-white font-poppins sm:text-5xl lg:text-6xl leading-tight">
              Our Purpose, Vision & Values
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#E0FBFC] sm:text-xl">
              Dedicated to restoring health, inspiring hope, and elevating clinical care through ethical medicine and compassionate patient experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#253237] shadow-xl transition-all hover:scale-105 hover:bg-[#E0FBFC]"
              >
                Schedule Consultation
              </button>
              <RouterLink
                to="/doctors"
                className="rounded-xl border-2 border-white/80 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#253237]"
              >
                Meet Medical Board
              </RouterLink>
            </div>
          </AnimatedSection>
        </div>

        {/* Animated Scroll Cue */}
        <a
          href="#mission-vision"
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
                    href="#mission-vision"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaListUl className="text-xs text-[#253237]" />
                    <span>Mission & Vision</span>
                  </a>
                  <a
                    href="#story"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaHistory className="text-xs text-[#253237]" />
                    <span>Our Story</span>
                  </a>
                  <a
                    href="#core-values"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaAward className="text-xs text-[#253237]" />
                    <span>Core Values</span>
                  </a>
                  <a
                    href="#director-quote"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaQuoteLeft className="text-xs text-[#253237]" />
                    <span>Director's Message</span>
                  </a>
                  <a
                    href="#patient-promises"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaHandshake className="text-xs text-[#253237]" />
                    <span>Patient Promises</span>
                  </a>
                </nav>

                <div className="mt-6 rounded-2xl bg-[#253237] p-4 text-white">
                  <p className="text-xs font-bold">Need Immediate Help?</p>
                  <p className="mt-1 text-sm font-semibold text-[#C2DFE3]">
                    +91 98765 43210
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(true)}
                    className="mt-3 w-full rounded-xl bg-[#5C6B73] py-2 text-xs font-bold text-white transition hover:bg-[#9DB4C0] hover:text-[#253237]"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="space-y-20 lg:col-span-3">
              {/* ================= SECTION 1: MISSION & VISION SPLIT CARDS ================= */}
              <section id="mission-vision" className="scroll-mt-28">
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Foundational Pillars
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins sm:text-4xl">
                    Our Mission & Vision
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Setting standard healthcare benchmarks through clinical precision and human warmth.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Mission Card */}
                  <AnimatedSection
                    direction="up"
                    delay={0}
                    className="group overflow-hidden rounded-4xl bg-white shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between relative"
                  >
                    <div>
                      {/* Top Image Section with Diagonal Clip Path */}
                      <div className="relative h-60 w-full overflow-hidden bg-[#253237] [clip-path:polygon(0_0,_100%_0,_100%_88%,_0_100%)]">
                        <img
                          src={ABOUT_DETAIL_IMAGES.visionMission.mission}
                          alt="Our Mission"
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#253237]/60 to-transparent" />
                        {/* Decorative Watermark Numeral */}
                        <span className="absolute top-2 right-4 text-8xl font-bold font-poppins text-white/25 select-none pointer-events-none z-10">
                          01
                        </span>
                      </div>

                      {/* Pinned Circular Icon Badge */}
                      <div className="relative z-10 -mt-7 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#253237] text-white shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                        <FaBullseye className="text-2xl text-[#E0FBFC]" />
                      </div>

                      <div className="p-8 pt-4 text-center">
                        <h3 className="text-2xl font-bold text-[#253237] font-poppins">
                          Our Mission
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-[#5C6B73]">
                          To provide accessible, high-quality, and compassionate healthcare services to every patient with advanced diagnostics, ethical governance, and personalized clinical care.
                        </p>
                        <div className="mt-6 space-y-3 text-left">
                          {[
                            "Patient-first medical care protocols",
                            "Transparent treatment plans & pricing",
                            "State-of-the-art diagnostic facilities",
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <FaCheckCircle className="text-[#253237] text-sm shrink-0" />
                              <span className="text-xs font-semibold text-[#253237]">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Vision Card */}
                  <AnimatedSection
                    direction="up"
                    delay={150}
                    className="group overflow-hidden rounded-4xl bg-white shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between relative"
                  >
                    <div>
                      {/* Top Image Section with Diagonal Clip Path */}
                      <div className="relative h-60 w-full overflow-hidden bg-[#253237] [clip-path:polygon(0_0,_100%_0,_100%_88%,_0_100%)]">
                        <img
                          src={ABOUT_DETAIL_IMAGES.visionMission.vision}
                          alt="Our Vision"
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#253237]/60 to-transparent" />
                        {/* Decorative Watermark Numeral */}
                        <span className="absolute top-2 right-4 text-8xl font-bold font-poppins text-white/25 select-none pointer-events-none z-10">
                          02
                        </span>
                      </div>

                      {/* Pinned Circular Icon Badge */}
                      <div className="relative z-10 -mt-7 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#253237] text-white shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                        <FaEye className="text-2xl text-[#E0FBFC]" />
                      </div>

                      <div className="p-8 pt-4 text-center">
                        <h3 className="text-2xl font-bold text-[#253237] font-poppins">
                          Our Vision
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-[#5C6B73]">
                          To be a premier healthcare institution recognized nationally for medical innovation, clinical excellence, and compassionate patient outcomes.
                        </p>
                        <div className="mt-6 space-y-3 text-left">
                          {[
                            "Leading multi-specialty research excellence",
                            "Integrating AI & modern diagnostics",
                            "Expanding community outreach health camps",
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <FaCheckCircle className="text-[#253237] text-sm shrink-0" />
                              <span className="text-xs font-semibold text-[#253237]">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </section>

              {/* ================= SECTION 2: OUR STORY TIMELINE ================= */}
              <section id="story" className="scroll-mt-28">
                <div className="rounded-4xl bg-white p-8 sm:p-12 shadow-xl border border-gray-100">
                  <div className="mb-10 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                      Institutional Journey
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins sm:text-4xl">
                      Our Story & Milestones
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-[#5C6B73]">
                      A 15-year narrative of growth, medical innovation, and unwavering patient dedication.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
                    {MILESTONES.map((item, index) => (
                      <AnimatedSection
                        key={index}
                        delay={index * 100}
                        direction="up"
                        className="group relative rounded-3xl bg-[#F8FBFC] p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#253237] text-[#E0FBFC] font-bold text-sm shadow-md ring-4 ring-white mb-4 transition-transform duration-300 group-hover:scale-110">
                            {item.year}
                          </div>

                          <h3 className="text-lg font-bold text-[#253237] font-poppins">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                            {item.description}
                          </p>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </section>

              {/* ================= SECTION 3: CORE VALUES INTERACTIVE HOVER CARDS ================= */}
              <section id="core-values" className="scroll-mt-28">
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    What Drives Us
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins">
                    Our Core Values
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    The ethical principles guiding every diagnosis, consultation, and patient interaction.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {CORE_VALUES.map((val, idx) => {
                    const IconComp = val.icon;
                    return (
                      <AnimatedSection
                        key={idx}
                        delay={idx * 100}
                        className="w-full"
                      >
                        <div
                          tabIndex={0}
                          className="group relative overflow-hidden rounded-3xl bg-[#F8FBFC] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#9DB4C0]/50 border border-gray-100 flex flex-col justify-end h-80"
                        >
                          {/* Image Backdrop Layer */}
                          <div className="absolute inset-0 bg-[#253237]">
                            <img
                              src={val.image}
                              alt={val.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90 group-focus-within:opacity-90" />
                          </div>

                          {/* Frosted Glass Icon Badge (Top-Left) */}
                          <div className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                            <IconComp className="text-base text-[#E0FBFC]" />
                          </div>

                          {/* Base Caption Strip (Fades on hover/focus) */}
                          <div className="absolute bottom-0 inset-x-0 p-5 bg-white/95 backdrop-blur-md rounded-b-3xl text-center border-t border-white/40 transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none group-focus-within:opacity-0 group-focus-within:pointer-events-none">
                            <h3 className="text-base font-bold text-[#253237] font-poppins truncate">
                              {val.title}
                            </h3>
                          </div>

                          {/* Slide-Up Detail Overlay Content */}
                          <div className="absolute inset-x-0 bottom-0 z-10 p-6 bg-linear-to-t from-[#253237] via-[#253237]/95 to-transparent rounded-b-3xl transition-all duration-500 flex flex-col justify-end text-center sm:translate-y-full sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 translate-y-0 opacity-100">
                            <h3 className="text-lg font-bold text-white font-poppins">
                              {val.title}
                            </h3>
                            <p className="mt-2 text-xs leading-relaxed text-[#E0FBFC]/90">
                              {val.description}
                            </p>
                          </div>
                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </section>

              {/* ================= SECTION 4: DIRECTOR'S EDITORIAL QUOTE BLOCK ================= */}
              <section id="director-quote" className="scroll-mt-28">
                <AnimatedSection
                  direction="up"
                  className="relative overflow-hidden rounded-4xl bg-white p-8 sm:p-12 text-[#253237] shadow-xl border border-gray-100"
                >
                  <FaQuoteLeft className="absolute -top-4 -left-4 text-9xl text-gray-100 select-none pointer-events-none z-0" />

                  <div className="relative z-10 grid gap-8 lg:grid-cols-3 items-center">
                    <div className="lg:col-span-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                        Director's Message
                      </span>
                      <blockquote className="mt-3 text-xl sm:text-2xl font-semibold leading-relaxed text-[#253237] font-poppins italic">
                        "At Saviours Clinic, every life entrusted to our care is a sacred responsibility. We blend world-class medical science with genuine human empathy so that every patient feels supported, valued, and healed."
                      </blockquote>
                    </div>

                    <div className="flex flex-col items-center text-center lg:border-l lg:border-gray-200 lg:pl-8">
                      <img
                        src={DOCTOR_PORTRAITS.maleDoctor1}
                        alt="Dr. Anthony Selvan"
                        loading="lazy"
                        className="h-28 w-28 rounded-full object-cover shadow-lg border-4 border-white ring-2 ring-[#253237]/10"
                      />
                      <h4 className="mt-4 text-lg font-bold text-[#253237] font-poppins">
                        Dr. Anthony Selvan, MD
                      </h4>
                      <p className="text-xs font-semibold text-[#5C6B73]">
                        Medical Director & Founder
                      </p>
                      <p className="text-[11px] text-[#9DB4C0]">
                        Saviours Healthcare Group
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </section>

              {/* ================= SECTION 5: WHAT THIS MEANS FOR YOU (PATIENT PROMISES) ================= */}
              <section id="patient-promises" className="scroll-mt-28">
                <AnimatedSection
                  direction="up"
                  className="rounded-4xl bg-[#F8FBFC] p-8 sm:p-12 shadow-lg border border-gray-200/80"
                >
                  <div className="mb-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                      Patient Commitments
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins sm:text-4xl">
                      What This Means for You
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-[#5C6B73]">
                      Translating our values into tangible, reliable promises for every patient visit.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {PATIENT_PROMISES.map((promise, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#253237] text-white shadow-xs">
                          <FaCheckCircle className="text-base text-[#E0FBFC]" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#253237] font-poppins">
                            {promise.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#5C6B73]">
                            {promise.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </section>

              {/* ================= SECTION 6: IMPACT / STATS REINFORCEMENT ================= */}
              <section id="stats" className="scroll-mt-28">
                <AnimatedSection
                  direction="up"
                  className="rounded-4xl bg-[#253237] p-10 sm:p-14 text-white shadow-2xl text-center"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C2DFE3]">
                    Mission in Action
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-white font-poppins sm:text-4xl">
                    Impact by the Numbers
                  </h2>
                  <p className="mx-auto mt-2 max-w-xl text-sm text-[#E0FBFC]/90">
                    Quantifiable evidence of our 15-year commitment to clinical excellence.
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
                    {[
                      { value: "15+", label: "Years Living Our Mission" },
                      { value: "10,000+", label: "Patients Served With Care" },
                      { value: "98%", label: "Patient Satisfaction Rate" },
                      { value: "24/7", label: "Emergency Medical Support" },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="rounded-3xl bg-[#5C6B73]/40 p-6 border border-white/10 text-center"
                      >
                        <p className="text-4xl font-bold text-white font-poppins">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-[#E0FBFC]">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </section>

              {/* ================= SECTION 7: BOTTOM CTA ================= */}
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
                      Experience Saviours Care Firsthand
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-[#E0FBFC]">
                      Schedule a consultation with our experienced clinical team today and receive healthcare you can trust.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => setIsBookingOpen(true)}
                        className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#253237] shadow-xl transition hover:scale-105 hover:bg-[#E0FBFC]"
                      >
                        Book Appointment Now
                      </button>
                      <RouterLink
                        to="/doctors"
                        className="rounded-xl border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-[#253237]"
                      >
                        Meet Our Doctors
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default VisionMission;
