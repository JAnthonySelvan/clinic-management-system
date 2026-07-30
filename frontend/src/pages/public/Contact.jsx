import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

import { submitContactMessage } from "../../features/contact/contactService";

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
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#E0FBFC]">
            Contact Us
          </span>

          <h1 className="mt-4 text-5xl font-bold text-white md:text-6xl">
            We'd Love to Hear From You
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
            Have questions, need assistance, or want to schedule a visit? Our
            friendly team is here to help. Reach out to us using the contact
            information below or send us a message directly.
          </p>
        </div>
      </section>
      {/* ================= CONTACT INFO ================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Contact Information
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Get in Touch
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              We are always here to help. Reach us through any of the following
              contact methods.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Address */}

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">📍</div>

              <h3 className="text-2xl font-bold text-[#253237]">Address</h3>

              <p className="mt-4 leading-7 text-[#5C6B73]">
                123 Healthcare Avenue
                <br />
                Madurai, Tamil Nadu
                <br />
                India
              </p>
            </div>

            {/* Phone */}

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">📞</div>

              <h3 className="text-2xl font-bold text-[#253237]">Phone</h3>

              <p className="mt-4 leading-7 text-[#5C6B73]">
                +91 98765 43210
                <br />
                +91 98765 12345
              </p>
            </div>

            {/* Email */}

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">📧</div>

              <h3 className="text-2xl font-bold text-[#253237]">Email</h3>

              <p className="mt-4 leading-7 text-[#5C6B73]">
                info@savioursclinic.com
                <br />
                support@savioursclinic.com
              </p>
            </div>

            {/* Working Hours */}

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">🕒</div>

              <h3 className="text-2xl font-bold text-[#253237]">
                Working Hours
              </h3>

              <p className="mt-4 leading-7 text-[#5C6B73]">
                Monday – Saturday
                <br />
                8:00 AM – 8:00 PM
                <br />
                Sunday Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}

      <section id="contact-form" className="bg-[#F8FBFC] py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Send a Message
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              We'd Love to Hear From You
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Have a question or need assistance? Fill out the form below and
              our team will get back to you as soon as possible.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-2xl">
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
                className="md:col-span-2 rounded-xl bg-[#253237] py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#5C6B73] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= GOOGLE MAP ================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Find Us
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              Visit Our Clinic
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Conveniently located and easy to reach. Use the map below to find
              our clinic and plan your visit.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-2xl">
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
      </section>

      {/* ================= BUSINESS HOURS ================= */}

      <section className="bg-[#F8FBFC] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#5C6B73]">
              Working Hours
            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              We're Here When You Need Us
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5C6B73]">
              Our clinic is open throughout the week to provide quality
              healthcare. Check our operating hours before planning your visit.
            </p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="divide-y divide-gray-200">
              <div className="flex items-center justify-between px-8 py-6">
                <span className="font-semibold text-[#253237]">Monday</span>
                <span className="text-[#5C6B73]">8:00 AM – 8:00 PM</span>
              </div>

              <div className="flex items-center justify-between px-8 py-6">
                <span className="font-semibold text-[#253237]">Tuesday</span>
                <span className="text-[#5C6B73]">8:00 AM – 8:00 PM</span>
              </div>

              <div className="flex items-center justify-between px-8 py-6">
                <span className="font-semibold text-[#253237]">Wednesday</span>
                <span className="text-[#5C6B73]">8:00 AM – 8:00 PM</span>
              </div>

              <div className="flex items-center justify-between px-8 py-6">
                <span className="font-semibold text-[#253237]">Thursday</span>
                <span className="text-[#5C6B73]">8:00 AM – 8:00 PM</span>
              </div>

              <div className="flex items-center justify-between px-8 py-6">
                <span className="font-semibold text-[#253237]">Friday</span>
                <span className="text-[#5C6B73]">8:00 AM – 8:00 PM</span>
              </div>

              <div className="flex items-center justify-between px-8 py-6">
                <span className="font-semibold text-[#253237]">Saturday</span>
                <span className="text-[#5C6B73]">9:00 AM – 6:00 PM</span>
              </div>

              <div className="flex items-center justify-between bg-[#253237] px-8 py-6">
                <span className="font-semibold text-white">Sunday</span>
                <span className="font-semibold text-[#E0FBFC]">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-4xl bg-linear-to-r from-[#253237] via-[#5C6B73] to-[#9DB4C0] px-8 py-16 text-center shadow-2xl md:px-20">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E0FBFC]">
              Let's Connect
            </span>

            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Your Health Is Our Priority
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
              Whether you need a routine consultation, have questions about our
              services, or want to book an appointment, our team is ready to
              assist you. We look forward to caring for you and your family.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/appointment"
                className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#253237] transition duration-300 hover:scale-105"
              >
                Book Appointment
              </Link>

              <a
                href="#contact-form"
                className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-white hover:text-[#253237]"
              >
                Send a Message
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
