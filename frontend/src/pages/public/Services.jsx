import { useState } from "react";
import { Link } from "react-router-dom";

import AnimatedSection from "../../components/AnimatedSection";
import {
  HERO_IMAGES,
  SPECIALTY_IMAGES,
  FEATURE_IMAGES,
} from "../../constants/images";

const Services = () => {
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

  const services = [
    {
      image: SPECIALTY_IMAGES.cardiology,
      title: "Cardiology",
      description:
        "Advanced diagnosis and treatment for heart-related conditions.",
    },
    {
      image: SPECIALTY_IMAGES.neurology,
      title: "Neurology",
      description:
        "Comprehensive care for neurological disorders and diseases.",
    },
    {
      image: SPECIALTY_IMAGES.dental,
      title: "Dental Care",
      description: "Complete dental treatments for healthy teeth and gums.",
    },
    {
      image: SPECIALTY_IMAGES.pediatrics,
      title: "Pediatrics",
      description: "Specialized healthcare services for infants and children.",
    },
    {
      image: SPECIALTY_IMAGES.generalMedicine,
      title: "General Medicine",
      description: "Routine checkups and treatment for common illnesses.",
    },
    {
      image: SPECIALTY_IMAGES.orthopedics,
      title: "Orthopedics",
      description:
        "Diagnosis and treatment of bone, joint, and muscle conditions.",
    },
  ];

  const whyChooseUs = [
    {
      image: FEATURE_IMAGES.modernFacilities,
      title: "Modern Infrastructure",
      description:
        "State-of-the-art equipment and comfortable treatment facilities.",
    },
    {
      image: FEATURE_IMAGES.qualifiedSpecialists,
      title: "Qualified Specialists",
      description: "Experienced doctors across multiple medical specialties.",
    },
    {
      image: FEATURE_IMAGES.fastDiagnosis,
      title: "Fast Diagnosis",
      description:
        "Quick and accurate diagnosis using advanced medical technology.",
    },
    {
      image: FEATURE_IMAGES.compassionateCare,
      title: "Patient-Centered Care",
      description:
        "Every treatment plan is tailored to each patient's individual needs.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-32">
        <img
          src={HERO_IMAGES.services}
          alt="Our medical services"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#5C6B73]/90 to-[#9DB4C0]/80" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        >
          <h1 className="text-5xl font-bold text-white">
            Our Medical Services
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
            We provide a comprehensive range of healthcare services with modern
            facilities and experienced medical professionals to ensure the best
            treatment for every patient.
          </p>
        </AnimatedSection>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <AnimatedSection as="section" className="py-24">
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
            {services.map((service, index) => (
              <AnimatedSection
                key={index}
                delay={(index % 3) * 100}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#253237]">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#5C6B73]">
                    {service.description}
                  </p>

                  <button className="mt-6 font-semibold text-[#253237] transition duration-300 hover:translate-x-1 hover:text-[#5C6B73]">
                    Learn More →
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE OUR SERVICES ================= */}
      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
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
            {whyChooseUs.map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#253237]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[#5C6B73]">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= TREATMENT PROCESS ================= */}
      <AnimatedSection as="section" className="py-24">
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
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="group relative rounded-3xl border border-[#C2DFE3] bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#253237] text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110">
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
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
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-[#F8FBFC]"
                >
                  <span className="text-lg font-semibold text-[#253237]">
                    {faq.question}
                  </span>

                  <span
                    className={`text-2xl font-bold text-[#253237] transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="border-t border-[#E0FBFC] px-6 py-5 text-[#5C6B73]">
                    {faq.answer}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= SERVICES CTA ================= */}

      <AnimatedSection as="section" className="py-24">
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
                className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#253237] transition duration-300 hover:scale-105 hover:shadow-xl"
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
      </AnimatedSection>
    </>
  );
};

export default Services;
