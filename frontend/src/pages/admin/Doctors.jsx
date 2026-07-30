import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDoctors,removeDoctor,clearDoctorError } from "../../features/doctor/doctorSlice";
import toast from "react-hot-toast";


const Doctors = () => {
    const dispatch = useAppDispatch();

    const { doctors, loading, error } = useAppSelector((state) => state.doctor);

    useEffect(() => {
      dispatch(fetchDoctors());
    }, [dispatch]);

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearDoctorError());
      }
    }, [error, dispatch]);

    if (loading) {
      return (
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-xl font-semibold">Loading Doctors...</h1>
        </div>
      );
    }
    const handleDelete = async (id) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this doctor?",
      );

      if (!confirmed) return;

      try {
        await dispatch(removeDoctor(id)).unwrap();
        toast.success("Doctor deleted successfully");
      } catch (error) {
        toast.error(error || "Failed to delete doctor");
      }
    };
  return (
    <>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#253237]">
            Doctor Management
          </h1>

          <p className="mt-2 text-[#5C6B73]">
            Manage all doctors from one place.
          </p>
        </div>

        <Link
          to="/admin/doctors/add"
          className="rounded-xl bg-[#253237] px-6 py-3 font-semibold text-white transition hover:bg-[#5C6B73]"
        >
          + Add Doctor
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search doctor..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#253237] md:w-96"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-[#253237] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Specialization</th>
              <th className="px-6 py-4 text-left">Experience</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="border-b transition hover:bg-[#F8FBFC]"
                >
                  <td className="px-6 py-4 font-medium">{doctor.fullName}</td>

                  <td className="px-6 py-4">{doctor.specialization || "-"}</td>

                  <td className="px-6 py-4">{doctor.experience} Years</td>

                  <td className="px-6 py-4">{doctor.email}</td>

                  <td className="px-6 py-4">{doctor.phone || "-"}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        doctor.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {doctor.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/doctors/edit/${doctor._id}`}
                        className="rounded-lg bg-[#9DB4C0] px-4 py-2 text-sm font-medium text-[#253237] hover:opacity-90"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Doctors;
