import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";

import {
  createAppointment,
  clearAppointmentError,
  resetAppointmentSuccess,
} from "../../features/appointment/appointmentSlice";
import AnimatedSection from "../../components/AnimatedSection";
import SlotPicker from "../../components/SlotPicker";
import { HERO_IMAGES, GUIDELINE_IMAGES,CTA_IMAGES } from "../../constants/images";

const SPECIALIZATIONS = [
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "General Physician",
  "Dentist",
];

const Appointment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { doctors } = useAppSelector((state) => state.doctor);

  const { loading, success, error } = useAppSelector(
    (state) => state.appointment,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      patientAge: "",
      gender: "",
      specialization: "Cardiology",
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: "",
      reason: "",
    },
  });

  const selectedSpecialization = watch("specialization");
  const selectedDate = watch("appointmentDate");
  const selectedTime = watch("appointmentTime");

  useEffect(() => {
    dispatch(fetchPublicDoctors());
  }, [dispatch]);


  useEffect(() => {
    if (success) {
      toast.success("Appointment booked successfully");

      reset();

      dispatch(resetAppointmentSuccess());

      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearAppointmentError());
    }
  }, [success, error, dispatch, navigate, reset]);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    await dispatch(createAppointment(data));
  };

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">
        <img
          src={HERO_IMAGES.appointment}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237]/95 via-[#253237]/85 to-[#5c6b73]/70" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E0FBFC]">
              Appointment
            </span>

            <h1 className="mt-4 text-5xl font-bold text-white md:text-6xl">
              Book Your Appointment
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
              Schedule an appointment with our experienced medical
              professionals. We are committed to providing timely,
              compassionate, and personalized healthcare for you and your
              family.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ================= APPOINTMENT FORM ================= */}

      <AnimatedSection as="section" className="py-24">
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Patient Name */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("patientName", {
                    required: "Patient name is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />
                {errors.patientName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.patientName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("patientEmail", {
                    required: "Email is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />
                {errors.patientEmail && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.patientEmail.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("patientPhone", {
                    required: "Phone number is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />
                {errors.patientPhone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.patientPhone.message}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <input
                  type="number"
                  placeholder="Age"
                  {...register("patientAge", {
                    required: "Age is required",
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />
                {errors.patientAge && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.patientAge.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <select
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Specialization / Medical Department */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Medical Specialization / Department *
                </label>
                <select
                  {...register("specialization", {
                    required: "Specialization is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                >
                  <option value="">Select Medical Department</option>
                  {SPECIALIZATIONS.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>

                {errors.specialization && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.specialization.message}
                  </p>
                )}
              </div>

              {/* Appointment Date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Appointment Date *
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("appointmentDate", {
                    required: "Appointment date is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />

                {errors.appointmentDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.appointmentDate.message}
                  </p>
                )}
              </div>

              {/* Interactive Time Slot Picker */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select Available Time Slot *
                </label>
                <input
                  type="hidden"
                  {...register("appointmentTime", {
                    required: "Please select an available time slot",
                  })}
                />
                <SlotPicker
                  specialization={selectedSpecialization}
                  selectedDate={selectedDate}
                  selectedSlot={selectedTime || ""}
                  onSelectSlot={(slot) =>
                    setValue("appointmentTime", slot, { shouldValidate: true })
                  }
                />
                {errors.appointmentTime && (
                  <p className="mt-2 text-sm font-semibold text-red-500">
                    {errors.appointmentTime.message}
                  </p>
                )}
              </div>


              {/* Reason */}
              <div className="md:col-span-2">
                <textarea
                  rows={5}
                  placeholder="Describe your health concern..."
                  {...register("reason", {
                    required: "Reason is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#253237]"
                />

                {errors.reason && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 rounded-xl bg-[#253237] py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#5C6B73] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Booking..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </div>
      </AnimatedSection>

      {/* ================= APPOINTMENT GUIDELINES ================= */}

      <AnimatedSection as="section" className="bg-[#F8FBFC] py-24">
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
            {[
              {
                image: GUIDELINE_IMAGES.schedule,
                title: "Schedule in Advance",
                description:
                  "Book your appointment early to get your preferred doctor and time slot.",
              },
              {
                image: GUIDELINE_IMAGES.identification,
                title: "Bring Identification",
                description:
                  "Carry a valid ID and any previous medical reports during your visit.",
              },
              {
                image: GUIDELINE_IMAGES.arriveEarly,
                title: "Arrive Early",
                description:
                  "Reach the clinic at least 15 minutes before your scheduled appointment.",
              },
              {
                image: GUIDELINE_IMAGES.medicalHistory,
                title: "Medical History",
                description:
                  "Inform your doctor about your medications, allergies, and medical history.",
              },
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
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

      {/* ================= FAQ ================= */}

      <AnimatedSection as="section" className="py-24">
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
            {[
              {
                question: "How do I book an appointment?",
                answer:
                  "Complete the appointment form with your details, choose your preferred department, doctor, and appointment date, then submit your request.",
              },
              {
                question: "Will I receive confirmation?",
                answer:
                  "Yes. After reviewing your request, our staff will confirm your appointment using your registered contact details.",
              },
              {
                question: "Can I reschedule my appointment?",
                answer:
                  "Yes. Please contact our clinic before your scheduled appointment to request a new date and time.",
              },
              {
                question: "What should I bring for my visit?",
                answer:
                  "Bring a valid ID, previous medical records (if any), prescriptions, and insurance details if applicable.",
              },
            ].map((faq, index) => (
              <AnimatedSection
                key={index}
                delay={index * 100}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-[#253237]">
                  {faq.question}
                </h3>

                <p className="mt-3 leading-7 text-[#5C6B73]">{faq.answer}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================= APPOINTMENT CTA ================= */}

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
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Your Health Is Our Priority
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E0FBFC]">
                Our experienced doctors are here to provide trusted medical care
                for you and your family. Book your appointment today and take
                the first step toward better health.
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

export default Appointment;
