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
  FaQuoteLeft,
  FaCheckCircle,
  FaListUl,
  FaUserMd,
} from "react-icons/fa";

import AnimatedSection from "../../../components/AnimatedSection";
import BookingModal from "../../../components/BookingModal";
import { ABOUT_DETAIL_IMAGES, CTA_IMAGES } from "../../../constants/images";

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

const VisionMission = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <img
          src={ABOUT_DETAIL_IMAGES.visionMission.hero}
          alt="Vision & Mission Hero"
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
            <span className="text-white font-bold">Vision & Mission</span>
          </div>

          <AnimatedSection direction="up" className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md mb-4 border border-white/20">
              <FaBullseye className="text-teal-300" />
              Saviours Core Identity
            </span>

            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight">
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
                    href="#mission-vision"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaListUl className="text-xs" />
                    <span>Mission & Vision</span>
                  </a>
                  <a
                    href="#core-values"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaAward className="text-xs" />
                    <span>Core Values</span>
                  </a>
                  <a
                    href="#director-quote"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaQuoteLeft className="text-xs" />
                    <span>Director's Message</span>
                  </a>
                </nav>

                <div className="mt-6 rounded-2xl bg-[#253237] p-4 text-white">
                  <p className="text-xs font-bold">Need Help?</p>
                  <p className="mt-1 text-sm font-semibold text-[#C2DFE3]">
                    +91 98765 43210
                  </p>
                  <button
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
              {/* ================= MISSION & VISION SECTION ================= */}
              <section id="mission-vision" className="scroll-mt-28">
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Foundational Pillars
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237] sm:text-4xl">
                    Our Mission & Vision
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Setting standard healthcare benchmarks through clinical precision and human warmth.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {/* Mission Card */}
                  <AnimatedSection
                    direction="left"
                    className="group overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-56 w-full overflow-hidden bg-[#253237]">
                        <img
                          src={ABOUT_DETAIL_IMAGES.visionMission.mission}
                          alt="Our Mission"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#253237]/90 via-[#253237]/30 to-transparent" />
                        <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#253237] shadow-md">
                          <FaBullseye className="text-lg" />
                        </span>
                      </div>

                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-[#253237]">
                          Our Mission
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-[#5C6B73]">
                          To provide accessible, high-quality, and affordable healthcare services to all patients with utmost care, advanced diagnostics, and ethical practices.
                        </p>
                        <div className="mt-6 space-y-2.5">
                          {[
                            "Patient-first medical care protocols",
                            "Transparent treatment plans & billing",
                            "State-of-the-art diagnostic facilities",
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2.5">
                              <FaCheckCircle className="text-teal-600 text-xs shrink-0" />
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
                    direction="right"
                    delay={150}
                    className="group overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-56 w-full overflow-hidden bg-[#253237]">
                        <img
                          src={ABOUT_DETAIL_IMAGES.visionMission.vision}
                          alt="Our Vision"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#253237]/90 via-[#253237]/30 to-transparent" />
                        <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#253237] shadow-md">
                          <FaEye className="text-lg" />
                        </span>
                      </div>

                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-[#253237]">
                          Our Vision
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-[#5C6B73]">
                          To be a premier healthcare institution recognized nationally for clinical excellence, compassionate patient outcomes, and medical innovation.
                        </p>
                        <div className="mt-6 space-y-2.5">
                          {[
                            "Leading multi-specialty research excellence",
                            "Integrating AI & digital diagnostics",
                            "Expanding community outreach health camps",
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2.5">
                              <FaCheckCircle className="text-teal-600 text-xs shrink-0" />
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

              {/* ================= CORE VALUES SECTION ================= */}
              <section id="core-values" className="scroll-mt-28">
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    What Drives Us
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237]">
                    Our Core Values
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    The ethical principles guiding every diagnosis, consultation, and patient interaction.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {CORE_VALUES.map((val, idx) => {
                    const IconComp = val.icon;
                    return (
                      <AnimatedSection
                        key={idx}
                        delay={idx * 100}
                        className="group overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                      >
                        <div className="relative h-48 w-full overflow-hidden bg-[#253237]">
                          <img
                            src={val.image}
                            alt={val.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[#253237]/90 via-[#253237]/30 to-transparent" />
                          <div className="absolute bottom-4 left-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#253237] shadow-md">
                              <IconComp className="text-base" />
                            </div>
                            <h3 className="text-lg font-bold text-white">
                              {val.title}
                            </h3>
                          </div>
                        </div>

                        <div className="p-6">
                          <p className="text-xs leading-relaxed text-[#5C6B73]">
                            {val.description}
                          </p>
                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </section>

              {/* ================= DIRECTOR'S MESSAGE CALLOUT ================= */}
              <section id="director-quote" className="scroll-mt-28">
                <div className="relative overflow-hidden rounded-4xl bg-[#253237] p-8 sm:p-12 text-white shadow-2xl">
                  <FaQuoteLeft className="text-4xl text-[#9DB4C0]/30 mb-4" />
                  <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed text-[#E0FBFC] italic">
                    "At Saviours Clinic, every life entrusted to our care is a sacred responsibility. We blend world-class medical science with genuine human empathy so that every patient feels supported, valued, and healed."
                  </blockquote>

                  <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5C6B73] text-white font-bold text-lg">
                      <FaUserMd />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Dr. Anthony Selvan, MD
                      </h4>
                      <p className="text-xs text-[#9DB4C0]">
                        Medical Director & Founder, Saviours Healthcare Clinic
                      </p>
                    </div>
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
                      Experience Saviours Care Firsthand
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-[#E0FBFC]">
                      Book a consultation with our experienced clinical team today.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <button
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
