import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createAppointment } from "../../features/appointment/appointmentSlice";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaArrowLeft,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ReviewAndBookStep = ({ profile, scheduleData, onBack, onComplete }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.appointment);

  const handleBookNow = async () => {
    if (!profile || !scheduleData) return;

    const payload = {
      patientProfileId: profile._id,
      patientName: profile.fullName,
      patientEmail: profile.email,
      patientPhone: profile.phone,
      patientAge: profile.age,
      gender: profile.gender,
      specialization: scheduleData.specialization,
      doctor: scheduleData.doctor && scheduleData.doctor.trim() !== "" ? scheduleData.doctor : undefined,
      appointmentDate: scheduleData.appointmentDate,
      appointmentTime: scheduleData.appointmentTime,
      reason: scheduleData.reason,
    };

    const res = await dispatch(createAppointment(payload));
    if (createAppointment.fulfilled.match(res)) {
      toast.success("Appointment request submitted successfully!");
      onComplete();
    } else {
      toast.error(res.payload || "Failed to submit appointment request");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E0FBFC] mb-4 shadow-lg">
          <FaCheckCircle className="text-2xl text-emerald-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E0FBFC] tracking-tight">
          Review & Confirm Booking
        </h2>
        <p className="mt-2 text-sm text-[#9DB4C0]">
          Please review the patient details and appointment summary before submitting your request.
        </p>
      </div>

      <div className="space-y-6 bg-transparent p-0 border-0 shadow-none">
        {/* Patient Profile Card */}
        <div className="bg-black/40 p-6 rounded-2xl border border-white/20">
          <div className="flex items-center space-x-3 text-[#C2DFE3] mb-4 font-semibold text-sm border-b border-[#253237] pb-3">
            <FaUser className="text-[#C2DFE3]" />
            <span className="uppercase tracking-wider">Patient Identity</span>
            <span className="ml-auto text-xs bg-[#253237] text-[#E0FBFC] px-3 py-1 rounded-full border border-[#5C6B73]/50 capitalize">
              {profile.relationship === "child" && profile.childLabel ? profile.childLabel : profile.relationship}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-[#5C6B73] block text-[11px] uppercase">Full Name</span>
              <span className="text-[#E0FBFC] font-semibold">{profile.fullName}</span>
            </div>

            <div>
              <span className="text-[#5C6B73] block text-[11px] uppercase">Phone Number</span>
              <span className="text-[#E0FBFC] font-semibold">{profile.phone}</span>
            </div>

            <div>
              <span className="text-[#5C6B73] block text-[11px] uppercase">Age / Gender</span>
              <span className="text-[#E0FBFC] font-semibold">{profile.age} yrs • {profile.gender}</span>
            </div>

            <div>
              <span className="text-[#5C6B73] block text-[11px] uppercase">Verified Email</span>
              <span className="text-[#E0FBFC] font-semibold">{profile.email}</span>
            </div>
          </div>
        </div>

        {/* Appointment Schedule Details */}
        <div className="bg-[#16222a] p-6 rounded-2xl border border-[#253237]">
          <div className="flex items-center space-x-3 text-[#C2DFE3] mb-4 font-semibold text-sm border-b border-[#253237] pb-3">
            <FaStethoscope className="text-[#C2DFE3]" />
            <span className="uppercase tracking-wider">Consultation Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-[#5C6B73] block text-[11px] uppercase">Department</span>
              <span className="text-[#E0FBFC] font-semibold">{scheduleData.specialization}</span>
            </div>

            <div>
              <span className="text-[#5C6B73] block text-[11px] uppercase">Assigned Doctor</span>
              <span className="text-[#E0FBFC] font-semibold">
                {scheduleData.selectedDoctorObj ? `Dr. ${scheduleData.selectedDoctorObj.fullName}` : "Any Available Specialist"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-[#5C6B73]" />
              <div>
                <span className="text-[#5C6B73] block text-[11px] uppercase">Date</span>
                <span className="text-[#E0FBFC] font-semibold">{scheduleData.appointmentDate}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <FaClock className="text-[#5C6B73]" />
              <div>
                <span className="text-[#5C6B73] block text-[11px] uppercase">Time Slot</span>
                <span className="text-[#E0FBFC] font-semibold">{scheduleData.appointmentTime}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#253237] text-xs">
            <span className="text-[#5C6B73] block text-[11px] uppercase mb-1">Reason for Visit</span>
            <p className="text-[#9DB4C0] italic bg-[#0f171c] p-3 rounded-xl border border-[#253237]">
              "{scheduleData.reason}"
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/30 p-4 rounded-xl border border-emerald-900/50">
          <FaShieldAlt className="text-base flex-shrink-0" />
          <span>Your request will be immediately routed to the department doctors for confirmation.</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#253237]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 text-xs text-[#C2DFE3] hover:underline"
          >
            <FaArrowLeft />
            <span>Back to Schedule</span>
          </button>

          <button
            type="button"
            onClick={handleBookNow}
            disabled={loading}
            className="py-4 px-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-xl border border-emerald-400/30 transition duration-300 flex items-center space-x-2 text-base disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Submitting Request...</span>
              </span>
            ) : (
              <>
                <FaCheckCircle className="text-lg" />
                <span>Confirm & Book Appointment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewAndBookStep;
