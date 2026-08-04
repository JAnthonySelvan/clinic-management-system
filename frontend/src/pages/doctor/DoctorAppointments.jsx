import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCheck,
  FaTimes,
  FaCheckDouble,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  fetchDoctorAppointments,
  changeAppointmentStatus,
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

const DoctorAppointments = () => {
  const dispatch = useDispatch();

  const { doctorAppointments, loading } = useSelector(
    (state) => state.appointment,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  const handleStatusChange = async (id, status) => {
    await dispatch(changeAppointmentStatus({ id, status }));
    dispatch(fetchDoctorAppointments());
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  // Filtered appointments based on search query and status filter
  const filteredAppointments = useMemo(() => {
    if (!Array.isArray(doctorAppointments)) return [];
    return doctorAppointments.filter((app) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        (app.patientName &&
          app.patientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (app.reason &&
          app.reason.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [doctorAppointments, searchQuery, statusFilter]);

  // Pagination slicing
  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = useMemo(() => {
    return filteredAppointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAppointments, startIndex]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm font-medium text-[#5C6B73]">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Tooling Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#253237]">
            My Appointments
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#5C6B73]">
            Manage patient bookings, approve consultations, and update clinical statuses.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#5C6B73]" />
            <input
              type="text"
              placeholder="Search patient name..."
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
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Reason</th>
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
                      <div>
                        <span>{appointment.patientName}</span>
                        {!appointment.doctor && (
                          <span className="ml-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200">
                            Dept Request (First to Accept)
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-xs text-[#5C6B73]">
                      {appointment.patientAge || "N/A"} Yrs
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

                    <td className="px-6 py-5 text-xs text-[#5C6B73] max-w-xs truncate">
                      {appointment.reason || "General Consultation"}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          statusColor[appointment.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            statusDots[appointment.status] || "bg-gray-400"
                          }`}
                        />
                        <span>{appointment.status}</span>
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center items-center gap-2">
                        {appointment.status === "Pending" && (
                          <>
                            {/* Outlined to Filled Approve Button */}
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(appointment._id, "Approved")
                              }
                              className="border-2 border-emerald-600 text-emerald-600 bg-transparent hover:bg-emerald-600 hover:text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                            >
                              <FaCheck className="text-xs" />
                              <span>Approve</span>
                            </button>

                            {/* Outlined to Filled Reject Button */}
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(appointment._id, "Rejected")
                              }
                              className="border-2 border-rose-600 text-rose-600 bg-transparent hover:bg-rose-600 hover:text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                            >
                              <FaTimes className="text-xs" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {appointment.status === "Approved" && (
                          /* Outlined to Filled Complete Button */
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(appointment._id, "Completed")
                            }
                            className="border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                          >
                            <FaCheckDouble className="text-xs" />
                            <span>Complete</span>
                          </button>
                        )}

                        {(appointment.status === "Completed" ||
                          appointment.status === "Rejected") && (
                          <span className="text-xs font-medium text-gray-400 italic">
                            No Actions
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#5C6B73]">
                    <p className="text-sm font-medium">No appointments match your filter criteria.</p>
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
              <strong className="text-[#253237]">
                {startIndex + 1}
              </strong>{" "}
              to{" "}
              <strong className="text-[#253237]">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredAppointments.length)}
              </strong>{" "}
              of <strong className="text-[#253237]">{filteredAppointments.length}</strong> appointments
            </span>

            <div className="flex items-center gap-1.5">
              {/* Previous Page Button */}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-semibold text-[#253237] transition hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              {/* Page Number Buttons */}
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

              {/* Next Page Button */}
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

export default DoctorAppointments;
