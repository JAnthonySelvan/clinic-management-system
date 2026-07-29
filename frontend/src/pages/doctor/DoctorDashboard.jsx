const todayAppointments = [
  {
    id: 1,
    patient: "John Doe",
    time: "10:00 AM",
    status: "Pending",
  },
  {
    id: 2,
    patient: "Sarah Wilson",
    time: "11:30 AM",
    status: "Approved",
  },
  {
    id: 3,
    patient: "David Joseph",
    time: "02:00 PM",
    status: "Completed",
  },
];

const cards = [
  {
    title: "Today's Appointments",
    value: 8,
  },
  {
    title: "Pending",
    value: 3,
  },
  {
    title: "Completed",
    value: 18,
  },
];

const DoctorDashboard = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#253237]">
          Welcome, Doctor 👨‍⚕️
        </h1>

        <p className="mt-2 text-[#5C6B73]">
          Here's an overview of your appointments.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-10 grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-3xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-medium text-[#5C6B73]">{card.title}</h3>

            <h2 className="mt-4 text-4xl font-bold text-[#253237]">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Today's Appointments */}
      <div className="rounded-3xl bg-white shadow-lg">
        <div className="border-b px-6 py-5">
          <h2 className="text-2xl font-bold text-[#253237]">
            Today's Appointments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#253237] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Patient</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {todayAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b hover:bg-[#F8FBFC]"
                >
                  <td className="px-6 py-4">{appointment.patient}</td>

                  <td className="px-6 py-4">{appointment.time}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        appointment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : appointment.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
