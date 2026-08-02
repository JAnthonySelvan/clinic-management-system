import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarDay, FaClock, FaCheckCircle, FaUserMd } from "react-icons/fa";
import { fetchDoctorAppointments } from "../../features/appointment/appointmentSlice";
import { HERO_IMAGES, FEATURE_IMAGES } from "../../constants/images";

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

const DoctorDashboard = () => {
  const dispatch = useDispatch();

  const { doctorAppointments, loading } = useSelector(
    (state) => state.appointment,
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  const todayStr = useMemo(() => new Date().toDateString(), []);

  const todayAppointments = useMemo(() => {
    if (!Array.isArray(doctorAppointments)) return [];
    return doctorAppointments.filter(
      (appointment) =>
        new Date(appointment.appointmentDateTime).toDateString() === todayStr,
    );
  }, [doctorAppointments, todayStr]);

  const pendingCount = useMemo(() => {
    if (!Array.isArray(doctorAppointments)) return 0;
    return doctorAppointments.filter((app) => app.status === "Pending").length;
  }, [doctorAppointments]);

  const completedCount = useMemo(() => {
    if (!Array.isArray(doctorAppointments)) return 0;
    return doctorAppointments.filter((app) => app.status === "Completed").length;
  }, [doctorAppointments]);

  const doctorName = user?.fullName
    ? `Dr. ${user.fullName.replace(/^Dr\.\s*/i, "")}`
    : "Doctor";

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm font-medium text-[#5C6B73]">Loading Doctor Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#253237] p-8 text-white shadow-xl border border-[#5C6B73]/30">
        {/* Background Overlay Image */}
        <img
          src={HERO_IMAGES.doctors}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237] via-[#253237]/90 to-[#253237]/75" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md border border-white/20 mb-3">
              <FaUserMd className="text-xs text-[#C2DFE3]" />
              <span>Clinical Faculty Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Welcome, {doctorName}
            </h1>
            <p className="mt-2 text-sm text-[#E0FBFC]/90 max-w-xl leading-relaxed">
              Here's a real-time overview of your scheduled patient consultations and appointment metrics.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20 text-right self-start md:self-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C2DFE3] block">
              Today's Date
            </span>
            <span className="text-sm font-bold text-white mt-0.5 block">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Cards with Full-Bleed Background Images */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Today's Appointments Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-blue-500 border border-gray-200">
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
                Today's Appointments
              </span>
              <h2 className="mt-2 text-4xl font-bold text-white">
                <CountUpNumber target={todayAppointments.length} />
              </h2>
              <p className="mt-1 text-xs text-[#E0FBFC]/90">Scheduled for today</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
              <FaCalendarDay className="text-2xl text-[#E0FBFC]" />
            </div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-amber-500 border border-gray-200">
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
                Pending Approvals
              </span>
              <h2 className="mt-2 text-4xl font-bold text-white">
                <CountUpNumber target={pendingCount} />
              </h2>
              <p className="mt-1 text-xs text-[#E0FBFC]/90">Awaiting review</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
              <FaClock className="text-2xl text-[#E0FBFC]" />
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-emerald-500 border border-gray-200">
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
                Completed Sessions
              </span>
              <h2 className="mt-2 text-4xl font-bold text-white">
                <CountUpNumber target={completedCount} />
              </h2>
              <p className="mt-1 text-xs text-[#E0FBFC]/90">Successfully finished</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
              <FaCheckCircle className="text-2xl text-[#E0FBFC]" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Appointments Table (Premium Table Design) */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div className="border-b border-gray-100 bg-[#F8FBFC] px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#253237]">
              Today's Consultation Schedule
            </h2>
            <p className="text-xs text-[#5C6B73] mt-0.5">
              Patients scheduled for consultation today ({todayAppointments.length})
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FBFC] text-[#253237] font-semibold text-xs uppercase tracking-wider border-b-2 border-[#253237]">
              <tr>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Scheduled Time</th>
                <th className="px-6 py-4">Clinical Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {todayAppointments.length > 0 ? (
                todayAppointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="hover:bg-[#F8FBFC] transition-colors duration-150"
                  >
                    <td className="px-6 py-5 font-semibold text-[#253237]">
                      {appointment.patientName}
                    </td>

                    <td className="px-6 py-5 font-mono text-xs text-[#5C6B73]">
                      {new Date(
                        appointment.appointmentDateTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-[#5C6B73]">
                    <p className="text-sm font-medium">No consultations scheduled for today.</p>
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

export default DoctorDashboard;
