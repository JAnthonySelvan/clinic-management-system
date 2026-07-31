import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MapPin, PhoneCall, MailCheck, Clock, Send, Sparkles, User, Mail, Phone, Tag, MessageSquare, ArrowRight } from "lucide-react";

import { submitContactMessage } from "../../features/contact/contactService";
import AnimatedSection from "../../components/AnimatedSection";
import { HERO_IMAGES, CONTACT_IMAGES, CTA_IMAGES } from "../../constants/images";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await submitContactMessage(data);
      toast.success("Message sent successfully! Our team will contact you soon.");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      image: CONTACT_IMAGES.address,
      title: "Clinic Address",
      lines: ["123 Healthcare Avenue", "Madurai, Tamil Nadu 625001", "India"],
    },
    {
      icon: PhoneCall,
      image: CONTACT_IMAGES.phone,
      title: "Phone Support",
      lines: ["+91 98765 43210", "+91 98765 12345"],
    },
    {
      icon: MailCheck,
      image: CONTACT_IMAGES.email,
      title: "Email Address",
      lines: ["info@savioursclinic.com", "support@savioursclinic.com"],
    },
    {
      icon: Clock,
      image: CONTACT_IMAGES.hours,
      title: "Working Hours",
      lines: ["Monday – Saturday", "8:00 AM – 8:00 PM", "Sunday Closed"],
    },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-32 sm:py-40">
        <img
          src={HERO_IMAGES.contact}
          alt="Contact ApexHealth"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-900/85 to-[#5C6B73]/75" />

        <AnimatedSection
          direction="up"
          className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        >
          <span className="inline-flex items-center space-x-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-300 border border-teal-400/30 backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Get In Touch</span>
          </span>

          <h1 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight">
            We'd Love to Hear From You
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Have questions, need assistance, or want to schedule a visit? Our friendly reception team is here to support you.
          </p>
        </AnimatedSection>
      </section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <AnimatedSection as="section" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Reach Us Directly
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Contact Information
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Multiple ways to connect with our clinical support team.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <AnimatedSection
                  key={index}
                  delay={index * 100}
                  className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-b from-slate-50/50 to-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-40 w-full overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-teal-600 backdrop-blur-xs shadow-md">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.lines.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= CONTACT FORM ================= */}
      <AnimatedSection as="section" id="contact-form" className="bg-slate-50/80 py-24 border-y border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Online Inquiry
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Send Us a Message
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
              Fill out the form below and our clinic reception will respond promptly.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-2xl ring-1 ring-slate-900/5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    />
                    <User className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    />
                    <Mail className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    />
                    <Phone className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="General Inquiry"
                      {...register("subject", { required: "Subject is required" })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pl-11 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                    />
                    <Tag className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Your Message *
                </label>
                <div className="relative">
                  <textarea
                    rows={5}
                    placeholder="Write your message or health inquiry here..."
                    {...register("message", { required: "Message is required" })}
                    className="w-full rounded-xl border border-slate-300 p-4 pl-11 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                  <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                </div>
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-teal-600 py-4 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition duration-300 hover:bg-teal-700 disabled:opacity-70"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= GOOGLE MAP ================= */}
      <AnimatedSection as="section" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Clinic Location
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Visit Our Facilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Conveniently located with accessible parking and public transit options.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-900/10">
            <iframe
              title="Clinic Location Map"
              src="https://www.google.com/maps?q=Madurai,Tamil%20Nadu&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              className="border-0"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* ================= BUSINESS HOURS ================= */}
      <AnimatedSection as="section" className="bg-slate-50/80 py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Operating Hours
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Clinic Working Schedule
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Our clinic operates 6 days a week with emergency services available.
            </p>
          </div>

          <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-900/5">
            <div className="divide-y divide-slate-100 text-sm">
              {[
                { day: "Monday", hours: "8:00 AM – 8:00 PM", active: true },
                { day: "Tuesday", hours: "8:00 AM – 8:00 PM", active: true },
                { day: "Wednesday", hours: "8:00 AM – 8:00 PM", active: true },
                { day: "Thursday", hours: "8:00 AM – 8:00 PM", active: true },
                { day: "Friday", hours: "8:00 AM – 8:00 PM", active: true },
                { day: "Saturday", hours: "9:00 AM – 6:00 PM", active: true },
                { day: "Sunday", hours: "Emergency Only / Closed", active: false },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-8 py-5 ${
                    !item.active ? "bg-slate-900 text-white" : "hover:bg-slate-50/80"
                  }`}
                >
                  <span className="font-bold">{item.day}</span>
                  <span className={!item.active ? "text-teal-300 font-semibold" : "text-slate-600 font-medium"}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= FINAL CTA ================= */}
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
                Ready to Schedule a Consultation?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200">
                Book online or connect with our clinical support team today.
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

export default Contact;