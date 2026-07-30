import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaHeartbeat,
  FaHospital,
  FaClock,
  FaBrain,
  FaTooth,
  FaBaby,
  FaEye,
  FaStethoscope,
  FaHandHoldingHeart,
  FaStar,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";
import AnimatedSection from "../../components/AnimatedSection";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

function Home() {
  const dispatch = useAppDispatch();
  const { doctors, loading } = useAppSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  const featuredDoctors = doctors
    .filter((doc) => doc.isActive !== false)
    .slice(0, 4);

  return (
    <>
      {/* ================= HERO SECTION ================= */}

      <section className="bg-linear-to-r from-[#253237] via-[#5c6b73] to-[#9db4c0]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* LEFT */}
            <AnimatedSection
              direction="right"
              className="space-y-8 text-center text-white lg:text-left"
            >
              <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-medium tracking-wide text-white">
                Welcome to Saviours Healthcare
              </span>

              <div className="space-y-6">
                <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
                  Caring For Your
                  <br />
                  Health Every Day
                </h1>

                <p className="mx-auto max-w-xl text-lg leading-8 text-gray-100 sm:mx-0">
                  Experience compassionate healthcare with expert doctors,
                  advanced facilities, and patient-first care. Book appointments
                  online with ease.
                </p>
              </div>

              <div className="mx-auto flex max-w-max flex-col items-center gap-4 sm:flex-row lg:items-start">
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#253237] transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Book Appointment
                </Link>

                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center rounded-xl border border-white bg-white/15 px-8 py-4 text-base font-semibold text-white transition duration-300 hover:bg-white hover:text-[#253237]"
                >
                  Our Doctors
                </Link>
              </div>
            </AnimatedSection>

            {/* RIGHT */}
            <AnimatedSection
              direction="left"
              delay={150}
              className="flex justify-center lg:justify-end"
            >
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900"
                alt="Doctor"
                className="w-full max-w-xl rounded-4xl shadow-[0_40px_80px_rgba(0,0,0,0.18)] transition duration-500 hover:scale-[1.02]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <AnimatedSection as="section" className="bg-[#c2dfe3] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FaUserMd, value: "25+", label: "Specialist Doctors" },
              { icon: FaHeartbeat, value: "12,000+", label: "Happy Patients" },
              { icon: FaHospital, value: "15+", label: "Medical Departments" },
              { icon: FaClock, value: "24/7", label: "Emergency Support" },
            ].map((stat, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <stat.icon className="mx-auto mb-4 text-5xl text-[#253237] transition-transform duration-300 hover:scale-110" />
                <h2 className="text-4xl font-bold text-[#253237]">
                  {stat.value}
                </h2>
                <p className="mt-2 text-[#5c6b73]">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

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
                icon: FaHeartbeat,
                title: "Cardiology",
                description:
                  "Comprehensive heart care with experienced cardiologists and advanced diagnostic technology.",
              },
              {
                icon: FaBrain,
                title: "Neurology",
                description:
                  "Expert diagnosis and treatment for brain, spinal cord and nervous system disorders.",
              },
              {
                icon: FaTooth,
                title: "Dental Care",
                description:
                  "Modern dental treatments including preventive, cosmetic and surgical dentistry.",
              },
              {
                icon: FaBaby,
                title: "Pediatrics",
                description:
                  "Dedicated healthcare services focused on infants, children and adolescents.",
              },
              {
                icon: FaEye,
                title: "Eye Care",
                description:
                  "Advanced eye examinations, surgeries and vision correction by specialists.",
              },
              {
                icon: FaStethoscope,
                title: "General Medicine",
                description:
                  "Complete health checkups and personalized treatment plans for every patient.",
              },
            ].map((service, index) => (
              <AnimatedSection
                key={index}
                delay={(index % 3) * 100}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2DFE3] text-2xl text-[#253237] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#253237] group-hover:text-white">
                  <service.icon />
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-[#253237]">
                  {service.title}
                </h3>

                <p className="leading-7 text-[#5C6B73]">
                  {service.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE US ================= */}

      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* LEFT IMAGE */}

            <AnimatedSection direction="right" className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900"
                alt="Healthcare"
                className="w-full max-w-xl rounded-4xl shadow-2xl transition duration-500 hover:scale-[1.02]"
              />
            </AnimatedSection>

            {/* RIGHT CONTENT */}

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
                    icon: FaUserMd,
                    title: "Expert Doctors",
                    description:
                      "Experienced specialists providing quality healthcare.",
                  },
                  {
                    icon: FaHospital,
                    title: "Modern Equipment",
                    description:
                      "Advanced medical facilities for accurate diagnosis.",
                  },
                  {
                    icon: FaHandHoldingHeart,
                    title: "Patient-Centered Care",
                    description:
                      "Every treatment plan is tailored to individual patient needs.",
                  },
                  {
                    icon: FaClock,
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
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#C2DFE3] text-xl text-[#253237] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#253237] group-hover:text-white">
                      <item.icon />
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

      {/* ================= FEATURED DOCTORS ================= */}

      <AnimatedSection as="section" className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}

          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Our Doctors
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Meet Our Specialists
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#5C6B73]">
              Our experienced doctors are committed to delivering personalized,
              compassionate, and high-quality healthcare for every patient.
            </p>
          </div>

          {/* Doctor Cards */}

          {loading ? (
            <p className="text-center text-[#5C6B73]">Loading doctors...</p>
          ) : featuredDoctors.length === 0 ? (
            <p className="text-center text-[#5C6B73]">
              No doctors available right now. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredDoctors.map((doctor, index) => (
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
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#253237]">
                      {doctor.fullName}
                    </h3>

                    <p className="mt-2 font-medium text-[#5C6B73]">
                      {doctor.specialization}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span>{doctor.experience}+ Years</span>
                      <span className="flex text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </span>
                    </div>

                    <Link
                      to="/appointment"
                      className="mt-6 inline-block rounded-xl bg-[#253237] px-6 py-3 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#5C6B73]"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* Button */}

          <div className="mt-16 text-center">
            <Link
              to="/doctors"
              className="inline-flex items-center rounded-xl border-2 border-[#253237] px-8 py-4 font-semibold text-[#253237] transition duration-300 hover:bg-[#253237] hover:text-white"
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= TESTIMONIALS ================= */}

      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Testimonials
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              What Our Patients Say
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#5C6B73]">
              Hear from patients who trusted us with their healthcare journey.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "James Wilson",
                role: "Cardiology Patient",
                review:
                  "The doctors were extremely professional and caring. The booking process was smooth, and I received excellent treatment.",
              },
              {
                name: "Sophia Martin",
                role: "Neurology Patient",
                review:
                  "Very friendly staff and experienced doctors. I felt comfortable throughout my consultation.",
              },
              {
                name: "Olivia Brown",
                role: "General Medicine",
                review:
                  "Excellent service with modern facilities. Highly recommend this clinic for quality healthcare.",
              },
            ].map((testimonial, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-4 flex text-2xl text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="leading-7 text-[#5C6B73]">
                  "{testimonial.review}"
                </p>

                <div className="mt-8">
                  <h4 className="font-bold text-[#253237]">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-[#5C6B73]">{testimonial.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= CALL TO ACTION ================= */}

      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-4xl bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] px-8 py-16 text-center shadow-2xl md:px-20">
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
      </AnimatedSection>
    </>
  );
}

export default Home;
