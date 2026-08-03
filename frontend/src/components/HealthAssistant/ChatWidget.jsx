import { useState, useRef, useEffect } from "react";
import { FaCommentMedical, FaTimes, FaPaperPlane, FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";

import { sendAssistantMessage } from "../../features/assistant/assistantService";
import BookingModal from "../BookingModal";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80&auto=format&fit=crop";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hi! Tell me what symptoms you're experiencing and I'll help point you to the right doctor.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Build history BEFORE clearing input — this is what makes the chat
    // actually interactive/contextual rather than stateless per message.
    const userMessage = { sender: "user", text: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Send the full history (minus the very first canned greeting) so
      // Gemini has context across turns.
      const historyForApi = updatedMessages
        .slice(1) // drop the initial greeting, it's not part of the real convo
        .slice(0, -1); // drop the message we're currently sending, backend appends it

      const response = await sendAssistantMessage(trimmed, historyForApi);
      const data = response.data;

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: data.reply,
          redFlag: data.redFlag,
          readyToRecommend: data.readyToRecommend,
          specialty: data.specialty,
          urgency: data.urgency,
          doctors: data.doctors || [],
        },
      ]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reach the assistant");
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Sorry, something went wrong on my end. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close health assistant" : "Open health assistant"}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#253237] text-2xl text-white shadow-2xl transition duration-300 hover:scale-110 hover:bg-[#5C6B73]"
      >
        {isOpen ? <FaTimes /> : <FaCommentMedical />}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 flex w-96 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ease-out ${isOpen
            ? "h-[600px] max-h-[70vh] translate-y-0 scale-100 opacity-100"
            : "pointer-events-none h-0 translate-y-4 scale-95 opacity-0"
          }`}
      >
        {/* Header */}
        <div className="bg-[#253237] px-6 py-4 text-white">
          <h3 className="text-lg font-bold">Health Assistant</h3>
          <p className="mt-1 text-xs leading-4 text-[#C2DFE3]">
            Helps you find the right doctor — not a diagnosis. In an emergency, call
            emergency services immediately.
          </p>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-[#F8FBFC] px-4 py-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.redFlag ? (
                <div className="max-w-[85%] rounded-2xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center gap-2 text-red-600">
                    <FaExclamationTriangle />
                    <span className="font-bold">Seek immediate medical attention</span>
                  </div>
                  <p className="mt-2 text-sm text-red-700">{msg.text}</p>
                </div>
              ) : (
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.sender === "user"
                      ? "bg-[#253237] text-white"
                      : "bg-white text-[#253237] shadow-sm"
                    }`}
                >
                  <p>{msg.text}</p>

                  {/* Doctor recommendation card */}
                  {msg.readyToRecommend && msg.doctors?.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                      {msg.doctors.slice(0, 2).map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 rounded-xl bg-[#F8FBFC] p-3"
                        >
                          <img
                            src={doc.profileImage || DEFAULT_AVATAR}
                            alt={doc.fullName}
                            onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#253237]">
                              {doc.fullName}
                            </p>
                            <p className="text-xs text-[#5C6B73]">{doc.specialization}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setBookingDoctor(doc)}
                            className="rounded-lg bg-[#253237] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#5C6B73]"
                          >
                            Book Now
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#9DB4C0] [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#9DB4C0] [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#9DB4C0]" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-gray-100 bg-white p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms..."
            disabled={loading}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#253237] disabled:opacity-60"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#253237] text-white transition hover:bg-[#5C6B73] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        doctorId={bookingDoctor?.id}
        doctor={bookingDoctor}
        isOpen={!!bookingDoctor}
        onClose={() => setBookingDoctor(null)}
      />
    </>
  );
};

export default ChatWidget;