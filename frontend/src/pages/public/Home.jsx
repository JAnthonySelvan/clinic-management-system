import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeartbeat, FaUserFriends, FaHospitalAlt, FaClock } from "react-icons/fa";
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
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <img
          src={HERO_IMAGES.home}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#253237]/85 to-[#5c6b73]/70" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <AnimatedSection
            direction="right"
            className="mx-auto max-w-2xl space-y-8 text-center text-white"
          >
            <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-medium tracking-wide text-white backdrop-blur-sm">
              Welcome to Saviours Healthcare
            </span>

            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
                Caring For Your
                <br />
                Health Every Day
              </h1>

              <p className="mx-auto max-w-xl text-lg leading-8 text-gray-100">
                Experience compassionate healthcare with expert doctors,
                advanced facilities, and patient-first care. Book appointments
                online with ease.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#253237] transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                Book Appointment
              </Link>

              <Link
                to="/doctors"
                className="inline-flex items-center justify-center rounded-xl border border-white bg-white/15 px-8 py-4 text-base font-semibold text-white transition duration-300 hover:bg-white hover:text-[#253237]"              >                Our Doctors              </Link>            </div>          </AnimatedSection>        </div>      </section>      {/* ================= STATISTICS (PREMIUM) ================= */}      {/* ================= STATISTICS ================= */}
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

      {/* ================= SERVICES ================= */}
      <AnimatedSection as="section" className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Our Services
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Comprehensive Healthcare Services
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#5C6B73]">
              We provide high-quality healthcare services with experienced
              doctors, modern equipment, and compassionate patient care.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                image: SPECIALTY_IMAGES.cardiology,
                title: "Cardiology",
                description:
                  "Comprehensive heart care with experienced cardiologists and advanced diagnostic technology.",
              },
              {
                image: SPECIALTY_IMAGES.neurology,
                title: "Neurology",
                description:
                  "Expert diagnosis and treatment for brain, spinal cord and nervous system disorders.",
              },
              {
                image: SPECIALTY_IMAGES.dental,
                title: "Dental Care",
                description:
                  "Modern dental treatments including preventive, cosmetic and surgical dentistry.",
              },
              {
                image: SPECIALTY_IMAGES.pediatrics,
                title: "Pediatrics",
                description:
                  "Dedicated healthcare services focused on infants, children and adolescents.",
              },
              {
                image: SPECIALTY_IMAGES.eyeCare,
                title: "Eye Care",
                description:
                  "Advanced eye examinations, surgeries and vision correction by specialists.",
              },
              {
                image: SPECIALTY_IMAGES.generalMedicine,
                title: "General Medicine",
                description:
                  "Complete health checkups and personalized treatment plans for every patient.",
              },
            ].map((service, index) => (
              <AnimatedSection
                key={index}
                delay={(index % 3) * 100}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
                  <h3 className="mb-3 text-2xl font-semibold text-[#253237]">
                    {service.title}
                  </h3>

                  <p className="leading-7 text-[#5C6B73]">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE US ================= */}
      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <AnimatedSection direction="right" className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900"
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