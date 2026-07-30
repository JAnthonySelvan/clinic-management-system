import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBullseye,
  FaEye,
  FaUserMd,
  FaHospital,
  FaHandHoldingHeart,
  FaClock,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

const About = () => {
  const dispatch = useAppDispatch();
  const { doctors, loading } = useAppSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);

  const teamDoctors = doctors
    .filter((doc) => doc.isActive !== false)
    .slice(0, 4);

  return (
    <>
      {/* Hero */}

      <section className="bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white">
            About Saviours Clinic
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
            We are committed to providing compassionate, high-quality healthcare
            through experienced doctors, advanced medical technology, and
            patient-centered care.
          </p>
        </div>
      </section>

      {/* About Content */}

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Image */}

          <div>
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900"
              alt="About Clinic"
              className="rounded-4xl shadow-2xl transition duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Content */}

          <div>
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
          </div>
        </div>
      </section>
      {/* ================= MISSION & VISION ================= */}

      <section className="bg-[#F8FBFC] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Our Purpose
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Mission & Vision
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#5C6B73]">
              Our commitment is to improve lives by providing exceptional
              healthcare with compassion, innovation, and excellence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}

            <div className="group rounded-3xl bg-white p-10 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2DFE3] text-2xl text-[#253237] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#253237] group-hover:text-white">
                <FaBullseye />
              </div>

              <h3 className="text-3xl font-bold text-[#253237]">Our Mission</h3>

              <p className="mt-6 leading-8 text-[#5C6B73]">
                To deliver accessible, affordable, and high-quality healthcare
                through experienced professionals, modern technology, and
                personalized patient care.
              </p>
            </div>

            {/* Vision */}

            <div className="group rounded-3xl bg-white p-10 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2DFE3] text-2xl text-[#253237] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#253237] group-hover:text-white">
                <FaEye />
              </div>

              <h3 className="text-3xl font-bold text-[#253237]">Our Vision</h3>

              <p className="mt-6 leading-8 text-[#5C6B73]">
                To become one of the most trusted healthcare providers by
                continuously improving medical services, embracing innovation,
                and putting patients first.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= WHY CHOOSE US ================= */}

      <section className="py-24">
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
                icon: FaUserMd,
                title: "Expert Doctors",
                description:
                  "Highly qualified specialists with years of medical experience.",
              },
              {
                icon: FaHospital,
                title: "Modern Facilities",
                description:
                  "Equipped with advanced medical equipment and diagnostic tools.",
              },
              {
                icon: FaHandHoldingHeart,
                title: "Compassionate Care",
                description:
                  "Every patient receives personalized attention and support.",
              },
              {
                icon: FaClock,
                title: "Timely Service",
                description:
                  "Efficient appointment scheduling and prompt medical assistance.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="group rounded-3xl bg-[#F8FBFC] p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C2DFE3] text-2xl text-[#253237] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#253237] group-hover:text-white">
                  <card.icon />
                </div>

                <h3 className="text-xl font-bold text-[#253237]">
                  {card.title}
                </h3>

                <p className="mt-4 text-[#5C6B73]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= CLINIC STATISTICS ================= */}

      <section className="bg-[#253237] py-24">
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
            <div className="rounded-3xl bg-[#5C6B73] p-10 text-center transition duration-300 hover:-translate-y-2">
              <h3 className="text-5xl font-bold text-white">15+</h3>
              <p className="mt-4 text-[#E0FBFC]">Years of Experience</p>
            </div>

            <div className="rounded-3xl bg-[#5C6B73] p-10 text-center transition duration-300 hover:-translate-y-2">
              <h3 className="text-5xl font-bold text-white">50+</h3>
              <p className="mt-4 text-[#E0FBFC]">Medical Specialists</p>
            </div>

            <div className="rounded-3xl bg-[#5C6B73] p-10 text-center transition duration-300 hover:-translate-y-2">
              <h3 className="text-5xl font-bold text-white">10K+</h3>
              <p className="mt-4 text-[#E0FBFC]">Happy Patients</p>
            </div>

            <div className="rounded-3xl bg-[#5C6B73] p-10 text-center transition duration-300 hover:-translate-y-2">
              <h3 className="text-5xl font-bold text-white">24/7</h3>
              <p className="mt-4 text-[#E0FBFC]">Emergency Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MEET OUR TEAM ================= */}

      <section className="py-24">
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
              {teamDoctors.map((doctor) => (
                <div
                  key={doctor._id}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= ABOUT CTA ================= */}

      <section className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-4xl bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] px-8 py-16 text-center shadow-2xl md:px-20">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Ready to Experience Quality Healthcare?
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

export default About;
