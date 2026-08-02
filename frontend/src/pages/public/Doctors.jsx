import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Heart,
  Brain,
  Smile,
  Baby,
  Bone,
  Eye,
  Wind,
  Activity,
  Award,
  HeartHandshake,
  Cpu,
  Users,
  Quote,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Grid as GridIcon,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";
import AnimatedSection from "../../components/AnimatedSection";
import BookingModal from "../../components/BookingModal";

import {
  HERO_IMAGES,
  SPECIALTY_IMAGES,
  FEATURE_IMAGES,
  CTA_IMAGES,
} from "../../constants/images";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80&auto=format&fit=crop";

const SPECIALIZATIONS = [
  {
    icon: Heart,
    image: SPECIALTY_IMAGES.cardiology,
    title: "Cardiology",
    key: "Cardiologist",
    slug: "cardiology",
    description: "Advanced cardiac care, ECG screenings, and vascular health.",
  },
  {
    icon: Brain,
    image: SPECIALTY_IMAGES.neurology,
    title: "Neurology",
    key: "Neurologist",
    slug: "neurology",
    description: "Expert brain, spine, and nerve disorder diagnostics.",
  },
  {
    icon: Smile,
    image: SPECIALTY_IMAGES.dental,
    title: "Dental Care",
    key: "Dentist",
    slug: "dental",
    description: "Painless root canals, teeth whitening, and oral surgery.",
  },
  {
    icon: Baby,
    image: SPECIALTY_IMAGES.pediatrics,
    title: "Pediatrics",
    key: "Pediatrician",
    slug: "pediatrics",
    description: "Compassionate healthcare and vaccines for children.",
  },
  {
    icon: Bone,
    image: SPECIALTY_IMAGES.orthopedics,
    title: "Orthopedics",
    key: "Orthopedic",
    slug: "orthopedics",
    description: "Joint replacement, fracture repair, and spine therapy.",
  },
  {
    icon: Eye,
    image: SPECIALTY_IMAGES.eyeCare,
    title: "Ophthalmology",
    key: "Ophthalmologist",
    slug: "eye-care",
    description: "Vision testing, cataract checkups, and optical care.",
  },
  {
    icon: Wind,
    image: SPECIALTY_IMAGES.pulmonology,
    title: "Pulmonology",
    key: "Pulmonologist",
    slug: "pulmonology",
    description: "Lungs, spirometry testing, and asthma management.",
  },
  {
    icon: Activity,
    image: SPECIALTY_IMAGES.generalMedicine,
    title: "General Medicine",
    key: "General Physician",
    slug: "general-medicine",
    description: "Comprehensive primary health checkups and fever care.",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: Award,
    image: FEATURE_IMAGES.qualifiedSpecialists,
    title: "Highly Qualified",
    description:
      "Certified specialists with years of education, training, and clinical expertise.",
  },
  {
    icon: HeartHandshake,
    image: FEATURE_IMAGES.compassionateCare,
    title: "Compassionate Care",
    description:
      "Every patient receives personalized attention and treatment with care and respect.",
  },
  {
    icon: Cpu,
    image: FEATURE_IMAGES.modernTechnology,
    title: "Modern Technology",
    description:
      "Advanced diagnostic tools and evidence-based treatments for accurate healthcare.",
  },
  {
    icon: Users,
    image: FEATURE_IMAGES.trustedPatients,
    title: "Trusted by Patients",
    description:
      "Thousands of patients trust our doctors for reliable and professional medical care.",
  },
];

const TESTIMONIALS = [
  {
    name: "James Anderson",
    role: "Patient, Cardiology Dept.",
    review:
      "The clinical team was exceptionally thorough and responsive. I received comprehensive diagnostic evaluation and felt supported through every stage.",
  },
  {
    name: "Sophia Williams",
    role: "Patient, Neurology Dept.",
    review:
      "State-of-the-art facilities paired with empathetic specialists made my consultation and follow-up care seamless and reassuring.",
  },
  {
    name: "Michael Johnson",
    role: "Patient, Primary Care",
    review:
      "Efficient appointment scheduling, clear clinical explanation of treatment plans, and professional staff. Highly recommended institution.",
  },
];

