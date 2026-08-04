import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../services/axios";
import {
  FaUserMd,
  FaCalendarCheck,
  FaEnvelope,
  FaClock,
  FaPlus,
  FaChartPie,
  FaChartBar,
  FaChevronRight,
  FaStethoscope,
} from "react-icons/fa";
import { HERO_IMAGES, FEATURE_IMAGES } from "../../constants/images";

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

// Animated Progress Gauge Bar Component
const AnimatedProgressBar = ({ percent, colorClass }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(Math.min(100, Math.max(0, percent)));
    }, 100);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const statConfig = [
  {
    key: "totalDoctors",
    title: "Total Doctors",
    icon: FaUserMd,
    bgImage: FEATURE_IMAGES.qualifiedSpecialists,
    borderColor: "border-l-[#9DB4C0]",
    subtitle: "Active medical faculty",
  },
  {
    key: "totalAppointments",
    title: "Total Appointments",
    icon: FaCalendarCheck,
    bgImage: FEATURE_IMAGES.modernFacilities,
    borderColor: "border-l-blue-500",
    subtitle: "Total scheduled bookings",
  },
  {
    key: "totalContacts",
    title: "Contact Messages",
    icon: FaEnvelope,
    bgImage: FEATURE_IMAGES.trustedPatients,
    borderColor: "border-l-purple-500",
    subtitle: "Patient feedback & inquiries",
  },
  {
    key: "pendingAppointments",
    title: "Pending Reviews",
    icon: FaClock,
    bgImage: FEATURE_IMAGES.compassionateCare,
    borderColor: "border-l-amber-500",
    subtitle: "Awaiting clinical review",
  },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.get("/dashboard/stats");

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

  // Analytical Percentage Calculations
  const metrics = useMemo(() => {
    if (!stats) return { total: 0, approvedPct: 0, pendingPct: 0, completedPct: 0, rejectedPct: 0 };
    const total = stats.totalAppointments || 1;
    const approved = stats.approvedAppointments || 0;
    const pending = stats.pendingAppointments || 0;
    const completed = stats.completedAppointments || 0;
    const rejected = stats.rejectedAppointments || 0;

    return {
      total: stats.totalAppointments || 0,
      approvedPct: Math.round((approved / total) * 100),
      pendingPct: Math.round((pending / total) * 100),
      completedPct: Math.round((completed / total) * 100),
      rejectedPct: Math.round((rejected / total) * 100),
      fulfillmentRate: Math.round(((approved + completed) / total) * 100),
    };
  }, [stats]);

  return (
    <div className="space-y-8">
      {/* Executive Welcome Banner with Live Pulse */}
      <div className="relative overflow-hidden rounded-2xl bg-[#253237] p-8 text-white shadow-xl border border-[#5C6B73]/30">
        <img
          src={HERO_IMAGES.doctors}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#253237] via-[#253237]/90 to-[#253237]/75" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#E0FBFC] backdrop-blur-md border border-white/20">
                <FaStethoscope className="text-xs text-[#C2DFE3]" />
                <span>Executive Operations Center</span>
              </div>

              {/* Live Pulse Indicator */}
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md border border-emerald-500/30">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Live Clinic Systems Active</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Welcome, System Admin
            </h1>
            <p className="mt-2 text-sm text-[#E0FBFC]/90 max-w-xl leading-relaxed">
              Real-time clinical analytics, operational distribution metrics, and faculty performance monitoring.
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

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Top Metric Stat Cards with Hover Lift & Animated Counters */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl bg-white/60 shadow-md"
              />
            ))
          : statConfig.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.key}
                  className={`group relative overflow-hidden rounded-2xl bg-[#253237] p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${item.borderColor} border-l-4 border border-gray-200`}
                >
                  {/* Full-bleed background card photo */}
                  <img
                    src={item.bgImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark corporate gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#253237] via-[#253237]/85 to-[#253237]/65 transition-opacity group-hover:via-[#253237]/80" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#E0FBFC]/80">
                        {item.title}
                      </span>
                      <h3 className="mt-2 text-4xl font-bold text-white">
                        <CountUpNumber target={stats?.[item.key] ?? 0} />
                      </h3>
                      <p className="mt-1 text-xs text-[#E0FBFC]/90">{item.subtitle}</p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md group-hover:scale-110 transition-transform">
                      <IconComponent className="text-2xl text-[#E0FBFC]" />
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Analytical Section 1: Appointment Distribution & Conversion Gauges */}
      {!loading && stats && (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Container (~65%): Status Distribution Analytics Gauges */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[#253237]">
                  <FaChartPie className="text-base" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#253237]">
                    Appointment Ratio & Conversion
                  </h2>
                  <p className="text-xs text-[#5C6B73]">
                    Distribution breakdown across all scheduled consultations ({metrics.total} total)
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#253237] bg-[#F8FBFC] border border-gray-200 rounded-full px-3 py-1">
                Fulfillment Rate: {metrics.fulfillmentRate}%
              </span>
            </div>

            {/* Analytical Gauges List */}
            <div className="space-y-6 pt-2">
              {/* Approved Gauge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#253237]">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span>Approved Appointments</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#5C6B73] font-mono">{stats.approvedAppointments || 0}</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {metrics.approvedPct}%
                    </span>
                  </div>
                </div>
                <AnimatedProgressBar percent={metrics.approvedPct} colorClass="bg-emerald-500" />
              </div>

              {/* Completed Gauge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#253237]">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span>Completed Sessions</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#5C6B73] font-mono">{stats.completedAppointments || 0}</span>
                    <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      {metrics.completedPct}%
                    </span>
                  </div>
                </div>
                <AnimatedProgressBar percent={metrics.completedPct} colorClass="bg-blue-500" />
              </div>

              {/* Pending Gauge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#253237]">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span>Pending Reviews</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#5C6B73] font-mono">{stats.pendingAppointments || 0}</span>
                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {metrics.pendingPct}%
                    </span>
                  </div>
                </div>
                <AnimatedProgressBar percent={metrics.pendingPct} colorClass="bg-amber-500" />
              </div>

              {/* Rejected Gauge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#253237]">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span>Rejected Requests</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#5C6B73] font-mono">{stats.rejectedAppointments || 0}</span>
                    <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      {metrics.rejectedPct}%
                    </span>
                  </div>
                </div>
                <AnimatedProgressBar percent={metrics.rejectedPct} colorClass="bg-rose-500" />
              </div>
            </div>
          </div>

          {/* Right Container (~35%): Operations Summary & Efficiency Metrics */}
          <div className="lg:col-span-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[#253237]">
                <FaChartBar className="text-base" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#253237]">Operational Health</h2>
                <p className="text-xs text-[#5C6B73]">Clinic activity ratings</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Metric Card 1: Fulfillment Efficiency */}
              <div className="rounded-xl bg-[#F8FBFC] p-4 border border-gray-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5C6B73]">Fulfillment Efficiency</span>
                  <span className="text-xs font-bold text-emerald-600">High</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#253237]">{metrics.fulfillmentRate}%</span>
                  <span className="text-[11px] text-[#5C6B73]">successful completion</span>
                </div>
              </div>

              {/* Metric Card 2: Faculty Roster Capacity */}
              <div className="rounded-xl bg-[#F8FBFC] p-4 border border-gray-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5C6B73]">Medical Faculty On-Duty</span>
                  <span className="text-xs font-bold text-blue-600">Optimal</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#253237]">{stats.totalDoctors || 0}</span>
                  <span className="text-[11px] text-[#5C6B73]">active specialists</span>
                </div>
              </div>

              {/* Metric Card 3: Patient Inquiry Response */}
              <div className="rounded-xl bg-[#F8FBFC] p-4 border border-gray-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5C6B73]">Inquiry Queue Status</span>
                  <span className="text-xs font-bold text-purple-600">Active</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#253237]">{stats.totalContacts || 0}</span>
                  <span className="text-[11px] text-[#5C6B73]">messages processed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Executive Quick Actions Bar */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold text-[#253237] mb-4">
          Quick Executive Workflows
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {/* Add Doctor Quick Action */}
          <Link
            to="/admin/doctors/add"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-[#F8FBFC] p-4 transition-all duration-200 hover:border-[#253237] hover:bg-white hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#253237] text-white">
                <FaPlus className="text-sm" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#253237]">Add Doctor</p>
                <p className="text-[11px] text-[#5C6B73]">Register faculty</p>
              </div>
            </div>
            <FaChevronRight className="text-xs text-gray-400 group-hover:translate-x-1 group-hover:text-[#253237] transition-all" />
          </Link>

          {/* Manage Roster Quick Action */}
          <Link
            to="/admin/doctors"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-[#F8FBFC] p-4 transition-all duration-200 hover:border-[#253237] hover:bg-white hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#253237] text-white">
                <FaUserMd className="text-sm" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#253237]">Doctors Roster</p>
                <p className="text-[11px] text-[#5C6B73]">Manage accounts</p>
              </div>
            </div>
            <FaChevronRight className="text-xs text-gray-400 group-hover:translate-x-1 group-hover:text-[#253237] transition-all" />
          </Link>

          {/* View Appointments Quick Action */}
          <Link
            to="/admin/appointments"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-[#F8FBFC] p-4 transition-all duration-200 hover:border-[#253237] hover:bg-white hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#253237] text-white">
                <FaCalendarCheck className="text-sm" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#253237]">Appointments</p>
                <p className="text-[11px] text-[#5C6B73]">Review schedule</p>
              </div>
            </div>
            <FaChevronRight className="text-xs text-gray-400 group-hover:translate-x-1 group-hover:text-[#253237] transition-all" />
          </Link>

          {/* Check Messages Quick Action */}
          <Link
            to="/admin/messages"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-[#F8FBFC] p-4 transition-all duration-200 hover:border-[#253237] hover:bg-white hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#253237] text-white">
                <FaEnvelope className="text-sm" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#253237]">Inbox Messages</p>
                <p className="text-[11px] text-[#5C6B73]">Patient inquiries</p>
              </div>
            </div>
            <FaChevronRight className="text-xs text-gray-400 group-hover:translate-x-1 group-hover:text-[#253237] transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
