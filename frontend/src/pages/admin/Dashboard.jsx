import { useEffect, useState } from "react";
import axios from "axios";

const statConfig = [
  {
    key: "totalDoctors",
    title: "Total Doctors",
    icon: "👨‍⚕️",
    color: "bg-[#253237]",
  },
  {
    key: "totalAppointments",
    title: "Appointments",
    icon: "📅",
    color: "bg-[#5C6B73]",
  },
  {
    key: "totalContacts",
    title: "Messages",
    icon: "💬",
    color: "bg-[#9DB4C0]",
  },
  {
    key: "pendingAppointments",
    title: "Pending",
    icon: "🩺",
    color: "bg-[#253237]",
  },
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-blue-100 text-blue-800",
  Rejected: "bg-red-100 text-red-800",
  Completed: "bg-green-100 text-green-800",
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          { withCredentials: true },
        );

        setStats(data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load dashboard statistics",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#253237]">Dashboard</h1>
        <p className="mt-2 text-[#5C6B73]">
          Welcome back! Here's an overview of your clinic.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-3xl bg-white/60 shadow-lg"
              />
            ))
          : statConfig.map((item) => (
              <div
                key={item.key}
                className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl text-white ${item.color}`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#5C6B73]">
                  {item.title}
                </h3>
                <p className="mt-3 text-4xl font-bold text-[#253237]">
                  {stats?.[item.key] ?? 0}
                </p>
              </div>
            ))}
      </div>

      {/* Appointment Status Breakdown */}
      {!loading && stats && (
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            "approvedAppointments",
            "rejectedAppointments",
            "completedAppointments",
          ].map((key) => {
            const label = key.replace("Appointments", "");
            const displayLabel = label.charAt(0).toUpperCase() + label.slice(1);
            return (
              <div key={key} className="rounded-3xl bg-white p-6 shadow-lg">
                <h3 className="text-sm font-medium text-[#5C6B73]">
                  {displayLabel} Appointments
                </h3>
                <p className="mt-2 text-3xl font-bold text-[#253237]">
                  {stats[key]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Dashboard;
