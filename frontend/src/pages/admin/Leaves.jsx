import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUmbrellaBeach,
} from "react-icons/fa";

import {
  fetchAdminLeaves,
  changeLeaveStatus,
  clearScheduleError,
  clearScheduleSuccess,
} from "../../features/schedule/scheduleSlice";
import { CTA_IMAGES, FEATURE_IMAGES } from "../../constants/images";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80&auto=format&fit=crop";

const statusColor = {
  Pending: "bg-amber-50 text-amber-700 border border-amber-200/60",
  Approved: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  Rejected: "bg-rose-50 text-rose-700 border border-rose-200/60",
};

const statusDots = {
  Pending: "bg-amber-500",
  Approved: "bg-emerald-500",
  Rejected: "bg-rose-500",
};

// Animated CountUp Counter Component
const CountUpNumber = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const increment = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

const ITEMS_PER_PAGE = 8;

const Leaves = () => {
  const dispatch = useDispatch();

  const { adminLeaves, loading, saving, error, successMessage } = useSelector(
    (state) => state.schedule,
  );

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAdminLeaves());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearScheduleSuccess());
    }
    if (error) {
      toast.error(error);
      dispatch(clearScheduleError());
    }
  }, [successMessage, error, dispatch]);

  const handleStatusChange = async (scheduleId, dateId, status) => {
    const result = await dispatch(changeLeaveStatus({ scheduleId, dateId, status }));
    if (changeLeaveStatus.fulfilled.match(result)) {
      // Re-fetch admin leaves to ensure updated status and schedule synchronization
      dispatch(fetchAdminLeaves());
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  // Filter & Search logic
  const filteredLeaves = useMemo(() => {
    if (!Array.isArray(adminLeaves)) return [];
    return adminLeaves.filter((leave) => {
      const matchesStatus =
        filterStatus === "All" || leave.status === filterStatus;

      const doctorName = leave.doctor?.fullName || "";
      const doctorSpec = leave.doctor?.specialization || "";
      const reason = leave.reason || "";
      const term = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !term ||
        doctorName.toLowerCase().includes(term) ||
        doctorSpec.toLowerCase().includes(term) ||
        reason.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [adminLeaves, filterStatus, searchTerm]);

  // Counts
  const pendingCount = (adminLeaves || []).filter((l) => l.status === "Pending").length;
  const approvedCount = (adminLeaves || []).filter((l) => l.status === "Approved").length;
  const rejectedCount = (adminLeaves || []).filter((l) => l.status === "Rejected").length;

  // Pagination slicing
  const totalPages = Math.max(1, Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeaves = useMemo(() => {
    return filteredLeaves.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredLeaves, startIndex]);

  if (loading && (!adminLeaves || adminLeaves.length === 0)) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm font-medium text-[#5C6B73]">Loading doctor leave requests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#253237] p-8 text-white shadow-xl border border-[#5C6B73]/30">
        <img
          src={CTA_IMAGES.background}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237] via-[#253237]/90 to-[#253237]/75" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md border border-white/20 mb-3">
              <FaUmbrellaBeach className="text-xs text-[#C2DFE3]" />
              <span>Faculty Time-Off Management</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Doctor Leave Approvals
            </h1>
            <p className="mt-2 text-sm text-[#E0FBFC]/90 max-w-xl leading-relaxed">
              Review doctor leave applications. Approving a leave automatically rejects any patient appointments scheduled on that date.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Requests Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-[#9DB4C0] border border-gray-200">
          <img
            src={FEATURE_IMAGES.qualifiedSpecialists}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#253237] via-[#253237]/85 to-[#253237]/65 transition-opacity group-hover:via-[#253237]/80" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E0FBFC]/80">
                Total Requests
              </span>
              <h3 className="mt-2 text-4xl font-bold text-white">
                <CountUpNumber target={adminLeaves?.length || 0} />
              </h3>
              <p className="mt-1 text-xs text-[#E0FBFC]/90">All leave submissions</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
              <FaCalendarCheck className="text-2xl text-[#E0FBFC]" />
            </div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-amber-500 border border-gray-200">
          <img
            src={FEATURE_IMAGES.compassionateCare}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#253237] via-[#253237]/85 to-[#253237]/65 transition-opacity group-hover:via-[#253237]/80" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E0FBFC]/80">
                Pending Approvals
              </span>
              <h3 className="mt-2 text-4xl font-bold text-white">
                <CountUpNumber target={pendingCount} />
              </h3>
              <p className="mt-1 text-xs text-[#E0FBFC]/90">Awaiting admin review</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
              <FaClock className="text-2xl text-[#E0FBFC]" />
            </div>
          </div>
        </div>

        {/* Approved Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-emerald-500 border border-gray-200">
          <img
            src={FEATURE_IMAGES.modernFacilities}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#253237] via-[#253237]/85 to-[#253237]/65 transition-opacity group-hover:via-[#253237]/80" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E0FBFC]/80">
                Approved Leaves
              </span>
              <h3 className="mt-2 text-4xl font-bold text-white">
                <CountUpNumber target={approvedCount} />
              </h3>
              <p className="mt-1 text-xs text-[#E0FBFC]/90">Granted time-off</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
              <FaCheckCircle className="text-2xl text-[#E0FBFC]" />
            </div>
          </div>
        </div>

        {/* Rejected Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-rose-500 border border-gray-200">
          <img
            src={FEATURE_IMAGES.diagnosticLab}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#253237] via-[#253237]/85 to-[#253237]/65 transition-opacity group-hover:via-[#253237]/80" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E0FBFC]/80">
                Rejected Leaves
              </span>
              <h3 className="mt-2 text-4xl font-bold text-white">
                <CountUpNumber target={rejectedCount} />
              </h3>
              <p className="mt-1 text-xs text-[#E0FBFC]/90">Declined requests</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
              <FaTimesCircle className="text-2xl text-[#E0FBFC]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => handleFilterStatusChange(status)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                filterStatus === status
                  ? "bg-[#253237] text-white shadow-md"
                  : "bg-white border border-gray-200 text-[#5C6B73] hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#5C6B73]" />
          <input
            type="text"
            placeholder="Search doctor or reason..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] focus:bg-white pl-9 pr-4 py-2.5 text-xs text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
          />
        </div>
      </div>

      {/* Premium Table Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FBFC] text-[#253237] font-semibold text-xs uppercase tracking-wider border-b-2 border-[#253237]">
              <tr>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Requested Date</th>
                <th className="px-6 py-4">Leave Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {paginatedLeaves.length > 0 ? (
                paginatedLeaves.map((leave) => (
                  <tr
                    key={leave.dateId}
                    className="hover:bg-[#F8FBFC] transition-colors duration-150"
                  >
                    {/* Doctor Info + Avatar */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={leave.doctor?.profileImage || DEFAULT_AVATAR}
                          alt={leave.doctor?.fullName || "Doctor"}
                          onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                          className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-2xs"
                        />
                        <div>
                          <p className="font-semibold text-[#253237]">
                            {leave.doctor?.fullName
                              ? `Dr. ${leave.doctor.fullName.replace(/^Dr\.\s*/i, "")}`
                              : "Doctor"}
                          </p>
                          <p className="text-xs text-[#5C6B73]">
                            {leave.doctor?.specialization || "Clinical Faculty"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 font-mono text-xs text-[#5C6B73]">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-xs text-[#5C6B73]" />
                        <span>
                          {new Date(leave.date).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Reason */}
                    <td className="px-6 py-5 text-xs text-[#5C6B73] max-w-xs truncate">
                      {leave.reason}
                    </td>

                    {/* Status Pill with Dot */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          statusColor[leave.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            statusDots[leave.status] || "bg-gray-400"
                          }`}
                        />
                        <span>{leave.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-center items-center gap-2">
                        {leave.status !== "Approved" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(
                                leave.scheduleId,
                                leave.dateId,
                                "Approved",
                              )
                            }
                            disabled={saving}
                            className="border-2 border-emerald-600 text-emerald-600 bg-transparent hover:bg-emerald-600 hover:text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 disabled:opacity-50 cursor-pointer"
                          >
                            <FaCheck className="text-xs" />
                            <span>Approve</span>
                          </button>
                        )}

                        {leave.status !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(
                                leave.scheduleId,
                                leave.dateId,
                                "Rejected",
                              )
                            }
                            disabled={saving}
                            className="border-2 border-rose-600 text-rose-600 bg-transparent hover:bg-rose-600 hover:text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 disabled:opacity-50 cursor-pointer"
                          >
                            <FaTimes className="text-xs" />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#5C6B73]">
                    <p className="text-sm font-medium">No leave requests match your search criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredLeaves.length > 0 && (
          <div className="border-t border-gray-100 bg-[#F8FBFC] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#5C6B73] font-medium">
              Showing{" "}
              <strong className="text-[#253237]">{startIndex + 1}</strong> to{" "}
              <strong className="text-[#253237]">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredLeaves.length)}
              </strong>{" "}
              of <strong className="text-[#253237]">{filteredLeaves.length}</strong> leave requests
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
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition duration-150 ${
                    pageNum === currentPage
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

export default Leaves;