const Doctors = () => {
  const dispatch = useAppDispatch();
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);
  const [showAllGrid, setShowAllGrid] = useState(false);

  // Services.jsx-style Carousel State & Ref
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  const activeDoctors = useMemo(() => {
    if (!Array.isArray(doctors)) return [];
    return doctors.filter((doc) => doc && doc.isActive !== false);
  }, [doctors]);

  const specializationCounts = useMemo(() => {
    const counts = {};
    const ALIAS_MAP = {
      Dentist: ["Dentist", "Dental", "Dentistry"],
      Cardiologist: ["Cardiologist", "Cardiology"],
      Neurologist: ["Neurologist", "Neurology"],
      Orthopedic: ["Orthopedic", "Orthopedics", "Orthopedist"],
      Pediatrician: ["Pediatrician", "Pediatrics"],
      "General Physician": ["General Physician", "General Medicine", "General"],
      Ophthalmologist: ["Ophthalmologist", "Ophthalmology", "Eye"],
      Pulmonologist: ["Pulmonologist", "Pulmonology"],
    };

    activeDoctors.forEach((doc) => {
      const docSpec = doc.specialization?.toLowerCase().trim() || "";

      Object.entries(ALIAS_MAP).forEach(([key, aliases]) => {
        const matches = aliases.some((a) => docSpec.includes(a.toLowerCase()));
        if (matches) {
          counts[key] = (counts[key] || 0) + 1;
        }
      });

      // Also record raw specialization for fallback
      counts[doc.specialization] = (counts[doc.specialization] || 0) + 1;
    });
    return counts;
  }, [activeDoctors]);

  // Carousel Scroll Calculation (Services.jsx style)
  const checkScrollPosition = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

    const cardWidth = 336 + 24; // w-84 (336px) + gap-6 (24px)
    const index = Math.round(scrollLeft / cardWidth);
    setActiveDot(Math.min(Math.max(index, 0), activeDoctors.length - 1));
  }, [activeDoctors.length]);

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 360;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const cardWidth = 336 + 24;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
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
  }, [activeDoctors, checkScrollPosition]);

  return (
    <>
      {/* ================= HERO (PREMIUM RECONSTRUCTION) ================= */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center py-24 lg:py-32">
        <img
          src={HERO_IMAGES.doctors}
          alt="Our medical specialists"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#182329]/95 via-[#253237]/85 to-[#1c282e]/90 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent pointer-events-none" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-5xl px-6 text-center lg:px-8 z-10 space-y-6 flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide text-teal-200 backdrop-blur-md shadow-xl">
            <Stethoscope className="h-4 w-4 text-teal-300" />
            <span>Clinical Faculty & Specialists</span>
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-teal-200 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Expert Doctors
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl font-light leading-relaxed text-gray-200">
            Our team of highly qualified specialists is dedicated to providing
            compassionate, evidence-based, and advanced healthcare for every
            patient.
          </p>
        </AnimatedSection>
      </section>

      {/* ================= SECTION 1: EXPERIENCED HEALTHCARE PROFESSIONALS (ALL DOCTORS DRAG-SCROLL CAROUSEL) ================= */}
      <AnimatedSection as="section" direction="up" className="bg-[#F8FBFC] py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Our Medical Team
            </span>
            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Experienced Healthcare Professionals
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-[#5C6B73]">
              Meet our dedicated specialists committed to delivering exceptional medical care with expertise and compassion.
            </p>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-sm font-medium text-[#5C6B73]">Loading medical roster...</p>
            </div>
          ) : error ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-sm font-medium text-red-500">{error}</p>
            </div>
          ) : activeDoctors.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-sm font-medium text-[#5C6B73]">
                No doctors currently available. Please check back soon.
              </p>
            </div>
          ) : (
            <div>
              {/* Side-Arrow Carousel Wrapper (Matching Services.jsx) */}
              <div className="relative group/carousel px-2 sm:px-4">
                {/* Left Side Floating Arrow Button */}
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous slide"
                  className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 h-13 w-13 rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-white/80 flex items-center justify-center text-[#253237] transition-all duration-300 hover:bg-[#253237] hover:text-white hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right Side Floating Arrow Button */}
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Next slide"
                  className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 h-13 w-13 rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-white/80 flex items-center justify-center text-[#253237] transition-all duration-300 hover:bg-[#253237] hover:text-white hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Carousel Scroll Container displaying ALL Doctors */}
                <div
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-6 scroll-smooth touch-pan-x scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {activeDoctors.map((doc) => (
                    <div
                      key={doc._id}
                      className="w-84 shrink-0 snap-start group relative h-[420px] overflow-hidden rounded-4xl bg-[#253237] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ring-1 ring-gray-200/50 hover:ring-2 hover:ring-[#9DB4C0]/60"
                    >
                      {/* Full-bleed Doctor Photo */}
                      <div className="absolute inset-0 bg-[#F8FBFC]">
                        <img
                          src={doc.profileImage || DEFAULT_AVATAR}
                          alt={doc.fullName}
                          loading="lazy"
                          onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </div>

                      {/* Glossy Holographic Foil Sheen Overlay */}
                      <div className="absolute inset-0 bg-linear-to-br from-white/30 via-cyan-100/10 to-[#9DB4C0]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                      {/* Gradient Scrim Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#253237]/98 via-[#253237]/45 to-transparent transition-opacity duration-500 group-hover:from-[#253237] group-hover:via-[#253237]/55" />

                      {/* Top-left Icon Badge */}
                      <div className="absolute top-6 left-6 z-10 flex h-13 w-13 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                        <Stethoscope className="h-6 w-6 text-[#E0FBFC]" />
                      </div>

                      {/* Content Overlay at Bottom */}
                      <div className="absolute inset-x-0 bottom-0 z-10 p-7 flex flex-col justify-end">
                        <span className="inline-block self-start rounded-full bg-[#E0FBFC]/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#253237] mb-3 shadow-xs">
                          {doc.specialization}
                        </span>

                        <h3 className="text-2xl font-bold text-white font-poppins tracking-tight leading-tight">
                          {doc.fullName}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-[#E0FBFC]/90">
                          {doc.experience}+ Years Experience
                        </p>

                        <button
                          type="button"
                          onClick={() => setSelectedDoctorForModal(doc)}
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 px-4 text-xs font-bold text-[#253237] shadow-md transition-all duration-300 hover:bg-[#9DB4C0] hover:text-white active:scale-95"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Centered Dot Progress Indicators for ALL Doctors */}
              <div className="mt-8 flex justify-center items-center gap-2">
                {activeDoctors.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Go to doctor ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeDot
                        ? "w-8 bg-[#253237] shadow-xs"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Centered Directory Button */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllGrid((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#253237] bg-white px-5 py-2.5 text-xs font-bold text-[#253237] hover:bg-[#253237] hover:text-white transition-all shadow-2xs"
                >
                  <GridIcon className="h-4 w-4" />
                  <span>{showAllGrid ? "Hide All Doctors Roster" : "View All Doctors Directory"}</span>
                </button>
              </div>

              {/* EXPANDABLE FULL ROSTER GRID */}
              {showAllGrid && (
                <div className="mt-12 pt-8 border-t border-gray-200 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {activeDoctors.map((doctor) => (
                    <div
                      key={doctor._id}
                      className="group overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition duration-300 hover:border-[#9DB4C0] hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={doctor.profileImage || DEFAULT_AVATAR}
                          alt={doctor.fullName}
                          loading="lazy"
                          onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                          className="h-16 w-16 rounded-xl object-cover border border-gray-100"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-[#253237] text-base">
                            {doctor.fullName}
                          </h4>
                          <p className="text-xs font-medium text-[#5C6B73] mt-0.5">
                            {doctor.specialization}
                          </p>
                          <p className="text-xs text-[#5C6B73] mt-1 font-mono">
                            {doctor.experience}+ Years Experience
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedDoctorForModal(doctor)}
                        className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#253237] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5C6B73]"
                      >
                        Book Appointment
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* ================= SECTION 2: MEDICAL DEPARTMENTS (BACKGROUND IMAGES + CORPORATE DESIGN) ================= */}
      <AnimatedSection as="section" direction="none" className="bg-[#F8FBFC] py-20 md:py-24 border-y border-gray-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-left border-l-4 border-[#253237] pl-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
              CLINICAL CAPABILITIES
            </span>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-[#253237] sm:text-4xl font-poppins">
              Medical Departments & Specializations
            </h2>

            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-[#5C6B73] leading-relaxed">
              Structured clinical care delivered across specialized medical departments by credentialed physicians.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALIZATIONS.map((specialty, index) => {
              const count = specializationCounts[specialty.key] || 0;
              const IconComp = specialty.icon || Activity;
              const idxStr = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

              return (
                <AnimatedSection
                  key={index}
                  direction="none"
                  delay={index * 50}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 min-h-[310px] transition-all duration-300 hover:border-[#9DB4C0] hover:-translate-y-0.5 shadow-xs flex flex-col justify-between p-6 bg-[#253237]"
                >
                  {/* Full-bleed Department Background Image */}
                  <img
                    src={specialty.image}
                    alt={specialty.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85"
                  />
                  {/* Corporate Dark Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#253237]/90 via-[#253237]/55 to-[#253237]/30 group-hover:via-[#253237]/45 transition-all duration-300" />

                  {/* Content Overlay */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-xl shadow-xs border border-white/30 group-hover:bg-[#9DB4C0] group-hover:text-[#253237] transition-colors">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#E0FBFC]/80 tracking-wider">
                        {idxStr}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mt-5">
                      {specialty.title}
                    </h3>

                    {/* Classic MNC Thin Accent Line */}
                    <div className="w-8 h-0.5 bg-[#9DB4C0] my-3 group-hover:w-12 transition-all duration-300" />

                    <p className="text-xs leading-relaxed text-[#E0FBFC]/90 font-medium">
                      {specialty.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white">
                    <span className="text-[#E0FBFC]/80 font-normal">
                      {count} {count === 1 ? "Specialist" : "Specialists"}
                    </span>
                    <Link
                      to={`/services/${specialty.slug}`}
                      className="inline-flex items-center gap-1 text-[#E0FBFC] hover:text-white transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= SECTION 3: WHY CHOOSE US (BACKGROUND IMAGES + CORPORATE DESIGN) ================= */}
      <AnimatedSection as="section" direction="none" className="py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
              INSTITUTIONAL STANDARDS
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#253237] sm:text-4xl font-poppins">
              Dedicated to Excellence in Healthcare
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-[#5C6B73] leading-relaxed">
              Our clinical governance model combines evidence-based medicine, advanced diagnostic technology, and patient-centered care.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item, index) => {
              const IconComp = item.icon || Award;
              const idxStr = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

              return (
                <AnimatedSection
                  key={index}
                  direction="none"
                  delay={index * 50}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 min-h-[280px] transition-all duration-300 hover:border-[#9DB4C0] hover:-translate-y-0.5 shadow-xs flex flex-col justify-between p-6 bg-[#253237]"
                >
                  {/* Full-bleed Feature Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85"
                  />
                  {/* Corporate Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#253237]/90 via-[#253237]/55 to-[#253237]/35 group-hover:via-[#253237]/50 transition-all duration-300" />

                  {/* Content Overlay */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-xs border border-white/30 group-hover:bg-[#9DB4C0] group-hover:text-[#253237] transition-colors">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#E0FBFC]/80 tracking-wider">
                        {idxStr}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mt-5">
                      {item.title}
                    </h3>

                    {/* Classic MNC Thin Accent Line */}
                    <div className="w-8 h-0.5 bg-[#9DB4C0] my-3 group-hover:w-12 transition-all duration-300" />

                    <p className="text-xs leading-relaxed text-[#E0FBFC]/90 font-medium">
                      {item.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= SECTION 4: TESTIMONIALS (CASE-STUDY FORMAT) ================= */}
      <AnimatedSection as="section" direction="none" className="bg-[#F8FBFC] py-20 md:py-24 border-t border-gray-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
              CLINICAL FEEDBACK
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#253237] sm:text-4xl font-poppins">
              Patient Outcomes & Clinical Trust
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-[#5C6B73] leading-relaxed">
              Reflecting our commitment to precision clinical evaluation and patient satisfaction.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <AnimatedSection
                key={index}
                direction="none"
                delay={index * 50}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xs hover:border-[#9DB4C0] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <Quote className="h-6 w-6 text-[#9DB4C0]" />
                  <p className="mt-4 text-xs sm:text-sm text-[#253237] leading-relaxed font-normal">
                    "{testimonial.review}"
                  </p>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-semibold text-[#253237]">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-[#5C6B73] mt-0.5 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= CORPORATE CTA ================= */}
      <AnimatedSection as="section" direction="none" className="py-20 md:py-24 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-xl md:px-20 border border-gray-200">
            {/* Background Image */}
            <img
              src={CTA_IMAGES.background}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#5C6B73]/90 to-[#9DB4C0]/85" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight font-poppins">
                Your Health Is Our Priority
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#E0FBFC] sm:text-base">
                Schedule a consultation with one of our credentialed clinical specialists today.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/appointment"
                  className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[#253237] transition duration-300 hover:bg-[#E0FBFC] shadow-md"
                >
                  Book Appointment
                </Link>

                <Link
                  to="/doctors"
                  className="rounded-xl border-2 border-white px-8 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-white hover:text-[#253237]"
                >
                  Meet Our Doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Pop-up Booking Modal */}
      <BookingModal
        doctor={selectedDoctorForModal}
        isOpen={!!selectedDoctorForModal}
        onClose={() => setSelectedDoctorForModal(null)}
      />
    </>
  );
};

export default Doctors;