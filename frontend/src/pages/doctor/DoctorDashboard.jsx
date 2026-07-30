import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointments } from "../../features/appointment/appointmentSlice";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

const DoctorDashboard = () => {
  const dispatch = useDispatch();

  const { doctorAppointments, loading } = useSelector(
    (state) => state.appointment,
  );

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  const today = new Date().toDateString();

  const todayAppointments = doctorAppointments.filter(
    (appointment) =>
      new Date(appointment.appointmentDateTime).toDateString() === today,
  );

  const cards = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
    },
    {
      title: "Pending",
      value: doctorAppointments.filter(
        (appointment) => appointment.status === "Pending",
      ).length,
    },
    {
      title: "Completed",
      value: doctorAppointments.filter(
        (appointment) => appointment.status === "Completed",
      ).length,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-[#5C6B73]">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
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
              {todayAppointments.length > 0 ? (
                todayAppointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-b hover:bg-[#F8FBFC]"
                  >
                    <td className="px-6 py-4">{appointment.patientName}</td>

                    <td className="px-6 py-4">
                      {new Date(
                        appointment.appointmentDateTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          statusColor[appointment.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-[#5C6B73]">
                    No appointments scheduled for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
