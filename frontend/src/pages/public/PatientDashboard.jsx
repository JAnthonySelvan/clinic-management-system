import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchFamilyProfiles, fetchPatientHistory } from "../../features/patientProfile/patientProfileSlice";
import { logoutOtp } from "../../features/otp/otpSlice";
import EmailStep from "../../components/booking-wizard/EmailStep";
import OtpStep from "../../components/booking-wizard/OtpStep";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaChild,
  FaFilePdf,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FORMS_IMAGE } from "../../constants/images";
import PrescriptionViewerModal from "../../components/prescription/PrescriptionViewerModal";

const PatientDashboard = () => {
  const dispatch = useAppDispatch();
  const { otpToken, email: verifiedEmail } = useAppSelector((state) => state.otp);
  const { familyProfiles, history, loading } = useAppSelector((state) => state.patientProfile);

  const [inlineAuthStep, setInlineAuthStep] = useState("email"); // "email" | "otp"
  const [authEmail, setAuthEmail] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all" | profileId

  // Prescription Viewer State
  const [selectedAppointmentForViewer, setSelectedAppointmentForViewer] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const isVerified = Boolean(otpToken && verifiedEmail);

  useEffect(() => {
    if (isVerified) {
      dispatch(fetchFamilyProfiles());
      dispatch(fetchPatientHistory());
    }
  }, [isVerified, dispatch]);

  const handleEmailNext = (emailVal) => {
    setAuthEmail(emailVal);
    setInlineAuthStep("otp");
  };

  const handleOtpVerified = () => {
    dispatch(fetchFamilyProfiles());
    dispatch(fetchPatientHistory());
  };

  const handleLogout = () => {
    dispatch(logoutOtp());
  };

  // Compile family member list for tabs
  const members = [];
  if (familyProfiles) {
    if (familyProfiles.self) members.push({ id: familyProfiles.self._id, name: familyProfiles.self.fullName, label: "Me", doc: familyProfiles.self });
    if (familyProfiles.father) members.push({ id: familyProfiles.father._id, name: familyProfiles.father.fullName, label: "Father", doc: familyProfiles.father });
    if (familyProfiles.mother) members.push({ id: familyProfiles.mother._id, name: familyProfiles.mother.fullName, label: "Mother", doc: familyProfiles.mother });
    if (familyProfiles.wife) members.push({ id: familyProfiles.wife._id, name: familyProfiles.wife.fullName, label: "Wife", doc: familyProfiles.wife });
    if (Array.isArray(familyProfiles.children)) {
      familyProfiles.children.forEach((child) => {
        members.push({ id: child._id, name: child.fullName, label: child.childLabel || "Child", doc: child });
      });
    }
  }

  // Filter appointments for selected tab
  const filteredAppointments = history.filter((app) => {
    if (activeTab === "all") return true;
    if (app.patientProfile && app.patientProfile._id) {
      return app.patientProfile._id === activeTab;
    }
    return false;
  });

  const getStatusPill = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <FaCheckCircle className="text-xs" />
            <span>Approved</span>
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <FaHourglassHalf className="text-xs animate-spin-slow" />
            <span>Pending Review</span>
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <FaTimesCircle className="text-xs" />
            <span>Rejected</span>
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <FaCheckCircle className="text-xs" />
            <span>Completed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-400 border border-gray-500/30">
            <span>{status}</span>
          </span>
        );
    }
  };

  // If not OTP-verified, render OTP gate
  if (!isVerified) {
    return (
      <section className="relative overflow-hidden min-h-screen w-full flex items-center justify-center py-20 bg-[#080e12]">
        <img
          src={FORMS_IMAGE.MyAppointments}
          alt="My Appointments Background"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-40 contrast-110"
        />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="relative z-10 w-full max-w-xl px-4">
          {inlineAuthStep === "email" ? (
            <EmailStep onNext={handleEmailNext} />
          ) : (
            <OtpStep email={authEmail} onNext={handleOtpVerified} onBack={() => setInlineAuthStep("email")} />
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden min-h-screen w-full py-24 bg-[#080e12] text-[#E0FBFC]">
      <img
        src={FORMS_IMAGE.MyAppointments}
        alt="My Appointments Background"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center brightness-40 contrast-110"
      />
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f171c]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-[#253237] shadow-2xl mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#253237] text-[#C2DFE3] border border-[#5C6B73]">
                Patient Portal
              </span>
              <span className="text-xs text-[#9DB4C0]">{verifiedEmail}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E0FBFC]">
              My Family Appointments
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/appointment/book"
              className="px-5 py-3 bg-gradient-to-r from-[#253237] via-[#5C6B73] to-[#253237] hover:from-[#2c3d44] hover:to-[#2c3d44] text-[#E0FBFC] font-semibold text-xs sm:text-sm rounded-2xl border border-[#C2DFE3]/30 transition shadow flex items-center space-x-2"
            >
              <FaPlus />
              <span>Book Appointment</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-3 bg-[#16222a] hover:bg-rose-950/40 text-rose-400 text-xs sm:text-sm font-semibold rounded-2xl border border-[#253237] hover:border-rose-800 transition flex items-center space-x-1.5"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Member Filter Tabs */}
        {members.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition border ${
                activeTab === "all"
                  ? "bg-[#C2DFE3] text-[#253237] border-[#C2DFE3] shadow"
                  : "bg-[#0f171c] text-[#9DB4C0] border-[#253237] hover:border-[#5C6B73]"
              }`}
            >
              All Family ({history.length})
            </button>

            {members.map((m) => {
              const count = history.filter(
                (app) => app.patientProfile && app.patientProfile._id === m.id
              ).length;

              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center space-x-2 border ${
                    activeTab === m.id
                      ? "bg-[#C2DFE3] text-[#253237] border-[#C2DFE3] shadow"
                      : "bg-[#0f171c] text-[#9DB4C0] border-[#253237] hover:border-[#5C6B73]"
                  }`}
                >
                  <span>{m.name} ({m.label})</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#253237] text-[#E0FBFC]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Appointments Table / Cards */}
        {loading ? (
          <div className="text-center py-16 bg-[#0f171c]/90 rounded-3xl border border-[#253237]">
            <div className="w-8 h-8 border-3 border-[#C2DFE3] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-[#9DB4C0]">Loading appointment history...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-16 bg-[#0f171c]/90 rounded-3xl border border-[#253237] p-8">
            <FaCalendarAlt className="text-4xl text-[#5C6B73] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#E0FBFC]">No Appointments Found</h3>
            <p className="text-xs text-[#9DB4C0] mt-1 max-w-sm mx-auto">
              There are no appointment records for this family member yet.
            </p>
            <Link
              to="/appointment/book"
              className="inline-flex items-center space-x-2 mt-4 px-5 py-2.5 bg-[#253237] hover:bg-[#34454d] text-[#C2DFE3] text-xs font-semibold rounded-xl border border-[#C2DFE3]/30 transition"
            >
              <FaPlus />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((app) => {
              const dt = new Date(app.appointmentDateTime);
              const dateFormatted = app.appointmentDate
                ? new Date(`${app.appointmentDate}T00:00:00`).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : dt.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

              const formatSlotTimeUtc = (d) => {
                if (!d || isNaN(d.getTime())) return "";
                let hours = d.getUTCHours();
                const minutes = d.getUTCMinutes().toString().padStart(2, "0");
                const ampm = hours >= 12 ? "PM" : "AM";
                hours = hours % 12;
                hours = hours ? hours : 12;
                const formattedHours = hours.toString().padStart(2, "0");
                return `${formattedHours}:${minutes} ${ampm}`;
              };

              const timeFormatted = app.appointmentTime || formatSlotTimeUtc(dt);

              return (
                <div
                  key={app._id}
                  className="bg-[#0f171c]/90 backdrop-blur-xl p-6 rounded-2xl border border-[#253237] shadow-xl hover:border-[#5C6B73] transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-base font-bold text-[#E0FBFC]">
                        {app.patientName}
                      </span>
                      {app.patientProfile && (
                        <span className="text-[11px] font-semibold bg-[#253237] text-[#C2DFE3] px-2.5 py-0.5 rounded-full capitalize">
                          {app.patientProfile.relationship === "child" && app.patientProfile.childLabel
                            ? app.patientProfile.childLabel
                            : app.patientProfile.relationship}
                        </span>
                      )}
                      <div>{getStatusPill(app.status)}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#9DB4C0]">
                      <div className="flex items-center space-x-1.5">
                        <FaStethoscope className="text-[#C2DFE3]" />
                        <span>{app.specialization}</span>
                        {app.doctor && (
                          <strong className="text-[#E0FBFC]">
                            (Dr. {app.doctor.fullName || app.doctor.name})
                          </strong>
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <FaCalendarAlt className="text-[#C2DFE3]" />
                        <span>{dateFormatted}</span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <FaClock className="text-[#C2DFE3]" />
                        <span>{timeFormatted}</span>
                      </div>
                    </div>

                    {app.reason && (
                      <p className="text-xs text-[#9DB4C0] italic bg-[#16222a] p-2.5 rounded-xl border border-[#253237]/60 mt-2 max-w-2xl">
                        "{app.reason}"
                      </p>
                    )}

                    {app.status === "Rejected" && app.rejectionReason && (
                      <p className="text-xs text-rose-400 bg-rose-950/30 p-2.5 rounded-xl border border-rose-900/50 mt-1">
                        Reason for rejection: {app.rejectionReason}
                      </p>
                    )}
                  </div>

                  {app.status === "Completed" && (
                    <div className="shrink-0 flex items-center pt-2 md:pt-0">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAppointmentForViewer(app._id);
                          setIsViewerOpen(true);
                        }}
                        className="flex items-center gap-2 rounded-2xl bg-[#0077B6] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#005f92] hover:scale-[1.02] cursor-pointer"
                      >
                        <FaFilePdf className="text-sm text-[#E0FBFC]" />
                        <span>View Prescription & Notes</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Prescription Viewer Modal */}
      <PrescriptionViewerModal
        appointmentId={selectedAppointmentForViewer}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </section>
  );
};

export default PatientDashboard;
