import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  getContactMessages,
  deleteContactMessage,
} from "../../features/contact/contactService";

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success("Message deleted");
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
        msg.name.toLowerCase().includes(term) ||
        msg.email.toLowerCase().includes(term),
    );
  }, [messages, search]);

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#253237]">Contact Messages</h1>

        <p className="mt-2 text-[#5C6B73]">
          View and manage messages sent from the Contact page.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237] md:w-96"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-[#253237] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Subject</th>
              <th className="px-6 py-4 text-left">Message</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-[#5C6B73]"
                >
                  Loading messages...
                </td>
              </tr>
            ) : filteredMessages.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-[#5C6B73]"
                >
                  {search
                    ? "No messages match your search."
                    : "No messages yet."}
                </td>
              </tr>
            ) : (
              filteredMessages.map((msg) => (
                <tr
                  key={msg._id}
                  className="border-b transition hover:bg-[#F8FBFC]"
                >
                  <td className="px-6 py-4 font-medium">{msg.name}</td>

                  <td className="px-6 py-4">{msg.email}</td>

                  <td className="px-6 py-4">{msg.subject}</td>

                  <td className="max-w-xs truncate px-6 py-4">{msg.message}</td>

                  <td className="px-6 py-4">{formatDate(msg.createdAt)}</td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      disabled={deletingId === msg._id}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {deletingId === msg._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Messages;
