import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutOtp } from "../../features/otp/otpSlice";
import { AnimatePresence } from "framer-motion";
import { FORMS_IMAGE } from "../../constants/images";
import EmailStep from "../../components/booking-wizard/EmailStep";
import OtpStep from "../../components/booking-wizard/OtpStep";
import WhoIsThisForStep from "../../components/booking-wizard/WhoIsThisForStep";
import ChildSelectorStep from "../../components/booking-wizard/ChildSelectorStep";
import ProfileStep from "../../components/booking-wizard/ProfileStep";
import DoctorScheduleStep from "../../components/booking-wizard/DoctorScheduleStep";
import ReviewAndBookStep from "../../components/booking-wizard/ReviewAndBookStep";

const STEPS = [
  { id: "email", label: "Email" },
  { id: "otp", label: "Verify" },
  { id: "who", label: "Patient" },
  { id: "profile", label: "Details" },
  { id: "schedule", label: "Schedule" },
  { id: "review", label: "Review" },
];

const BookAppointmentWizard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { otpToken, email: verifiedEmail } = useAppSelector((state) => state.otp);

  // Stepper State
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // 0..5
  const [userEmail, setUserEmail] = useState(verifiedEmail || "");
  const [patientChoice, setPatientChoice] = useState(null); // { relationship, profile, childrenList, hasChildren }
  const [selectedChild, setSelectedChild] = useState(null);
  const [isChildSelecting, setIsChildSelecting] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);

  // On Mount: Session token check
  useEffect(() => {
    const token = sessionStorage.getItem("otpToken");
    const email = sessionStorage.getItem("verifiedEmail");

    if (token && email) {
      setUserEmail(email);
      setCurrentStepIndex(2); // Skip straight to "Who is this for?" (Step 3)
    }
  }, []);

  const handleEmailNext = (emailVal) => {
    setUserEmail(emailVal);
    setCurrentStepIndex(1); // Move to OTP
  };

  const handleOtpVerified = () => {
    setCurrentStepIndex(2); // Move to Who is this for
  };

  const handleWhoNext = (choiceData) => {
    setPatientChoice(choiceData);
    if (choiceData.relationship === "child" && choiceData.hasChildren) {
      setIsChildSelecting(true);
      setCurrentStepIndex(3); // Child selector step
    } else {
      setIsChildSelecting(false);
      setActiveProfile(choiceData.profile);
      setCurrentStepIndex(3); // Profile step
    }
  };

  const handleChildSelect = (childObj) => {
    setSelectedChild(childObj);
    setActiveProfile(childObj);
    setIsChildSelecting(false); // Advance to ProfileStep even if childObj is null (Add New Child)
    setCurrentStepIndex(3); // Profile step
  };

  const handleProfileNext = (savedProfileDoc) => {
    setActiveProfile(savedProfileDoc);
    setCurrentStepIndex(4); // Move to DoctorScheduleStep
  };

  const handleScheduleNext = (schedData) => {
    setScheduleData(schedData);
    setCurrentStepIndex(5); // Move to ReviewAndBookStep
  };

  const handleBookingComplete = () => {
    navigate("/my-appointments");
  };

  const handleResetSession = () => {
    dispatch(logoutOtp());
    setUserEmail("");
    setPatientChoice(null);
    setSelectedChild(null);
    setActiveProfile(null);
    setScheduleData(null);
    setCurrentStepIndex(0);
  };

  return (
    <section className="relative overflow-hidden min-h-screen w-full flex flex-col items-center justify-center py-16 sm:py-24 bg-[#080e12]">
      {/* Background Image - Dimmed */}
      <img
        src={FORMS_IMAGE.Appointment}
        alt="Schedule Appointment Background"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center brightness-40 contrast-110"
      />

      {/* Dimmed Background Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 my-auto">
        {/* Stepper Header Badges */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 overflow-x-auto pb-2 scrollbar-none">
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isDone = idx < currentStepIndex;

              return (
                <div key={step.id} className="flex items-center space-x-2 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border transition-all duration-300 ${
                        isActive
                          ? "bg-[#C2DFE3] text-[#253237] border-[#C2DFE3] shadow-lg scale-110"
                          : isDone
                          ? "bg-[#253237] text-[#C2DFE3] border-[#5C6B73]"
                          : "bg-[#16222a] text-[#5C6B73] border-[#253237]"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`hidden md:inline text-xs font-semibold uppercase tracking-wider ${
                        isActive ? "text-[#E0FBFC]" : isDone ? "text-[#C2DFE3]" : "text-[#5C6B73]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`w-4 sm:w-8 h-0.5 ${isDone ? "bg-[#5C6B73]" : "bg-[#253237]"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Reset session button if verified */}
          {userEmail && (
            <div className="text-xs text-[#9DB4C0] flex items-center justify-center space-x-2">
              <span>Verified Session: <strong className="text-[#E0FBFC]">{userEmail}</strong></span>
              <button
                type="button"
                onClick={handleResetSession}
                className="text-rose-400 hover:underline text-[11px] ml-2"
              >
                (Switch Email)
              </button>
            </div>
          )}
        </div>

        {/* Step Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          {currentStepIndex === 0 && (
            <EmailStep key="step-0" onNext={handleEmailNext} />
          )}

          {currentStepIndex === 1 && (
            <OtpStep
              key="step-1"
              email={userEmail}
              onNext={handleOtpVerified}
              onBack={() => setCurrentStepIndex(0)}
            />
          )}

          {currentStepIndex === 2 && (
            <WhoIsThisForStep
              key="step-2"
              onNext={handleWhoNext}
            />
          )}

          {currentStepIndex === 3 && isChildSelecting && (
            <ChildSelectorStep
              key="step-3-child"
              childrenList={patientChoice?.childrenList || []}
              onSelectChild={handleChildSelect}
              onBack={() => setCurrentStepIndex(2)}
            />
          )}

          {currentStepIndex === 3 && !isChildSelecting && (
            <ProfileStep
              key="step-3-profile"
              relationship={patientChoice?.relationship || "self"}
              initialProfile={activeProfile}
              onNext={handleProfileNext}
              onBack={() => {
                if (patientChoice?.relationship === "child" && patientChoice?.hasChildren) {
                  setIsChildSelecting(true);
                } else {
                  setCurrentStepIndex(2);
                }
              }}
            />
          )}

          {currentStepIndex === 4 && (
            <DoctorScheduleStep
              key="step-4"
              initialData={scheduleData}
              onNext={handleScheduleNext}
              onBack={() => setCurrentStepIndex(3)}
            />
          )}

          {currentStepIndex === 5 && (
            <ReviewAndBookStep
              key="step-5"
              profile={activeProfile}
              scheduleData={scheduleData}
              onBack={() => setCurrentStepIndex(4)}
              onComplete={handleBookingComplete}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BookAppointmentWizard;
