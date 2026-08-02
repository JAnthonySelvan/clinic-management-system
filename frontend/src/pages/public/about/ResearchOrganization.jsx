import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaFlask,
  FaMicroscope,
  FaDna,
  FaFileMedicalAlt,
  FaGraduationCap,
  FaChevronRight,
  FaCheckCircle,
  FaListUl,
  FaSitemap,
  FaChartLine,
} from "react-icons/fa";

import AnimatedSection from "../../../components/AnimatedSection";
import BookingModal from "../../../components/BookingModal";
import { ABOUT_DETAIL_IMAGES, CTA_IMAGES } from "../../../constants/images";

const RESEARCH_AREAS = [
  {
    title: "Cardiovascular & Vascular Innovation",
    description:
      "Investigating early biomarkers for ischemic heart disease and non-invasive hypertension monitoring.",
    icon: FaFlask,
    image: ABOUT_DETAIL_IMAGES.research.labImages[0],
  },
  {
    title: "Neuro-Genomics & Epilepsy Mapping",
    description:
      "Advanced electro-encephalography research into nerve conduction pathways and migraine therapeutic responses.",
    icon: FaDna,
    image: ABOUT_DETAIL_IMAGES.research.labImages[1],
  },
  {
    title: "Clinical Trials & Bio-Equivalence",
    description:
      "Phase II & III ethical clinical trials adhering strictly to International Council for Harmonisation (ICH-GCP) guidelines.",
    icon: FaFileMedicalAlt,
    image: ABOUT_DETAIL_IMAGES.research.labImages[2],
  },
  {
    title: "Medical Education & Fellowships",
    description:
      "Training senior residents and junior clinical fellows in cutting-edge diagnostic techniques and surgical care.",
    icon: FaGraduationCap,
    image: ABOUT_DETAIL_IMAGES.research.labImages[3],
  },
];

const CLINIC_STATS = [
  { label: "Active Research Programs", value: "12+" },
  { label: "Published Clinical Studies", value: "40+" },
  { label: "Medical Research Patents", value: "15" },
  { label: "Peer-Reviewed Journals", value: "100%" },
];

