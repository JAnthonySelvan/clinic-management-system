import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaBrain,
  FaTooth,
  FaBaby,
  FaBone,
  FaEye,
  FaLungs,
  FaStethoscope,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaMicroscope,
  FaHandshake,
  FaStar,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

const SPECIALIZATIONS = [
  { icon: FaHeartbeat, title: "Cardiology", key: "Cardiologist" },
  { icon: FaBrain, title: "Neurology", key: "Neurologist" },
  { icon: FaTooth, title: "Dental Care", key: "Dentist" },
  { icon: FaBaby, title: "Pediatrics", key: "Pediatrician" },
  { icon: FaBone, title: "Orthopedics", key: "Orthopedic" },
  { icon: FaEye, title: "Ophthalmology", key: "Ophthalmologist" },
  { icon: FaLungs, title: "Pulmonology", key: "Pulmonologist" },
  { icon: FaStethoscope, title: "General Medicine", key: "General Physician" },
];

const Doctors = () => {
  const dispatch = useAppDispatch();
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  const activeDoctors = useMemo(
    () => doctors.filter((doc) => doc.isActive !== false),
    [doctors],
  );

  const specializationCounts = useMemo(() => {
    const counts = {};
    activeDoctors.forEach((doc) => {
      counts[doc.specialization] = (counts[doc.specialization] || 0) + 1;
    });
    return counts;
  }, [activeDoctors]);

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#E0FBFC]">
            Our Specialists
          </span>

          <h1 className="mt-4 text-5xl font-bold text-white md:text-6xl">
            Meet Our Expert Doctors
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
            Our team of highly qualified specialists is dedicated to providing
            compassionate, personalized, and advanced healthcare for every
            patient.
          </p>
        </div>
      </section>

      {/* ================= DOCTORS GRID ================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Our Medical Team
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Experienced Healthcare Professionals
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Meet our dedicated specialists committed to delivering exceptional
              medical care with expertise and compassion.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-[#5C6B73]">Loading doctors...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : activeDoctors.length === 0 ? (
            <p className="text-center text-[#5C6B73]">
              No doctors available right now. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {activeDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={doctor.profileImage || DEFAULT_AVATAR}
                      alt={doctor.fullName}
                      onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                      className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#253237]">
                      {doctor.fullName}
                    </h3>

                    <p className="mt-2 font-medium text-[#5C6B73]">
                      {doctor.specialization}
                    </p>

                    <p className="mt-3 text-sm text-[#5C6B73]">
                      {doctor.experience}+ Years Experience
                    </p>

                    <Link
                      to="/appointment"
                      className="mt-6 inline-block rounded-xl bg-[#253237] px-6 py-3 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#5C6B73]"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= DOCTOR SPECIALIZATIONS ================= */}

      <section className="bg-[#F8FBFC] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Specializations
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Medical Departments
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Our multidisciplinary team provides expert care across a wide
              range of medical specialties using modern healthcare practices.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALIZATIONS.map((specialty, index) => {
              const count = specializationCounts[specialty.key] || 0;
              return (
                <div
                  key={index}
                  className="group rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C2DFE3] text-2xl text-[#253237] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#253237] group-hover:text-white">
                    <specialty.icon />
                  </div>

                  <h3 className="text-2xl font-bold text-[#253237]">
                    {specialty.title}
                  </h3>

                  <p className="mt-3 text-[#5C6B73]">
                    {count} {count === 1 ? "Specialist" : "Specialists"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ================= WHY CHOOSE OUR DOCTORS ================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Why Patients Trust Us
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Dedicated to Excellence in Healthcare
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Our doctors combine years of experience, advanced medical
              knowledge, and compassionate care to deliver the best possible
              outcomes for every patient.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FaGraduationCap,
                title: "Highly Qualified",
                description:
                  "Certified specialists with years of education, training, and clinical expertise.",
              },
              {
                icon: FaHandHoldingHeart,
                title: "Compassionate Care",
                description:
                  "Every patient receives personalized attention and treatment with care and respect.",
              },
              {
                icon: FaMicroscope,
                title: "Modern Technology",
                description:
                  "Advanced diagnostic tools and evidence-based treatments for accurate healthcare.",
              },
              {
                icon: FaHandshake,
                title: "Trusted by Patients",
                description:
                  "Thousands of patients trust our doctors for reliable and professional medical care.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C2DFE3] text-2xl text-[#253237] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#253237] group-hover:text-white">
                  <item.icon />
                </div>

                <h3 className="text-2xl font-bold text-[#253237]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-[#5C6B73]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PATIENT TESTIMONIALS ================= */}

      <section className="bg-[#F8FBFC] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Testimonials
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              What Our Patients Say
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              The trust and satisfaction of our patients inspire us to provide
              exceptional healthcare every day.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "James Anderson",
                review:
                  "The doctors were incredibly professional and caring. I received excellent treatment and felt supported throughout my recovery.",
              },
              {
                name: "Sophia Williams",
                review:
                  "Modern facilities, friendly staff, and experienced specialists made my visit stress-free. Highly recommended.",
              },
              {
                name: "Michael Johnson",
                review:
                  "Booking was easy, consultation was thorough, and the doctor explained everything clearly. Outstanding experience.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-4 flex text-2xl text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="leading-8 text-[#5C6B73] italic">
                  "{testimonial.review}"
                </p>

                <div className="mt-8 border-t pt-5">
                  <h3 className="text-xl font-bold text-[#253237]">
                    {testimonial.name}
                  </h3>

                  <p className="text-[#5C6B73]">Happy Patient</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= DOCTORS CTA ================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-4xl bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] px-8 py-16 text-center shadow-2xl md:px-20">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Ready to Meet Our Medical Experts?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
              Schedule an appointment with one of our experienced specialists
              and receive personalized, compassionate healthcare tailored to
              your needs.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/appointment"
                className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#253237] transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                Book Appointment
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-white hover:text-[#253237]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;
