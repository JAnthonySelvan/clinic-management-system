const appointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. John Smith",
    date: "30 Jul 2026",
    time: "10:30 AM",
    status: "Pending",
  },
  {
    id: 2,
    patient: "Sarah Wilson",
    doctor: "Dr. Priya Kumar",
    date: "30 Jul 2026",
    time: "11:00 AM",
    status: "Approved",
  },
  {
    id: 3,
    patient: "David Joseph",
    doctor: "Dr. Smith",
    date: "31 Jul 2026",
    time: "09:30 AM",
    status: "Completed",
  },
];

const statusClasses = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

const Appointments = () => {
  return (
    <>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#253237]">
            Appointment Management
          </h1>

          <p className="mt-2 text-[#5C6B73]">
            View and manage all patient appointments.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:justify-between">
        <input
          type="text"
          placeholder="Search by patient or doctor..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237] md:w-96"
        />

        <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237]">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-[#253237] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Time</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b transition hover:bg-[#F8FBFC]"
              >
                <td className="px-6 py-4">{appointment.patient}</td>
                <td className="px-6 py-4">{appointment.doctor}</td>
                <td className="px-6 py-4">{appointment.date}</td>
                <td className="px-6 py-4">{appointment.time}</td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      statusClasses[appointment.status]
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">
                      Approve
                    </button>

                    <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">
                      Complete
                    </button>

                    <button className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Appointments;