const ResearchOrganization = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <img
          src={ABOUT_DETAIL_IMAGES.research.hero}
          alt="Research & Governance Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#253237]/60 via-[#253237]/45 to-[#5C6B73]/35 backdrop-blur-[1px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C2DFE3]">
            <RouterLink to="/" className="hover:text-white transition-colors">
              Home
            </RouterLink>
            <FaChevronRight className="text-[10px]" />
            <RouterLink to="/about" className="hover:text-white transition-colors">
              About
            </RouterLink>
            <FaChevronRight className="text-[10px]" />
            <span className="text-white font-bold">Research & Governance</span>
          </div>

          <AnimatedSection direction="up" className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md mb-4 border border-white/20">
              <FaMicroscope className="text-teal-300" />
              Evidence-Based Medicine
            </span>

            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight">
              Research & Governance
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#E0FBFC] sm:text-xl">
              Pioneering medical innovation, clinical trials, and rigorous medical board leadership to ensure safety and superior clinical outcomes.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#253237] shadow-xl transition-all hover:scale-105 hover:bg-[#E0FBFC]"
              >
                Schedule Consultation
              </button>
              <RouterLink
                to="/doctors"
                className="rounded-xl border-2 border-white/80 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#253237]"
              >
                Meet Research Board
              </RouterLink>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================= MAIN CONTENT GRID ================= */}
      <div className="relative bg-[#F8FBFC] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Desktop Sticky Navigation Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 space-y-3 rounded-3xl bg-white p-6 shadow-lg border border-gray-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#253237] border-b pb-3 mb-2">
                  Page Outline
                </h3>
                <nav className="space-y-1 text-sm font-semibold">
                  <a
                    href="#research-overview"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaListUl className="text-xs" />
                    <span>Overview</span>
                  </a>
                  <a
                    href="#research-areas"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaMicroscope className="text-xs" />
                    <span>Research Focus</span>
                  </a>
                  <a
                    href="#governance"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaSitemap className="text-xs" />
                    <span>Governance & Hierarchy</span>
                  </a>
                  <a
                    href="#stats"
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[#5C6B73] transition hover:bg-[#F8FBFC] hover:text-[#253237]"
                  >
                    <FaChartLine className="text-xs" />
                    <span>Clinical Impact</span>
                  </a>
                </nav>

                <div className="mt-6 rounded-2xl bg-[#253237] p-4 text-white">
                  <p className="text-xs font-bold">Research Inquiries</p>
                  <p className="mt-1 text-sm font-semibold text-[#C2DFE3]">
                    +91 98765 43210
                  </p>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="mt-3 w-full rounded-xl bg-[#5C6B73] py-2 text-xs font-bold text-white transition hover:bg-[#9DB4C0] hover:text-[#253237]"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="space-y-20 lg:col-span-3">
              {/* ================= RESEARCH OVERVIEW SECTION ================= */}
              <section id="research-overview" className="scroll-mt-28">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  <AnimatedSection direction="left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                      Scientific Innovation
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-[#253237] sm:text-4xl">
                      Advancing Medical Science
                    </h2>
                    <p className="mt-6 text-base leading-8 text-[#5C6B73]">
                      At Saviours Clinic, medical care is informed by continuous scientific inquiry. Our dedicated research labs work alongside clinical practitioners to rapidly translate research insights into safe patient care.
                    </p>

                    <div className="mt-6 space-y-3">
                      {[
                        "Ethical IRB-approved research protocols",
                        "Collaborative studies with global medical institutions",
                        "State-of-the-art diagnostic imaging laboratories",
                        "Continuous quality assurance & peer review",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <FaCheckCircle className="text-teal-600 shrink-0" />
                          <span className="text-sm font-semibold text-[#253237]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AnimatedSection>

                  <AnimatedSection direction="right" delay={150}>
                    <div className="group overflow-hidden rounded-4xl shadow-2xl ring-1 ring-black/5">
                      <img
                        src={ABOUT_DETAIL_IMAGES.research.advanced}
                        alt="Research Lab Overview"
                        className="h-80 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-96"
                      />
                    </div>
                  </AnimatedSection>
                </div>
              </section>

              {/* ================= RESEARCH AREAS GRID ================= */}
              <section id="research-areas" className="scroll-mt-28">
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Focus Disciplines
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237]">
                    Key Research Initiatives
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Exploring new frontiers in diagnostics, therapeutics, and patient outcomes.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {RESEARCH_AREAS.map((area, idx) => {
                    const IconComp = area.icon;
                    return (
                      <AnimatedSection
                        key={idx}
                        delay={idx * 100}
                        className="group overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                      >
                        <div className="relative h-48 w-full overflow-hidden bg-[#253237]">
                          <img
                            src={area.image}
                            alt={area.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[#253237]/90 via-[#253237]/30 to-transparent" />
                          <span className="absolute top-3 left-3 rounded-full bg-[#253237]/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#E0FBFC] border border-white/10">
                            Program #{idx + 1}
                          </span>
                        </div>

                        <div className="p-6">
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#253237] text-white shadow-md">
                            <IconComp className="text-base" />
                          </div>

                          <h3 className="text-lg font-bold text-[#253237]">
                            {area.title}
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                            {area.description}
                          </p>
                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </section>

              {/* ================= GOVERNANCE & HIERARCHY ================= */}
              <section id="governance" className="scroll-mt-28">
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5C6B73]">
                    Institutional Leadership
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-[#253237]">
                    Organizational Governance
                  </h2>
                  <p className="mt-2 text-sm text-[#5C6B73]">
                    Guided by an independent Medical Advisory Board ensuring institutional compliance and ethics.
                  </p>
                </div>

                <div className="group overflow-hidden rounded-4xl bg-white p-4 shadow-2xl border border-gray-100">
                  <img
                    src={ABOUT_DETAIL_IMAGES.research.organizationChart}
                    alt="Organizational Structure"
                    className="h-80 w-full object-cover rounded-3xl transition duration-500 group-hover:scale-102"
                  />
                  <div className="p-6 text-center sm:text-left">
                    <h4 className="text-lg font-bold text-[#253237]">
                      Medical Governance & Quality Assurance
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#5C6B73]">
                      Our governance structure consists of the Board of Directors, Department Heads, Ethics Committee, and Quality Auditors who meet monthly to maintain peak clinical standards across all departments.
                    </p>
                  </div>
                </div>
              </section>

              {/* ================= CLINICAL STATS STRIP ================= */}
              <section id="stats" className="scroll-mt-28">
                <div className="rounded-4xl bg-[#253237] p-8 sm:p-12 text-white shadow-2xl">
                  <div className="mb-8 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#9DB4C0]">
                      Proven Milestones
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-white">
                      Research Impact & Achievements
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {CLINIC_STATS.map((stat, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white/5 p-6 border border-white/10 text-center"
                      >
                        <p className="text-3xl font-bold text-[#E0FBFC] sm:text-4xl">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-[#9DB4C0]">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ================= BOTTOM CTA ================= */}
              <section className="pt-8">
                <div className="relative overflow-hidden rounded-4xl px-8 py-16 text-center shadow-2xl md:px-20">
                  <img
                    src={CTA_IMAGES.background}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#5C6B73]/90 to-[#9DB4C0]/95" />

                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                      Partner with Saviours Research
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-[#E0FBFC]">
                      Schedule a meeting with our medical board for research inquiries or patient consultations.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <button
                        onClick={() => setIsBookingOpen(true)}
                        className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#253237] shadow-xl transition hover:scale-105 hover:bg-[#E0FBFC]"
                      >
                        Book Consultation
                      </button>
                      <RouterLink
                        to="/contact"
                        className="rounded-xl border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-[#253237]"
                      >
                        Contact Clinic
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default ResearchOrganization;
