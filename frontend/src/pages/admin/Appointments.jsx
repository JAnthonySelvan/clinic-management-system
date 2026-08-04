import { useEffect, useState, useMemo } from "react";
import {
  FaSearch,
  FaFilter,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaStethoscope,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAppointments,
  removeAppointment,
} from "../../features/appointment/appointmentSlice";

const statusColor = {
  Pending: "bg-amber-50 text-amber-700 border border-amber-200/60",
  Approved: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  Completed: "bg-blue-50 text-blue-700 border border-blue-200/60",
  Rejected: "bg-rose-50 text-rose-700 border border-rose-200/60",
};

const statusDots = {
  Pending: "bg-amber-500",
  Approved: "bg-emerald-500",
  Completed: "bg-blue-500",
  Rejected: "bg-rose-500",
};

const ITEMS_PER_PAGE = 8;

const Appointments = () => {
  const dispatch = useAppDispatch();
  const { appointments, loading } = useAppSelector(
    (state) => state.appointment,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this appointment record permanently?")) {
      await dispatch(removeAppointment(id));
      dispatch(fetchAppointments());
    }
  };

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    if (!Array.isArray(appointments)) return [];
    return appointments.filter((app) => {
      const term = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !term ||
        (app.patientName && app.patientName.toLowerCase().includes(term)) ||
        (app.patientEmail && app.patientEmail.toLowerCase().includes(term)) ||
        (app.doctor?.fullName &&
          app.doctor.fullName.toLowerCase().includes(term));

      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchQuery, statusFilter]);

  // Pagination slicing
  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = useMemo(() => {
    return filteredAppointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAppointments, startIndex]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm font-medium text-[#5C6B73]">Loading all appointments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Tooling Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#253237]">
            Appointments Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#5C6B73]">
            Comprehensive view of all patient bookings, assigned doctors, and consultation statuses.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#5C6B73]" />
            <input
              type="text"
              placeholder="Search patient, doctor..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] focus:bg-white pl-9 pr-4 py-2.5 text-xs text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
            />
          </div>

          {/* Status Dropdown Filter */}
          <div className="relative w-full sm:w-44">
            <FaFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#5C6B73]" />
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white pl-9 pr-8 py-2.5 text-xs font-medium text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Premium Table Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FBFC] text-[#253237] font-semibold text-xs uppercase tracking-wider border-b-2 border-[#253237]">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Assigned Doctor / Department</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {paginatedAppointments.length > 0 ? (
                paginatedAppointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="hover:bg-[#F8FBFC] transition-colors duration-150"
                  >
                    <td className="px-6 py-5 font-semibold text-[#253237]">
                      {appointment.patientName}
                    </td>

                    <td className="px-6 py-5">
                      <div className="text-xs space-y-0.5">
                        <p className="font-mono text-[#5C6B73]">{appointment.patientEmail}</p>
                        <p className="text-[#5C6B73]">{appointment.patientPhone}</p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {appointment.doctor?.fullName ? (
                        <div>
                          <p className="font-semibold text-[#253237]">
                            Dr. {appointment.doctor.fullName.replace(/^Dr\.\s*/i, "")}
                          </p>
                          <p className="text-xs text-[#5C6B73] font-medium mt-0.5">
                            {appointment.specialization || appointment.doctor.specialization}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
                            Specialist-Based Booking
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200/80">
                            <FaStethoscope className="text-xs text-amber-600" />
                            <span>{appointment.specialization || "General Department"}</span>
                          </span>
                          <p className="text-[11px] font-medium text-[#5C6B73] mt-1">
                            Department-Based Booking
                          </p>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-5 font-mono text-xs text-[#5C6B73]">
                      {new Date(appointment.appointmentDateTime).toLocaleString(
                        "en-IN",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                          timeZone: "UTC",
                        },
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusColor[appointment.status] ||
                          "bg-gray-100 text-gray-700"
                          }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${statusDots[appointment.status] || "bg-gray-400"
                            }`}
                        />
                        <span>{appointment.status}</span>
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleDelete(appointment._id)}
                          className="border-2 border-rose-600 text-rose-600 bg-transparent hover:bg-rose-600 hover:text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                        >
                          <FaTrash className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#5C6B73]">
                    <p className="text-sm font-medium">No appointments match your search filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredAppointments.length > 0 && (
          <div className="border-t border-gray-100 bg-[#F8FBFC] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#5C6B73] font-medium">
              Showing{" "}
              <strong className="text-[#253237]">{startIndex + 1}</strong> to{" "}
              <strong className="text-[#253237]">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredAppointments.length)}
              </strong>{" "}
              of <strong className="text-[#253237]">{filteredAppointments.length}</strong> appointments
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
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition duration-150 ${pageNum === currentPage
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
    </div>
  );
};

export default Appointments;
