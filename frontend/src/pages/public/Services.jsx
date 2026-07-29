import { useState } from "react";
import { Link } from "react-router-dom";
const Services = () => {
  {
    /* ================= FAQ SECTION ================= */
  }

  const faqs = [
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment online through our website or contact our clinic directly by phone.",
    },
    {
      question: "Do I need an appointment for a consultation?",
      answer:
        "While walk-ins may be accepted based on availability, we recommend booking an appointment in advance.",
    },
    {
      question: "What medical specialties are available?",
      answer:
        "We provide Cardiology, Neurology, Pediatrics, Dental Care, Orthopedics, General Medicine, and more.",
    },
    {
      question: "Do you provide follow-up consultations?",
      answer:
        "Yes, our doctors schedule follow-up visits whenever required to monitor your recovery and progress.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  return (
    <>
      {/* Hero */}
      <section className="bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white">
            Our Medical Services
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
            We provide a comprehensive range of healthcare services with modern
            facilities and experienced medical professionals to ensure the best
            treatment for every patient.
          </p>
        </div>
      </section>
      {/* ================= SERVICES GRID ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              What We Offer
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Comprehensive Healthcare Services
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Our clinic provides a wide range of medical services delivered by
              experienced specialists using modern medical technology.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "❤️",
                title: "Cardiology",
                description:
                  "Advanced diagnosis and treatment for heart-related conditions.",
              },
              {
                icon: "🧠",
                title: "Neurology",
                description:
                  "Comprehensive care for neurological disorders and diseases.",
              },
              {
                icon: "🦷",
                title: "Dental Care",
                description:
                  "Complete dental treatments for healthy teeth and gums.",
              },
              {
                icon: "👶",
                title: "Pediatrics",
                description:
                  "Specialized healthcare services for infants and children.",
              },
              {
                icon: "🩺",
                title: "General Medicine",
                description:
                  "Routine checkups and treatment for common illnesses.",
              },
              {
                icon: "🦴",
                title: "Orthopedics",
                description:
                  "Diagnosis and treatment of bone, joint, and muscle conditions.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C2DFE3] text-3xl">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-[#253237]">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-[#5C6B73]">
                  {service.description}
                </p>

                <button className="mt-6 font-semibold text-[#253237] transition hover:text-[#5C6B73]">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= WHY CHOOSE OUR SERVICES ================= */}
      <section className="bg-[#F8FBFC] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Why Choose Our Services
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Delivering Exceptional Healthcare
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              We focus on quality treatment, patient comfort, and modern medical
              practices to ensure the best healthcare experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 text-5xl">🏥</div>
              <h3 className="text-xl font-bold text-[#253237]">
                Modern Infrastructure
              </h3>
              <p className="mt-4 text-[#5C6B73]">
                State-of-the-art equipment and comfortable treatment facilities.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 text-5xl">👨‍⚕️</div>
              <h3 className="text-xl font-bold text-[#253237]">
                Qualified Specialists
              </h3>
              <p className="mt-4 text-[#5C6B73]">
                Experienced doctors across multiple medical specialties.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 text-5xl">⚡</div>
              <h3 className="text-xl font-bold text-[#253237]">
                Fast Diagnosis
              </h3>
              <p className="mt-4 text-[#5C6B73]">
                Quick and accurate diagnosis using advanced medical technology.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 text-5xl">❤️</div>
              <h3 className="text-xl font-bold text-[#253237]">
                Patient-Centered Care
              </h3>
              <p className="mt-4 text-[#5C6B73]">
                Every treatment plan is tailored to each patient's individual
                needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= TREATMENT PROCESS ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Treatment Process
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Your Journey to Better Health
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              We make healthcare simple with a clear and patient-friendly
              treatment process from appointment booking to complete recovery.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Book Appointment",
                description:
                  "Schedule your appointment online or contact our clinic.",
              },
              {
                step: "02",
                title: "Medical Consultation",
                description:
                  "Meet our specialists for diagnosis and personalized advice.",
              },
              {
                step: "03",
                title: "Treatment Plan",
                description:
                  "Receive a customized treatment plan based on your condition.",
              },
              {
                step: "04",
                title: "Recovery & Follow-up",
                description:
                  "Track your recovery with regular follow-up consultations.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative rounded-3xl border border-[#C2DFE3] bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#253237] text-lg font-bold text-white">
                  {item.step}
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-[#253237]">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#5C6B73]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#F8FBFC] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Frequently Asked Questions
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Have Questions? We've Got Answers
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#5C6B73]">
              Find answers to the questions patients ask us most often.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-[#253237]">
                    {faq.question}
                  </span>

                  <span className="text-2xl font-bold text-[#253237]">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="border-t border-[#E0FBFC] px-6 py-5 text-[#5C6B73]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= SERVICES CTA ================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-4xl bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] px-8 py-16 text-center shadow-2xl md:px-20">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Your Health Is Our Highest Priority
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
              Whether you need a routine check-up or specialized medical care,
              our experienced healthcare professionals are here to support you
              every step of the way.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/appointment"
                className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#253237] transition duration-300 hover:scale-105"
              >
                Book an Appointment
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
      </section>
    </>
  );
};

export default Services;
