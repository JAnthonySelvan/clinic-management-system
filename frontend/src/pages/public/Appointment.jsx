import { useState } from "react";
import { Link } from "react-router-dom";
import { FaClipboardCheck, FaPlus, FaMinus } from "react-icons/fa";
import { Calendar, CheckCircle2, ArrowRight, Clock, ShieldCheck, Stethoscope } from "lucide-react";

import AnimatedSection from "../../components/AnimatedSection";
import { HERO_IMAGES, GUIDELINE_IMAGES, FORMS_IMAGE } from "../../constants/images";

const Appointment = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060c0f]/80 to-[#060c0f]" />
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

      {/* ================= PREMIUM BOOK NOW CTA CARD ================= */}
      <AnimatedSection as="section" className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5C6B73]">
              Direct Clinical Booking
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#253237] font-poppins">
              Ready to See a Specialist?
            </h2>

            <p className="mx-auto max-w-3xl text-base sm:text-lg text-[#5C6B73] font-jakarta">
              Launch our dedicated booking form to choose your specialist, date, and time slot with real-time availability.
            </p>
          </div>

          {/* Premium Dark Elevated Floating Card Container */}
          <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/20 text-white shadow-2xl font-outfit bg-[#060c0f]">
            {/* Background Image Layer */}
            <img
              src={FORMS_IMAGE.Appointment}
              alt="Appointment Booking"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center brightness-95"
            />
            {/* Transparent Overlay Scrim */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060c0f]/90 via-[#060c0f]/75 to-[#060c0f]/90" />

            {/* Content Container */}
            <div className="relative z-10 p-8 sm:p-14 lg:p-16 flex flex-col items-center text-center space-y-8">
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-1.5 text-xs sm:text-sm font-normal text-[#E0FBFC] border border-white/20 backdrop-blur-md font-jakarta">
                  <FaClipboardCheck className="text-[#C2DFE3]" />
                  <span className="font-medium tracking-wide">Direct Online Booking</span>
                </span>
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#E0FBFC] font-jakarta bg-black/50 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Instant Confirmation</span>
                </span>
              </div>

              {/* Heading & Subtext */}
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                  Schedule Your Clinical Consultation
                </h3>
                <p className="text-sm sm:text-base text-gray-200 font-light font-jakarta leading-relaxed max-w-2xl mx-auto">
                  Our interactive booking system connects you directly with top doctors across 9+ specialized departments. Pick your preferred slot and receive immediate confirmation.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl pt-2 pb-4 text-left">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Stethoscope className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white font-jakarta">9+ Specialties</h4>
                    <p className="text-[11px] text-gray-300 font-jakarta mt-0.5">Cardiology, Neurology, Pediatrics & more</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Clock className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white font-jakarta">Real-time Slots</h4>
                    <p className="text-[11px] text-gray-300 font-jakarta mt-0.5">Live schedule availability per specialist</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <ShieldCheck className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white font-jakarta">Zero Wait Time</h4>
                    <p className="text-[11px] text-gray-300 font-jakarta mt-0.5">Priority check-in upon arrival</p>
                  </div>
                </div>
              </div>

              {/* Primary Call To Action Button */}
              <Link
                to="/appointment/book"
                className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#253237] via-[#3a4b52] to-[#253237] border border-[#5C6B73]/50 px-10 py-5 text-base sm:text-lg font-semibold tracking-wide text-white shadow-2xl hover:from-[#3a4b52] hover:to-[#5C6B73] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer font-outfit focus:outline-none focus:ring-2 focus:ring-[#C2DFE3]/50"
              >
                <CheckCircle2 className="w-6 h-6 text-teal-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span>Book Your Appointment Now</span>
                <ArrowRight className="w-5 h-5 text-teal-300 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
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
    </>
  );
};

export default Appointment;
