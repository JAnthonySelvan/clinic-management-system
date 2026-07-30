import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorAppointments,
  changeAppointmentStatus,
} from "../../features/appointment/appointmentSlice";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

const DoctorAppointments = () => {
  const dispatch = useDispatch();

  const { doctorAppointments, loading } = useSelector(
    (state) => state.appointment,
  );

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    dispatch(changeAppointmentStatus({ id, status }));
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
          <h1 className="text-4xl font-bold text-[#253237]">My Appointments</h1>

          <p className="mt-2 text-[#5C6B73]">
            Manage your scheduled patient appointments.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-[#253237] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Age</th>
              <th className="px-6 py-4 text-left">Date & Time</th>
              <th className="px-6 py-4 text-left">Reason</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctorAppointments.length > 0 ? (
              doctorAppointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-b hover:bg-[#F8FBFC]"
                >
                  <td className="px-6 py-4">{appointment.patientName}</td>

                  <td className="px-6 py-4">{appointment.patientAge}</td>

                  <td className="px-6 py-4">
                    {new Date(appointment.appointmentDateTime).toLocaleString(
                      "en-IN",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      },
                    )}
                  </td>

                  <td className="px-6 py-4">{appointment.reason}</td>

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

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {appointment.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(appointment._id, "Approved")
                            }
                            className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(appointment._id, "Rejected")
                            }
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {appointment.status === "Approved" && (
                        <button
                          onClick={() =>
                            handleStatusChange(appointment._id, "Completed")
                          }
                          className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                        >
                          Complete
                        </button>
                      )}

                      {(appointment.status === "Completed" ||
                        appointment.status === "Rejected") && (
                        <span className="text-sm text-gray-500">
                          No Actions
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-[#5C6B73]">
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

export default DoctorAppointments;
