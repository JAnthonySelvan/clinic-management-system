import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
  "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

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
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">
        <img
          src={HERO_IMAGES.about}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#253237]/85 to-[#5c6b73]/70" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl font-bold text-white">
              About Saviours Clinic
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
              We are committed to providing compassionate, high-quality
              healthcare through experienced doctors, advanced medical
              technology, and patient-centered care.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* About Content */}

      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Image */}

          <AnimatedSection direction="right">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900"
              alt="About Clinic"
              className="rounded-4xl shadow-2xl transition duration-500 hover:scale-[1.02]"
            />
          </AnimatedSection>

          {/* Content */}

          <AnimatedSection direction="left" delay={150}>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Who We Are
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
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

      {/* ================= MISSION & VISION ================= */}

      <AnimatedSection as="section" id="mission" className="bg-[#F8FBFC] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Institutional Pillars
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Explore Saviours Clinic
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#5C6B73]">
              Discover our core purpose, research innovations, and community health outreach initiatives.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: Vision & Mission */}
            <AnimatedSection
              direction="up"
              delay={0}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="h-52 w-full overflow-hidden bg-[#253237]">
                  <img
                    src={ABOUT_DETAIL_IMAGES.visionMission.hero}
                    alt="Vision & Mission"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
                  <span className="inline-block rounded-full bg-[#E0FBFC] px-3 py-1 text-xs font-bold text-[#253237] mb-3">
                    Core Identity
                  </span>
                  <h3 className="text-2xl font-bold text-[#253237]">
                    Vision & Mission
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5C6B73]">
                    Explore our founding purpose, clinical standards, and 4 core ethical values driving patient outcomes.
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0">
                <Link
                  to="/about/vision-mission"
                  className="flex w-full items-center justify-between rounded-xl bg-[#253237] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#5C6B73]"
                >
                  <span>Read Vision & Mission</span>
                  <span>→</span>
                </Link>
              </div>
            </AnimatedSection>

            {/* Card 2: Research & Governance */}
            <AnimatedSection
              direction="up"
              delay={100}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="h-52 w-full overflow-hidden bg-[#253237]">
                  <img
                    src={ABOUT_DETAIL_IMAGES.research.hero}
                    alt="Research & Governance"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
                  <span className="inline-block rounded-full bg-[#E0FBFC] px-3 py-1 text-xs font-bold text-[#253237] mb-3">
                    Scientific Governance
                  </span>
                  <h3 className="text-2xl font-bold text-[#253237]">
                    Research & Governance
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5C6B73]">
                    Learn about our ongoing clinical trials, laboratory studies, and medical board organizational structure.
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0">
                <Link
                  to="/about/research-organization"
                  className="flex w-full items-center justify-between rounded-xl bg-[#253237] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#5C6B73]"
                >
                  <span>Explore Research</span>
                  <span>→</span>
                </Link>
              </div>
            </AnimatedSection>

            {/* Card 3: Medical Camps */}
            <AnimatedSection
              direction="up"
              delay={200}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="h-52 w-full overflow-hidden bg-[#253237]">
                  <img
                    src={ABOUT_DETAIL_IMAGES.medicalCamps.hero}
                    alt="Medical Camps"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
                  <span className="inline-block rounded-full bg-[#E0FBFC] px-3 py-1 text-xs font-bold text-[#253237] mb-3">
                    Social Impact
                  </span>
                  <h3 className="text-2xl font-bold text-[#253237]">
                    Medical Camps & Drives
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5C6B73]">
                    View our community screening photo gallery, health drive schedule, and social impact statistics.
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0">
                <Link
                  to="/about/medical-camps"
                  className="flex w-full items-center justify-between rounded-xl bg-[#253237] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#5C6B73]"
                >
                  <span>View Medical Camps</span>
                  <span>→</span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE US ================= */}

      <AnimatedSection as="section" id="facilities" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Why Choose Saviours
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
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
                title: "Expert Doctors",
                description:
                  "Highly qualified specialists with years of medical experience.",
              },
              {
                image: FEATURE_IMAGES.modernFacilities,
                title: "Modern Facilities",
                description:
                  "Equipped with advanced medical equipment and diagnostic tools.",
              },
              {
                image: FEATURE_IMAGES.compassionateCare,
                title: "Compassionate Care",
                description:
                  "Every patient receives personalized attention and support.",
              },
              {
                image: FEATURE_IMAGES.timelyService,
                title: "Timely Service",
                description:
                  "Efficient appointment scheduling and prompt medical assistance.",
              },
            ].map((card, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="group overflow-hidden rounded-3xl bg-[#F8FBFC] shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-[#253237]">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-[#5C6B73]">{card.description}</p>
                </div>
              </AnimatedSection>
            ))}
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

            <h2 className="mt-4 text-4xl font-bold text-white">
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
                <h3 className="text-5xl font-bold text-white">{stat.value}</h3>
                <p className="mt-[#E0FBFC] mt-4">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= MEET OUR TEAM ================= */}

      <AnimatedSection as="section" id="medical-board" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Our Team
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamDoctors.map((doctor, index) => (
                <AnimatedSection
                  key={doctor._id}
                  delay={index * 100}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={doctor.profileImage || DEFAULT_AVATAR}
                      alt={doctor.fullName}
                      onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-[#253237]">
                      {doctor.fullName}
                    </h3>

                    <p className="mt-2 text-[#5C6B73]">
                      {doctor.specialization}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
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
