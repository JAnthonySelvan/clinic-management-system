import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, Stethoscope, Microscope, HeartPulse, Sparkles, CheckCircle2, ChevronDown, ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";

import AnimatedSection from "../../components/AnimatedSection";
import {
  HERO_IMAGES,
  SPECIALTY_IMAGES,
  FEATURE_IMAGES,
  CTA_IMAGES,
} from "../../constants/images";

const Services = () => {
  const faqs = [
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment online directly through our website using our real-time slot picker or contact our clinic reception by phone.",
    },
    {
      question: "Do I need an appointment for a consultation?",
      answer: "While urgent consultations may be accommodated based on availability, we recommend booking in advance to guarantee your preferred time slot.",
    },
    {
      question: "What medical specialties are available?",
      answer: "We offer Cardiology, Neurology, Pediatrics, Dental Care, Orthopedics, General Medicine, Ophthalmology, and Pulmonology.",
    },
    {
      question: "Do you provide follow-up consultations?",
      answer: "Yes, our specialists schedule regular follow-up consultations whenever necessary to track your recovery and monitor health progress.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const services = [
    {
      image: SPECIALTY_IMAGES.cardiology,
      title: "Cardiology",
      description: "Advanced cardiac diagnostics, ECG, echocardiograms, and comprehensive treatment for heart conditions.",
    },
    {
      image: SPECIALTY_IMAGES.neurology,
      title: "Neurology",
      description: "Expert care for brain, spine, and nerve disorders using evidence-based neurological treatments.",
    },
    {
      image: SPECIALTY_IMAGES.dental,
      title: "Dental Care",
      description: "Comprehensive oral health checkups, cosmetic dentistry, root canals, and preventive dental hygiene.",
    },
    {
      image: SPECIALTY_IMAGES.pediatrics,
      title: "Pediatrics",
      description: "Gentle, specialized medical care for newborns, infants, children, and adolescents.",
    },
    {
      image: SPECIALTY_IMAGES.generalMedicine,
      title: "General Medicine",
      description: "Routine health checkups, chronic disease management, and prompt treatment for common ailments.",
    },
    {
      image: SPECIALTY_IMAGES.orthopedics,
      title: "Orthopedics",
      description: "Specialized care for bone fractures, joint replacements, sports injuries, and spine conditions.",
    },
  ];

  const whyChooseUs = [
    {
      icon: ShieldCheck,
      image: FEATURE_IMAGES.modernFacilities,
      title: "Modern Infrastructure",
      description: "State-of-the-art diagnostic equipment and comfortable, hygienic clinical suites.",
    },
    {
      icon: Award,
      image: FEATURE_IMAGES.qualifiedSpecialists,
      title: "Qualified Specialists",
      description: "Board-certified doctors with extensive experience across multiple medical disciplines.",
    },
    {
      icon: Activity,
      image: FEATURE_IMAGES.fastDiagnosis,
      title: "Fast & Accurate Diagnosis",
      description: "Rapid digital lab reports and precise diagnostic imaging for timely intervention.",
    },
    {
      icon: HeartPulse,
      image: FEATURE_IMAGES.compassionateCare,
      title: "Patient-Centered Care",
      description: "Every treatment plan is personalized to suit your specific health requirements.",
    },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-32 sm:py-40">
        <img
          src={HERO_IMAGES.services}
          alt="Our medical services"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-900/85 to-[#5C6B73]/75" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        >
          <span className="inline-flex items-center space-x-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-300 border border-teal-400/30 backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Comprehensive Healthcare Services</span>
          </span>

          <h1 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight">
            Our Medical Services
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            We provide a complete spectrum of outpatient and specialized medical services designed around patient wellness and clinical excellence.
          </p>
        </AnimatedSection>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <AnimatedSection as="section" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              What We Offer
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Specialized Care & Treatments
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Delivering evidence-based clinical treatments across major medical departments.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <AnimatedSection
                key={index}
                delay={(index % 3) * 100}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="overflow-hidden h-52 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-teal-700 shadow-md backdrop-blur-xs">
                    <Stethoscope className="h-3.5 w-3.5" />
                    <span>Specialized Department</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    to="/appointment"
                    className="mt-6 inline-flex items-center space-x-1 text-sm font-bold text-teal-600 transition hover:text-teal-700 hover:translate-x-1"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= WHY CHOOSE OUR SERVICES ================= */}
      <AnimatedSection as="section" className="bg-slate-50/80 py-24 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Why Choose Our Services
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Delivering Exceptional Healthcare
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              We focus on high treatment standards, patient safety, and personalized care.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => {
              const IconComp = item.icon;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-40 w-full overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-teal-600 backdrop-blur-xs shadow-md">
                      <IconComp className="h-5 w-5" />
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

      {/* ================= TREATMENT PROCESS ================= */}
      <AnimatedSection as="section" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Treatment Process
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Your Journey to Recovery
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              A clear, patient-friendly process from appointment booking to complete wellness.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Book Appointment",
                description: "Select your medical department and preferred date using our real-time slot picker.",
              },
              {
                step: "02",
                title: "Specialist Visit",
                description: "Consult with expert doctors for in-depth examination and diagnostic evaluations.",
              },
              {
                step: "03",
                title: "Custom Care Plan",
                description: "Receive an individualized treatment regimen tailored specifically to your diagnosis.",
              },
              {
                step: "04",
                title: "Follow-up & Recovery",
                description: "Track your health improvements through scheduled follow-up visits.",
              },
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="group relative rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-lg font-bold text-white shadow-md shadow-teal-600/30 transition-transform group-hover:scale-110">
                  {item.step}
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= FAQ SECTION ================= */}
      <AnimatedSection as="section" className="bg-slate-50/80 py-24 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Have Questions? We Have Answers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Find quick answers to common questions about booking and medical care.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-900/5 transition duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition"
                >
                  <span className="text-base font-bold text-slate-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-teal-600 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= SERVICES CTA ================= */}
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
                Your Health Is Our Top Priority
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200">
                Whether you need a routine check-up or specialized care, our specialists are here for you.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/appointment"
                  className="inline-flex items-center space-x-2 rounded-xl bg-teal-600 px-8 py-4 text-base font-bold text-white shadow-lg transition duration-300 hover:bg-teal-700 hover:scale-105"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  to="/doctors"
                  className="rounded-xl border-2 border-white/80 px-8 py-4 text-base font-bold text-white backdrop-blur-xs transition duration-300 hover:bg-white hover:text-slate-900"
                >
                  Meet Our Doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default Services;
