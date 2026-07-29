import { Link } from "react-router-dom";
const Appointment = () => {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#E0FBFC]">
            Appointment
          </span>

          <h1 className="mt-4 text-5xl font-bold text-white md:text-6xl">
            Book Your Appointment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
            Schedule an appointment with our experienced medical professionals.
            We are committed to providing timely, compassionate, and
            personalized healthcare for you and your family.
          </p>
        </div>
      </section>

      {/* ================= APPOINTMENT FORM ================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Book Appointment
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Schedule Your Visit
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Fill out the form below and our team will contact you to confirm
              your appointment.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <form className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name"
                className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
              />

              <input
                type="number"
                placeholder="Age"
                className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
              />

              <select className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <select className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]">
                <option>Select Department</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>Dental Care</option>
              </select>

              <select className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]">
                <option>Select Doctor</option>
                <option>Dr. John Smith</option>
                <option>Dr. Sarah Wilson</option>
                <option>Dr. David Lee</option>
                <option>Dr. Emily Brown</option>
              </select>

              <input
                type="date"
                className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
              />

              <input
                type="time"
                className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
              />

              <div></div>

              <textarea
                rows="5"
                placeholder="Describe your health concern..."
                className="md:col-span-2 rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
              ></textarea>

              <button
                type="submit"
                className="md:col-span-2 rounded-xl bg-[#253237] py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#5C6B73]"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= APPOINTMENT GUIDELINES ================= */}

      <section className="bg-[#F8FBFC] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Appointment Information
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Before You Book
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Please review these guidelines to ensure a smooth appointment
              experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">📅</div>

              <h3 className="text-2xl font-bold text-[#253237]">
                Schedule in Advance
              </h3>

              <p className="mt-4 leading-7 text-[#5C6B73]">
                Book your appointment early to get your preferred doctor and
                time slot.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">🪪</div>

              <h3 className="text-2xl font-bold text-[#253237]">
                Bring Identification
              </h3>

              <p className="mt-4 leading-7 text-[#5C6B73]">
                Carry a valid ID and any previous medical reports during your
                visit.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">⏰</div>

              <h3 className="text-2xl font-bold text-[#253237]">
                Arrive Early
              </h3>

              <p className="mt-4 leading-7 text-[#5C6B73]">
                Reach the clinic at least 15 minutes before your scheduled
                appointment.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">💊</div>

              <h3 className="text-2xl font-bold text-[#253237]">
                Medical History
              </h3>

              <p className="mt-4 leading-7 text-[#5C6B73]">
                Inform your doctor about your medications, allergies, and
                medical history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Frequently Asked Questions
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Have Questions?
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Find answers to some of the most common questions about booking an
              appointment at our clinic.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="text-xl font-semibold text-[#253237]">
                How do I book an appointment?
              </h3>

              <p className="mt-3 leading-7 text-[#5C6B73]">
                Complete the appointment form with your details, choose your
                preferred department, doctor, and appointment date, then submit
                your request.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="text-xl font-semibold text-[#253237]">
                Will I receive confirmation?
              </h3>

              <p className="mt-3 leading-7 text-[#5C6B73]">
                Yes. After reviewing your request, our staff will confirm your
                appointment using your registered contact details.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="text-xl font-semibold text-[#253237]">
                Can I reschedule my appointment?
              </h3>

              <p className="mt-3 leading-7 text-[#5C6B73]">
                Yes. Please contact our clinic before your scheduled appointment
                to request a new date and time.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="text-xl font-semibold text-[#253237]">
                What should I bring for my visit?
              </h3>

              <p className="mt-3 leading-7 text-[#5C6B73]">
                Bring a valid ID, previous medical records (if any),
                prescriptions, and insurance details if applicable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= APPOINTMENT CTA ================= */}

      <section id="appointment-form" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-4xl bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] px-8 py-16 text-center shadow-2xl md:px-20">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Your Health Can't Wait
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
              Our experienced doctors are here to provide trusted medical care
              for you and your family. Book your appointment today and take the
              first step toward better health.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#appointment-form"
                className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#253237] transition duration-300 hover:scale-105"
              >
                Book Now
              </a>

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

export default Appointment;
