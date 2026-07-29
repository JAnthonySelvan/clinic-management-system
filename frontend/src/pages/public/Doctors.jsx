import { Link } from "react-router-dom";
const Doctors = () => {
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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Dr. John Smith",
                specialization: "Cardiologist",
                experience: "12+ Years Experience",
                image:
                  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500",
              },
              {
                name: "Dr. Sarah Wilson",
                specialization: "Neurologist",
                experience: "10+ Years Experience",
                image:
                  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500",
              },
              {
                name: "Dr. David Lee",
                specialization: "Orthopedic Surgeon",
                experience: "15+ Years Experience",
                image:
                  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500",
              },
              {
                name: "Dr. Emily Brown",
                specialization: "Pediatrician",
                experience: "9+ Years Experience",
                image:
                  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500",
              },
              {
                name: "Dr. Michael Johnson",
                specialization: "Dentist",
                experience: "8+ Years Experience",
                image:
                  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500",
              },
              {
                name: "Dr. Sophia Davis",
                specialization: "General Physician",
                experience: "11+ Years Experience",
                image:
                  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500",
              },
            ].map((doctor, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-80 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#253237]">
                    {doctor.name}
                  </h3>

                  <p className="mt-2 font-medium text-[#5C6B73]">
                    {doctor.specialization}
                  </p>

                  <p className="mt-3 text-sm text-[#5C6B73]">
                    {doctor.experience}
                  </p>

                  <Link
                    to="/appointment"
                    className="mt-6 inline-block rounded-xl bg-[#253237] px-6 py-3 font-semibold text-white transition duration-300 hover:bg-[#5C6B73]"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
            {[
              {
                icon: "❤️",
                title: "Cardiology",
                doctors: "5 Specialists",
              },
              {
                icon: "🧠",
                title: "Neurology",
                doctors: "4 Specialists",
              },
              {
                icon: "🦷",
                title: "Dental Care",
                doctors: "6 Specialists",
              },
              {
                icon: "👶",
                title: "Pediatrics",
                doctors: "3 Specialists",
              },
              {
                icon: "🦴",
                title: "Orthopedics",
                doctors: "4 Specialists",
              },
              {
                icon: "👁️",
                title: "Ophthalmology",
                doctors: "2 Specialists",
              },
              {
                icon: "🫁",
                title: "Pulmonology",
                doctors: "3 Specialists",
              },
              {
                icon: "🩺",
                title: "General Medicine",
                doctors: "8 Specialists",
              },
            ].map((specialty, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-6 text-5xl">{specialty.icon}</div>

                <h3 className="text-2xl font-bold text-[#253237]">
                  {specialty.title}
                </h3>

                <p className="mt-3 text-[#5C6B73]">{specialty.doctors}</p>
              </div>
            ))}
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
            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">🎓</div>

              <h3 className="text-2xl font-bold text-[#253237]">
                Highly Qualified
              </h3>

              <p className="mt-4 text-[#5C6B73] leading-7">
                Certified specialists with years of education, training, and
                clinical expertise.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">💙</div>

              <h3 className="text-2xl font-bold text-[#253237]">
                Compassionate Care
              </h3>

              <p className="mt-4 text-[#5C6B73] leading-7">
                Every patient receives personalized attention and treatment with
                care and respect.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">🔬</div>

              <h3 className="text-2xl font-bold text-[#253237]">
                Modern Technology
              </h3>

              <p className="mt-4 text-[#5C6B73] leading-7">
                Advanced diagnostic tools and evidence-based treatments for
                accurate healthcare.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">🤝</div>

              <h3 className="text-2xl font-bold text-[#253237]">
                Trusted by Patients
              </h3>

              <p className="mt-4 text-[#5C6B73] leading-7">
                Thousands of patients trust our doctors for reliable and
                professional medical care.
              </p>
            </div>
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
                <div className="mb-4 text-2xl text-yellow-500">⭐⭐⭐⭐⭐</div>

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
                className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#253237] transition duration-300 hover:scale-105"
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
