import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaRegClock,
  FaCopy,
  FaArrowRight,
} from "react-icons/fa";

import { Sparkles } from "lucide-react";
import { submitContactMessage } from "../../features/contact/contactService";
import AnimatedSection from "../../components/AnimatedSection";
import { HERO_IMAGES, CONTACT_IMAGES, CTA_IMAGES } from "../../constants/images";

const getClinicStatus = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (day >= 1 && day <= 5) {
    // Mon - Fri: 8:00 AM (480 mins) to 8:00 PM (1200 mins)
    const openTime = 8 * 60;
    const closeTime = 20 * 60;
    if (currentMinutes >= openTime && currentMinutes < closeTime) {
      return {
        isOpen: true,
        text: "Open Now — Closes at 8:00 PM",
      };
    } else if (currentMinutes < openTime) {
      return {
        isOpen: false,
        text: "Currently Closed — Opens today at 8:00 AM",
      };
    } else {
      const nextDay = day === 5 ? "Saturday at 9:00 AM" : "tomorrow at 8:00 AM";
      return {
        isOpen: false,
        text: `Currently Closed — Opens ${nextDay}`,
      };
    }
  } else if (day === 6) {
    // Sat: 9:00 AM (540 mins) to 6:00 PM (1080 mins)
    const openTime = 9 * 60;
    const closeTime = 18 * 60;
    if (currentMinutes >= openTime && currentMinutes < closeTime) {
      return {
        isOpen: true,
        text: "Open Now — Closes at 6:00 PM",
      };
    } else if (currentMinutes < openTime) {
      return {
        isOpen: false,
        text: "Currently Closed — Opens today at 9:00 AM",
      };
    } else {
      return {
        isOpen: false,
        text: "Currently Closed — Opens Monday at 8:00 AM",
      };
    }
  } else {
    // Sunday: Closed
    return {
      isOpen: false,
      text: "Currently Closed — Opens Monday at 8:00 AM",
    };
  }
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [clinicStatus, setClinicStatus] = useState(getClinicStatus());
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const initialSubject = searchParams.get("subject") || "";
  const initialMessage = searchParams.get("message") || "";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: initialSubject,
      message: initialMessage,
    },
  });

  useEffect(() => {
    if (initialSubject) setValue("subject", initialSubject);
    if (initialMessage) setValue("message", initialMessage);
  }, [initialSubject, initialMessage, setValue]);

  useEffect(() => {
    const timer = setInterval(() => {
      setClinicStatus(getClinicStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await submitContactMessage(data);
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, label, e) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } else {
      toast.error("Clipboard copy not supported on this browser.");
    }
  };

  const currentDayNum = new Date().getDay();

  const schedule = [
    { day: "Monday", hours: "8:00 AM – 8:00 PM", dayNum: 1 },
    { day: "Tuesday", hours: "8:00 AM – 8:00 PM", dayNum: 2 },
    { day: "Wednesday", hours: "8:00 AM – 8:00 PM", dayNum: 3 },
    { day: "Thursday", hours: "8:00 AM – 8:00 PM", dayNum: 4 },
    { day: "Friday", hours: "8:00 AM – 8:00 PM", dayNum: 5 },
    { day: "Saturday", hours: "9:00 AM – 6:00 PM", dayNum: 6 },
    { day: "Sunday", hours: "Closed", dayNum: 0 },
  ];

  return (
    <>
      {/* ================= HERO (PREMIUM RECONSTRUCTION) ================= */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center py-24 lg:py-32">
        <img
          src={HERO_IMAGES.contact}
          alt="Contact our clinic"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#182329]/95 via-[#253237]/85 to-[#1c282e]/90 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent pointer-events-none" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-5xl px-6 text-center lg:px-8 z-10 space-y-6 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide text-teal-200 backdrop-blur-md shadow-xl">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>24/7 Patient Support & Inquiry</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            We'd Love to{" "}
            <span className="bg-gradient-to-r from-teal-200 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl font-light leading-relaxed text-gray-200">
            Have questions, need assistance, or want to schedule a visit? Our
            friendly team is here to help. Reach out to us using the contact
            information below or send us a message directly.
          </p>
        </AnimatedSection>
      </section>

      {/* ================= CONTACT INFO (FULL-BLEED IMAGE CARDS WITH HOVER OVERLAY REVEAL) ================= */}

      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Contact Information
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Get in Touch
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              We are always here to help. Hover or tap any card below to view
              and copy our direct contact details.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. Address Card */}
            <AnimatedSection delay={0} className="w-full">
              <div
                onClick={() =>
                  setActiveCardIndex(activeCardIndex === 0 ? null : 0)
                }
                className="group relative block h-84 w-full overflow-hidden rounded-4xl bg-[#253237] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ring-1 ring-gray-200/50 cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-[#253237]">
                  <img
                    src={CONTACT_IMAGES.address}
                    alt="Clinic Address"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/45 to-transparent transition-opacity duration-500 group-hover:from-[#253237]" />
                </div>

                {/* Base Card Content */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 flex flex-col justify-end">
                  <span className="inline-block self-start rounded-full bg-[#E0FBFC]/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#253237] mb-2 shadow-xs">
                    Location
                  </span>
                  <h3 className="text-2xl font-bold text-white font-poppins tracking-tight leading-tight">
                    Our Address
                  </h3>
                  <p className="mt-2 text-xs text-[#E0FBFC]/80">
                    Hover or tap to view location →
                  </p>
                </div>

                {/* Hover Pop-Out Overlay Panel */}
                <div
                  className={`absolute inset-0 z-20 bg-[#253237] text-white p-7 rounded-4xl shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out ${
                    activeCardIndex === 0
                      ? "translate-y-0"
                      : "translate-y-full group-hover:translate-y-0"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                      <FaMapMarkerAlt className="text-xl text-[#E0FBFC]" />
                      <h4 className="text-lg font-bold text-white font-poppins">
                        Our Location
                      </h4>
                    </div>
                    <div className="text-sm leading-relaxed text-[#E0FBFC]/90 space-y-1">
                      <p className="font-semibold text-white">123 Healthcare Avenue</p>
                      <p>Madurai, Tamil Nadu</p>
                      <p>India — 625001</p>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps?q=Madurai,Tamil%20Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#253237] shadow-md transition duration-300 hover:bg-[#E0FBFC]"
                  >
                    <span>Get Directions</span>
                    <FaArrowRight className="text-[10px]" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* 2. Phone Card */}
            <AnimatedSection delay={100} className="w-full">
              <div
                onClick={() =>
                  setActiveCardIndex(activeCardIndex === 1 ? null : 1)
                }
                className="group relative block h-84 w-full overflow-hidden rounded-4xl bg-[#253237] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ring-1 ring-gray-200/50 cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-[#253237]">
                  <img
                    src={CONTACT_IMAGES.phone}
                    alt="Phone Helplines"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/45 to-transparent transition-opacity duration-500 group-hover:from-[#253237]" />
                </div>

                {/* Base Card Content */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 flex flex-col justify-end">
                  <span className="inline-block self-start rounded-full bg-[#E0FBFC]/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#253237] mb-2 shadow-xs">
                    24/7 Helpline
                  </span>
                  <h3 className="text-2xl font-bold text-white font-poppins tracking-tight leading-tight">
                    Phone Helplines
                  </h3>
                  <p className="mt-2 text-xs text-[#E0FBFC]/80">
                    Hover or tap to view numbers →
                  </p>
                </div>

                {/* Hover Pop-Out Overlay Panel */}
                <div
                  className={`absolute inset-0 z-20 bg-[#253237] text-white p-7 rounded-4xl shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out ${
                    activeCardIndex === 1
                      ? "translate-y-0"
                      : "translate-y-full group-hover:translate-y-0"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                      <FaPhoneAlt className="text-xl text-[#E0FBFC]" />
                      <h4 className="text-lg font-bold text-white font-poppins">
                        Call Us Directly
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Main Helpline", display: "+91 98765 43210", val: "+919876543210" },
                        { label: "Appointments", display: "+91 98765 12345", val: "+919876512345" },
                      ].map((phone, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10"
                        >
                          <div>
                            <p className="text-[10px] uppercase font-bold text-[#E0FBFC]/70">
                              {phone.label}
                            </p>
                            <a
                              href={`tel:${phone.val}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-bold text-white hover:text-[#E0FBFC] hover:underline"
                            >
                              {phone.display}
                            </a>
                          </div>
                          <button
                            type="button"
                            onClick={(e) =>
                              copyToClipboard(phone.display, phone.label, e)
                            }
                            title="Copy number"
                            className="p-2 rounded-lg bg-white/10 text-[#E0FBFC] hover:bg-white hover:text-[#253237] transition cursor-pointer"
                          >
                            <FaCopy className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="tel:+919876543210"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#253237] shadow-md transition duration-300 hover:bg-[#E0FBFC]"
                  >
                    <span>Call Main Line</span>
                    <FaArrowRight className="text-[10px]" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* 3. Email Card */}
            <AnimatedSection delay={200} className="w-full">
              <div
                onClick={() =>
                  setActiveCardIndex(activeCardIndex === 2 ? null : 2)
                }
                className="group relative block h-84 w-full overflow-hidden rounded-4xl bg-[#253237] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ring-1 ring-gray-200/50 cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-[#253237]">
                  <img
                    src={CONTACT_IMAGES.email}
                    alt="Email Contact"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/45 to-transparent transition-opacity duration-500 group-hover:from-[#253237]" />
                </div>

                {/* Base Card Content */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 flex flex-col justify-end">
                  <span className="inline-block self-start rounded-full bg-[#E0FBFC]/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#253237] mb-2 shadow-xs">
                    Online Support
                  </span>
                  <h3 className="text-2xl font-bold text-white font-poppins tracking-tight leading-tight">
                    Email Support
                  </h3>
                  <p className="mt-2 text-xs text-[#E0FBFC]/80">
                    Hover or tap to view emails →
                  </p>
                </div>

                {/* Hover Pop-Out Overlay Panel */}
                <div
                  className={`absolute inset-0 z-20 bg-[#253237] text-white p-7 rounded-4xl shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out ${
                    activeCardIndex === 2
                      ? "translate-y-0"
                      : "translate-y-full group-hover:translate-y-0"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                      <FaEnvelope className="text-xl text-[#E0FBFC]" />
                      <h4 className="text-lg font-bold text-white font-poppins">
                        Email Desk
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "General Enquiries", display: "info@savioursclinic.com" },
                        { label: "Patient Support", display: "support@savioursclinic.com" },
                      ].map((email, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10"
                        >
                          <div className="truncate max-w-[170px]">
                            <p className="text-[10px] uppercase font-bold text-[#E0FBFC]/70">
                              {email.label}
                            </p>
                            <a
                              href={`mailto:${email.display}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-bold text-white hover:text-[#E0FBFC] hover:underline truncate block"
                            >
                              {email.display}
                            </a>
                          </div>
                          <button
                            type="button"
                            onClick={(e) =>
                              copyToClipboard(email.display, email.label, e)
                            }
                            title="Copy email"
                            className="p-2 rounded-lg bg-white/10 text-[#E0FBFC] hover:bg-white hover:text-[#253237] transition cursor-pointer shrink-0"
                          >
                            <FaCopy className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#contact-form"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#253237] shadow-md transition duration-300 hover:bg-[#E0FBFC]"
                  >
                    <span>Send Message</span>
                    <FaArrowRight className="text-[10px]" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* 4. Working Hours Summary Card */}
            <AnimatedSection delay={300} className="w-full">
              <div
                onClick={() =>
                  setActiveCardIndex(activeCardIndex === 3 ? null : 3)
                }
                className="group relative block h-84 w-full overflow-hidden rounded-4xl bg-[#253237] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ring-1 ring-gray-200/50 cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-[#253237]">
                  <img
                    src={CONTACT_IMAGES.hours}
                    alt="Operating Hours"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#253237]/95 via-[#253237]/45 to-transparent transition-opacity duration-500 group-hover:from-[#253237]" />
                </div>

                {/* Base Card Content */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 flex flex-col justify-end">
                  <span className="inline-block self-start rounded-full bg-[#E0FBFC]/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#253237] mb-2 shadow-xs">
                    Schedule
                  </span>
                  <h3 className="text-2xl font-bold text-white font-poppins tracking-tight leading-tight">
                    Operating Hours
                  </h3>
                  <p className="mt-2 text-xs text-[#E0FBFC]/80">
                    Hover or tap to view schedule →
                  </p>
                </div>

                {/* Hover Pop-Out Overlay Panel */}
                <div
                  className={`absolute inset-0 z-20 bg-[#253237] text-white p-7 rounded-4xl shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out ${
                    activeCardIndex === 3
                      ? "translate-y-0"
                      : "translate-y-full group-hover:translate-y-0"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                      <FaClock className="text-xl text-[#E0FBFC]" />
                      <h4 className="text-lg font-bold text-white font-poppins">
                        Weekly Timings
                      </h4>
                    </div>

                    <div className="space-y-2 text-xs leading-relaxed text-[#E0FBFC]/90 font-medium">
                      <div className="flex justify-between border-b border-white/10 pb-1.5">
                        <span>Monday – Friday:</span>
                        <span className="font-bold text-white">8:00 AM – 8:00 PM</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-1.5">
                        <span>Saturday:</span>
                        <span className="font-bold text-white">9:00 AM – 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-bold text-rose-400">Closed</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="/appointment"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#253237] shadow-md transition duration-300 hover:bg-[#E0FBFC]"
                  >
                    <span>Book Appointment</span>
                    <FaArrowRight className="text-[10px]" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= CONTACT FORM ================= */}

      <AnimatedSection
        as="section"
        id="contact-form"
        className="bg-[#F8FBFC] py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Send a Message
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              We'd Love to Hear From You
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Have a question or need assistance? Fill out the form below and
              our team will get back to you as soon as possible.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-2xl border border-gray-100">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-6 md:grid-cols-2"
            >
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("phone")}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />

                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  {...register("message", {
                    required: "Message is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                ></textarea>

                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 rounded-xl bg-[#253237] py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#5C6B73] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= GOOGLE MAP ================= */}

      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Find Us
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              Visit Our Clinic
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Conveniently located and easy to reach. Use the map below to find
              our clinic and plan your visit.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-100">
            <iframe
              title="Clinic Location"
              src="https://www.google.com/maps?q=Madurai,Tamil%20Nadu&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= BUSINESS HOURS (REAL-TIME STATUS SCHEDULE) ================= */}

      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Working Hours
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237] font-poppins">
              We're Here When You Need Us
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Our clinic is open throughout the week to provide quality
              healthcare. Check our operating hours before planning your visit.
            </p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-4xl bg-white shadow-2xl border border-gray-100">
            {/* Header Bar with Live Open/Closed Status Badge */}
            <div className="bg-[#253237] text-white px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <FaRegClock className="text-2xl text-[#E0FBFC]" />
                <div>
                  <h3 className="text-2xl font-bold font-poppins">Working Hours</h3>
                  <p className="text-xs text-[#E0FBFC]/80 mt-0.5">
                    Real-time clinic operating schedule
                  </p>
                </div>
              </div>

              {/* Live Status Badge */}
              <div className="self-start sm:self-auto">
                {clinicStatus.isOpen ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{clinicStatus.text}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3.5 py-1 text-xs font-semibold text-rose-300 border border-rose-500/30">
                    <span className="h-2 w-2 rounded-full bg-rose-400" />
                    <span>{clinicStatus.text}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Weekly Schedule Rows */}
            <div className="divide-y divide-gray-100">
              {schedule.map((item) => {
                const isToday = item.dayNum === currentDayNum;
                const isClosed = item.hours === "Closed";

                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between px-8 py-5 transition-colors duration-200 hover:bg-[#F8FBFC] ${
                      isToday
                        ? "bg-[#F8FBFC] border-l-4 border-[#253237]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-base ${
                          isToday
                            ? "font-bold text-[#253237]"
                            : "font-semibold text-[#253237]"
                        }`}
                      >
                        {item.day}
                      </span>
                      {isToday && (
                        <span className="rounded-full bg-[#9DB4C0]/30 text-[#253237] text-xs px-2.5 py-0.5 font-bold border border-[#9DB4C0]/40">
                          Today
                        </span>
                      )}
                    </div>

                    {isClosed ? (
                      <span className="rounded-full bg-rose-50 text-rose-600 border border-rose-100 px-3.5 py-1 text-xs font-bold">
                        Closed
                      </span>
                    ) : (
                      <span
                        className={`text-sm ${
                          isToday
                            ? "font-bold text-[#253237]"
                            : "text-[#5C6B73] font-medium"
                        }`}
                      >
                        {item.hours}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reassuring 24/7 Emergency Footer Strip */}
            <div className="bg-[#F8FBFC] px-8 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C6B73]">
              <p className="text-center sm:text-left">
                Emergency services available 24/7 — call urgent care outside working hours.
              </p>
              <a
                href="tel:+919876543210"
                className="font-bold text-[#253237] hover:text-[#5C6B73] transition-colors underline decoration-[#9DB4C0] underline-offset-4 shrink-0"
              >
                Call Emergency: +91 98765 43210 →
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= FINAL CTA ================= */}

      <AnimatedSection as="section" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-4xl px-8 py-16 text-center shadow-2xl md:px-20">
            {/* Background Image */}
            <img
              src={CTA_IMAGES.background}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-linear-to-r from-[#253237]/90 via-[#5C6B73]/85 to-[#9DB4C0]/90" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white md:text-5xl font-poppins">
                Your Health Is Our Priority
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
                Whether you need a routine consultation, have questions about
                our services, or want to book an appointment, our team is ready
                to assist you. We look forward to caring for you and your
                family.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/appointment"
                  className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#253237] transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Book Appointment
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
        </div>
      </AnimatedSection>
    </>
  );
};

export default Contact;