import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  FaCalendarCheck,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaUserMd,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  fetchAdminLeaves,
  changeLeaveStatus,
  clearScheduleError,
  clearScheduleSuccess,
} from "../../features/schedule/scheduleSlice";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

const statusColor = {
  Pending: "bg-amber-100 text-amber-800 border-amber-300",
  Approved: "bg-green-100 text-green-800 border-green-300",
  Rejected: "bg-red-100 text-red-800 border-red-300",
};

const Leaves = () => {
  const dispatch = useDispatch();

  const { adminLeaves, loading, saving, error, successMessage } = useSelector(
    (state) => state.schedule,
  );

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleStatusChange = (scheduleId, dateId, status) => {
    dispatch(changeLeaveStatus({ scheduleId, dateId, status }));
  };

  // Filter & Search logic
  const filteredLeaves = (adminLeaves || []).filter((leave) => {
    const matchesStatus =
      filterStatus === "All" || leave.status === filterStatus;

    const doctorName = leave.doctor?.fullName || "";
    const doctorSpec = leave.doctor?.specialization || "";
    const reason = leave.reason || "";

    const matchesSearch =
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctorSpec.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reason.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const pendingCount = (adminLeaves || []).filter(
    (l) => l.status === "Pending",
  ).length;
  const approvedCount = (adminLeaves || []).filter(
    (l) => l.status === "Approved",
  ).length;
  const rejectedCount = (adminLeaves || []).filter(
    (l) => l.status === "Rejected",
  ).length;

  if (loading && (!adminLeaves || adminLeaves.length === 0)) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg font-medium text-[#5C6B73]">
          Loading doctor leave requests...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#253237]">
            Doctor Leave Approvals
          </h1>
          <p className="mt-2 text-[#5C6B73]">
            Review, approve, or reject leave requests submitted by clinic doctors.
          </p>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#5C6B73]">Total Requests</p>
            <p className="mt-2 text-3xl font-bold text-[#253237]">
              {adminLeaves?.length || 0}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#253237] text-white">
            <FaCalendarCheck className="text-xl" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#5C6B73]">Pending</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {pendingCount}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <FaHourglassHalf className="text-xl" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#5C6B73]">Approved</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {approvedCount}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
            <FaCheckCircle className="text-xl" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#5C6B73]">Rejected</p>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {rejectedCount}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <FaTimesCircle className="text-xl" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-md border border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto">
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                filterStatus === status
                  ? "bg-[#253237] text-white shadow-md"
                  : "bg-gray-100 text-[#5C6B73] hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctor or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-[#253237] outline-none transition focus:border-[#253237]"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#253237] text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Requested Date
                </th>
                <th className="px-6 py-4 text-left font-semibold">Reason</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave) => (
                  <tr
                    key={leave.dateId}
                    className="transition hover:bg-[#F8FBFC]"
                  >
                    {/* Doctor Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={leave.doctor?.profileImage || DEFAULT_AVATAR}
                          alt={leave.doctor?.fullName || "Doctor"}
                          className="h-10 w-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-bold text-[#253237]">
                            {leave.doctor?.fullName
                              ? `Dr. ${leave.doctor.fullName}`
                              : "Doctor"}
                          </p>
                          <p className="text-xs text-[#5C6B73]">
                            {leave.doctor?.specialization ||
                              "General Physician"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#253237]">
                        <FaCalendarAlt className="text-[#5C6B73]" />
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
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      {leave.reason}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                          statusColor[leave.status] ||
                          "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {leave.status !== "Approved" && (
                          <button
                            onClick={() =>
                              handleStatusChange(
                                leave.scheduleId,
                                leave.dateId,
                                "Approved",
                              )
                            }
                            disabled={saving}
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}

                        {leave.status !== "Rejected" && (
                          <button
                            onClick={() =>
                              handleStatusChange(
                                leave.scheduleId,
                                leave.dateId,
                                "Rejected",
                              )
                            }
                            disabled={saving}
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#5C6B73]">
                    No leave requests found matching your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
