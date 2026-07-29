const messages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Appointment Inquiry",
    message: "I would like to book an appointment for next week.",
    date: "30 Jul 2026",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    subject: "General Consultation",
    message: "Can I consult a dermatologist this Friday?",
    date: "29 Jul 2026",
  },
  {
    id: 3,
    name: "David Joseph",
    email: "david@example.com",
    subject: "Medical Report",
    message: "How can I collect my medical report?",
    date: "28 Jul 2026",
  },
];

const Messages = () => {
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
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className="border-b transition hover:bg-[#F8FBFC]"
              >
                <td className="px-6 py-4 font-medium">{msg.name}</td>

                <td className="px-6 py-4">{msg.email}</td>

                <td className="px-6 py-4">{msg.subject}</td>

                <td className="max-w-xs truncate px-6 py-4">{msg.message}</td>

                <td className="px-6 py-4">{msg.date}</td>

                <td className="px-6 py-4 text-center">
                  <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Messages;
