import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaTrash,
  FaEye,
  FaEnvelope,
  FaTimes,
  FaPaperPlane,
  FaChevronLeft,
  FaChevronRight,
  FaInbox,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

import {
  getContactMessages,
  deleteContactMessage,
} from "../../features/contact/contactService";
import { CTA_IMAGES, FEATURE_IMAGES } from "../../constants/images";

// Animated CountUp Counter Component
const CountUpNumber = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const increment = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getInitials = (name) => {
  if (!name) return "P";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const ITEMS_PER_PAGE = 8;

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const response = await getContactMessages();
        setMessages(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message? This action cannot be undone.")) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return messages;

    return messages.filter(
      (msg) =>
        (msg.name && msg.name.toLowerCase().includes(term)) ||
        (msg.email && msg.email.toLowerCase().includes(term)) ||
        (msg.subject && msg.subject.toLowerCase().includes(term)) ||
        (msg.message && msg.message.toLowerCase().includes(term)),
    );
  }, [messages, search]);

  // Pagination slicing
  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMessages = useMemo(() => {
    return filteredMessages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMessages, startIndex]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm font-medium text-[#5C6B73]">Loading patient messages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Inbox Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#253237] p-8 text-white shadow-xl border border-[#5C6B73]/30">
        <img
          src={CTA_IMAGES.background}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237] via-[#253237]/90 to-[#253237]/75" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md border border-white/20 mb-3">
              <FaInbox className="text-xs text-[#C2DFE3]" />
              <span>Communications Inbox</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Patient Inquiry Inbox
            </h1>
            <p className="mt-2 text-sm text-[#E0FBFC]/90 max-w-xl leading-relaxed">
              View, inspect, and reply to patient feedback and general inquiries submitted through the website contact portal.
            </p>
          </div>
        </div>
      </div>

      {/* Stat Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Total Messages */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-purple-500 border border-gray-200">
          <img
            src={FEATURE_IMAGES.trustedPatients}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#253237] via-[#253237]/85 to-[#253237]/65 transition-opacity group-hover:via-[#253237]/80" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E0FBFC]/80">
                Total Inquiries Received
              </span>
              <h3 className="mt-2 text-4xl font-bold text-white">
                <CountUpNumber target={messages.length} />
              </h3>
              <p className="mt-1 text-xs text-[#E0FBFC]/90">Stored patient messages</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
              <FaEnvelope className="text-2xl text-[#E0FBFC]" />
            </div>
          </div>
        </div>

        {/* Filtered Matches */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-blue-500 border border-gray-200">
          <img
            src={FEATURE_IMAGES.modernFacilities}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#253237] via-[#253237]/85 to-[#253237]/65 transition-opacity group-hover:via-[#253237]/80" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E0FBFC]/80">
                Filtered Search Results
              </span>
              <h3 className="mt-2 text-4xl font-bold text-white">
                <CountUpNumber target={filteredMessages.length} />
              </h3>
              <p className="mt-1 text-xs text-[#E0FBFC]/90">Matching active filter</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
              <FaSearch className="text-2xl text-[#E0FBFC]" />
            </div>
          </div>
        </div>
      </div>

      {/* Tooling Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#253237]">Message Submissions</h2>
          <p className="text-xs text-[#5C6B73]">Inspect detailed messages or initiate direct email follow-ups.</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#5C6B73]" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search sender name, email, subject..."
            className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] focus:bg-white pl-9 pr-4 py-2.5 text-xs text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
          />
        </div>
      </div>

      {/* Premium Table Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FBFC] text-[#253237] font-semibold text-xs uppercase tracking-wider border-b-2 border-[#253237]">
              <tr>
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Message Preview</th>
                <th className="px-6 py-4">Received Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {paginatedMessages.length > 0 ? (
                paginatedMessages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="hover:bg-[#F8FBFC] transition-colors duration-150 cursor-pointer"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    {/* Sender Initials Avatar + Name & Email */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#253237] text-xs font-bold text-white shadow-2xs">
                          {getInitials(msg.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#253237]">{msg.name}</p>
                          <p className="font-mono text-xs text-[#5C6B73]">{msg.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 font-medium text-[#253237]">
                      {msg.subject || "General Inquiry"}
                    </td>

                    <td className="max-w-xs truncate px-6 py-5 text-xs text-[#5C6B73]">
                      {msg.message}
                    </td>

                    <td className="px-6 py-5 font-mono text-xs text-[#5C6B73]">
                      {formatDate(msg.createdAt)}
                    </td>

                    <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center items-center gap-2">
                        {/* View Message Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedMessage(msg)}
                          className="border-2 border-[#253237] text-[#253237] bg-transparent hover:bg-[#253237] hover:text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                        >
                          <FaEye className="text-xs" />
                          <span>View</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(msg._id)}
                          disabled={deletingId === msg._id}
                          className="border-2 border-rose-600 text-rose-600 bg-transparent hover:bg-rose-600 hover:text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                          <FaTrash className="text-xs" />
                          <span>{deletingId === msg._id ? "Deleting..." : "Delete"}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#5C6B73]">
                    <p className="text-sm font-medium">
                      {search ? "No messages match your search criteria." : "No contact messages received yet."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredMessages.length > 0 && (
          <div className="border-t border-gray-100 bg-[#F8FBFC] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#5C6B73] font-medium">
              Showing{" "}
              <strong className="text-[#253237]">{startIndex + 1}</strong> to{" "}
              <strong className="text-[#253237]">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredMessages.length)}
              </strong>{" "}
              of <strong className="text-[#253237]">{filteredMessages.length}</strong> messages
            </span>

            <div className="flex items-center gap-1.5">
              {/* Previous Page */}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-semibold text-[#253237] transition hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition duration-150 ${
                    pageNum === currentPage
                      ? "bg-[#253237] text-white shadow-xs"
                      : "bg-white border border-gray-200 text-[#253237] hover:border-[#253237]"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Page */}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-semibold text-[#253237] transition hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Message Detail Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#253237]/75 p-4 backdrop-blur-xs"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-white p-6 md:p-8 shadow-2xl border border-gray-100 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#253237] text-sm font-bold text-white shadow-md">
                  {getInitials(selectedMessage.name)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#253237]">
                    {selectedMessage.name}
                  </h3>
                  <p className="font-mono text-xs text-[#5C6B73]">
                    {selectedMessage.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-[#253237] transition cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes className="text-base" />
              </button>
            </div>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F8FBFC] p-3.5 border border-gray-200/80 text-xs">
              <div className="flex items-center gap-2 text-[#253237]">
                <FaUser className="text-[#5C6B73]" />
                <span className="font-bold">Subject:</span>
                <span className="font-semibold text-[#5C6B73]">
                  {selectedMessage.subject || "General Inquiry"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#5C6B73]">
                <FaCalendarAlt className="text-xs" />
                <span className="font-mono">{formatDate(selectedMessage.createdAt)}</span>
              </div>
            </div>

            {/* Full Message Text Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#253237]">
                Full Message Content
              </label>
              <div className="rounded-xl border border-gray-200 bg-[#F8FBFC] p-5 text-sm leading-relaxed text-[#253237] whitespace-pre-wrap font-sans shadow-2xs">
                {selectedMessage.message}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              {/* Direct Mailto Reply Button */}
              <a
                href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                  `Re: ${selectedMessage.subject || "Saviours Healthcare Inquiry"}`,
                )}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#253237] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#5C6B73] hover:shadow-lg active:scale-95"
              >
                <FaPaperPlane className="text-xs" />
                <span>Reply via Email</span>
              </a>

              {/* Delete Message Button */}
              <button
                type="button"
                onClick={() => handleDelete(selectedMessage._id)}
                className="border-2 border-rose-600 text-rose-600 bg-transparent hover:bg-rose-600 hover:text-white rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
              >
                <FaTrash className="text-xs" />
                <span>Delete Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
