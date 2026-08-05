import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { requestOtp } from "../../features/otp/otpSlice";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const EmailStep = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const { email: savedEmail, sending } = useAppSelector((state) => state.otp);
  const [emailInput, setEmailInput] = useState(savedEmail || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    const res = await dispatch(requestOtp(emailInput.trim()));
    if (requestOtp.fulfilled.match(res)) {
      toast.success("Verification code sent to your email!");
      onNext(emailInput.trim());
    } else {
      toast.error(res.payload || "Failed to send verification code");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E0FBFC] mb-4 shadow-lg">
          <FaShieldAlt className="text-3xl text-[#C2DFE3]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E0FBFC] tracking-tight">
          Verify Patient Identity
        </h2>
        <p className="mt-2 text-sm text-[#9DB4C0]">
          Enter your email to receive a 6-digit OTP verification code before managing your family profile and booking an appointment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-transparent p-0 border-0 shadow-none">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-2">
            Email Address <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#C2DFE3]">
              <FaEnvelope className="text-lg" />
            </div>
            <input
              id="email"
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="patient@example.com"
              className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/20 focus:border-[#C2DFE3] focus:ring-1 focus:ring-[#C2DFE3] text-[#E0FBFC] placeholder-[#5C6B73] rounded-2xl transition duration-200 text-sm font-medium outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#253237] via-[#5C6B73] to-[#253237] hover:from-[#2c3d44] hover:to-[#2c3d44] text-[#E0FBFC] font-semibold rounded-2xl shadow-lg border border-[#C2DFE3]/30 transition duration-300 flex items-center justify-center space-x-2 text-base disabled:opacity-50"
        >
          {sending ? (
            <span className="flex items-center space-x-2">
              <span className="w-5 h-5 border-2 border-[#E0FBFC] border-t-transparent rounded-full animate-spin"></span>
              <span>Sending OTP...</span>
            </span>
          ) : (
            <>
              <span>Send OTP Verification</span>
              <FaArrowRight />
            </>
          )}
        </button>

        <div className="flex items-center justify-center space-x-2 text-xs text-[#9DB4C0] pt-2">
          <FaLock className="text-emerald-400 text-xs" />
          <span>Your email is secured & used solely for appointment verification.</span>
        </div>
      </form>
    </motion.div>
  );
};

export default EmailStep;
