import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { confirmOtp, requestOtp } from "../../features/otp/otpSlice";
import toast from "react-hot-toast";
import { FaLock, FaArrowRight, FaArrowLeft, FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";

const OtpStep = ({ email, onNext, onBack }) => {
  const dispatch = useAppDispatch();
  const { verifying, sending } = useAppSelector((state) => state.otp);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [cooldown, setCooldown] = useState(30);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next input box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtpDigits(pastedData.split(""));
      const lastInput = document.getElementById(`otp-input-5`);
      if (lastInput) lastInput.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otpDigits.join("");
    if (code.length !== 6) {
      toast.error("Please enter the complete 6-digit verification code");
      return;
    }

    const res = await dispatch(confirmOtp({ email, otp: code }));
    if (confirmOtp.fulfilled.match(res)) {
      toast.success("Identity verified successfully!");
      onNext();
    } else {
      toast.error(res.payload || "Verification failed");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || sending) return;
    const res = await dispatch(requestOtp(email));
    if (requestOtp.fulfilled.match(res)) {
      toast.success("New verification code sent!");
      setCooldown(30);
      setOtpDigits(["", "", "", "", "", ""]);
    } else {
      toast.error(res.payload || "Failed to resend code");
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
          <FaLock className="text-2xl text-[#C2DFE3]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E0FBFC] tracking-tight">
          Enter Verification Code
        </h2>
        <p className="mt-2 text-sm text-[#9DB4C0]">
          We sent a 6-digit OTP code to <span className="font-semibold text-[#E0FBFC]">{email}</span>. Code expires in 5 minutes.
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6 bg-transparent p-0 border-0 shadow-none">
        <div>
          <label className="block text-center text-xs font-semibold text-[#9DB4C0] uppercase tracking-wider mb-4">
            6-Digit Verification Code
          </label>

          <div className="flex items-center justify-center space-x-2 sm:space-x-3" onPaste={handlePaste}>
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-13 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-black/40 border border-white/20 focus:border-[#C2DFE3] focus:ring-2 focus:ring-[#C2DFE3]/50 text-[#E0FBFC] rounded-xl outline-none transition duration-200"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#9DB4C0] px-1">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-1 text-[#C2DFE3] hover:underline"
          >
            <FaArrowLeft />
            <span>Change Email</span>
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || sending}
            className="flex items-center space-x-1 text-[#C2DFE3] hover:underline disabled:opacity-40 disabled:no-underline"
          >
            <FaRedo className={`text-xs ${sending ? "animate-spin" : ""}`} />
            <span>
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend Code"}
            </span>
          </button>
        </div>

        <button
          type="submit"
          disabled={verifying || otpDigits.join("").length !== 6}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#253237] via-[#5C6B73] to-[#253237] hover:from-[#2c3d44] hover:to-[#2c3d44] text-[#E0FBFC] font-semibold rounded-2xl shadow-lg border border-[#C2DFE3]/30 transition duration-300 flex items-center justify-center space-x-2 text-base disabled:opacity-50"
        >
          {verifying ? (
            <span className="flex items-center space-x-2">
              <span className="w-5 h-5 border-2 border-[#E0FBFC] border-t-transparent rounded-full animate-spin"></span>
              <span>Verifying OTP...</span>
            </span>
          ) : (
            <>
              <span>Verify & Continue</span>
              <FaArrowRight />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default OtpStep;
