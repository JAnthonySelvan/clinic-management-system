import { Link } from "react-router-dom";
import { FaUserMd, FaHeartbeat, FaHospital, FaClock } from "react-icons/fa";

function Home() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}

      <section className="bg-linear-to-r from-[#253237] via-[#5c6b73] to-[#9db4c0]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* LEFT */}
            <div className="space-y-8 text-center text-white lg:text-left">
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
                  className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#253237] transition hover:scale-105"
                >
                  Book Appointment
                </Link>

                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center rounded-xl border border-white bg-white/15 px-8 py-4 text-base font-semibold text-white transition hover:bg-white hover:text-[#253237]"
                >
                  Our Doctors
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900"
                alt="Doctor"
                className="w-full max-w-xl rounded-4xl shadow-[0_40px_80px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="bg-[#c2dfe3] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
              <FaUserMd className="mx-auto mb-4 text-5xl text-[#253237]" />
              <h2 className="text-4xl font-bold text-[#253237]">25+</h2>
              <p className="mt-2 text-[#5c6b73]">Specialist Doctors</p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
              <FaHeartbeat className="mx-auto mb-4 text-5xl text-[#253237]" />
              <h2 className="text-4xl font-bold text-[#253237]">12,000+</h2>
              <p className="mt-2 text-[#5c6b73]">Happy Patients</p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
              <FaHospital className="mx-auto mb-4 text-5xl text-[#253237]" />
              <h2 className="text-4xl font-bold text-[#253237]">15+</h2>
              <p className="mt-2 text-[#5c6b73]">Medical Departments</p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
              <FaClock className="mx-auto mb-4 text-5xl text-[#253237]" />
              <h2 className="text-4xl font-bold text-[#253237]">24/7</h2>
              <p className="mt-2 text-[#5c6b73]">Emergency Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="bg-white py-24">
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
            {/* Card 1 */}

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2DFE3]">
                ❤️
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-[#253237]">
                Cardiology
              </h3>

              <p className="leading-7 text-[#5C6B73]">
                Comprehensive heart care with experienced cardiologists and
                advanced diagnostic technology.
              </p>
            </div>

            {/* Card 2 */}

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2DFE3]">
                🧠
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-[#253237]">
                Neurology
              </h3>

              <p className="leading-7 text-[#5C6B73]">
                Expert diagnosis and treatment for brain, spinal cord and
                nervous system disorders.
              </p>
            </div>

            {/* Card 3 */}

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2DFE3]">
                🦷
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-[#253237]">
                Dental Care
              </h3>

              <p className="leading-7 text-[#5C6B73]">
                Modern dental treatments including preventive, cosmetic and
                surgical dentistry.
              </p>
            </div>

            {/* Card 4 */}

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2DFE3]">
                👶
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-[#253237]">
                Pediatrics
              </h3>

              <p className="leading-7 text-[#5C6B73]">
                Dedicated healthcare services focused on infants, children and
                adolescents.
              </p>
            </div>

            {/* Card 5 */}

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2DFE3]">
                👁️
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-[#253237]">
                Eye Care
              </h3>

              <p className="leading-7 text-[#5C6B73]">
                Advanced eye examinations, surgeries and vision correction by
                specialists.
              </p>
            </div>

            {/* Card 6 */}

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C2DFE3]">
                🩺
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-[#253237]">
                General Medicine
              </h3>

              <p className="leading-7 text-[#5C6B73]">
                Complete health checkups and personalized treatment plans for
                every patient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="bg-[#F8FBFC] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* LEFT IMAGE */}

            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900"
                alt="Healthcare"
                className="w-full max-w-xl rounded-4xl shadow-2xl"
              />
            </div>

            {/* RIGHT CONTENT */}

            <div>
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
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C2DFE3] text-2xl">
                    👨‍⚕️
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-[#253237]">
                      Expert Doctors
                    </h3>

                    <p className="mt-2 text-[#5C6B73]">
                      Experienced specialists providing quality healthcare.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C2DFE3] text-2xl">
                    🏥
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-[#253237]">
                      Modern Equipment
                    </h3>

                    <p className="mt-2 text-[#5C6B73]">
                      Advanced medical facilities for accurate diagnosis.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C2DFE3] text-2xl">
                    ❤️
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-[#253237]">
                      Patient-Centered Care
                    </h3>

                    <p className="mt-2 text-[#5C6B73]">
                      Every treatment plan is tailored to individual patient
                      needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C2DFE3] text-2xl">
                    ⏰
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-[#253237]">
                      24/7 Emergency Support
                    </h3>

                    <p className="mt-2 text-[#5C6B73]">
                      Immediate assistance whenever urgent medical care is
                      required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED DOCTORS ================= */}

      <section className="bg-white py-24">
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Doctor 1 */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800"
                alt="Doctor"
                className="h-80 w-full object-cover"
              />

              <div className="p-7">
                <h3 className="text-2xl font-bold text-[#253237]">
                  Dr. Sarah Johnson
                </h3>

                <p className="mt-2 font-medium text-[#5C6B73]">Cardiologist</p>

                <div className="mt-5 flex justify-between text-sm text-gray-500">
                  <span>10+ Years</span>
                  <span>★★★★★</span>
                </div>

                <Link
                  to="/appointment"
                  className="mt-7 inline-block rounded-xl bg-[#253237] px-6 py-3 font-semibold text-white transition hover:bg-[#5C6B73]"
                >
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Doctor 2 */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800"
                alt="Doctor"
                className="h-80 w-full object-cover"
              />

              <div className="p-7">
                <h3 className="text-2xl font-bold text-[#253237]">
                  Dr. Michael Brown
                </h3>

                <p className="mt-2 font-medium text-[#5C6B73]">Neurologist</p>

                <div className="mt-5 flex justify-between text-sm text-gray-500">
                  <span>12+ Years</span>
                  <span>★★★★★</span>
                </div>

                <Link
                  to="/appointment"
                  className="mt-7 inline-block rounded-xl bg-[#253237] px-6 py-3 font-semibold text-white transition hover:bg-[#5C6B73]"
                >
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Doctor 3 */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=800"
                alt="Doctor"
                className="h-80 w-full object-cover"
              />

              <div className="p-7">
                <h3 className="text-2xl font-bold text-[#253237]">
                  Dr. Emily Davis
                </h3>

                <p className="mt-2 font-medium text-[#5C6B73]">Pediatrician</p>

                <div className="mt-5 flex justify-between text-sm text-gray-500">
                  <span>9+ Years</span>
                  <span>★★★★★</span>
                </div>

                <Link
                  to="/appointment"
                  className="mt-7 inline-block rounded-xl bg-[#253237] px-6 py-3 font-semibold text-white transition hover:bg-[#5C6B73]"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>

          {/* Button */}

          <div className="mt-16 text-center">
            <Link
              to="/doctors"
              className="inline-flex items-center rounded-xl border-2 border-[#253237] px-8 py-4 font-semibold text-[#253237] transition hover:bg-[#253237] hover:text-white"
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="bg-[#F8FBFC] py-24">
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
            {/* Testimonial 1 */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="mb-4 text-3xl text-yellow-500">★★★★★</div>

              <p className="leading-7 text-[#5C6B73]">
                "The doctors were extremely professional and caring. The booking
                process was smooth, and I received excellent treatment."
              </p>

              <div className="mt-8">
                <h4 className="font-bold text-[#253237]">James Wilson</h4>
                <p className="text-sm text-[#5C6B73]">Cardiology Patient</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="mb-4 text-3xl text-yellow-500">★★★★★</div>

              <p className="leading-7 text-[#5C6B73]">
                "Very friendly staff and experienced doctors. I felt comfortable
                throughout my consultation."
              </p>

              <div className="mt-8">
                <h4 className="font-bold text-[#253237]">Sophia Martin</h4>
                <p className="text-sm text-[#5C6B73]">Neurology Patient</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="mb-4 text-3xl text-yellow-500">★★★★★</div>

              <p className="leading-7 text-[#5C6B73]">
                "Excellent service with modern facilities. Highly recommend this
                clinic for quality healthcare."
              </p>

              <div className="mt-8">
                <h4 className="font-bold text-[#253237]">Olivia Brown</h4>
                <p className="text-sm text-[#5C6B73]">General Medicine</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
