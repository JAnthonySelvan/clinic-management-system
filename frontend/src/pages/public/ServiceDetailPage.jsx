import { useEffect, useState } from "react";
import { Link as RouterLink, useParams as useReactParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaStethoscope,
  FaArrowRight,
  FaCheckCircle,
  FaChevronRight,
  FaUserMd,
  FaExclamationTriangle,
  FaHeartbeat,
  FaClock,
  FaPhoneAlt,
  FaImages,
  FaListUl,
  FaTags,
  FaVial,
  FaSyringe,
  FaXRay,
  FaNotesMedical,
  FaProcedures,
  FaPills,
  FaMicroscope,
} from "react-icons/fa";

import AnimatedSection from "../../components/AnimatedSection";
import BookingModal from "../../components/BookingModal";
import { getServiceBySlug } from "../../features/service/serviceService";
import {
  SERVICE_DETAIL_IMAGES,
  HERO_IMAGES,
  CTA_IMAGES,
  FEATURE_IMAGES,
} from "../../constants/images";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

const getPricingIcon = (testName = "", index = 0) => {
  const normalized = testName.toLowerCase();
  if (normalized.includes("x-ray") || normalized.includes("xray") || normalized.includes("mri") || normalized.includes("ct") || normalized.includes("scan")) return FaXRay;
  if (normalized.includes("blood") || normalized.includes("lab") || normalized.includes("cbc") || normalized.includes("urine") || normalized.includes("lipid") || normalized.includes("test")) return FaVial;
  if (normalized.includes("ecg") || normalized.includes("echo") || normalized.includes("heart") || normalized.includes("cardio") || normalized.includes("eeg")) return FaHeartbeat;
  if (normalized.includes("micro") || normalized.includes("patho") || normalized.includes("biopsy") || normalized.includes("culture")) return FaMicroscope;

  const fallbackIcons = [FaVial, FaXRay, FaHeartbeat, FaMicroscope, FaStethoscope];
  return fallbackIcons[index % fallbackIcons.length];
};

