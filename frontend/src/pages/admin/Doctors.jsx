import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaSearch,
  FaUserEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDoctors, removeDoctor, clearDoctorError } from "../../features/doctor/doctorSlice";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80&auto=format&fit=crop";

const ITEMS_PER_PAGE = 8;

const Doctors = () => {
  const dispatch = useAppDispatch();
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearDoctorError());
    }
  }, [error, dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor account?",
    );

    if (!confirmed) return;

    try {
      await dispatch(removeDoctor(id)).unwrap();
      toast.success("Doctor deleted successfully");
    } catch (err) {
      toast.error(err || "Failed to delete doctor");
    }
  };

  // Filtered doctors
  const filteredDoctors = useMemo(() => {
    if (!Array.isArray(doctors)) return [];
    return doctors.filter((doc) => {
      const term = searchQuery.trim().toLowerCase();
      if (!term) return true;
      return (
        (doc.fullName && doc.fullName.toLowerCase().includes(term)) ||
        (doc.specialization && doc.specialization.toLowerCase().includes(term)) ||
        (doc.email && doc.email.toLowerCase().includes(term))
      );
    });
  }, [doctors, searchQuery]);

  // Pagination slicing
  const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDoctors = useMemo(() => {
    return filteredDoctors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDoctors, startIndex]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm font-medium text-[#5C6B73]">Loading Doctors Roster...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#253237]">
            Doctor Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#5C6B73]">
            Register, manage credentials, and monitor all clinic medical faculty.
          </p>
        </div>

        <Link
          to="/admin/doctors/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#253237] px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#5C6B73] hover:shadow-lg active:scale-95"
        >
          <FaPlus className="text-xs" />
          <span>Add New Doctor</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-80">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#5C6B73]" />
        <input
          type="text"
          placeholder="Search by name, specialization, email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-xl border border-gray-200 bg-[#F8FBFC] focus:bg-white pl-9 pr-4 py-2.5 text-xs text-[#253237] outline-none transition-all focus:border-[#253237] focus:ring-2 focus:ring-[#9DB4C0]/30 shadow-2xs"
        />
      </div>

      {/* Premium Table Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FBFC] text-[#253237] font-semibold text-xs uppercase tracking-wider border-b-2 border-[#253237]">
              <tr>
                <th className="px-6 py-4">Doctor Name</th>
                <th className="px-6 py-4">Specialization</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {paginatedDoctors.length > 0 ? (
                paginatedDoctors.map((doctor) => (
                  <tr
                    key={doctor._id}
                    className="hover:bg-[#F8FBFC] transition-colors duration-150"
                  >
                    {/* Name + Avatar Thumbnail */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={doctor.profileImage || DEFAULT_AVATAR}
                          alt={doctor.fullName}
                          onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                          className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-2xs"
                        />
                        <span className="font-semibold text-[#253237]">
                          {doctor.fullName}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-[#5C6B73]">
                      {doctor.specialization || "-"}
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-[#5C6B73]">
                      {doctor.experience} Years
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-[#5C6B73]">
                      {doctor.email}
                    </td>

                    <td className="px-6 py-4 text-xs text-[#5C6B73]">
                      {doctor.phone || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          doctor.isActive !== false
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            : "bg-rose-50 text-rose-700 border border-rose-200/60"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            doctor.isActive !== false ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                        />
                        <span>{doctor.isActive !== false ? "Active" : "Inactive"}</span>
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        {/* Edit Button */}
                        <Link
                          to={`/admin/doctors/edit/${doctor._id}`}
                          className="border-2 border-[#253237] text-[#253237] bg-transparent hover:bg-[#253237] hover:text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95"
                        >
                          <FaUserEdit className="text-xs" />
                          <span>Edit</span>
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(doctor._id)}
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
                  <td colSpan={7} className="py-12 text-center text-[#5C6B73]">
                    <p className="text-sm font-medium">No doctors found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredDoctors.length > 0 && (
          <div className="border-t border-gray-100 bg-[#F8FBFC] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#5C6B73] font-medium">
              Showing{" "}
              <strong className="text-[#253237]">{startIndex + 1}</strong> to{" "}
              <strong className="text-[#253237]">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredDoctors.length)}
              </strong>{" "}
              of <strong className="text-[#253237]">{filteredDoctors.length}</strong> doctors
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

export default Doctors;
