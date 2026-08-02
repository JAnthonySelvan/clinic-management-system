import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeartbeat, FaUserFriends, FaHospitalAlt, FaClock } from "react-icons/fa";
import { Calendar, ArrowRight, UserCheck, Sparkles, ShieldCheck, HeartHandshake, Stethoscope } from "lucide-react";
import CountUpPkg from "react-countup";
import { useAppDispatch } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";
import AnimatedSection from "../../components/AnimatedSection";
import {
  HERO_IMAGES,
  SPECIALTY_IMAGES,
  FEATURE_IMAGES,
  CTA_IMAGES,
  HOSPITAL_FACILITIES
} from "../../constants/images";

const CountUp = CountUpPkg.default || CountUpPkg;

const STATS_DATA = [
  { value: 25, suffix: "+", label: "Specialist Doctors", icon: FaUserFriends },
  { value: 12000, suffix: "+", label: "Happy Patients", icon: FaHeartbeat },
  { value: 15, suffix: "+", label: "Medical Departments", icon: FaHospitalAlt },
  { value: "24/7", label: "Emergency Support", noCountUp: true, icon: FaClock },
];

// Specialties shown on the homepage — hover reveals a short description.
const SPECIALTIES = [
  {
    image: SPECIALTY_IMAGES.cardiology,
    title: "Cardiology",
    description:
      "Comprehensive heart care — from ECGs and stress tests to advanced treatment for arrhythmia, hypertension, and coronary disease.",
  },
  {
    image: SPECIALTY_IMAGES.neurology,
    title: "Neurology",
    description:
      "Diagnosis and treatment for the brain, spine, and nervous system, including migraines, epilepsy, and stroke recovery.",
  },
  {
    image: SPECIALTY_IMAGES.dental,
    title: "Dental Care",
    description:
      "Preventive, cosmetic, and surgical dentistry — cleanings, root canals, extractions, and smile makeovers.",
  },
  {
    image: SPECIALTY_IMAGES.pediatrics,
    title: "Pediatrics",
    description:
      "Gentle, dedicated healthcare for infants, children, and adolescents, from checkups to vaccinations.",
  },
  {
    image: SPECIALTY_IMAGES.eyeCare,
    title: "Eye Care",
    description:
      "Complete eye examinations, cataract and vision correction surgery, and treatment for common eye conditions.",
  },
  {
    image: SPECIALTY_IMAGES.orthopedics,
    title: "Orthopedics",
    description:
      "Diagnosis and treatment of bone, joint, and muscle conditions, including sports injuries and joint replacement.",
  },
  {
    image: SPECIALTY_IMAGES.pulmonology,
    title: "Pulmonology",
    description:
      "Expert care for respiratory conditions such as asthma, COPD, and other lung and breathing disorders.",
  },
  {
    image: SPECIALTY_IMAGES.generalMedicine,
    title: "General Medicine",
    description:
      "Complete health checkups, screenings, and personalized treatment plans for everyday illnesses.",
  },
];

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  return (
    <>
      {/* ================= HERO SECTION (CLEAN PREMIUM RECONSTRUCTION) ================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 lg:py-32">
        {/* Background image - PRESERVED */}
        <img
          src={HERO_IMAGES.home}
          alt="Saviours Healthcare Clinic"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#182329]/65 via-[#253237]/50 to-[#1c282e]/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center text-white z-10">
          <AnimatedSection direction="up" className="space-y-8 flex flex-col items-center">
            
            {/* Top Glass Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-teal-200 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-white/15 hover:border-white/30">
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>Welcome to Saviours Healthcare</span>
            </div>

            {/* Premium Headline */}
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12]">
                Caring For Your{" "}
                <span className="block sm:inline bg-gradient-to-r from-teal-200 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  Health Every Day
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl font-light leading-relaxed text-gray-200">
                Experience compassionate healthcare with expert doctors, advanced facilities, and patient-first care. Book appointments online with ease.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full pt-4">
              <Link
                to="/appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 px-9 py-4 text-base font-bold text-white shadow-xl shadow-teal-950/40 transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:from-teal-400 hover:to-emerald-400 group"
              >
                <Calendar className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5 text-white/80 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/doctors"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/30 bg-white/10 px-9 py-4 text-base font-semibold text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white hover:text-[#253237] hover:scale-[1.02]"
              >
                <UserCheck className="w-5 h-5 text-teal-300 group-hover:text-[#253237]" />
                <span>Our Doctors</span>
              </Link>
            </div>

            {/* Sleek Feature Pills Row */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-white/15 max-w-3xl w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certified Specialists</span>
              </div>
              <div className="hidden sm:block text-white/20">•</div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-200">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <span>Compassionate Care</span>
              </div>
              <div className="hidden sm:block text-white/20">•</div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-200">
                <Stethoscope className="w-4 h-4 text-emerald-400" />
                <span>Modern Facilities</span>
              </div>
            </div>

          </AnimatedSection>
        </div>
      </section>      {/* ================= STATISTICS (PREMIUM) ================= */}      {/* ================= STATISTICS ================= */}
      {/* ================= STATISTICS ================= */}
<section className="relative z-20 w-full bg-linear-to-r from-[#253237] via-[#3e515b] to-[#5C6B73] my-20 py-20 shadow-2xl">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="grid divide-y divide-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
      {STATS_DATA.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center px-8 py-10 text-center transition duration-300 hover:bg-white/5"
        >
          <h2 className="text-5xl tracking-tight text-white">
            {typeof stat.value === "number" ? (
              <CountUp
                end={stat.value}
                duration={2.5}
                separator=","                suffix={stat.suffix}                enableScrollSpy                scrollSpyOnce              />            ) : (              stat.value            )}          </h2>          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">            {stat.label}          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ================= SERVICES (PREMIUM RECONSTRUCTION) ================= */}
      <AnimatedSection as="section" className="bg-[#f8fafc] py-24 relative overflow-hidden">
        {/* Subtle ambient gradient overlay */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-200/50 to-transparent pointer-events-none" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200/80 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-800 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Specialized Medical Care
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#253237] tracking-tight">
              Comprehensive Healthcare Services
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We provide high-quality healthcare services with experienced doctors, modern equipment, and compassionate patient care across all specialized departments.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                image: SPECIALTY_IMAGES.cardiology,
                title: "Cardiology",
                tag: "Heart Care",
                slug: "cardiology",
                description:
                  "Comprehensive heart care with experienced cardiologists and advanced diagnostic technology.",
              },
              {
                image: SPECIALTY_IMAGES.neurology,
                title: "Neurology",
                tag: "Neuroscience",
                slug: "neurology",
                description:
                  "Expert diagnosis and treatment for brain, spinal cord and nervous system disorders.",
              },
              {
                image: SPECIALTY_IMAGES.dental,
                title: "Dental Care",
                tag: "Oral Health",
                slug: "dental",
                description:
                  "Modern dental treatments including preventive, cosmetic and surgical dentistry.",
              },
              {
                image: SPECIALTY_IMAGES.pediatrics,
                title: "Pediatrics",
                tag: "Child Health",
                slug: "pediatrics",
                description:
                  "Dedicated healthcare services focused on infants, children and adolescents.",
              },
              {
                image: SPECIALTY_IMAGES.eyeCare,
                title: "Eye Care",
                tag: "Ophthalmology",
                slug: "eye-care",
                description:
                  "Advanced eye examinations, surgeries and vision correction by specialists.",
              },
              {
                image: SPECIALTY_IMAGES.generalMedicine,
                title: "General Medicine",
                tag: "Primary Care",
                slug: "general-medicine",
                description:
                  "Complete health checkups and personalized treatment plans for every patient.",
              },
            ].map((service, index) => (
              <AnimatedSection
                key={index}
                delay={(index % 3) * 100}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10 hover:border-teal-500/30"
              >
                <div>
                  {/* Card Image Wrapper with Floating Glass Badge */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                    {/* Glass Badge */}
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1 text-xs font-bold text-[#253237] backdrop-blur-md shadow-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                      {service.tag}
                    </span>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-7 space-y-3">
                    <h3 className="text-2xl font-bold text-[#253237] transition-colors duration-300 group-hover:text-teal-700">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="px-7 pb-7 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 transition-all duration-300 group-hover:text-teal-700 group-hover:gap-3"
                  >
                    <span>Explore Department</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Bottom CTA Button */}
          <div className="mt-16 text-center">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#253237] px-9 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-teal-700 hover:shadow-xl hover:scale-[1.02]"
            >
              <span>View All Medical Departments</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE US ================= */}
      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <AnimatedSection direction="right" className="flex justify-center">
              <img
                src={FEATURE_IMAGES.qualifiedSpecialists}
                alt="Healthcare"
                className="w-full max-w-xl rounded-4xl shadow-2xl transition duration-500 hover:scale-[1.02]"
              />
            </AnimatedSection>

            <AnimatedSection direction="left" delay={150}>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
                Why Choose Us
              </span>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#253237]">
                Trusted Healthcare
                <br />
                For Every Patient
              </h2>

              <p className="mt-6 text-lg leading-8 text-[#5C6B73]">
                Our clinic combines experienced specialists, modern medical
                technology, and compassionate care to deliver the best treatment
                for every patient.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    image: FEATURE_IMAGES.expertDoctors,
                    title: "Expert Doctors",
                    description:
                      "Experienced specialists providing quality healthcare.",
                  },
                  {
                    image: FEATURE_IMAGES.modernFacilities,
                    title: "Modern Equipment",
                    description:
                      "Advanced medical facilities for accurate diagnosis.",
                  },
                  {
                    image: FEATURE_IMAGES.compassionateCare,
                    title: "Patient-Centered Care",
                    description:
                      "Every treatment plan is tailored to individual patient needs.",
                  },
                  {
                    image: FEATURE_IMAGES.timelyService,
                    title: "24/7 Emergency Support",
                    description:
                      "Immediate assistance whenever urgent medical care is required.",
                  },
                ].map((item, index) => (
                  <AnimatedSection
                    key={index}
                    delay={index * 100}
                    direction="up"
                    className="group flex gap-5"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#253237]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[#5C6B73]">{item.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= SPECIALTIES (replaces Featured Doctors) ================= */}
      {/* ================= FACILITIES ================= */}
      {/* ================= HOSPITAL FACILITIES ================= */}
      <AnimatedSection as="section" className="bg-[#253237] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9DB4C0]">
              Inside Saviours
            </span>

            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              World-Class Hospital Facilities
            </h2>

            <div className="mt-5 h-px w-16 bg-[#9DB4C0]" />

            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#C2DFE3]">
              Every facility is built with one goal — giving patients faster,
              safer, and more comfortable care.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden bg-[#5C6B73]/30 sm:grid-cols-2 lg:grid-cols-3">
            {HOSPITAL_FACILITIES.map((facility, index) => (
              <AnimatedSection
                key={index}
                delay={(index % 3) * 100}
                className="group relative isolate h-96 overflow-hidden bg-[#253237]"
              >
                {/* Background image */}
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Base gradient — always visible for legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/60" />

                {/* Accent top border on hover */}
                <div className="absolute inset-x-0 top-0 h-0.75 origin-left scale-x-0 bg-[#9DB4C0] transition-transform duration-500 ease-out group-hover:scale-x-100" />

                {/* Tag — visible by default, fades on hover */}
                <span className="absolute left-6 top-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#090909] opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                  {facility.tag}
                </span>

                {/* Content block — title always visible; description slides/fades up on hover */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="text-2xl font-bold text-white transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    {facility.title}
                  </h3>

                  <p className="mt-3 max-h-0 translate-y-4 text-sm leading-6 text-[#E0FBFC] opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:translate-y-0 group-hover:opacity-100">
                    {facility.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= CALL TO ACTION ================= */}
      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 hover:-translate-y-2 hover:-translate-x-0.5 transition duration-300">
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
                Your Health Is Our Priority
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
                Book your appointment today and receive expert medical care from
                our experienced healthcare professionals. We're here to provide
                the best treatment with compassion and excellence.
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
}

export default Home;