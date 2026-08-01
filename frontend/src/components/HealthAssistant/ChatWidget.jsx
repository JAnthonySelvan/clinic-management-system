import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserNurse,
  FaTimes,
  FaPaperPlane,
  FaExclamationTriangle,
  FaStethoscope,
  FaCalendarCheck,
  FaPhoneAlt,
  FaInfoCircle,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPublicDoctors } from "../../features/doctor/doctorSlice";
import BookingModal from "../BookingModal";
import { sendAssistantMessage } from "../../features/assistant/assistantService";

const ChatWidget = () => {
  const dispatch = useAppDispatch();
  const { doctors: publicDoctors } = useAppSelector((state) => state.doctor);

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);

  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "Hello! I am the Saviours Clinic Triage Assistant. Describe your symptoms and I will help analyze them to connect you with the right doctor or department.",
      isEmergency: false,
      recommendation: null,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (publicDoctors.length === 0) {
      dispatch(fetchPublicDoctors());
    }
  }, [dispatch, publicDoctors.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend = null) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setLoading(true);

    // Format history for backend
    const history = messages.map((m) => ({
      sender: m.sender,
      text: m.text,
    }));

    try {
      const response = await sendAssistantMessage(text, history);

      if (response.isEmergency) {
        setMessages((prev) => [
          ...prev,
          {
            id: `assist-${Date.now()}`,
            sender: "assistant",
            text: response.message,
            isEmergency: true,
            emergencyContact: response.emergencyContact,
            action: response.action,
            recommendation: null,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `assist-${Date.now()}`,
            sender: "assistant",
            text: response.reply,
            isEmergency: false,
            recommendation: response.recommendation,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "I'm sorry, I'm having trouble connecting right now. Please book directly or call our helpline.";

      setMessages((prev) => [
        ...prev,
        {
          id: `assist-${Date.now()}`,
          sender: "assistant",
          text: errorMsg,
          isEmergency: false,
          recommendation: null,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBookRecommendation = (rec) => {
    let docToBook = rec.rawDoctorObj || null;

    if (!docToBook && rec.doctorId && publicDoctors.length > 0) {
      docToBook = publicDoctors.find((d) => d._id === rec.doctorId);
    }
    if (!docToBook && rec.specialty && publicDoctors.length > 0) {
      docToBook = publicDoctors.find((d) => d.specialization === rec.specialty);
    }
    if (!docToBook && publicDoctors.length > 0) {
      docToBook = publicDoctors[0];
    }

    const doctorForModal = docToBook || {
      _id: rec.doctorId || "default-doc",
      fullName: rec.doctorName ? rec.doctorName.replace(/^Dr\.\s*/i, "") : "Specialist",
      specialization: rec.specialty || "General Medicine",
    };

    setSelectedDoctorForBooking(doctorForModal);
    setIsBookingModalOpen(true);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Health Assistant Triage Chatbot"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#253237] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#5C6B73] focus:outline-none focus:ring-4 focus:ring-[#9DB4C0]/50 border border-white/20 group cursor-pointer"
      >
        <span className="relative flex h-full w-full items-center justify-center">
          {isOpen ? (
            <FaTimes className="text-xl text-[#E0FBFC]" />
          ) : (
            <>
              <FaUserNurse className="text-2xl text-[#E0FBFC] transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500 border-2 border-white" />
              </span>
            </>
          )}
        </span>
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-24 top-20 z-50 flex flex-col rounded-3xl bg-white shadow-2xl border border-gray-100 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[85vh] overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-[#253237] px-5 py-4 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C6B73] text-[#E0FBFC] ring-2 ring-white/20">
                <FaUserNurse className="text-lg" />
              </div>
              <div>
                <h3 className="text-base font-bold font-poppins text-white leading-tight">
                  Triage Assistant
                </h3>
                <p className="text-[11px] text-[#E0FBFC]/80 flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Saviours Clinic Guide</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition p-1 cursor-pointer"
              aria-label="Close assistant"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Persistent Non-Dismissible Safety Disclaimer */}
          <div className="bg-[#F8FBFC] border-b border-gray-200 px-4 py-2.5 flex items-start gap-2 text-[11px] text-[#5C6B73] shrink-0 leading-snug">
            <FaInfoCircle className="text-teal-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#253237]">Triage Only:</strong> This bot suggests departments & doctors — not medical diagnoses or treatment. Emergency? Call <a href="tel:+919876543210" className="underline font-bold text-rose-600">+91 98765 43210</a>.
            </p>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FBFC]/50">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";

              if (msg.isEmergency) {
                return (
                  <div key={msg.id} className="flex justify-start">
                    <div className="max-w-[90%] rounded-2xl bg-rose-50 border-2 border-rose-200 p-4 text-rose-900 shadow-md">
                      <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-2">
                        <FaExclamationTriangle className="text-lg text-rose-600" />
                        <span>IMMEDIATE MEDICAL CARE NEEDED</span>
                      </div>
                      <p className="text-xs leading-relaxed font-medium">
                        {msg.text}
                      </p>
                      {msg.action && (
                        <p className="mt-2 text-xs font-semibold text-rose-800">
                          {msg.action}
                        </p>
                      )}
                      <div className="mt-3">
                        <a
                          href={`tel:${msg.emergencyContact || "+919876543210"}`}
                          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-700 transition"
                        >
                          <FaPhoneAlt className="text-xs" />
                          <span>Call Emergency Helpline</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isUser ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                      isUser
                        ? "bg-[#253237] text-white rounded-br-none"
                        : "bg-white text-[#253237] border border-gray-100 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Inline Specialty Recommendation Card (Only rendered when AI gives a doctor suggestion after symptom analysis) */}
                    {msg.recommendation && (
                      <div className="mt-3 rounded-xl bg-[#F8FBFC] border border-[#C2DFE3] p-3 text-[#253237]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#5C6B73]">
                            <FaStethoscope className="text-teal-600" />
                            <span>Recommended Care</span>
                          </span>
                          <span className="rounded-full bg-[#253237] px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                            {msg.recommendation.urgency || "routine"}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-[#253237] font-poppins">
                          {msg.recommendation.specialty} Department
                        </h4>
                        <p className="text-[11px] text-[#5C6B73] mt-0.5">
                          {msg.recommendation.doctorName}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleBookRecommendation(msg.recommendation)}
                          className="mt-2.5 inline-flex items-center justify-center gap-1.5 w-full rounded-lg bg-[#253237] py-2 text-xs font-bold text-white hover:bg-[#5C6B73] transition cursor-pointer"
                        >
                          <FaCalendarCheck className="text-xs" />
                          <span>Book with {msg.recommendation.doctorName}</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-none bg-white border border-gray-100 px-4 py-3 shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#5C6B73] animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-[#5C6B73] animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-[#5C6B73] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="bg-white border-t border-gray-100 px-3 py-2 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
            {[
              "High fever & severe cough",
              "Persistent toothache",
              "Joint pain in knees",
              "Skin rashes & itching",
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="shrink-0 rounded-full bg-[#F8FBFC] border border-[#9DB4C0]/40 px-3 py-1 text-[10px] font-semibold text-[#253237] hover:bg-[#253237] hover:text-white transition cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Footer Bar */}
          <div className="bg-white p-3 border-t border-gray-100 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Describe your symptoms..."
              className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-xs outline-none focus:border-[#253237]"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || loading}
              aria-label="Send message"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#253237] text-white shadow-md transition hover:bg-[#5C6B73] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal Popup Triggered Directly From Chat Recommendation */}
      <BookingModal
        isOpen={isBookingModalOpen}
        doctor={selectedDoctorForBooking}
        availableDoctors={publicDoctors}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default ChatWidget;