const ServiceDetailPage = () => {
  const { serviceSlug } = useReactParams();
  const [service, setService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getServiceBySlug(serviceSlug);
        if (isMounted && response.success) {
          setService(response.data);
          setDoctors(response.data.doctors || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              `The medical service '${serviceSlug}' could not be found.`,
          );
          setService(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [serviceSlug]);

  const handleOpenBooking = (doc = null) => {
    if (doc) {
      setSelectedDoctorForBooking(doc);
    } else if (doctors && doctors.length > 0) {
      setSelectedDoctorForBooking(doctors[0]);
    } else {
      setSelectedDoctorForBooking({
        fullName: `${service?.name || "Clinic"} Specialist`,
        specialization: service?.name || "General Medicine",
        qualification: "Senior Medical Specialist",
      });
    }
    setIsBookingOpen(true);
  };

  // Treatment fallback images map
  const defaultTreatmentImages = [
    FEATURE_IMAGES.fastDiagnosis,
    FEATURE_IMAGES.preventiveCheckups,
    FEATURE_IMAGES.emergencyResponse,
    FEATURE_IMAGES.trustedPatients,
    FEATURE_IMAGES.modernFacilities,
    FEATURE_IMAGES.roboticSurgery,
  ];

  // Gallery fallback
  const galleryPhotos =
    service?.galleryImages && service.galleryImages.length > 0
      ? service.galleryImages
      : SERVICE_DETAIL_IMAGES[serviceSlug]?.gallery ||
        SERVICE_DETAIL_IMAGES.cardiology.gallery;

  // Hero image fallback
  const heroImg =
    service?.heroImage ||
    SERVICE_DETAIL_IMAGES[serviceSlug]?.hero ||
    HERO_IMAGES.services;

  // Overview image fallback
  const overviewImg =
    service?.overviewImage ||
    SERVICE_DETAIL_IMAGES[serviceSlug]?.overview ||
    FEATURE_IMAGES.multilingualTeam;

  /* ================= SKELETON LOADING STATE ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FBFC] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Hero Skeleton */}
          <div className="h-96 w-full animate-pulse rounded-4xl bg-white/70 shadow-lg" />

          {/* Content Skeleton Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="h-64 w-full animate-pulse rounded-3xl bg-white/70 shadow-md" />
              <div className="h-80 w-full animate-pulse rounded-3xl bg-white/70 shadow-md" />
            </div>
            <div className="h-96 w-full animate-pulse rounded-3xl bg-white/70 shadow-md" />
          </div>
        </div>
      </div>
    );
  }

  /* ================= 404 NOT FOUND STATE ================= */
  if (error || !service) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F8FBFC] px-4 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500 ring-8 ring-red-50/50 mb-6">
          <FaExclamationTriangle className="text-3xl" />
        </div>
        <h1 className="text-3xl font-bold text-[#253237] sm:text-4xl">
          Department Not Found
        </h1>
        <p className="mt-3 max-w-md text-base text-[#5C6B73]">
          {error || "We couldn't locate the requested medical service."}
        </p>
        <div className="mt-8 flex gap-4">
          <RouterLink
            to="/services"
            className="rounded-xl bg-[#253237] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5C6B73]"
          >
            Explore All Services
          </RouterLink>
          <RouterLink
            to="/contact"
            className="rounded-xl border border-[#253237] px-6 py-3 text-sm font-semibold text-[#253237] transition hover:bg-[#253237] hover:text-white"
          >
            Contact Clinic
          </RouterLink>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt={service.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient Overlay for high readability */}
        <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#253237]/85 to-[#5c6b73]/70" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C2DFE3]">
            <RouterLink to="/" className="hover:text-white transition-colors">
              Home
            </RouterLink>
            <FaChevronRight className="text-[10px]" />
            <RouterLink
              to="/services"
              className="hover:text-white transition-colors"
            >
              Services
            </RouterLink>
            <FaChevronRight className="text-[10px]" />
            <span className="text-white font-bold">{service.name}</span>
          </div>

          <AnimatedSection direction="up" className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md mb-4 border border-white/20">
              <FaStethoscope className="text-teal-300" />
              Saviours Center of Excellence
            </span>

            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight font-poppins">
              {service.name}
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#E0FBFC] sm:text-xl">
              {service.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#253237] shadow-xl transition-all hover:scale-105 hover:bg-[#E0FBFC] cursor-pointer"
              >
                Book Consultation
              </button>

              <a
                href="#doctors"
                className="rounded-xl border-2 border-white/80 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#253237]"
              >
                View Specialists
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Body Grid with Desktop Sticky Table of Contents */}
      <div className="relative bg-[#F8FBFC] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Desktop Sticky Table of Contents (Side Navigation) */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 space-y-3 rounded-3xl bg-white p-6 shadow-lg border border-gray-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#253237] border-b pb-3 mb-2">
                  Navigation
                </h3>
                <nav className="space-y-1 text-sm font-semibold">
                  <a
                    href="#overview"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaListUl className="text-xs" />
                    <span>Overview</span>
                  </a>
                  <a
                    href="#gallery"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaImages className="text-xs" />
                    <span>Facility Showcase</span>
                  </a>
                  <a
                    href="#treatments"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaHeartbeat className="text-xs" />
                    <span>Key Treatments</span>
                  </a>
                  <a
                    href="#pricing"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaTags className="text-xs" />
                    <span>Diagnostic Pricing</span>
                  </a>
                  <a
                    href="#doctors"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaUserMd className="text-xs" />
                    <span>Specialists</span>
                  </a>
                </nav>

                <div className="mt-6 rounded-2xl bg-[#253237] p-4 text-white">
                  <p className="text-xs font-bold">24/7 Helpline</p>
                  <p className="mt-1 text-sm font-semibold text-[#C2DFE3]">
                    +91 98765 43210
                  </p>
                  <button
                    onClick={() => handleOpenBooking()}
                    className="mt-3 w-full rounded-xl bg-[#5C6B73] py-2 text-xs font-bold text-white transition hover:bg-[#9DB4C0] hover:text-[#253237] cursor-pointer"
                  >
                    Quick Booking
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area (3 Cols on Desktop) */}
            <main className="space-y-20 lg:col-span-3">
              {/* ================= OVERVIEW SECTION ================= */}
              <section id="overview" className="scroll-mt-28">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  <AnimatedSection direction="left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                      Department Overview
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-[#253237] sm:text-4xl font-poppins">
                      Excellence in {service.name} Care
                    </h2>
                    <p className="mt-6 text-base leading-8 text-[#5C6B73]">
                      {service.fullDescription}
                    </p>

                    <div className="mt-6 space-y-3">
                      {[
                        "Board-certified senior clinical specialists",
                        "State-of-the-art diagnostic imaging technology",
                        "Personalized, evidence-based treatment protocols",
                        "Comprehensive post-consultation rehabilitation",
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
                        src={overviewImg}
                        alt="Overview illustration"
                        className="h-80 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-96"
                      />
                    </div>
                  </AnimatedSection>
                </div>
              </section>

              {/* ================= FACILITY SHOWCASE GALLERY STRIP ================= */}
              <section id="gallery" className="scroll-mt-28">
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Hospital Infrastructure
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins">
                    Facility Showcase & Environment
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Explore our modern treatment rooms, diagnostic suites, and patient-first care facilities.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {galleryPhotos.map((imgUrl, idx) => (
                    <AnimatedSection
                      key={idx}
                      delay={idx * 100}
                      className={`group overflow-hidden rounded-none border border-[#253237]/10 shadow-xl transition duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                        idx % 2 === 0 ? "h-64" : "h-72"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Facility ${idx + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </AnimatedSection>
                  ))}
                </div>
              </section>

              {/* ================= KEY TREATMENTS GRID (PREMIUM IMAGE CARDS & POPUP BOOKING MODAL) ================= */}
              <section id="treatments" className="scroll-mt-28">
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Treatments We Offer
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins">
                    Key Treatments & Procedures
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Comprehensive, evidence-based care tailored to your condition.
                  </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {service.keyTreatments && service.keyTreatments.length > 0 ? (
                    service.keyTreatments.map((treatment, idx) => {
                      const treatImg =
                        treatment.image ||
                        galleryPhotos[idx % galleryPhotos.length] ||
                        defaultTreatmentImages[idx % defaultTreatmentImages.length];

                      return (
                        <AnimatedSection
                          key={idx}
                          delay={(idx % 3) * 100}
                          className="w-full"
                        >
                          <div className="group relative block h-84 w-full overflow-hidden rounded-4xl bg-[#253237] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ring-1 ring-gray-200/50 hover:ring-2 hover:ring-[#9DB4C0]/60">
                            {/* Rich Background Treatment Image */}
                            <div className="absolute inset-0 bg-[#253237]">
                              <img
                                src={treatImg}
                                alt={treatment.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                              />
                            </div>

                            {/* Gradient Scrim Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-[#253237]/98 via-[#253237]/50 to-transparent transition-opacity duration-500 group-hover:from-[#253237]" />

                            {/* Top Procedure Tag */}
                            <div className="absolute top-5 left-5 z-10">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold text-[#E0FBFC] backdrop-blur-md border border-white/30 shadow-md">
                                Procedure #{idx + 1}
                              </span>
                            </div>

                            {/* Content Overlay at Bottom */}
                            <div className="absolute inset-x-0 bottom-0 z-10 p-7 flex flex-col justify-end">
                              <h3 className="text-2xl font-bold text-white font-poppins tracking-tight leading-tight">
                                {treatment.title}
                              </h3>
                              <p className="mt-2 text-xs leading-relaxed text-[#E0FBFC]/90 line-clamp-3">
                                {treatment.description}
                              </p>

                              {/* Specs & Booking Popup Button */}
                              <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                                <span className="text-[11px] font-semibold text-[#E0FBFC]/80">
                                  Avg. {treatment.duration || "45 min"}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenBooking();
                                  }}
                                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#253237] shadow-md transition-all duration-300 hover:bg-[#E0FBFC] hover:scale-105 cursor-pointer"
                                >
                                  <span>Book Consultation</span>
                                  <FaArrowRight className="text-[10px]" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </AnimatedSection>
                      );
                    })
                  ) : (
                    <p className="text-sm text-[#5C6B73]">
                      Standard clinical treatments are provided by our specialists.
                    </p>
                  )}
                </div>
              </section>

              {/* ================= DIAGNOSTIC PRICING SHOWCASE ================= */}
              <section id="pricing" className="scroll-mt-28">
                <div className="overflow-hidden rounded-4xl bg-white shadow-2xl border border-gray-100">
                  {/* Header Bar */}
                  <div className="bg-[#253237] text-white px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-2xl font-bold font-poppins">
                        Diagnostic & Test Pricing
                      </h3>
                      <p className="text-xs text-[#E0FBFC]/80 mt-1">
                        Transparent pricing, no hidden costs
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md border border-white/20 self-start sm:self-auto">
                      <FaTags className="text-teal-300 text-xs" />
                      Upfront Costs
                    </span>
                  </div>

                  {/* Pricing Table Rows */}
                  <div className="divide-y divide-gray-100">
                    {service.diagnosticPricing && service.diagnosticPricing.length > 0 ? (
                      service.diagnosticPricing.map((item, idx) => {
                        const PricingIcon = getPricingIcon(item.testName, idx);
                        const isStandout = idx === 0 || item.testName.toLowerCase().includes("complete") || item.testName.toLowerCase().includes("mri") || item.testName.toLowerCase().includes("blood");

                        return (
                          <div
                            key={idx}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 py-5 transition-colors duration-200 hover:bg-[#F8FBFC] ${
                              idx % 2 === 0 ? "bg-[#F8FBFC]/50" : "bg-white"
                            }`}
                          >
                            {/* Left: Test Name & Soft Icon */}
                            <div className="flex items-center gap-4">
                              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C2DFE3]/40 text-[#253237] shrink-0 shadow-xs">
                                <PricingIcon className="text-base text-[#253237]" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-base font-semibold text-[#253237]">
                                    {item.testName}
                                  </h4>
                                  {isStandout && (
                                    <span className="rounded-full bg-[#9DB4C0]/20 text-[#253237] text-[10px] font-bold px-2.5 py-0.5 border border-[#9DB4C0]/30">
                                      Most Booked
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Middle & Right: Duration & Price */}
                            <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12">
                              <span className="inline-flex items-center gap-1.5 text-xs text-[#5C6B73]">
                                <FaClock className="text-xs text-[#9DB4C0]" />
                                <span>~{item.duration || "20 mins"}</span>
                              </span>

                              <div className="text-right">
                                <span className="text-xs text-[#5C6B73] mr-1 font-normal">starting at</span>
                                <span className="text-xl font-bold text-[#253237]">
                                  ₹{item.price ? item.price.toLocaleString("en-IN") : "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="px-8 py-6 text-sm text-[#5C6B73]">
                        Standard consultation charges apply. Contact clinic for exact diagnostic pricing.
                      </p>
                    )}
                  </div>

                  {/* Footer Disclaimer Strip */}
                  <div className="bg-[#F8FBFC] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 text-xs">
                    <p className="text-[#5C6B73] text-center sm:text-left">
                      * Prices may vary based on physician consultation and individual clinical requirements.
                    </p>
                    <RouterLink
                      to="/contact"
                      className="font-bold text-[#253237] hover:text-[#5C6B73] transition-colors underline decoration-[#9DB4C0] underline-offset-4 whitespace-nowrap shrink-0"
                    >
                      Have a question about pricing? Contact us →
                    </RouterLink>
                  </div>
                </div>
              </section>

              {/* ================= ASSIGNED DOCTORS GRID ================= */}
              <section id="doctors" className="scroll-mt-28">
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Specialist Team
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237] font-poppins">
                    Meet Our {service.name} Specialists
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Experienced doctors dedicated to providing high-quality medical care.
                  </p>
                </div>

                {doctors && doctors.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doc, idx) => (
                      <AnimatedSection
                        key={doc._id}
                        delay={idx * 100}
                        className="group overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                      >
                        <div>
                          <div className="overflow-hidden h-64 bg-gray-100">
                            <img
                              src={doc.profileImage || DEFAULT_AVATAR}
                              alt={doc.fullName}
                              onError={(e) =>
                                (e.currentTarget.src = DEFAULT_AVATAR)
                              }
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                          </div>

                          <div className="p-6">
                            <span className="inline-block rounded-full bg-[#E0FBFC] px-3 py-1 text-xs font-bold text-[#253237] mb-2">
                              {doc.specialization}
                            </span>
                            <h3 className="text-xl font-bold text-[#253237] font-poppins">
                              Dr. {doc.fullName}
                            </h3>
                            <p className="mt-1 text-xs text-[#5C6B73]">
                              {doc.experience || "Senior Specialist"}
                            </p>

                            {doc.consultationFee && (
                              <p className="mt-3 text-sm font-semibold text-[#253237]">
                                Consultation Fee: ₹{doc.consultationFee}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="p-6 pt-0">
                          <button
                            type="button"
                            onClick={() => handleOpenBooking(doc)}
                            className="w-full rounded-xl bg-[#253237] py-3 text-xs font-bold text-white transition hover:bg-[#5C6B73] cursor-pointer"
                          >
                            Book Appointment
                          </button>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                ) : (
                  /* Empty state for doctors */
                  <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center">
                    <FaUserMd className="mx-auto text-4xl text-gray-300" />
                    <h3 className="mt-4 text-lg font-bold text-[#253237] font-poppins">
                      Specialists Coming Soon
                    </h3>
                    <p className="mt-2 text-sm text-[#5C6B73] max-w-md mx-auto">
                      Our senior physicians provide consultation for {service.name}. Book an appointment to see an available doctor.
                    </p>
                    <button
                      onClick={() => handleOpenBooking()}
                      className="mt-6 rounded-xl bg-[#253237] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#5C6B73] cursor-pointer"
                    >
                      Book General Consultation
                    </button>
                  </div>
                )}
              </section>

              {/* ================= BOTTOM CTA BANNER ================= */}
              <section className="pt-8">
                <div className="relative overflow-hidden rounded-4xl px-8 py-16 text-center shadow-2xl md:px-20">
                  <img
                    src={CTA_IMAGES.background}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#5C6B73]/90 to-[#9DB4C0]/95" />

                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white md:text-4xl font-poppins">
                      Need {service.name} Consultation?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-[#E0FBFC]">
                      Schedule a appointment with our expert specialists today for personalized healthcare support.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <button
                        onClick={() => handleOpenBooking()}
                        className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#253237] shadow-xl transition hover:scale-105 hover:bg-[#E0FBFC] cursor-pointer"
                      >
                        Book Appointment Now
                      </button>

                      <RouterLink
                        to="/contact"
                        className="rounded-xl border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-[#253237]"
                      >
                        Contact Clinic
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          doctor={selectedDoctorForBooking}
          availableDoctors={doctors}
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false);
            setSelectedDoctorForBooking(null);
          }}
        />
      )}
    </>
  );
};

export default ServiceDetailPage;
