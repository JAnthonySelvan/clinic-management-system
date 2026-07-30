import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAppointments,
  removeAppointment,
} from "../../features/appointment/appointmentSlice";

const statusClasses = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

const Appointments = () => {
  const dispatch = useAppDispatch();

  const { appointments, loading } = useAppSelector(
    (state) => state.appointment,
  );

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this appointment?")) {
      dispatch(removeAppointment(id));
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-lg text-[#5C6B73]">Loading appointments...</p>
      </div>
    );
  }
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
        <table className="min-w-full">
          <thead className="bg-[#253237] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Date & Time</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="border-b transition hover:bg-[#F8FBFC]"
              >
                <td className="px-6 py-4">{appointment.patientName}</td>

                <td className="px-6 py-4">{appointment.patientEmail}</td>

                <td className="px-6 py-4">{appointment.patientPhone}</td>

                <td className="px-6 py-4">{appointment.doctor?.fullName}</td>

                <td className="px-6 py-4">
                  {new Date(appointment.appointmentDateTime).toLocaleString(
                    "en-IN",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    },
                  )}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      statusClasses[appointment.status] ??
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {appointments.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[#5C6B73]">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Appointments;
