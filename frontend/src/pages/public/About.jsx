import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, ShieldCheck, HeartHandshake, Clock, Target, HeartPulse, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";
import AnimatedSection from "../../components/AnimatedSection";
import {
  HERO_IMAGES,
  FEATURE_IMAGES,
  MISSION_IMAGES,
  CTA_IMAGES,
} from "../../constants/images";

const DEFAULT_AVATAR = "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

const About = () => {
  const dispatch = useAppDispatch();
  const { doctors, loading } = useAppSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  const teamDoctors = doctors
    .filter((doc) => doc && doc.isActive !== false)
    .slice(0, 4);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-32 sm:py-40">
        <img
          src={HERO_IMAGES.about}
          alt="About Saviours Clinic"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-900/85 to-[#5C6B73]/75" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center">
            <span className="inline-flex items-center space-x-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-300 border border-teal-400/30 backdrop-blur-md mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Welcome to ApexHealth</span>
            </span>

            <h1 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight">
              Pioneering Excellence in Healthcare
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              We are committed to providing compassionate, high-quality healthcare through experienced doctors, advanced medical technology, and patient-centered clinical care.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <AnimatedSection as="section" className="py-24 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Decorative Image Stack */}
          <AnimatedSection direction="right" className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-900/10">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80"
                  alt="Modern Clinic Facilities"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center space-x-3 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-900/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">15+ Years</div>
                  <div className="text-xs font-medium text-slate-500">Medical Excellence</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="left" delay={150}>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Trusted Medical Healthcare Since 2010
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              ApexHealth Saviours Clinic has been serving patients with unwavering dedication, professionalism, and genuine human compassion. Our core mission is to make world-class healthcare accessible while upholding the highest standards of clinical precision.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Our multidisciplinary team of board-certified specialists collaborates seamlessly to ensure every patient receives an accurate diagnosis and individualized treatment plan in a welcoming environment.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                <span>Certified Specialists</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                <span>Advanced Diagnostics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                <span>Modern Facilities</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* ================= MISSION & VISION ================= */}
      <AnimatedSection as="section" className="bg-slate-50/80 py-24 border-y border-slate-100">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Our Purpose & Drive
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Mission & Vision
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Our commitment is to improve lives by providing exceptional healthcare with compassion, innovation, and unwavering clinical integrity.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <AnimatedSection
              direction="right"
              className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl border-t-4 border-teal-600"
            >
              <div className="h-60 w-full overflow-hidden">
                <img
                  src={MISSION_IMAGES.mission}
                  alt="Our Mission"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                </div>
                <p className="mt-4 leading-7 text-slate-600">
                  To deliver accessible, affordable, and high-quality healthcare through experienced medical professionals, modern diagnostic technology, and personalized patient care.
                </p>
              </div>
            </AnimatedSection>

            {/* Vision Card */}
            <AnimatedSection
              direction="left"
              delay={150}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl border-t-4 border-[#253237]"
            >
              <div className="h-60 w-full overflow-hidden">
                <img
                  src={MISSION_IMAGES.vision}
                  alt="Our Vision"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                </div>
                <p className="mt-4 leading-7 text-slate-600">
                  To become one of the most trusted healthcare networks by continuously elevating clinical services, embracing digital health innovation, and prioritizing patient outcomes above all.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE US ================= */}
      <AnimatedSection as="section" className="py-24 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Why Patients Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Healthcare Standard of Excellence
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              We combine specialized expertise, cutting-edge infrastructure, and patient comfort to deliver unmatched medical treatment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Award,
                image: FEATURE_IMAGES.expertDoctors,
                title: "Board-Certified Doctors",
                description: "Highly qualified specialists with decades of combined clinical expertise.",
              },
              {
                icon: ShieldCheck,
                image: FEATURE_IMAGES.modernFacilities,
                title: "State-of-the-Art Labs",
                description: "Equipped with advanced imaging tools and high-precision diagnostic labs.",
              },
              {
                icon: HeartHandshake,
                image: FEATURE_IMAGES.compassionateCare,
                title: "Compassionate Care",
                description: "Personalized attention tailored to every patient's unique health journey.",
              },
              {
                icon: Clock,
                image: FEATURE_IMAGES.timelyService,
                title: "Prompt Consultation",
                description: "Streamlined online booking and minimal wait times for consultations.",
              },
            ].map((card, index) => {
              const IconComp = card.icon;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-b from-slate-50/50 to-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-teal-600 backdrop-blur-xs shadow-md">
                      <IconComp className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= CLINIC STATISTICS ================= */}
      <AnimatedSection as="section" className="bg-[#253237] py-20 text-white relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "50+", label: "Medical Specialists" },
              { value: "10,000+", label: "Happy Patients Served" },
              { value: "24/7", label: "Emergency Assistance" },
            ].map((stat, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="rounded-3xl border border-slate-700/50 bg-slate-800/40 p-8 text-center backdrop-blur-xs transition duration-300 hover:border-teal-500/40 hover:bg-slate-800/80"
              >
                <div className="text-4xl font-extrabold text-teal-400 sm:text-5xl">{stat.value}</div>
                <div className="mt-3 text-sm font-semibold uppercase tracking-wider text-slate-300">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= MEET OUR TEAM ================= */}
      <AnimatedSection as="section" className="py-24 bg-slate-50/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Our Healthcare Leaders
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Meet Our Specialists
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Dedicated medical experts committed to clinical excellence and personalized patient care.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-slate-500">Loading team...</div>
          ) : teamDoctors.length === 0 ? (
            <div className="text-center text-slate-500">No team members available right now.</div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamDoctors.map((doctor, index) => (
                <AnimatedSection
                  key={doctor._id}
                  delay={index * 100}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="overflow-hidden h-72">
                    <img
                      src={doctor.profileImage || DEFAULT_AVATAR}
                      alt={doctor.fullName}
                      onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6 text-center">
                    <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 mb-2">
                      {doctor.specialization}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{doctor.fullName}</h3>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* ================= ABOUT CTA ================= */}
      <AnimatedSection as="section" className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-2xl md:px-20">
            <img
              src={CTA_IMAGES.background}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/85 to-[#5C6B73]/90" />

            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
                Ready to Experience Premium Healthcare?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200">
                Schedule a consultation with our experienced specialists and take the first step towards better health.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/appointment"
                  className="inline-flex items-center space-x-2 rounded-xl bg-teal-600 px-8 py-4 text-base font-bold text-white shadow-lg transition duration-300 hover:bg-teal-700 hover:scale-105"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  to="/doctors"
                  className="rounded-xl border-2 border-white/80 px-8 py-4 text-base font-bold text-white backdrop-blur-xs transition duration-300 hover:bg-white hover:text-slate-900"
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
