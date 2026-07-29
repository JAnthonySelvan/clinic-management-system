const stats = [
  {
    title: "Total Doctors",
    value: 12,
    icon: "👨‍⚕️",
    color: "bg-[#253237]",
  },
  {
    title: "Appointments",
    value: 156,
    icon: "📅",
    color: "bg-[#5C6B73]",
  },
  {
    title: "Messages",
    value: 48,
    icon: "💬",
    color: "bg-[#9DB4C0]",
  },
  {
    title: "Today's Bookings",
    value: 18,
    icon: "🩺",
    color: "bg-[#253237]",
  },
];

const Dashboard = () => {
  return (
    <>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#253237]">Dashboard</h1>

        <p className="mt-2 text-[#5C6B73]">
          Welcome back! Here's an overview of your clinic.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl text-white ${item.color}`}
            >
              {item.icon}
            </div>

            <h3 className="text-lg font-semibold text-[#5C6B73]">
              {item.title}
            </h3>

            <p className="mt-3 text-4xl font-bold text-[#253237]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="mt-12 rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-[#253237]">
          Recent Appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-4">Patient</th>
                <th className="py-4">Doctor</th>
                <th className="py-4">Date</th>
                <th className="py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  patient: "John Doe",
                  doctor: "Dr. Smith",
                  date: "30 Jul 2026",
                  status: "Pending",
                },
                {
                  patient: "Sarah",
                  doctor: "Dr. Kumar",
                  date: "30 Jul 2026",
                  status: "Approved",
                },
                {
                  patient: "David",
                  doctor: "Dr. Joseph",
                  date: "31 Jul 2026",
                  status: "Completed",
                },
              ].map((appointment, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{appointment.patient}</td>
                  <td>{appointment.doctor}</td>
                  <td>{appointment.date}</td>
                  <td>
                    <span className="rounded-full bg-[#E0FBFC] px-4 py-2 text-sm font-medium text-[#253237]">
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

export default Dashboard;
