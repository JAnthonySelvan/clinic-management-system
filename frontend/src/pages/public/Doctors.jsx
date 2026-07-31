import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Stethoscope, Award, Star, Calendar, Sparkles, ShieldCheck, HeartHandshake, ArrowRight, UserCheck } from "lucide-react";

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

const DEFAULT_AVATAR = "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

const SPECIALIZATIONS = [
  { image: SPECIALTY_IMAGES.cardiology, title: "Cardiology", key: "Cardiologist" },
  { image: SPECIALTY_IMAGES.neurology, title: "Neurology", key: "Neurologist" },
  { image: SPECIALTY_IMAGES.dental, title: "Dental Care", key: "Dentist" },
  { image: SPECIALTY_IMAGES.pediatrics, title: "Pediatrics", key: "Pediatrician" },
  { image: SPECIALTY_IMAGES.orthopedics, title: "Orthopedics", key: "Orthopedic" },
  { image: SPECIALTY_IMAGES.eyeCare, title: "Ophthalmology", key: "Ophthalmologist" },
  { image: SPECIALTY_IMAGES.pulmonology, title: "Pulmonology", key: "Pulmonologist" },
  { image: SPECIALTY_IMAGES.generalMedicine, title: "General Medicine", key: "General Physician" },
];

const WHY_CHOOSE_US = [
  {
    icon: Award,
    image: FEATURE_IMAGES.qualifiedSpecialists,
    title: "Highly Qualified",
    description: "Certified specialists with years of education, fellowship training, and clinical expertise.",
  },
  {
    icon: HeartHandshake,
    image: FEATURE_IMAGES.compassionateCare,
    title: "Compassionate Care",
    description: "Every patient receives personalized attention and evidence-based treatment with dignity.",
  },
  {
    icon: ShieldCheck,
    image: FEATURE_IMAGES.modernTechnology,
    title: "Modern Diagnostics",
    description: "Advanced medical technologies and digital labs for fast, accurate diagnosis.",
  },
  {
    icon: UserCheck,
    image: FEATURE_IMAGES.trustedPatients,
    title: "Trusted by Patients",
    description: "Over 10,000+ satisfied patients trust our doctors for reliable healthcare.",
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
      if (doc.specialization) {
        counts[doc.specialization] = (counts[doc.specialization] || 0) + 1;
      }
    });
    return counts;
  }, [activeDoctors]);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-32 sm:py-40">
        <img
          src={HERO_IMAGES.doctors}
          alt="Our medical specialists"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-900/85 to-[#5C6B73]/75" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        >
          <span className="inline-flex items-center space-x-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-300 border border-teal-400/30 backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ApexHealth Specialist Directory</span>
          </span>

          <h1 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight">
            Meet Our Expert Doctors
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Our team of highly qualified medical specialists is dedicated to providing compassionate, personalized, and advanced clinical care.
          </p>
        </AnimatedSection>
      </section>

      {/* ================= DOCTORS GRID ================= */}
      <AnimatedSection as="section" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Our Medical Team
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Experienced Healthcare Professionals
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Select any of our specialists below to check real-time availability and book an instant consultation.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-slate-500 py-12">Loading doctors...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : activeDoctors.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              No doctors available right now. Please check back soon.
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {activeDoctors.map((doctor, index) => (
                <AnimatedSection
                  key={doctor._id}
                  delay={(index % 3) * 100}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden h-80 bg-slate-100">
                    <img
                      src={doctor.profileImage || DEFAULT_AVATAR}
                      alt={doctor.fullName}
                      onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-700 shadow-md backdrop-blur-xs">
                      <Stethoscope className="h-3.5 w-3.5" />
                      <span>{doctor.specialization}</span>
                    </div>

                    <div className="absolute bottom-4 right-4 inline-flex items-center space-x-1 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-amber-400 backdrop-blur-xs">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {doctor.fullName}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-teal-600">
                        {doctor.qualification || "MBBS, Specialist"}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {doctor.experience ? `${doctor.experience}+ Years Clinical Experience` : "Experienced Medical Practitioner"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedDoctorForModal(doctor)}
                      className="mt-6 flex w-full items-center justify-center space-x-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-600/20 transition duration-300 hover:bg-teal-700 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* ================= DOCTOR SPECIALIZATIONS ================= */}
      <AnimatedSection as="section" className="bg-slate-50/80 py-24 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Specialized Departments
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Medical Specialties
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Our multidisciplinary team provides expert consultation and specialized care across all primary fields.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALIZATIONS.map((specialty, index) => {
              const count = specializationCounts[specialty.key] || specializationCounts[specialty.title] || 1;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={specialty.image}
                      alt={specialty.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-slate-900">
                      {specialty.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-teal-600">
                      {count} {count === 1 ? "Specialist Available" : "Specialists Available"}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE OUR DOCTORS ================= */}
      <AnimatedSection as="section" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Why Patients Trust Us
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Dedicated to Excellence in Healthcare
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Our specialists combine years of clinical experience with empathetic patient communication.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-b from-slate-50/50 to-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-40 w-full overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-teal-600 backdrop-blur-xs shadow-md">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= PATIENT TESTIMONIALS ================= */}
      <AnimatedSection as="section" className="bg-slate-50/80 py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Patient Experiences
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              What Our Patients Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Real feedback from patients who received care at ApexHealth Saviours Clinic.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "James Anderson",
                role: "Cardiology Patient",
                review: "The doctors were exceptionally thorough and reassuring. I received world-class treatment and felt supported throughout my recovery.",
              },
              {
                name: "Sophia Williams",
                role: "Dermatology Patient",
                review: "Modern clinic facilities, friendly reception staff, and highly knowledgeable specialists. Booking via the online slot picker was seamless.",
              },
              {
                name: "Michael Johnson",
                role: "Orthopedics Patient",
                review: "Quick consultation scheduling, precise diagnostic explanation, and fantastic post-treatment care. Highly recommend ApexHealth!",
              },
            ].map((testimonial, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600 italic">
                    "{testimonial.review}"
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-bold text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= DOCTORS CTA ================= */}
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
                Your Health Is Our Priority
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200">
                Schedule a consultation with one of our experienced specialists and receive personalized healthcare tailored to your needs.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/appointment"
                  className="inline-flex items-center space-x-2 rounded-xl bg-teal-600 px-8 py-4 text-base font-bold text-white shadow-lg transition duration-300 hover:bg-teal-700 hover:scale-105"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="h-5 w-5" />
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
