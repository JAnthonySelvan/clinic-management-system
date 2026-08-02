import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import {
  FaBullseye,
  FaFlask,
  FaHandsHelping,
  FaUserMd,
  FaHospitalAlt,
  FaHeart,
  FaClock,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";
import AnimatedSection from "../../components/AnimatedSection";
import {
  HERO_IMAGES,
  FEATURE_IMAGES,
  MISSION_IMAGES,
  CTA_IMAGES,
  ABOUT_DETAIL_IMAGES,
} from "../../constants/images";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80&auto=format&fit=crop";

const getSpecializationBadgeStyle = (spec) => {
  const normalized = (spec || "").toLowerCase();
  if (normalized.includes("cardio")) return "bg-rose-500/90 text-white backdrop-blur-xs shadow-rose-900/20";
  if (normalized.includes("neuro")) return "bg-indigo-600/90 text-white backdrop-blur-xs shadow-indigo-900/20";
  if (normalized.includes("pediatr")) return "bg-amber-500/90 text-white backdrop-blur-xs shadow-amber-900/20";
  if (normalized.includes("ortho")) return "bg-emerald-600/90 text-white backdrop-blur-xs shadow-emerald-900/20";
  if (normalized.includes("dent")) return "bg-cyan-600/90 text-white backdrop-blur-xs shadow-cyan-900/20";
  if (normalized.includes("eye") || normalized.includes("ophthalm")) return "bg-sky-600/90 text-white backdrop-blur-xs shadow-sky-900/20";
  if (normalized.includes("pulmon")) return "bg-teal-600/90 text-white backdrop-blur-xs shadow-teal-900/20";
  return "bg-[#9DB4C0]/90 text-[#253237] backdrop-blur-xs shadow-slate-900/10";
};

const About = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { doctors, loading } = useAppSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  // Handle smooth scroll when navigating to anchor hashes like #mission, #facilities, #medical-board
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  const teamDoctors = doctors
    .filter((doc) => doc.isActive !== false)
    .slice(0, 4);

  return (
    <>
      {/* ================= HERO (PREMIUM RECONSTRUCTION) ================= */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center py-24 lg:py-32">
        <img
          src={HERO_IMAGES.about}
          alt="About Saviours Clinic"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#182329]/95 via-[#253237]/85 to-[#1c282e]/90 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent pointer-events-none" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-5xl px-6 text-center lg:px-8 z-10 space-y-6 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide text-teal-200 backdrop-blur-md shadow-xl">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>Excellence In Healthcare</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            About{" "}
            <span className="bg-gradient-to-r from-teal-200 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Saviours Clinic
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl font-light leading-relaxed text-gray-200">
            We are committed to providing compassionate, high-quality
            healthcare through experienced doctors, advanced medical
            technology, and patient-centered care.
          </p>
        </AnimatedSection>
      </section>

      {/* About Content */}

      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Image */}

          <AnimatedSection direction="right">
            <div className="relative overflow-hidden rounded-4xl shadow-2xl bg-[#F8FBFC] aspect-[4/3]">
              <img
                src={MISSION_IMAGES.vision}
                alt="About Clinic"
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </AnimatedSection>

          {/* Content */}

          <AnimatedSection direction="left" delay={150}>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Who We Are
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Trusted Healthcare Since 2010
            </h2>

            <p className="mt-6 leading-8 text-[#5C6B73]">
              Saviours Clinic has been serving patients with dedication,
              professionalism, and compassion. Our mission is to make quality
              healthcare accessible while maintaining the highest standards of
              medical excellence.
            </p>

            <p className="mt-6 leading-8 text-[#5C6B73]">
              Our multidisciplinary team of specialists works together to ensure
              every patient receives personalized treatment using modern medical
              practices and advanced technology.
            </p>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* ================= MISSION & VISION ("Explore Saviours Clinic" Spotlight Hub Cards) ================= */}

      <AnimatedSection as="section" id="mission" className="bg-[#F8FBFC] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Institutional Pillars
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Explore Saviours Clinic
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#5C6B73]">
              Discover our core purpose, research innovations, and community health outreach initiatives.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Vision & Mission",
                tag: "Core Identity",
                teaser: "Explore our founding purpose, clinical standards, and core ethical values driving patient outcomes.",
                image: ABOUT_DETAIL_IMAGES.visionMission.hero,
                to: "/about/vision-mission",
                icon: FaBullseye,
                linkText: "Read Vision & Mission",
              },
              {
                title: "Research & Governance",
                tag: "Scientific Governance",
                teaser: "Learn about our ongoing clinical trials, laboratory studies, and medical board organizational structure.",
                image: ABOUT_DETAIL_IMAGES.research.hero,
                to: "/about/research-organization",
                icon: FaFlask,
                linkText: "Explore Research",
              },
              {
                title: "Medical Camps & Drives",
                tag: "Social Impact",
                teaser: "View our community screening photo gallery, health drive schedule, and social impact statistics.",
                image: ABOUT_DETAIL_IMAGES.medicalCamps.hero,
                to: "/about/medical-camps",
                icon: FaHandsHelping,
                linkText: "View Medical Camps",
              },
            ].map((card, index) => {
              const CardIcon = card.icon;
              return (
                <AnimatedSection
                  key={index}
                  direction="up"
                  delay={index * 100}
                  className="w-full"
                >
                  <Link
                    to={card.to}
                    className="group relative block h-96 w-full overflow-hidden rounded-4xl bg-[#253237] shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#9DB4C0]/50 ring-1 ring-gray-200/50 hover:ring-2 hover:ring-[#9DB4C0]/60"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-[#F8FBFC]">
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>

                    {/* Gradient Scrim Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/40 to-transparent transition-opacity duration-500 group-hover:from-[#253237] group-hover:via-[#253237]/50" />

                    {/* Frosted Glass Icon Badge */}
                    <div className="absolute top-6 left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <CardIcon className="text-xl text-[#E0FBFC]" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-8 flex flex-col justify-end">
                      <span className="inline-block self-start rounded-full bg-[#E0FBFC]/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#253237] mb-3 shadow-xs">
                        {card.tag}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-poppins tracking-tight leading-tight">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#E0FBFC]/90 line-clamp-2">
                        {card.teaser}
                      </p>

                      {/* Sliding Link Micro-interaction */}
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 sm:translate-y-4 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 translate-y-0 opacity-100">
                        <span className="underline-offset-4 group-hover:underline">
                          {card.linkText}
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

      {/* ================= WHY CHOOSE US ("Healthcare You Can Trust" Diagonal-Split Cards) ================= */}

      <AnimatedSection as="section" id="facilities" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Why Choose Saviours
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Healthcare You Can Trust
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#5C6B73]">
              We combine medical expertise, advanced technology, and
              compassionate care to provide the best possible experience for
              every patient.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                image: FEATURE_IMAGES.expertDoctors,
                icon: FaUserMd,
                title: "Expert Doctors",
                description:
                  "Highly qualified specialists with years of clinical experience.",
              },
              {
                image: FEATURE_IMAGES.modernFacilities,
                icon: FaHospitalAlt,
                title: "Modern Facilities",
                description:
                  "Equipped with advanced medical technology and diagnostic tools.",
              },
              {
                image: FEATURE_IMAGES.compassionateCare,
                icon: FaHeart,
                title: "Compassionate Care",
                description:
                  "Every patient receives personalized attention, warmth, and support.",
              },
              {
                image: FEATURE_IMAGES.timelyService,
                icon: FaClock,
                title: "Timely Service",
                description:
                  "Efficient appointment scheduling and prompt emergency medical assistance.",
              },
            ].map((card, index) => {
              const CardIcon = card.icon;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className="group relative overflow-hidden rounded-4xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100/80 flex flex-col h-full"
                >
                  {/* Top Image Container with Diagonal Clip Path */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#F8FBFC] [clip-path:polygon(0_0,_100%_0,_100%_88%,_0_100%)]">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#253237]/40 to-transparent" />
                  </div>

                  {/* Circular Icon Badge overlap at seam */}
                  <div className="relative z-10 -mt-7 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#253237] text-white shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <CardIcon className="text-2xl text-[#E0FBFC]" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 p-6 pt-4 text-center flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#253237] font-poppins">
                        {card.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-[#5C6B73]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= CLINIC STATISTICS ================= */}

      <AnimatedSection as="section" className="bg-[#253237] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#C2DFE3]">
              Our Achievements
            </span>

            <h2 className="mt-4 text-4xl font-bold text-white font-poppins">
              Trusted by Thousands of Patients
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#E0FBFC]">
              Our commitment to quality healthcare has earned the trust of
              patients and families over the years.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "15+", label: "Years of Experience" },
              { value: "50+", label: "Medical Specialists" },
              { value: "10K+", label: "Happy Patients" },
              { value: "24/7", label: "Emergency Support" },
            ].map((stat, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="rounded-3xl bg-[#5C6B73] p-10 text-center transition duration-300 hover:-translate-y-2"
              >
                <h3 className="text-5xl font-bold text-white font-poppins">{stat.value}</h3>
                <p className="mt-4 text-[#E0FBFC]">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= MEET OUR TEAM ("Meet Our Medical Experts" Interactive Flip/Reveal Cards) ================= */}

      <AnimatedSection as="section" id="medical-board" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Our Team
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Meet Our Medical Experts
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#5C6B73]">
              Our experienced doctors are dedicated to delivering exceptional
              healthcare with compassion and professionalism.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-[#5C6B73]">Loading team...</p>
          ) : teamDoctors.length === 0 ? (
            <p className="text-center text-[#5C6B73]">
              No team members available right now.
            </p>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {teamDoctors.map((doctor, index) => (
                  <AnimatedSection
                    key={doctor._id}
                    delay={index * 100}
                    className="w-full"
                  >
                    <div
                      tabIndex={0}
                      className="group relative overflow-hidden rounded-3xl bg-[#F8FBFC] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#9DB4C0]/50 border border-gray-100 flex flex-col justify-end h-[420px]"
                    >
                      {/* Doctor Photo Layer */}
                      <div className="absolute inset-0 bg-[#F8FBFC]">
                        <img
                          src={doctor.profileImage || DEFAULT_AVATAR}
                          alt={doctor.fullName}
                          loading="lazy"
                          onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#253237]/90 via-[#253237]/40 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-90 group-focus-within:opacity-90" />
                      </div>

                      {/* Top-Right Floating Specialization Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-md ${getSpecializationBadgeStyle(
                            doctor.specialization
                          )}`}
                        >
                          {doctor.specialization || "Specialist"}
                        </span>
                      </div>

                      {/* Base Caption Strip (Fades out on hover/focus) */}
                      <div className="absolute bottom-0 inset-x-0 p-5 bg-white/95 backdrop-blur-md rounded-b-3xl text-center border-t border-white/40 transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none group-focus-within:opacity-0 group-focus-within:pointer-events-none">
                        <h3 className="text-xl font-bold text-[#253237] truncate font-poppins">
                          {doctor.fullName}
                        </h3>
                        <p className="mt-1 text-xs font-semibold text-[#5C6B73] uppercase tracking-wider">
                          {doctor.specialization || "Specialist"}
                        </p>
                      </div>

                      {/* Slide-Up Detail Overlay Content */}
                      <div className="absolute inset-x-0 bottom-0 z-10 p-6 bg-linear-to-t from-[#253237] via-[#253237]/95 to-transparent rounded-b-3xl transition-all duration-500 flex flex-col justify-end text-center sm:translate-y-full sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 translate-y-0 opacity-100">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C2DFE3]">
                          {doctor.specialization || "Specialist"}
                        </span>
                        <h3 className="mt-1 text-xl font-bold text-white font-poppins">
                          {doctor.fullName}
                        </h3>
                        <p className="mt-1.5 text-xs font-medium text-[#E0FBFC]/90">
                          {doctor.qualification || "Senior Medical Specialist"}
                        </p>
                        <p className="mt-1 text-xs text-[#9DB4C0]">
                          {doctor.experience
                            ? `${doctor.experience}+ Years Clinical Experience`
                            : "Experienced Specialist"}
                        </p>

                        <Link
                          to="/doctors"
                          className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#9DB4C0] px-4 py-2.5 text-xs font-bold text-[#253237] shadow-md transition-all duration-300 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          Book Appointment
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* View All Doctors Outline Button */}
              <div className="mt-12 text-center">
                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#253237] px-8 py-3.5 text-base font-semibold text-[#253237] transition duration-300 hover:bg-[#253237] hover:text-white shadow-xs hover:shadow-md"
                >
                  <span>View All Doctors</span>
                  <span>→</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </AnimatedSection>

      {/* ================= ABOUT CTA ================= */}

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
            <div className="absolute inset-0 bg-linear-to-r from-[#253237]/90 via-[#5C6B73]/85 to-[#9DB4C0]/90" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white font-poppins md:text-5xl">
                Your Health Is Our Priority
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
                Our dedicated team is ready to provide compassionate care and
                expert medical services. Schedule your appointment today and let
                us help you achieve better health.
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

export default About;
