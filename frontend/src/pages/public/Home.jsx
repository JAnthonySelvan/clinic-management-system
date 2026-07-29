import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-6 text-5xl font-bold md:text-6xl">
            Your Health, Our Priority
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-blue-100">
            Professional healthcare services with experienced doctors, advanced
            medical facilities, and compassionate care for your family.
          </p>

          <div className="flex gap-4">
            <Link
              to="/appointment"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              Book Appointment
            </Link>

            <Link
              to="/doctors"
              className="rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white hover:text-blue-600"
            >
              Meet Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Our Services</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border p-8 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">General Consultation</h3>
            <p className="text-gray-600">
              Expert consultation for routine health concerns and preventive
              care.
            </p>
          </div>

          <div className="rounded-xl border p-8 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Specialist Care</h3>
            <p className="text-gray-600">
              Experienced specialists providing advanced diagnosis and
              treatment.
            </p>
          </div>

          <div className="rounded-xl border p-8 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Health Checkups</h3>
            <p className="text-gray-600">
              Comprehensive health screening packages for all age groups.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Why Choose Us?
          </h2>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="rounded-xl bg-white p-6 text-center shadow">
              <h3 className="text-4xl font-bold text-blue-600">20+</h3>
              <p className="mt-2 text-gray-600">Experienced Doctors</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow">
              <h3 className="text-4xl font-bold text-blue-600">5000+</h3>
              <p className="mt-2 text-gray-600">Happy Patients</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow">
              <h3 className="text-4xl font-bold text-blue-600">24/7</h3>
              <p className="mt-2 text-gray-600">Emergency Support</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow">
              <h3 className="text-4xl font-bold text-blue-600">15+</h3>
              <p className="mt-2 text-gray-600">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-blue-600 py-20 text-center text-white">
        <h2 className="mb-4 text-4xl font-bold">Need Medical Assistance?</h2>

        <p className="mb-8">
          Book your appointment with our experienced doctors today.
        </p>

        <Link
          to="/appointment"
          className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600"
        >
          Book Now
        </Link>
      </section>
    </>
  );
}

export default Home;
