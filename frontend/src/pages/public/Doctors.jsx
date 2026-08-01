import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
  "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

const SPECIALIZATIONS = [
  {
    image: SPECIALTY_IMAGES.cardiology,
    title: "Cardiology",
    key: "Cardiologist",
    slug: "cardiology",
    description: "Advanced cardiac care, ECG screenings, and vascular health.",
  },
  {
    image: SPECIALTY_IMAGES.neurology,
    title: "Neurology",
    key: "Neurologist",
    slug: "neurology",
    description: "Expert brain, spine, and nerve disorder diagnostics.",
  },
  {
    image: SPECIALTY_IMAGES.dental,
    title: "Dental Care",
    key: "Dentist",
    slug: "dental",
    description: "Painless root canals, teeth whitening, and oral surgery.",
  },
  {
    image: SPECIALTY_IMAGES.pediatrics,
    title: "Pediatrics",
    key: "Pediatrician",
    slug: "pediatrics",
    description: "Compassionate healthcare and vaccines for children.",
  },
  {
    image: SPECIALTY_IMAGES.orthopedics,
    title: "Orthopedics",
    key: "Orthopedic",
    slug: "orthopedics",
    description: "Joint replacement, fracture repair, and spine therapy.",
  },
  {
    image: SPECIALTY_IMAGES.eyeCare,
    title: "Ophthalmology",
    key: "Ophthalmologist",
    slug: "eye-care",
    description: "Vision testing, cataract checkups, and optical care.",
  },
  {
    image: SPECIALTY_IMAGES.pulmonology,
    title: "Pulmonology",
    key: "Pulmonologist",
    slug: "pulmonology",
    description: "Lungs, spirometry testing, and asthma management.",
  },
  {
    image: SPECIALTY_IMAGES.generalMedicine,
    title: "General Medicine",
    key: "General Physician",
    slug: "general-medicine",
    description: "Comprehensive primary health checkups and fever care.",
  },
];

const WHY_CHOOSE_US = [
  {
    image: FEATURE_IMAGES.qualifiedSpecialists,
    title: "Highly Qualified",
    description:
      "Certified specialists with years of education, training, and clinical expertise.",
  },
  {
    image: FEATURE_IMAGES.compassionateCare,
    title: "Compassionate Care",
    description:
      "Every patient receives personalized attention and treatment with care and respect.",
  },
  {
    image: FEATURE_IMAGES.modernTechnology,
    title: "Modern Technology",
    description:
      "Advanced diagnostic tools and evidence-based treatments for accurate healthcare.",
  },
  {
    image: FEATURE_IMAGES.trustedPatients,
    title: "Trusted by Patients",
    description:
      "Thousands of patients trust our doctors for reliable and professional medical care.",
  },
];

const Doctors = () => {
  const dispatch = useAppDispatch();
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);


  const activeDoctors = useMemo(() => {
    if (!Array.isArray(doctors)) return [];
    return doctors.filter((doc) => doc && doc.isActive !== false);
  }, [doctors]);


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

      <section className="relative overflow-hidden py-32">
        <img
          src={HERO_IMAGES.doctors}
          alt="Our medical specialists"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#5C6B73]/90 to-[#9DB4C0]/80" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        >
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
        </AnimatedSection>
      </section>

      {/* ================= DOCTORS GRID ================= */}

      <AnimatedSection as="section" className="py-24">
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
              {activeDoctors.map((doctor, index) => (
                <AnimatedSection
                  key={doctor._id}
                  delay={(index % 3) * 100}
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

                    <button
                      type="button"
                      onClick={() => setSelectedDoctorForModal(doctor)}
                      className="mt-6 flex w-full items-center justify-center rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-md shadow-teal-600/20 transition duration-300 hover:scale-[1.02] hover:bg-teal-700 active:scale-[0.98]"
                    >
                      Book Appointment
                    </button>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* ================= DOCTOR SPECIALIZATIONS / MEDICAL DEPARTMENTS ================= */}

      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
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
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                >
                  <Link
                    to={`/services/${specialty.slug}`}
                    className="block relative overflow-hidden h-48"
                  >
                    <img
                      src={specialty.image}
                      alt={specialty.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#253237]/80 via-[#253237]/20 to-transparent" />
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#253237] shadow-xs">
                      {count} {count === 1 ? "Specialist" : "Specialists"}
                    </span>
                  </Link>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <Link to={`/services/${specialty.slug}`}>
                        <h3 className="text-xl font-bold text-[#253237] group-hover:text-[#5C6B73] transition-colors">
                          {specialty.title}
                        </h3>
                      </Link>

                      <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                        {specialty.description}
                      </p>
                    </div>

                    <Link
                      to={`/services/${specialty.slug}`}
                      className="mt-6 flex items-center justify-between rounded-xl bg-[#F8FBFC] px-4 py-2.5 text-xs font-bold text-[#253237] border border-gray-200 transition group-hover:bg-[#253237] group-hover:text-white group-hover:border-[#253237]"
                    >
                      <span>View Department</span>
                      <span>→</span>
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE OUR DOCTORS ================= */}

      <AnimatedSection as="section" className="py-24">
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
            {WHY_CHOOSE_US.map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-[#253237]">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#5C6B73]">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= PATIENT TESTIMONIALS ================= */}

      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
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
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-4 text-2xl tracking-wider text-yellow-500">
                  ★★★★★
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= DOCTORS CTA ================= */}

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
