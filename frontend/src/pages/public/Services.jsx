import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaPlus,
  FaMinus,
  FaHeartbeat,
  FaBrain,
  FaTooth,
  FaChild,
  FaStethoscope,
  FaBone,
  FaAmbulance,
  FaMicroscope,
  FaGlobe,
  FaFileInvoiceDollar,
  FaCalendarCheck,
  FaUserMd,
  FaClipboardList,
  FaHeart,
  FaBuilding,
  FaUserCheck,
  FaClock,
} from "react-icons/fa";

import { Sparkles } from "lucide-react";
import AnimatedSection from "../../components/AnimatedSection";
import {
  HERO_IMAGES,
  SPECIALTY_IMAGES,
  FEATURE_IMAGES,
  PROCESS_IMAGES,
  CTA_IMAGES,
} from "../../constants/images";

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDot, setActiveDot] = useState(0);

  const faqs = [
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment online through our website's booking portal or contact our clinic directly by phone.",
    },
    {
      question: "Do I need an appointment for a consultation?",
      answer:
        "While walk-in emergencies are prioritized, we recommend booking an appointment in advance to minimize waiting time.",
    },
    {
      question: "What medical specialties are available?",
      answer:
        "We provide Cardiology, Neurology, Pediatrics, Dental Care, Orthopedics, General Medicine, and several diagnostic services.",
    },
    {
      question: "Do you provide follow-up consultations?",
      answer:
        "Yes, our specialists schedule follow-up visits as needed to track recovery and fine-tune your personal treatment plan.",
    },
  ];

  const services = [
    {
      slug: "cardiology",
      image: SPECIALTY_IMAGES.cardiology,
      title: "Cardiology",
      description:
        "Advanced cardiovascular diagnosis, preventative care, and heart condition management.",
      icon: FaHeartbeat,
      tag: "Heart Care",
    },
    {
      slug: "neurology",
      image: SPECIALTY_IMAGES.neurology,
      title: "Neurology",
      description:
        "Comprehensive diagnosis and treatment for neurological disorders and brain health.",
      icon: FaBrain,
      tag: "Neuro Specialist",
    },
    {
      slug: "dental",
      image: SPECIALTY_IMAGES.dental,
      title: "Dental Care",
      description:
        "Complete preventative, restorative, and cosmetic dental procedures for healthy smiles.",
      icon: FaTooth,
      tag: "Oral Health",
    },
    {
      slug: "pediatrics",
      image: SPECIALTY_IMAGES.pediatrics,
      title: "Pediatrics",
      description:
        "Compassionate, specialized healthcare tailored for infants, children, and adolescents.",
      icon: FaChild,
      tag: "Child Health",
    },
    {
      slug: "general-medicine",
      image: SPECIALTY_IMAGES.generalMedicine,
      title: "General Medicine",
      description:
        "Routine health checkups, preventative wellness, and expert management of general illnesses.",
      icon: FaStethoscope,
      tag: "Primary Care",
    },
    {
      slug: "orthopedics",
      image: SPECIALTY_IMAGES.orthopedics,
      title: "Orthopedics",
      description:
        "Expert diagnosis, surgical precision, and physical rehab for joint, bone, and muscle conditions.",
      icon: FaBone,
      tag: "Bone & Joint",
    },
  ];
  
  const whyChooseUs = [
    {
      image: FEATURE_IMAGES.modernFacilities,
      title: "Modern Infrastructure",
      description:
        "State-of-the-art facilities equipped with advanced clinical monitoring systems.",
      icon: FaBuilding,
      badge: "Tech First",
    },
    {
      image: FEATURE_IMAGES.qualifiedSpecialists,
      title: "Qualified Specialists",
      description:
        "Board-certified doctors bringing decades of combined experience across all major specialties.",
      icon: FaUserCheck,
      badge: "Expert Staff",
    },
    {
      image: FEATURE_IMAGES.fastDiagnosis,
      title: "Fast Diagnosis",
      description:
        "In-house diagnostic technology ensuring swift, accurate, and reliable test results.",
      icon: FaClock,
      badge: "Rapid Testing",
    },
    {
      image: FEATURE_IMAGES.compassionateCare,
      title: "Patient-Centered Care",
      description:
        "Personalized care plans structured around each individual patient's specific health goals.",
      icon: FaHeart,
      badge: "Personalized",
    },
    {
      image: FEATURE_IMAGES.emergencyResponse,
      title: "24/7 Emergency Response",
      description:
        "Dedicated critical response team and emergency staff available around the clock.",
      icon: FaAmbulance,
      badge: "24/7 Priority",
    },
    {
      image: FEATURE_IMAGES.diagnosticLab,
      title: "Advanced Diagnostic Lab",
      description:
        "Fully equipped pathology and diagnostic imaging center for precise clinical evaluations.",
      icon: FaMicroscope,
      badge: "High Precision",
    },
    {
      image: FEATURE_IMAGES.multilingualTeam,
      title: "Multilingual Care Team",
      description:
        "Compassionate medical professionals serving patients in multiple languages for seamless care.",
      icon: FaGlobe,
      badge: "Global Access",
    },
    {
      image: FEATURE_IMAGES.insuranceSupport,
      title: "Seamless Insurance Support",
      description:
        "Hassle-free insurance claims processing and direct coordination with major healthcare providers.",
      icon: FaFileInvoiceDollar,
      badge: "Easy Claims",
    },
  ];

  const treatmentSteps = [
    {
      step: "01",
      title: "Book Appointment",
      description:
        "Easily schedule your visit online or call our helpline to pick a convenient slot.",
      image: PROCESS_IMAGES.bookAppointment,
      icon: FaCalendarCheck,
      tag: "Step 1",
    },
    {
      step: "02",
      title: "Medical Consultation",
      description:
        "Meet experienced doctors for detailed health evaluation and comprehensive diagnosis.",
      image: PROCESS_IMAGES.medicalConsultation,
      icon: FaUserMd,
      tag: "Step 2",
    },
    {
      step: "03",
      title: "Treatment Plan",
      description:
        "Receive an individualized care plan tailored with cutting-edge medical treatments.",
      image: PROCESS_IMAGES.treatmentPlan,
      icon: FaClipboardList,
      tag: "Step 3",
    },
    {
      step: "04",
      title: "Recovery & Follow-up",
      description:
        "Benefit from ongoing recovery monitoring and personalized follow-up care visits.",
      image: PROCESS_IMAGES.recoveryFollowup,
      icon: FaHeart,
      tag: "Step 4",
    },
  ];

  const checkScrollPosition = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

    const cardWidth = 336 + 24; // width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveDot(Math.min(Math.max(index, 0), whyChooseUs.length - 1));
  };

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 360; // smooth step size
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);
  const scrollToServices = () => {
    const gridEl = document.getElementById("services-grid");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= HERO (INCREASED DARKNESS & ELEGANT TYPOGRAPHY) ================= */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center py-24 lg:py-32 bg-[#080e12]">
        <img
          src={HERO_IMAGES.services}
          alt="Our medical services"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-75 contrast-105"
        />

        {/* Increased Darkness & Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060c0f]/80 to-[#060c0f]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-5xl px-6 text-center lg:px-8 z-10 space-y-6 flex flex-col items-center font-outfit"
        >
          {/* Floating Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs sm:text-sm font-normal tracking-wide text-teal-200 backdrop-blur-md shadow-2xl">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span className="font-jakarta font-medium tracking-wide">Comprehensive Clinical Care</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-normal text-white leading-[1.15]">
            Our Medical{" "}
            <span className="font-serif-display italic font-normal bg-gradient-to-r from-teal-200 via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl font-light text-gray-300 leading-relaxed font-jakarta">
            We provide a comprehensive range of healthcare services with modern facilities and experienced medical professionals.
          </p>

          {/* Scroll Cue Button */}
          <button
            onClick={scrollToServices}
            aria-label="Scroll down to services"
            className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition duration-300 hover:bg-white/20 hover:scale-110 animate-bounce cursor-pointer"
          >
            <FaChevronDown className="text-lg text-teal-200" />
          </button>
        </AnimatedSection>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <AnimatedSection as="section" id="services-grid" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              What We Offer
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Comprehensive Healthcare Services
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Our clinic provides a wide range of medical services delivered by
              experienced specialists using modern medical technology.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <AnimatedSection
                  key={service.slug}
                  delay={(index % 3) * 100}
                  className="w-full"
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="group relative block h-84 w-full overflow-hidden rounded-4xl bg-[#253237] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#9DB4C0]/50 ring-1 ring-gray-200/50 hover:ring-2 hover:ring-[#9DB4C0]/60"
                  >
                    {/* Background Image Container */}
                    <div className="absolute inset-0 bg-[#F8FBFC]">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>

                    {/* Gradient Scrim Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/45 to-transparent transition-opacity duration-500 group-hover:from-[#253237] group-hover:via-[#253237]/55" />

                    {/* Frosted Glass Icon Badge */}
                    <div className="absolute top-6 left-6 z-10 flex h-13 w-13 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <ServiceIcon className="text-xl text-[#E0FBFC]" />
                    </div>

                    {/* Content Overlay at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-7 flex flex-col justify-end">
                      <span className="inline-block self-start rounded-full bg-[#E0FBFC]/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#253237] mb-2 shadow-xs">
                        {service.tag}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-poppins tracking-tight leading-tight">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#E0FBFC]/90 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Sliding Link Micro-interaction */}
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 translate-y-0 opacity-100 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <span className="underline-offset-4 group-hover:underline">
                          Learn More
                        </span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE OUR SERVICES (Interactive Side-Arrow Carousel) ================= */}
      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Why Choose Our Services
            </span>
            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Delivering Exceptional Healthcare
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-[#5C6B73]">
              We focus on quality treatment, patient comfort, and modern medical
              practices to ensure the best healthcare experience.
            </p>
          </div>

          {/* Side-Arrow Carousel Wrapper */}
          <div className="relative group/carousel px-2 sm:px-4">
            {/* Left Side Floating Arrow Button */}
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous slide"
              className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 h-13 w-13 rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-white/80 flex items-center justify-center text-[#253237] transition-all duration-300 hover:bg-[#253237] hover:text-white hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
            >
              <FaChevronLeft className="text-base" />
            </button>

            {/* Right Side Floating Arrow Button */}
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Next slide"
              className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 h-13 w-13 rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-white/80 flex items-center justify-center text-[#253237] transition-all duration-300 hover:bg-[#253237] hover:text-white hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
            >
              <FaChevronRight className="text-base" />
            </button>

            {/* Carousel Scroll Container */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-6 scroll-smooth touch-pan-x scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {whyChooseUs.map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={index}
                    className="w-84 shrink-0 snap-start group relative h-[420px] overflow-hidden rounded-4xl bg-[#253237] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ring-1 ring-gray-200/50 hover:ring-2 hover:ring-[#9DB4C0]/60"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-[#F8FBFC]">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>

                    {/* Gradient Scrim Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#253237]/98 via-[#253237]/45 to-transparent transition-opacity duration-500 group-hover:from-[#253237] group-hover:via-[#253237]/55" />

                    {/* Icon Badge top-left */}
                    <div className="absolute top-6 left-6 z-10 flex h-13 w-13 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <ItemIcon className="text-xl text-[#E0FBFC]" />
                    </div>

                    {/* Content Overlay at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-7 flex flex-col justify-end">
                      <span className="inline-block self-start rounded-full bg-[#E0FBFC]/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#253237] mb-3 shadow-xs">
                        {item.badge}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-poppins tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#E0FBFC]/90">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot Progress Indicators */}
          <div className="mt-8 flex justify-center items-center gap-2">
            {whyChooseUs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (carouselRef.current) {
                    const scrollAmount = idx * 360;
                    carouselRef.current.scrollTo({
                      left: scrollAmount,
                      behavior: "smooth",
                    });
                  }
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDot === idx
                    ? "w-8 bg-[#253237]"
                    : "w-2.5 bg-[#9DB4C0]/40 hover:bg-[#5C6B73]"
                }`}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= TREATMENT PROCESS ================= */}
      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Treatment Process
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Your Journey to Better Health
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              We make healthcare simple with a clear and patient-friendly
              treatment process from appointment booking to complete recovery.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
            {treatmentSteps.map((item, index) => {
              const StepIcon = item.icon;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className="group relative flex flex-col overflow-hidden rounded-4xl bg-white shadow-lg border border-[#C2DFE3]/70 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                >
                  {/* Top Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#F8FBFC]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Pinned Circular Step Badge at Seam */}
                  <div className="absolute top-42 left-6 -translate-y-1/2 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#253237] text-white font-bold text-lg border-4 border-white shadow-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#5C6B73] z-10">
                    {item.step}
                  </div>

                  {/* Card Content */}
                  <div className="p-7 pt-9 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#5C6B73]">
                          {item.tag}
                        </span>
                        <StepIcon className="text-lg text-[#9DB4C0] group-hover:text-[#253237] transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-[#253237] font-poppins">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#5C6B73]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Step Connector Arrow */}
                  {index < treatmentSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-[#9DB4C0]/70 text-2xl font-bold">
                      →
                    </div>
                  )}
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= FAQ SECTION ================= */}
      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-[#C2DFE3]/50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#253237] mb-3">
              Support
            </span>

            <h2 className="mt-2 text-4xl font-bold text-[#253237] font-poppins">
              Have Questions? We've Got Answers
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#5C6B73]">
              Find answers to the questions patients ask us most often.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className={`overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg ${
                    isOpen ? "border-l-4 border-[#9DB4C0]" : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-[#F8FBFC] cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-[#253237]">
                      {faq.question}
                    </span>

                    <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8FBFC] text-[#253237] transition-transform duration-300">
                      {isOpen ? (
                        <FaMinus className="text-sm text-[#253237]" />
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
                    <div className="border-t border-[#E0FBFC] px-6 py-5 leading-relaxed text-[#5C6B73]">
                      {faq.answer}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* FAQ Closing Prompt */}
          <div className="mt-12 text-center">
            <p className="text-[#5C6B73] font-medium">
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

      {/* ================= SERVICES CTA ================= */}
      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-4xl px-8 py-16 text-center shadow-2xl md:px-20">
            {/* Background Image */}
            <img
              src={CTA_IMAGES.background}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#5C6B73]/85 to-[#9DB4C0]/90" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white font-poppins md:text-5xl">
                Your Health Is Our Priority
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
                Whether you need a routine check-up or specialized medical care,
                our experienced healthcare professionals are here to support you
                every step of the way.
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

export default Services;
